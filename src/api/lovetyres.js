import Tyres from "../models/main";
import request from "request";
const csv = require("csvtojson");

const addLoveTyres = async () => {
  console.info("checking for loveTyres in DB");

  const LoveTyres = await Tyres.findOne({ partnerName: "LoveTyres" });

  if (LoveTyres) {
    console.info("Found loveTyres tyres in the DB already so will skip");
    return true;
  }

  console.log("talking to love tyres");
  const tyres = [];
  const getTyres = await csv()
    .fromStream(request.get("http://lovetyres.com/feed/motokiki"))
    .subscribe(tyre => {
      const data = {
        partnerID: "456",
        partnerName: "LoveTyres",
        ean: "",
        make: tyre.brand,
        model: tyre.model,
        price: parseFloat(tyre.price),
        inStock: tyre.stock === "0" ? false : true,
        url: tyre.link,
        load: tyre.load_index,
        speed: tyre.speed_rating,
        profile: tyre.profile,
        size: tyre.size
      };

      tyres.push(data);
    });

  console.info(`Adding ${tyres.length} LoveTyres tyres to the database`);

  const done = await Tyres.insertMany(tyres, err => {
    if (err) return console.error("err", err);
    console.info(`Finished adding loveTyres tyres`);
  });
  return done;
};

export default addLoveTyres;

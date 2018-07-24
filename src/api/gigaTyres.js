import Tyres from "../models/main";
import request from "request";
const csv = require("csvtojson");

const addGigaTyres = async () => {
  console.info("checking for loveTyres in DB");

  const LoveTyres = await Tyres.findOne({ partnerName: "GigaTyres" });

  if (LoveTyres) {
    console.info("Found GigaTyres tyres in the DB already so will skip");
    return true;
  }

  console.log("talking to giga tyres");
  const tyres = [];

  const getTyres = await csv({
    noheader: false,
    delimiter: ";"
  })
    .fromStream(
      request.get("http://upload.netex.ro/bd1de0dd13d47835c99647f45c1b113c.csv")
    )
    .subscribe(tyre => {
      const data = {
        partnerID: "789",
        partnerName: "GigaTyres",
        ean: tyre.ean,
        make: tyre.brand,
        model: tyre.model,
        price: parseFloat(tyre.price),
        url: tyre.link
      };

      tyres.push(data);
    });

  console.info(`Adding ${tyres.length} GigaTyres tyres to the database`);

  const done = await Tyres.insertMany(tyres, err => {
    if (err) return console.error("err", err);
    console.info(`Finished adding GigaTyres tyres`);
  });
  return done;
};

export default addGigaTyres;

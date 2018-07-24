import Tyres from "../models/main";
import request from "request";
const csv = require("csvtojson");

const addMyTyres = async () => {
  console.info("checking for loveTyres in DB");

  const LoveTyres = await Tyres.findOne({ partnerName: "MyTyres" });

  if (LoveTyres) {
    console.info("Found MyTyres tyres in the DB already so will skip");
    return true;
  }

  console.log("talking to MyTyres");
  const tyres = [];

  const getTyres = await csv({
    noheader: false,
    delimiter: ";"
  })
    .fromStream(
      request.get("http://upload.netex.ro/4468280f7c5e87b486db959def9ffa59.csv")
    )
    .subscribe(tyre => {
      const data = {
        partnerID: "321",
        partnerName: "MyTyres",
        ean: tyre.ean,
        make: tyre.brand,
        model: tyre.model,
        price: parseFloat(tyre.price),
        url: tyre.link
      };

      tyres.push(data);
    });

  console.info(`Adding ${tyres.length} MyTyres tyres to the database`);

  const done = await Tyres.insertMany(tyres, err => {
    if (err) return console.error("err", err);
    console.info(`Finished adding MyTyres tyres`);
  });
  return done;
};

export default addMyTyres;

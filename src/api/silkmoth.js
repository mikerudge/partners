import Tyres from "../models/main";
import request from "request";

const addSilkMoth = async () => {
  console.info("checking for silkmoth in DB");

  const silkmoth = await Tyres.findOne({ partnerName: "Silkmoth" });

  if (silkmoth) {
    console.info("Found silkmoth tyres in the DB already so will skip");
    return true;
  }

  var options = {
    method: "GET",
    url: "http://motokiki.silkmoth.co.uk/TyreData/All",
    qs: { dealerId: "57f943a8-c143-4e10-832a-df3dd924f7a6" },
    headers: {
      "Cache-Control": "no-cache"
    }
  };
  console.info("getting silkmoth tyres");

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    const data = JSON.parse(body);

    console.log(data.tyres[2]);

    const tyres = [];

    console.info("sorting tyres");
    data.tyres.forEach(tyre => {
      const assigned = {
        partnerId: "123",
        partnerName: "Silkmoth",
        ean: tyre.ean,
        price: tyre.salePriceInc,
        inStock: tyre.inStock,
        make: tyre.manufacturerName,
        model: tyre.pattern,
        url: tyre.url
      };
      tyres.push(assigned);
    });

    console.info(`Adding ${tyres.length} Silkmoth tyres to the database`);

    return Tyres.insertMany(tyres, err => {
      if (err) return console.error("err", err);
      console.info(`Finished adding silkmoth tyres`);
    });
  });
};

export default addSilkMoth;

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TyreSchema = new Schema({
  partnerId: String,
  partnerName: String,
  ean: String,
  mkId: String,
  make: String,
  model: String,
  price: Number,
  inStock: Boolean,
  url: String,
  load: String,
  speed: String,
  profile: String,
  size: String
});

const tyre = mongoose.model("Tyre", TyreSchema);

export default tyre;

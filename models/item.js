const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemName: { type: String, required: true },
  itemDescription: { type: String, required: true },

});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

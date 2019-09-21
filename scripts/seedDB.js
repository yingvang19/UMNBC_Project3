const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/reactreadinglist"
);

const itemSeed = [
  {
    itemName: "Lego",
    itemDescription: "Small lego Sets for kids",
  },
  {
    itemName: "Harry Potter-1",
    itemDescription: "Harry Potter book 1",
  },
  {
    itemName: "Harry Potter-2",
    itemDescription: "Harry Potter book 2",
  },
  {
    itemName: "Harry Potter-3",
    itemDescription: "Harry Potter book 3",
  },
  {
    itemName: "Harry Potter-4",
    itemDescription: "Harry Potter book 4",
  },
  {
    itemName: "Harry Potter-5",
    itemDescription: "Harry Potter book 5",
  },
  {
    itemName: "Harry Potter-6",
    itemDescription: "Harry Potter book 5",
  },
  {
    itemName: "Harry Potter-6",
    autitemDescription: "Harry Potter book 6",
  },
  {
    itemName: "calculator",
    autitemDescription: "Scientific Calculator",
    
];

db.Item
  .remove({})
  .then(() => db.Book.collection.insertMany(itemSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// Tu put all static content into public folder
app.use(express.static("public"));

// Use ejs as a view engine
// All .ejs must be in view folder
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});

const itemsSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", itemsSchema);

const listsSchema = new mongoose.Schema({
  listName: String,
  items: [itemsSchema],
});
const List = mongoose.model("List", listsSchema);

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

let day = new Date().toLocaleDateString("en-us", options);

app.get("/", function (req, res) {
  Item.find({}).then(function (storedItems) {
    res.render("list", { listTitle: day, items: storedItems });
  });
});

app.post("/", async function (req, res) {
  const itemName = req.body.newItem;
  const itemList = req.body.list;
  const item = new Item({
    name: itemName,
  });

  if (itemList === day.split(' ')[0]) {
    Item.insertMany([item]);
    res.redirect("/");
  } else {
    const foundList = await List.findOne({ listName: itemList });
    foundList.items.push(item);
    foundList.save();
    res.redirect("/" + itemList);
  }
});

app.post("/delete", async function (req, res) {
  const listName = req.body.listName;
  const checkedBox = req.body.checkbox;

  if (listName === day) {
    Item.deleteOne({_id: checkedBox}).then(console.log("Deleted!"));
    res.redirect("/");
  } else {
    List.findOneAndUpdate({listName: listName}, {$pull: {items: {_id: checkedBox}}}).then(console.log("Deleted!"));;
    res.redirect("/"+listName);
  }
});

app.get("/:newlist", async function (req, res) {
  const listNameNew = _.capitalize(req.params.newlist);

  const foundList = await List.findOne({ listName: listNameNew });

  if (!foundList) {
    const newList = new List({
      listName: listNameNew,
      items: [],
    });
    newList.save();
    res.redirect("/" + listNameNew);
  } else {
    res.render("list", {
      listTitle: foundList.listName,
      items: foundList.items,
    });
  }
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

 var mongoose = require("mongoose");
 mongoose.connect("mongodb://localhost/catsDB");
 var catSchema = new mongoose.Schema({
     name: String,
     age: Number,
     temp: String,
 });

 var Cat = mongoose.model("Cat", catSchema);

 // var george = new Cat({
 //     name: "Mr.Norris",
 //     age: 11,
 //     temp: "nier"
 // });
 // george.save(function (err, cat) {
 //     if (err) {
 //         console.log("Something is Wrong");
 //     }else{
 //         console.log("Cat saved successfully");
 //         console.log(cat);
 //     }
 // });

 Cat.create({
     name: "Fenix",
     age: 15,
     temp: "baba"
 }, function (err, cat) {
     if (err) {
         console.log(err);
     } else {
         console.log(cat);
     }
 });

 Cat.find({}, function (err, res) {
     if (err) {
         console.log(err);
     } else {
         console.log(res);
     }
 });
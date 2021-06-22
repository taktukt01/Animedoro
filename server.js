const express = require("express");
const app = express();


app.set('view engine', 'ejs');



app.get("/", (req,res)=>{
    res.render("main");
})

// directory with static files
app.use(express.static(__dirname + '/public'));


var server = app.listen( 5000, function () {
    console.log("Express is working on port 5000");
  });
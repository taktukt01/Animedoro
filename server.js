const express = require("express");
const app = express();


// directory with static files
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



app.get("/", (req,res)=>{
    res.render("index");
})



var server = app.listen( 5000, function () {
    console.log("Express is working on port 5000");
  });
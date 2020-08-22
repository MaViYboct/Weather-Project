const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});



app.post("/", function(req,res){
  console.log(req.body.cityName);

  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;

  https.get(url, function(response){
    console.log(response.statusCode);

   response.on("data", function(data){
     const weatherData = JSON.parse(data);
     console.log(weatherData);

     const temp = weatherData.main.temp;
     console.log("weather is "+ temp +" °C");

     const desc = weatherData.weather[0].description;
     console.log(desc);

     const icon = weatherData.weather[0].icon;
     console.log("icon = "+ icon);
     const iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

     res.write("<h1 style = text-align:center;font-size:5rem;>Weather in "+ query +" is "+ temp +" Degress Celcius</h1>");
     res.write("<h2 style = text-align:center;font-size:3rem;> Weather is currently "+ desc +"</h2>");
     res.write("<img style = margin-left:46%;width:20rem;height20rem; src="+ iconUrl +">");
     res.write("<body style= background-color:grey;></body>");

     res.send();
    });
  });
});



app.listen(3000, function(){
  console.log("server started at port 3000");
});

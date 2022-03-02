    const express=require("express");
    const https=require("https");
    const { compile } = require("proxy-addr");
    const bodyParser=require("body-parser");
    const app=express();

    app.use(bodyParser.urlencoded({extended:true}));
    app.get("/",function(req,res){
        res.sendFile(__dirname+"/index.html")
    })

    app.post("/",function(req,res){
        const cityName=req.body.cityName;
        const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=3451472118f6ee1343b766ea1518652d";
        https.get(url,function(res2){
            console.log("status code", res2.statusCode);  
            res2.on("data",function(data){
                const weatherData=JSON.parse(data);;
                const temp=weatherData.main.temp;
                const weatherDescription=weatherData.weather[0].description;
                const icon=weatherData.weather[0].icon;
                const urlIcon='http://openweathermap.org/img/wn/'+icon+'@2x.png';
                res.write("<p>the weather is: "+weatherDescription+"</p>");
                res.write("<h1>Temperature in "+cityName+" "+temp+" C</h1>")
                res.write("<img src='"+urlIcon+"' alt='icon'>")
                res.send();
            })
        })
        console.log(cityName);
    })
    
    app.listen(3000,function(){
        console.log("Server running 3000");
    })
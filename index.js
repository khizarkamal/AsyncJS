const fs = require("fs");
const superAgent = require("superagent");

// CALLBACK HELL

// Async Version 

// First Callback
fs.readFile(`${__dirname}/dog.txt`,"utf-8",(err,data)=>{
   if(err){
    console.log("Error while trying to read the file");
    return;
   }
//    Second Callback inside callback
    superAgent(`https://dog.ceo/api/breed/${data}/images/random`).end((err,data)=>{
        if(err){
        console.log("Unable to load data from api");
        return;
    }
    // Third Callback inside callback
        fs.writeFile('dog-image.txt',data.body.message,(err)=>{
            if(err){
                console.log("Unable to write to the file");
                return ;
            }
            console.log("Random Image saved to file");
    });
})
})
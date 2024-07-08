const fs = require("fs");
const superAgent = require("superagent");

// Converting Callbacks to promises
// Consuming promises using .then and catch
// Async Version 


fs.readFile(`${__dirname}/dog.txt`,"utf-8",(err,data)=>{
   if(err){
    console.log("Error while trying to read the file");  
    return;
   }
    superAgent(`https://dog.ceo/api/breed/${data}/images/random`)
    // Promise Fullfilled
    .then((res)=>{
            fs.writeFile('dog-image.txt',res.body.message,(err)=>{
                if(err){
                    console.log("Unable to write to the file");
                    return ;
                }
                console.log("Random Image saved to file");
        });
    })
    // Promise Rejected
    .catch((err)=>{
        console.log("Unable to load data from api");
    })
})
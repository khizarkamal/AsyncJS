const fs = require("fs");
const superAgent = require("superagent");

// Creating Promises And Chainging them

// Async Version 

// Handing Return Values of Promises

const readFilePro = () => {
    return new Promise((resolve,reject)=>{
        fs.readFile(`${__dirname}/dog.txt`,'utf-8',(err,data)=>{
            if(err){
                console.log("err--",err);
                reject("Unable to read file ");
            }
            resolve(data);
        })
    })
}

const writeFilePro = (file, data)=> {
    return new Promise((resolve, reject)=>{
        fs.writeFile(file, data,(err)=>{
            if(err){
                reject("Couldnt write the file");
            }
            resolve("Success");
        })
    })
}



// ASYNC AWAIT

const getDogPic = async () => {
   
    try{
        const breed = await readFilePro();
        // HANDLING MULTIPLE PROMISES
        const res1 =  superAgent(`https://dog.ceo/api/breed/${breed}/images/random`);
        const res2 =  superAgent(`https://dog.ceo/api/breed/${breed}/images/random`);
        const res3 =  superAgent(`https://dog.ceo/api/breed/${breed}/images/random`);
        const allResponses = await Promise.all([res1,res2,res3]);
        const randomImages = allResponses.map((el)=>el.body.message);
        console.log(randomImages);
        await writeFilePro('dog-image.txt', randomImages.join("\n"));
    }
    catch(err){
        console.log("Error---",err);
        throw err;
    }
    // Return Values from async functions
    return "Ready Async Function";
}

// Chainoing multiple Promises

// readFilePro()
//     .then((res)=>{
//         // Returnig a promise
//         return superAgent(`https://dog.ceo/api/breed/${res}/images/random`)
//     })
//         .then((res)=>{
//             return writeFilePro('dog-image.txt',res.body.message);
//         })
//         .then((res)=>{
//             console.log(res);
//         })
//     .catch((err)=>{
//         console.log("Unable to load data from api");
//         console.log("err-",err);
//     })


// Promises with then catch syntax

// console.log("Before");
// getDogPic().then((res)=>{
//     console.log(res);
//     console.log("After");
// }).catch((err)=>{
//     console.log("ERROR----")
// });


// IIFE SYNTAX USED TO RETURN OF ASYNC AWAIT
(async ()=> {
    try {
        console.log("Before");
        const response = await getDogPic();
        console.log(response);
        console.log("After");
    }
    catch(err){
        console.log("ERROR----")
    }
})()
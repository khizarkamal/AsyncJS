const fs = require("fs");
const superAgent = require("superagent");

// Creating Promises And Chainging them

// Async Version 


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
        const res =  await superAgent(`https://dog.ceo/api/breed/${breed}/images/random`);
        await writeFilePro('dog-image.txt', res.body.message);
    }
    catch(err){
        console.log("Error---",err);
    }
    console.log("Async")
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

console.log("Before");
getDogPic();
console.log("After")

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})


connectDB()
.then(() => {
    console.log("MongoDB Connected");
    app.on("error", (err) => {
        console.log("Mongoose connection error:", err);
        throw err;
    });

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})








// // require("dotenv").config({path: './env'});
// import {app} from './app.js';
// import dotenv from "dotenv";
// import connectDB from "./db/index.js";


// dotenv.config({ path: "./env" });

// // const app= express();

// connectDB()
//    .then(() =>{
//      console.log("MongoDB Connected");

    

//      app.listen(process.env.PORT ||8000,()=>{
//         console.log(`Server running on port ${process.env.PORT}`);
//      })
//    })
//    .catch((err) => console.error("MongoDB connection error:", err));







// /*

// import express from "express";
// const app = express();

// // Connect to MongoDB

// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         console.log("Connected to MongoDB");

//         app.on("error", (err) => {
//             console.log("Mongoose connection error:", err);
//             throw err;
//         });

//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         });
//     }
//         catch(error){
//         console.error("error: ", error);
//         throw error;
//     }

// })()

// */
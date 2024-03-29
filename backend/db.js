const mongoose = require('mongoose');
// const mongoURI = "mongodb://127.0.0.1/cloudbook" 
const mongoURI = "mongodb://127.0.0.1/cloudbook"
connectToMongo = async()=> {
     await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
   }
   
module.exports = connectToMongo;
   
   
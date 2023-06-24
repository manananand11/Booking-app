const mongoose=require("mongoose")
const { initializeSeats } = require('../models/seatModel');

const connectDB =async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            
        });
        initializeSeats();
        console.log(`MongoDB Connected: ${conn.connection.host}` )
        
    } catch (error) {
        console.log(error)
        process.exit();
    }
}

module.exports= connectDB;


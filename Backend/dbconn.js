const mongoose=require('mongoose');
require('dotenv').config();


const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            // useNewUrlParser: true,  //
            // useUnifiedTopology: true ,//
        })
        console.log("Connected to mongodb");
    }catch(error){
        console.error("error connecting to mongodb:",error.message);
    }
}

module.exports=connectDb
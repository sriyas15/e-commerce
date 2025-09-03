import mongoose from "mongoose";

const mongooseDB = async ()=>{

    try{
        const connect = await mongoose.connect("MongoDB Link Paste Here")
        console.log(`MongooseDB is connected successfully...`);
    }catch(e){
        console.log(`Error Occured: ${e.message}`);
        process.exit(1);
    }

};

export default mongooseDB;

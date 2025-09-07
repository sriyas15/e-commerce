import mongoose from "mongoose";

const mongooseDB = async ()=>{

    try{
        const connect = await mongoose.connect("mongodb+srv://sriyas15:Sriyas%4015@e-com.e4hums0.mongodb.net/")
        console.log(`MongooseDB is connected successfully...`);
    }catch(e){
        console.log(`Error Occured: ${e.message}`);
        process.exit(1);
    }

};

export default mongooseDB;

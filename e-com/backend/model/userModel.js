import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },

    cart: [
        {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        qty: { type: Number, required: true, default: 1 },
        },
    ],

}, {
    timestamps:true
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model("User",userSchema);

export default User;
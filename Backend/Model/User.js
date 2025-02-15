import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Enter Your Name"],
    },
    email : {
        type : String,
        required : [true, "Enter Your Email"],
    },
    password : {
        type : String,
        required : [true, "Please Create Your Password"],
    },
    aadhar : {
        type : Number,
        required : [true, "Please Enter Your Aadhar Number"],
    },
    pan : {
        type : String,
        required : [true, "Please Enter Your Pan Number"],
    },
    role : {
        type : String,
        enum : ["User", "Admin"],
        default : "User"
    },
    amount : {
        type : Number,
        default : '00'
    },
    amountTrade : {
        type : Number,
        default : 0,
    }
})

const userModel = mongoose.model("User", userSchema);

export default userModel;

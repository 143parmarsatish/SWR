import mongoose from "mongoose";

const PositionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    showPosition : {
        type : Boolean,
        default : false
    },
    Position : {
        type : String,
        default : "Closed",
    },
    Indices : {
        type : String,
        default : "Nifty 13 Feb 2025 CE 23700.00 "
    },
    type : {
        type : String,
        default : "Intraday",
    },
    buyPrice : {
        type : Number,
        default : 104.05
    },
    sellPrice : {
        type : Number,
        default : 120
    },
    lot : {
        type : Number,
        default : 10
    },
    gain : {
        type : Number,
        default : -2566,
    }
})


const PositionModel = mongoose.model("Position", PositionSchema);

export default PositionModel;
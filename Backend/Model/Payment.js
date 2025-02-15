import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    UserID : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    QRCode : {
        type : String,
        default : "",
        },
    UPIID : {
        type : String,
        default : "143parmarsatish@okaxis"
    },
    AccountNumber : {
        type : Number,
        default : 1815104000122665
    },
    ifscCode : {
        type : String,
        default : "IBKL0001815",
    }
})


const PaymentModel = mongoose.model('Payment', PaymentSchema);

export default PaymentModel;
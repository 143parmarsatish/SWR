import PaymentModel from "../Model/Payment.js";

export async function registerPayment(req, res){
    try {
        const user = req.user;
        const {UPIID, AccountNumber, ifscCode} = req.body;
        
        if(!UPIID || !AccountNumber || !ifscCode){
            return res.status(400).json({
                message : "Please Enter All details",
                error : true,
                success : false
            })
        }

        const newUser = new PaymentModel({
            UserID : user._id,
            UPIID, 
            AccountNumber, 
            ifscCode 
        })

        const save = await newUser.save();
        
        return res.json({
            message : "Payment Method SuccessFully",
            error : false,
            success : true,
            data : save
        })
    } 
    catch (error) {
        res.status(500).json({
            message : error.message || message,
            error : true,
            success : false
        })
    }
}

export async function getpaymentDetails(req, res) {
    try {
        // Await the database query to resolve
        const details = await PaymentModel.findOne();


        if (!details || details.length === 0) {
            return res.json({
                message: "Details Not Found",
                error: true,
                success: false,
            });
        }

        return res.json({
            message: "Details Found",
            data: details, // ✅ Now sending proper JSON data
            error: false,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching payment details:", error);
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}

export async function editPaymentDetails(req, res) {
    try {
        const user = req.user;
        const { QRCode, UPIID, AccountNumber, ifscCode } = req.body;

        // Ensure user._id is a valid ObjectId
        if (!user._id) {
            return res.status(400).json({
                message: "Invalid User ID",
                success: false,
                error: true,
            });
        }

        // Use findOneAndUpdate instead of findByIdAndUpdate
        const updatedDetails = await PaymentModel.findOneAndUpdate(
            { UserID: user._id }, // Corrected query
            { QRCode, UPIID, AccountNumber, ifscCode },
            { new: true, runValidators: true } // Return updated document
        );

        if (!updatedDetails) {
            return res.status(404).json({
                message: "Payment details not found",
                success: false,
                error: true,
            });
        }

        return res.json({
            message: "Update Successful",
            success: true,
            error: false,
            data: updatedDetails,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true,
        });
    }
}


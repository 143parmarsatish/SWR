import PositionModel from "../Model/Position.js";


export async function addPositonDetails(req, res) {
    try {
        const user = req.user;
        const {showPosition, Position, Indices, type, buyPrice, sellPrice, lot, gain} = req.body;

        const userPosition = await PositionModel.findOne({userId : user._id});

        if(userPosition){
            return res.json({
                message : "Position Already Available Please Edit",
                error : true,
                success : false,
            })
        }

        const newPosition = new PositionModel({
            userId : user._id,
            showPosition, 
            Position, 
            Indices, 
            type, 
            buyPrice, 
            sellPrice, 
            lot, 
            gain
        }
        )

        const save = await newPosition.save();
        
        return res.json({
            message : "Position register successfully",
            error : false,
            success : true,
            data : save
        })
    } 
    catch (error) {
        return res.json({
            message : error.message,
            error : true,
            success : false,
        })
    }
}

export async function getPositionDetails(req, res){
    try {
        const user = req.user;
        const positionDetails = await PositionModel.find({userId : user._id});

        return res.json({
            message : "Position",
            error : false,
            success : true,
            data : positionDetails
        })
    } 
    catch (error) {
        return res.json({
            message : error.message,
            error : true,
            success : false,
        })
    }
}
import jwt from 'jsonwebtoken';
import userModel from '../Model/User.js';

export async function userauth(req, res, next){
    try {
        const token = req?.cookies?.accessToken || req?.headers?.authorization;
        if(!token){
            return res.status(400).json({
                message : "Please Login",
                error : true,
                success : false
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)

        const user = await userModel.findOne({_id : decode.id});

        req.user = user;
        next();
    } 
    catch (error) {
        res.status(500).json({
            message : error.message,
            error : true,
            success : false,
        })
    }
}
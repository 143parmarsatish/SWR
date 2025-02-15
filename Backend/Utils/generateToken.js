import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

async function generateToken(userId){
    const token =  jwt.sign({id : userId}, process.env.SECRET_KEY, {
        expiresIn : '10h'
    })
    return token;
} 

export default generateToken;
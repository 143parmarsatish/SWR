import userModel from "../Model/User.js";
import generateToken from "../Utils/generateToken.js";

export async function registerUser(req, res) {
    try {
        let { name, email, password, aadhar, pan } = req.body;

        // Convert email to lowercase
        email = email.trim().toLowerCase();

        if (!name || !email || !password || !aadhar || !pan) {
            return res.status(400).json({
                message: "Please enter all details",
                error: true,
                success: false
            });
        }

        const user = await userModel.findOne({ email });

        if (user) {
            return res.json({
                message: "User already registered",
                error: true,
                success: false
            });
        }

        const newUser = new userModel({
            name,
            email,  // Now stored in lowercase
            password,
            aadhar,
            pan
        });

        const save = await newUser.save();

        return res.json({
            message: "User registered successfully",
            error: false,
            success: true,
            data: save
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something went wrong",
            error: true,
            success: false
        });
    }
}

export async function loginUser(req, res){
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message : "Please Enter Details",
                error : true,
                success : false,
            })
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({
                message : "User not register, Please Register",
                error : true,
                success : false
            })
        }

        const checkPassword = (password == user.password) ? true : false;

        if(!checkPassword){
            return res.json({
                message : "Please Enter Correct Password",
                error : true,
                success : false,
            })
        }
        
        const accessToken =  await generateToken(user._id);
        
        const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None",
        }

        res.cookie('accessToken', accessToken, cookieOption)
        
        return res.json({
            message : "Login Successfull",
            error : false,
            success : true,
            data : {
                accessToken,
            },
        })
    } 
    catch (error) {
        return res.status(500).json({
            message : error.message,
            success : false,
            error : true,
        })     
    }
}

export async function userDetails(req, res){
    try {
        const user = req.user;

        const loginUser = await userModel.findById({_id : user._id});

        return res.json({
            data : loginUser,
        })

    } 
    catch (error) {
        return res.status(500).json({
            message : error.message,
            error : true,
            success : false
        })    
    }
}

export async function logoutUser(req, res){
    try {
        const user = req.user;
        const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None",
        }
        res.clearCookie("accessToken", cookieOption)

        return res.json({
            message : "Logout Successful",
            error : false,
            success : true,
        })
    } 
    catch (error) {
        res.json({
            message : error.message,
            error : true,
            success : false
        })    
    }
}

export async function allUserDetails(req, res){
    try {
        const allUser = await userModel.find({});
        return res.json({
            message : "All Users Details",
            error : false,
            success : true,
            allUser,
        })
    } 
    catch (error) {
        return res.json({
            message : error.message,
            error : true,
            success : false
        })
    }
}

export async function editUsers(req, res){
    try {
        const {_id, aadhar, pan, name, email, amount, amountTrade} = req.body;

        const updatedUser = await userModel.findByIdAndUpdate({_id : _id}, {
            aadhar,
            pan,
            name,
            email,
            amount,
            amountTrade
        })

        return res.json({
            message : "Users Updated",
            error : false,
            success : true,
            updatedUser
        })
    } 
    catch (error) {
        return res.json({
            message : error.message,
            success : false,
            error : true
        })
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params; // Get user ID from URL params

        if (!id) {
            return res.status(400).json({
                message: "User ID is required",
                error: true,
                success: false,
            });
        }

        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        return res.json({
            message: "User deleted successfully",
            error: false,
            success: true,
            deletedUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}


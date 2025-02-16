import { Router } from "express";
import { allUserDetails, deleteUser, editUsers, loginUser, logoutUser, registerUser, userDetails } from "../Controller/addDetails.js";
import { userauth } from "../middleware/userauth.js";

const userDetailsRoute = Router();

userDetailsRoute.post('/register', registerUser);
userDetailsRoute.post('/login', loginUser);
userDetailsRoute.get('/get-user',userauth, userDetails);
userDetailsRoute.get('/logout', userauth, logoutUser);
userDetailsRoute.get('/all-users', allUserDetails);
userDetailsRoute.post('/update-users', editUsers);
userDetailsRoute.delete("/delete-user/:id", deleteUser);



export default userDetailsRoute;
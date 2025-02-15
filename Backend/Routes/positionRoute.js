import { Router } from "express";
import { userauth } from "../middleware/userauth.js";
import { addPositonDetails, getPositionDetails } from "../Controller/PositionDetails.js";

const positionRoute = Router();

positionRoute.post('/add-position', userauth, addPositonDetails)
positionRoute.get('/get-position', userauth, getPositionDetails)

export default positionRoute;
import { Router } from "express";
import { editPaymentDetails, getpaymentDetails, registerPayment} from "../Controller/PaymentDetails.js";
import { userauth } from "../middleware/userauth.js";

const paymentRoutes = Router();

paymentRoutes.get('/get-Payment', getpaymentDetails)
paymentRoutes.post('/add-payment', userauth, registerPayment);
paymentRoutes.post('/edit-payment', userauth, editPaymentDetails)



export default paymentRoutes;
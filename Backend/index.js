import express from 'express';
import connectDB from './Config/Database.js';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import userDetailsRoute from './Routes/userDetails.js';
import cookieParser from 'cookie-parser';
import positionRoute from './Routes/positionRoute.js';
import paymentRoutes from './Routes/paymentRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

// Routes
app.get("/", (request, response) => {
    response.json({
        message: "Server is running on port " + PORT
    });
});

app.use("/api/user", userDetailsRoute);
app.use("/api/position", positionRoute);
app.use("/api/payment", paymentRoutes);
// app.use("/api/upload", uploadRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to the database and start the server
connectDB()
    .then(() => {
        console.log("Database Connected Successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Database connection failed", err);
    });

export default app;
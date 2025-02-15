import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const uploadRoute = express.Router();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'uploads', // Optional: Folder in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Allowed file formats
    },
});

const upload = multer({ storage });

// File upload route
uploadRoute.post('/editqr', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // File URL from Cloudinary
        const fileUrl = req.file.path;
        res.status(200).json({ message: 'File uploaded successfully', fileUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'File upload failed' });
    }
});

export default uploadRoute;
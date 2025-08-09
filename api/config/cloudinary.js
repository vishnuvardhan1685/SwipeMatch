import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config(".env");

cloudinary.config({
    cloud_name: "dxjwbn7qp",
    api_key: "414163256587599",
    api_secret: "XiYZuU_xmtJBvhIYUSx6wOGhMzI",
})

export default cloudinary;
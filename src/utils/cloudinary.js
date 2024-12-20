import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET//'<your_api_secret>' // Click 'View API Keys' above to copy your API secret
});

const uplodOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            
            resource_type: "auto"//works for all types of uploads
        })
        
        console.log(response);
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);//url of file after upload.
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
        console.log("catch")
        return null;
    }

}




export {uplodOnCloudinary}
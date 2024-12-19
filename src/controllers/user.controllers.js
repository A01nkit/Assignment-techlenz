import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { File } from "../models/file.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uplodOnCloudinary } from "../utils/cloudinary.js";

export const fileUpload = asyncHandler(async (req, res) => {
    //Get file details from frontend via form
    const {filename, filesize, filetype} = req.body
    //validation - not empty
    if (
        [filename, filesize, filetype].some((field) => 
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //check if file already exist
    const existedFile = await File.findOne({fileName: filename})
    if (existedFile) {
        throw new ApiError(409, "User with email or username already existed")
    }

    //check for file, @server
    const fileLocalPath = req.file?.path;// file path of "file"
    if(!fileLocalPath) {
        throw new ApiError(400, "file is required")
    }

    //upload them to cloudnary, check @cloudinary
    const file = await uplodOnCloudinary(avatarLocalPath)
    if (!file) {
        throw new ApiError(400, "file is required")
    }

    //create user object - create entry call in db
    const fileinstanse = await File.create({
        fileName: filename,
        fileType: filetype,
        fileSize: filesize,
        file: file.url
    })

    //check for file creation
    if (!fileinstanse) {
        throw new ApiError(500, "Something went wrong while uploading file")
    }

    //return res if created 
    return res.status(201).json(
        new ApiResponse(200, fileinstanse, "file uploaded successfully")
    )


})

export const fileDownload = asyncHandler(async (req, res) => {
    const filename = req.params['name']
    const existedfile = await Book.findOne({fileName: filename})

    //If file do not exist
    if(!existedfile) {
        throw new ApiError(409, "file do not exist. hence, no operation can be done")
    }

    //extract from cloudinary.

    return res.status(201).json(
        new ApiResponse(200, existedfile, "file delivered successfully")
    ) 
})
import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { fileUpload, fileDownload } from "../controllers/user.controllers.js";


const router = Router()

router.route("/file-upload").post(
    upload.single('file'),
    fileUpload)

router.route("file-download/:name").get(fileDownload)


export default router;

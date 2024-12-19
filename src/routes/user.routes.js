import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { fileUpload } from "../controllers/user.controllers.js";


const router = Router()

router.route("/file-upload").post(
    upload.single('file'),
    fileUpload)




export default router;

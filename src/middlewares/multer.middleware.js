import multer from "multer"

const storage = multer.diskStorage({
    //I intentially store files in diskStorge as if store in memoryStorage result in server down or freeze
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
  
export const upload = multer({ storage: storage })//for es6 {storage}
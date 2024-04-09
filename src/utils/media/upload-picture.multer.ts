import BaseError from "@/utils/error/base.error";
import { StatusCodes } from "http-status-codes";

const multer = require('multer');
const path = require('path');
let resource = 'customer-profile-picture';
//new
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, `storage/media/${resource}`);
  },
  filename: (req: any, file: any, cb: any) => {
    var imagename = Date.now() + path.extname(file.originalname);
    req.imagename = imagename;
    console.log('imagename:', imagename);
    
    cb(null, imagename);
  },
});
var upload = multer({
  storage: storage,
}).single('image');

export const uploadPicture = (resourceName: string) => async (req: any, res: any, next: any) => {
    resource = resourceName;
    await upload(req, res, function (err: any) {
    if (err instanceof multer.MulterError) {
      throw new BaseError(StatusCodes.INTERNAL_SERVER_ERROR, 'fail', "Error when upload image")
    } else if (err) {
        throw new BaseError(StatusCodes.INTERNAL_SERVER_ERROR, 'fail', err.message)
    }
  });
  next();
}

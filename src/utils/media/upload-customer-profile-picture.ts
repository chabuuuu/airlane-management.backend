const multer = require('multer');
const path = require('path');
let resource = 'customer-profile-picture';
  const storage =  multer.diskStorage({
    destination: async (req: any, file: any, cb: any) => {
      await cb(null, `storage/media/${resource}`);        
    },
    filename: async (req: any, file: any, cb: any) => {
      var imagename = Date.now() + path.extname(file.originalname);
      req.imagename = imagename;
      console.log('imagename:', imagename);
      
      await cb(null, imagename);
    },
  });
  console.log(storage.getFilename);
  
  export var uploadCustomerPorfilePicture =  multer({
    storage:  storage,
  }).single('image');


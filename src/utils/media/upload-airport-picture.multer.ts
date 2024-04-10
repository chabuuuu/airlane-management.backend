const multer = require('multer');
const path = require('path');
let resource = 'airport-picture';
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
  
  export var uploadAirportPicture =  multer({
    storage:  storage,
  }).single('image');


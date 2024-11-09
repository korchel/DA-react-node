import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/files");
  },
  filename: function (req, file, callback) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    callback(null, file.originalname + "-" + Date.now());
  },
});

export const fileUpload = multer({ storage });

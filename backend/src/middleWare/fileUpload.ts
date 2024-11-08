import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/files");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + "-" + Date.now());
  },
});

export const fileUpload = multer({ storage });

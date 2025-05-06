import multer from "multer";

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/backend/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-song-${file.originalname}`);
  },
});

var checkUploadFile = multer({ storage, imageFilter });
export default checkUploadFile;
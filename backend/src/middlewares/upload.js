// import multer from "multer";

// const imageFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only images.", false);
//   }
// };

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + "/backend/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-song-${file.originalname}`);
//   },
// });

// var checkUploadFile = multer({ storage, imageFilter });
// export default checkUploadFile;


// // import multer from 'multer';
// // import path from 'path';

// // const allowedExtensions = ['.pdf', '.docx', '.xlsx', '.png', '.jpg', '.jpeg', '.zip'];

// // const fileFilter = (req, file, cb) => {
// //   const ext = path.extname(file.originalname).toLowerCase();
// //   if (allowedExtensions.includes(ext)) {
// //     cb(null, true);
// //   } else {
// //     cb(new Error(`Chỉ cho phép các file: ${allowedExtensions.join(', ')}`), false);
// //   }
// // };

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, path.resolve('uploads'));
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, `${Date.now()}-${file.originalname}`);
// //   },
// // });

// // const upload = multer({
// //   storage,
// //   fileFilter,
// //   limits: { fileSize: 20 * 1024 * 1024 }, // giới hạn 20MB
// // });

// // export default upload;



import multer from "multer";
import path from "path";

// Ví dụ bạn muốn cho phép upload các định dạng file sau
const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Thêm các định dạng khác bạn muốn cho phép
];

// Filter kiểm tra mime type dựa trên danh sách cho phép
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Please upload files of allowed types only."), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dùng path.resolve để lấy đường dẫn tuyệt đối tới folder uploads
    cb(null, path.resolve("backend/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-song-${file.originalname}`);
  },
});

const upload = multer({ storage, fileFilter });

export default upload;

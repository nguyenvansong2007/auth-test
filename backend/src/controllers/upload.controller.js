// import fs from 'fs';
// import db from '../models/index.js';
// import path from 'path';

// const File = db.file;

// export const uploadFile = async (req, res) => {
//   try {
//     console.log(req.file);
//     if (req.file == undefined) {
//       return res.json({ message: 'Please upload a file' });
//     }

//     File.create({
//       type: req.file.mimetype,
//       name: req.file.originalname,
//       data: fs.readFileSync(__basedir + '/backend/uploads/' + req.file.filename),
//     }).then((file) => {
//       fs.writeFileSync(__basedir + '/backend/uploads/' + req.file.filename, '');
//       fs.unlinkSync(__basedir + '/backend/uploads/' + req.file.filename);
//       return res.json(file);
//     })

//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({ message: error.message });
//   }
// }



// // import path from 'path';
// // import db from '../models/index.js';

// // const ProjectFile = db.file;

// // export const uploadFile = async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ message: 'Vui lòng chọn file để upload.' });
// //     }

// //     const projectId = req.params.id;

// //     const file = await ProjectFile.create({
// //       name: req.file.originalname,
// //       type: req.file.mimetype,
// //       filePath: path.join('uploads', req.file.filename),
// //       projectId: projectId,
// //     });

// //     res.status(201).json({ message: 'Upload thành công', file });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Đã xảy ra lỗi khi upload file.' });
// //   }
// // };


import fs from 'fs';
import path from 'path';
import db from '../models/index.js';

const File = db.file;

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Đường dẫn tuyệt đối tới file vừa upload
    const uploadPath = path.resolve('backend/uploads', req.file.filename);

    // Đọc dữ liệu từ file
    const fileData = fs.readFileSync(uploadPath);

    // Tạo bản ghi trong database
    const savedFile = await File.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fileData,
    });

    // Xoá file gốc trên ổ cứng sau khi lưu vào DB
    fs.unlinkSync(uploadPath);

    return res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        id: savedFile.id,
        name: savedFile.name,
        type: savedFile.type,
      },
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Failed to upload file', error: error.message });
  }
};

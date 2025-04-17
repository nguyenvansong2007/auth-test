import fs from 'fs';
import db from '../models/index.js';

const File = db.file;

export const uploadFile = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file == undefined) {
      return res.json({ message: 'Please upload a file' });
    }

    File.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(__basedir + '/backend/uploads/' + req.file.filename),
    }).then((file) => {
      fs.writeFileSync(__basedir + '/backend/uploads/' + req.file.filename, '');
      fs.unlinkSync(__basedir + '/backend/uploads/' + req.file.filename);
      return res.json(file);
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
}
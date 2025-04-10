import express from 'express';
import { createProject, findAllProject, findOneProject, updateProject, deleteProject, deleteAllProject, findAllPublishedProject } from '../controllers/project.controller.js';
import { isAdmin, verifyToken } from '../middlewares/authJws.js';

const router = express.Router();

// // Create a new Tutorial
// router.route('/create').post(verifyToken, createProject).get(verifyToken, findAllProject);


// // Retrieve all published Tutorials
// router.route("/published").get(verifyToken, findAllPublishedProject);

// // Retrieve a single Tutorial with id and Update a Tutorial with id
// router.route("/:id").get([verifyToken, isAdmin], findOneProject).put(updateProject);



// // Delete a Tutorial with id
// router.route("/:id").delete([verifyToken, isAdmin], deleteProject);


// router.route("/").delete([verifyToken, isAdmin], deleteAllProject);



// test 
router.route('/create').post(createProject).get(findAllProject);
router.route("/published").get(findAllPublishedProject);
router.route("/:id").get(findOneProject).put(updateProject);
router.route("/:id").delete(deleteProject);
router.route("/").delete(deleteAllProject);






export default router;
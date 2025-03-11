import express from 'express';
import { createProject, findAllProject, findOneProject, updateProject, deleteProject, deleteAllProject, findAllPublishedProject } from '../controllers/project.controller.js';
const router = express.Router();

// Create a new Tutorial
router.route('/create').post(createProject);

// Retrieve all Tutorials
router.route("/").get(findAllProject);

// Retrieve all published Tutorials
router.route("/published").get(findAllPublishedProject);

// Retrieve a single Tutorial with id
router.route("/:id").get(findOneProject);

// Update a Tutorial with id
router.route("/:id").put(updateProject);

// Delete a Tutorial with id
router.route("/:id").delete(deleteProject);

// Create a new Tutorial
router.route("/").delete(deleteAllProject);


export default router;
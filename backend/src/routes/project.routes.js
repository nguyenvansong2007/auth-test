import express from 'express';
import { 
  createProject, 
  findAllProject, 
  findOneProject, 
  updateProject, 
  deleteProject, 
  deleteAllProject, 
  // findAllPublishedProject,
  addMember, 
  updateMember,
  removeMember,
  getProjectMembers
} from '../controllers/project.controller.js';
import { isAdmin, verifyToken, } from '../middlewares/authJws.js';


const router = express.Router();

// proejct
router.route('/').get(verifyToken, findAllProject);
router.route('/create').post(verifyToken, createProject)
router.route("/:id").get([verifyToken, isAdmin], findOneProject).put(updateProject);
router.route("/:id").delete([verifyToken, isAdmin], deleteProject);
router.route("/").delete([verifyToken, isAdmin], deleteAllProject);

// project member
router.route("/:id/add-member").post(verifyToken,addMember);
router.route("/:id/update-member").post(verifyToken,updateMember);
router.route("/:id/remove-member").post(verifyToken,removeMember);
router.route("/:id/getAllMember").post(verifyToken,getProjectMembers);











// test 
// router.route('/create').post(createProject).get(findAllProject);
// router.route("/published").get(findAllPublishedProject);
// router.route("/:id").get(findOneProject).put(updateProject);
// router.route("/:id").delete(deleteProject);
// router.route("/").delete(deleteAllProject);






export default router;
import db from "../models/index.js";

const { project: Project, user: User, projectRole: projectRole, Sequelize } = db;
const Op = Sequelize.Op;

// Create a new project
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      projectName: req.body.projectName,
      projectNumber: req.body.projectNumber,
      projectType: req.body.projectType,
      template: req.body.template,
      address: req.body.address,
      timeZone: req.body.timeZone,
      projectValue: req.body.projectValue,
      createdBy: req.userId,
    });
    // Lấy thông tin người dùng từ bảng User
    const creator = await User.findByPk(
      req.userId,
      {
        attributes: ['id', 'username', 'email'], // Chỉ lấy các trường cần thiết
      });
    if (!creator) {
      throw new Error('User not found');
    }

    res.status(200).json({
      project,
      createdBy: {
        id: creator.id,
        username: creator.username,
        email: creator.email,
      },
     
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).send({
      message: "Error creating project.",
      error: error.message,
    });
  }
};

// Get all projects (with optional projectName search)
export const findAllProject = async (req, res) => {
  const condition = req.query.projectName
    ? { projectName: { [Op.iLike]: `%${req.query.projectName}%` } }
    : undefined;

  try {
    const projects = await Project.findAll({ where: condition });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving projects." });
  }
};

// Get one project by ID
export const findOneProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving project." });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const [updated] = await Project.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated === 1) {
      res.json({ message: "Project updated successfully." });
    } else {
      res.status(404).json({ message: "Project not found or no changes made." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating project." });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.destroy({
      where: { id: req.params.id },
    });

    if (deleted === 1) {
      res.json({ message: "Project deleted successfully." });
    } else {
      res.status(404).json({ message: "Project not found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting project." });
  }
};

// Delete all projects
export const deleteAllProject = async (req, res) => {
  try {
    const count = await Project.destroy({ where: {}, truncate: false });
    res.json({ message: `${count} projects were deleted.` });
  } catch (err) {
    res.status(500).json({ message: "Error deleting all projects." });
  }
};

// Add member to a project
export const addMember = async (req, res) => {
  const { email, role } = req.body;
  const { projectId } = req.params;

  try {
    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (project.createdBy !== req.user.id)
      return res.status(403).json({ error: "Permission denied" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    await ProjectMember.create({
      userId: user.id,
      projectId,
      role: role === "administrator" ? "administrator" : "member",
    });

    res.json({ message: "Member added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding member" });
  }
};

// Update member role
export const updateMember = async (req, res) => {
  const { email, newRole } = req.body;
  const { projectId } = req.params;

  try {
    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (project.createdBy !== req.user.id)
      return res.status(403).json({ error: "Permission denied" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const updated = await ProjectMember.update(
      { role: newRole },
      { where: { projectId, userId: user.id } }
    );

    if (updated[0] === 0) {
      return res.status(400).json({ error: "User not in project" });
    }

    res.json({ message: "Role updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating role" });
  }
};

// Remove member
export const removeMember = async (req, res) => {
  const { email } = req.body;
  const { projectId } = req.params;

  try {
    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (project.createdBy !== req.user.id)
      return res.status(403).json({ error: "Permission denied" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const deleted = await ProjectMember.destroy({
      where: { projectId, userId: user.id },
    });

    if (deleted === 0) {
      return res.status(400).json({ error: "User not in project" });
    }

    res.json({ message: "Member removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error removing member" });
  }
};


export const getProjectMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const members = await Project.findByPk(projectId, {
      include: {
        model: User,
        through: {
          attributes: ["role"], // Lấy cột role trong bảng trung gian
        },
        attributes: ["firstname", "lastname", "email"], // Lấy các trường cần thiết từ User
      },
    });

    if (!members) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving project members" });
  }
};
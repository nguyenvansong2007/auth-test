import db from '../models/index.js';
import bcrypt from 'bcryptjs';

// create
export const createCompany = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const userId = req.userId;
    const { name, address, phone } = req.body;

    // Kiểm tra user có phải là moderator không
    const user = await db.user.findByPk(userId, {
      include: [{ model: db.role, as: 'roles', through: { attributes: [] } }]
    });

    const isModerator = user.roles.some(r => r.name === 'moderator');

    if (!isModerator) {
      return res.status(403).json({ message: 'Forbidden! Only moderators can create companies.' });
    }

    // Tạo công ty mới
    const company = await db.company.create({
      name,
      address,
      phone
    }, { transaction });

    // Tạo tài khoản moderator mặc định
    const newModeratorUsername = `mod_${Date.now()}`;
    const newModeratorEmail = `${newModeratorUsername}@example.com`;
    const newPassword = '12345678';//defaultPassword123
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const newModerator = await db.user.create(
      {
        username: newModeratorUsername,
        email: newModeratorEmail,
        password: hashedPassword
      },
      { transaction }
    );

    // Gán role moderator cho tài khoản mới
    const moderatorRole = await db.role.findOne({
      where: { name: 'moderator' },
      transaction
    });

    if (!moderatorRole) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Moderator role not found!' });
    }

    await newModerator.setRoles([moderatorRole], { transaction });

    // Thêm vào bảng trung gian
    await company.addModerator(newModerator, { transaction });

    // Commit transaction
    await transaction.commit();

    res.status(201).json({
      message: 'Company and default moderator created successfully!',
      company,
      newModerator: {
        id: newModerator.id,
        username: newModerator.username,
        email: newModerator.email
      }
    });

  } catch (error) {
    console.error('Error creating company and moderator:', error);
    await transaction.rollback();
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// get all
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await db.company.findAll({
      include: [{
        model: db.user,
        as: 'moderators',
        attributes: ['id', 'username', 'email'],
        through: { attributes: [] }
      }]
    });

    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// get by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await db.company.findByPk(companyId, {
      include: [{
        model: db.user,
        as: 'moderators',
        attributes: ['id', 'username', 'email'],
        through: { attributes: [] }
      }]
    });

    if (!company) {
      return res.status(404).json({ message: 'Company not found!' });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// update
export const updateCompany = async (req, res) => {
  try {
    const userId = req.userId;
    const companyId = req.params.id;
    const { name, address, phone } = req.body;

    const company = await db.company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found!' });
    }

    await company.update({ name, address, phone });

    res.status(200).json({ message: 'Company updated successfully!', company });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Xóa 

export const deleteCompany = async (req, res) => {
  try {
    const userId = req.userId;
    const companyId = req.params.id;

    const company = await db.company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found!' });
    }

    await company.destroy();

    res.status(200).json({ message: 'Company deleted successfully!' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
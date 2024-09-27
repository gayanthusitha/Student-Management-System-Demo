const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');  // Import middleware
const router = express.Router();

// Create Student (Admin and Super Admin)
router.post('/create', authMiddleware.verifyToken, authMiddleware.isAdminOrSuperAdmin, studentController.createStudent);

// Get All Students (Admin and Super Admin)
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdminOrSuperAdmin, studentController.getAllStudents);

// Get Student by ID (Admin and Super Admin)
router.get('/:id', authMiddleware.verifyToken, authMiddleware.isAdminOrSuperAdmin, studentController.getStudentById);

// Update Student (Admin and Super Admin)
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdminOrSuperAdmin, studentController.updateStudent);

// Delete Student (Super Admin Only)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isSuperAdmin, studentController.deleteStudent);

// Search Students (Admin and Super Admin)
router.get('/search/s', authMiddleware.verifyToken, authMiddleware.isAdminOrSuperAdmin, studentController.searchStudents);

module.exports = router;


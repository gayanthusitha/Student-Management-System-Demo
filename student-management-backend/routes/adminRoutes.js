const express = require('express');
const adminController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');  // Import middleware
const router = express.Router();

// Admin login (any user can log in)
router.post('/login', adminController.login);

// Create Admin (only Super Admins can do this)
router.post('/create', authMiddleware.verifyToken, authMiddleware.isSuperAdmin, adminController.createAdmin);

// Get ALl Admin (only Super Admins can do this)
router.get('/', authMiddleware.verifyToken, authMiddleware.isSuperAdmin, adminController.getAllAdmins);

// Get Admin by ID (only Super Admins can do this)
router.get('/:id', authMiddleware.verifyToken, authMiddleware.isSuperAdmin, adminController.getAdminById);

// Update Admin (only Super Admins can do this)
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isSuperAdmin, adminController.updateAdmin);

// Delete Admin (only Super Admins can do this)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isSuperAdmin, adminController.deleteAdmin);

// Search Admins (only Super Admins can do this)
router.get('/search/s', authMiddleware.verifyToken, authMiddleware.isSuperAdmin, adminController.searchAdmins);

module.exports = router;

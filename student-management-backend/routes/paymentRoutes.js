const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');  // Import middleware
const router = express.Router();

// Create Payment (Admin and Super Admin)
router.post('/create', authMiddleware.verifyToken, authMiddleware.isAdminOrSuperAdmin, paymentController.createPayment);

// Get All Payments (Admin and Super Admin)
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdminOrSuperAdmin, paymentController.getAllPayments);

// Update Payment (Admin and Super Admin)
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdminOrSuperAdmin, paymentController.updatePayment);

module.exports = router;

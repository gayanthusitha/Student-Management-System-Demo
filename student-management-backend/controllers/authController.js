const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authController = {
  // Create Admin Function
  createAdmin: async (req, res) => {
    const { full_name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    Admin.create({ full_name, email, password: hashedPassword, role }, (err, result) => {
      if (err) return res.status(500).send('Error creating admin');
      res.status(201).send('Admin created successfully');
    });
  },

// Login Function
login: (req, res) => {
  const { email, password } = req.body;
  Admin.findByEmail(email, async (err, admin) => {
      if (err || !admin.length) return res.status(404).send('Admin not found');
      const isValid = await bcrypt.compare(password, admin[0].password);
      if (!isValid) return res.status(401).send('Invalid credentials');

      // Include role in the token
      const token = jwt.sign({ id: admin[0].id, role: admin[0].role }, 'secret_key', { expiresIn: '1h' });

      // Send back both the token and role
      res.status(200).json({ token, role: admin[0].role });
  });
},


  // Get All Admins
  getAllAdmins:  (req, res) => {
    Admin.getAll((err, admins) => {
      if (err) return res.status(500).send('Error fetching admins');
      if (admins.length === 0) return res.status(404).send('No admins found');
      res.status(200).json(admins);
    });
  },

   // Get Admin By Id
  getAdminById: (req, res) => {
    const id = req.params.id;
    Admin.getById(id, (err, admin) => {
      if (err) return res.status(500).send('Error fetching admin');
      if (!admin.length) return res.status(404).send('Admin not found');
      res.status(200).json(admin[0]);
    });
  },

  // Update Admin
  updateAdmin: async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        // If the password is provided, hash it
        if (data.password) {
            const saltRounds = 10;
            data.password = await bcrypt.hash(data.password, saltRounds);
        }

        // Update the admin with hashed password or other data
        Admin.update(id, data, (err, result) => {
            if (err) return res.status(500).send('Error updating admin');
            res.status(200).send('Admin updated successfully');
        });
    } catch (error) {
        res.status(500).send('Error updating admin');
    }
  },

  // Delete Admin
  deleteAdmin: (req, res) => {
    const id = req.params.id;
    Admin.delete(id, (err, result) => {
      if (err) return res.status(500).send('Error deleting admin');
      res.status(200).send('Admin deleted successfully');
    });
  },

  // Search Admins
searchAdmins: (req, res) => {
  const queryParams = req.query; // Get query parameters from the request
  Admin.search(queryParams, (err, admins) => {
      if (err) return res.status(500).send('Error searching for admins');
      if (admins.length === 0) return res.status(404).send('No admins found');
      res.status(200).json(admins);
  });
}
};

module.exports = authController;

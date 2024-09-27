const db = require('../config/db');

const Admin = {
  // Create Admin
  create: (data, callback) => {
    const query = `INSERT INTO Admins (full_name, email, password, role) VALUES (?, ?, ?, ?)`;
    db.query(query, [data.full_name, data.email, data.password, data.role], callback);
  },

  // Login
  findByEmail: (email, callback) => {
    const query = `SELECT * FROM Admins WHERE email = ?`;
    db.query(query, [email], callback);
  },

  // Get All Admins
  getAll: (callback) => {
    const query = 'SELECT * FROM admins';
    db.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  },

  // Get Admin By Id
  getById: (id, callback) => {
    const query = `SELECT * FROM admins WHERE id = ?`;
    db.query(query, [id], callback);
  },

  // Update Admin
  update: (id, data, callback) => {
    let query = `UPDATE admins SET full_name = ?, email = ?, role = ?`;
    let values = [data.full_name, data.email, data.role];

    // Only include the password if it's provided in the update
    if (data.password) {
        query += `, password = ?`;
        values.push(data.password);
    }

    query += ` WHERE id = ?`;
    values.push(id);

    db.query(query, values, callback);
},

  // Delete Admin
  delete: (id, callback) => {
    const query = `DELETE FROM admins WHERE id = ?`;
    db.query(query, [id], callback);
  },

  // Search Admins
search: (queryParams, callback) => {
  const { full_name, email, role } = queryParams;
  const conditions = [];
  const values = [];

  if (full_name) {
      conditions.push('full_name LIKE ?');
      values.push(`%${full_name}%`);
  }
  if (email) {
      conditions.push('email = ?');
      values.push(email);
  }
  if (role) {
      conditions.push('role = ?');
      values.push(role);
  }

  const sqlQuery = `SELECT * FROM Admins ${conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''}`;

  db.query(sqlQuery, values, (err, result) => {
      if (err) {
          return callback(err, null);
      }
      return callback(null, result);
  });
},
};


module.exports = Admin;

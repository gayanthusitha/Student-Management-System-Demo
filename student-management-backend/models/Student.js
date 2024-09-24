const db = require('../config/db');

const Student = {

// Create Student
  create: (data, callback) => {
    const query = `INSERT INTO Students (full_name, gender, date_of_birth, contact_number, email, subject, registration_fee) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [data.full_name, data.gender, data.date_of_birth, data.contact_number, data.email, data.subject, data.registration_fee], callback);
  },

// Get All Student
  getAll: (callback) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  },

// Get Student By ID
  getById: (id, callback) => {
    const query = `SELECT * FROM Students WHERE registration_number = ?`;
    db.query(query, [id], callback);
  },

// Update Student
  update: (id, data, callback) => {
    const query = `UPDATE Students SET full_name = ?, gender = ?, date_of_birth = ?, contact_number = ?, email = ?, subject = ?, registration_fee = ? WHERE registration_number = ?`;
    db.query(query, [data.full_name, data.gender, data.date_of_birth, data.contact_number, data.email, data.subject, data.registration_fee, id], callback);
  },

// Delete Student
  delete: (id, callback) => {
    const query = `DELETE FROM Students WHERE registration_number = ?`;
    db.query(query, [id], callback);
  }
};

module.exports = Student;
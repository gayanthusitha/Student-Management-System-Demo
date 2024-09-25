const db = require('../config/db');

const Payment = {
  // Create Payment 
  create: (data, callback) => {
    const query = `INSERT INTO Payments (registration_number, month, price, status) VALUES (?, ?, ?, ?)`;
    db.query(query, [data.registration_number, data.month, data.price, data.status], callback);
  },

  // Get Payment 
  getAll: (callback) => {
    const query = `SELECT * FROM Payments`;
    db.query(query, callback);
  },

  // Update Payment 
  update: (id, data, callback) => {
    const query = `UPDATE Payments SET month = ?, price = ?, status = ? WHERE id = ?`;
    db.query(query, [data.month, data.price, data.status, id], callback);
  }
};

module.exports = Payment;

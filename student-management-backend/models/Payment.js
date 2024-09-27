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
  },

    // Search Payments
    search: (queryParams, callback) => {
      const { registration_number, status } = queryParams;
      let query = `SELECT * FROM Payments WHERE 1=1`;
      const values = [];
  
      if (registration_number) {
        query += ` AND registration_number = ?`;
        values.push(registration_number);
      }
      if (status) {
        query += ` AND status = ?`;
        values.push(status);
      }
  
      db.query(query, values, callback);
    }
};

module.exports = Payment;

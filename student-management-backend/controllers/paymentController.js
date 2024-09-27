const Payment = require('../models/Payment');

const paymentController = {
  // Payment Create
  createPayment: (req, res) => {
    const data = req.body;
    Payment.create(data, (err, result) => {
      if (err) return res.status(500).send('Error creating payment');
      res.status(201).send('Payment created successfully');
    });
  },

  // Get All Payment 
  getAllPayments: (req, res) => {
    Payment.getAll((err, payments) => {
      if (err) return res.status(500).send('Error fetching payments');
      res.status(200).json(payments);
    });
  },

  // Update Payment
  updatePayment: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Payment.update(id, data, (err, result) => {
      if (err) return res.status(500).send('Error updating payment');
      res.status(200).send('Payment updated successfully');
    });
  },

    // Search Payments
    searchPayments: (req, res) => {
      const { registration_number, status } = req.query;
      Payment.search({ registration_number, status }, (err, payments) => {
        if (err) return res.status(500).send('Error searching payments');
        res.status(200).json(payments);
      });
    }
};

module.exports = paymentController;

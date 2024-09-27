const Student = require('../models/Student');

const studentController = {

// Create Student
  createStudent: (req, res) => {
    const data = req.body;
    Student.create(data, (err, result) => {
      if (err) return res.status(500).send('Error creating student');
      res.status(201).send('Student created successfully');
    });
  },

// Get All Student
  getAllStudents: (req, res) => {
    Student.getAll((err, students) => {
      if (err) return res.status(500).send('Error fetching students');
      if (students.length === 0) return res.status(404).send('No students found');
      res.status(200).json(students);
    });
  },

// Get Student ID
  getStudentById: (req, res) => {
    const id = req.params.id;
    Student.getById(id, (err, student) => {
      if (err) return res.status(500).send('Error fetching student');
      if (!student.length) return res.status(404).send('Student not found');
      res.status(200).json(student[0]);
    });
  },

// Update Student
  updateStudent: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Student.update(id, data, (err, result) => {
      if (err) return res.status(500).send('Error updating student');
      res.status(200).send('Student updated successfully');
    });
  },

// Delete Student
  deleteStudent: (req, res) => {
    const id = req.params.id;
    Student.delete(id, (err, result) => {
      if (err) return res.status(500).send('Error deleting student');
      res.status(200).send('Student deleted successfully');
    });
  },

  // Search Students
  searchStudents: (req, res) => {
    const queryParams = req.query; // Get query parameters from the request
    Student.search(queryParams, (err, students) => {
      if (err) return res.status(500).send('Error searching for students');
      if (students.length === 0) return res.status(404).send('No students found');
      res.status(200).json(students);
    });
  }

};

module.exports = studentController;

// Dependencies
const Students = require('./studentsModel');

// GET all the students api
const getStudents = async (req, res) => {
  try {
    const students = await Students.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(students));
  } catch (error) {
    console.log(error.message);
  }
};

// GET a single student ByID

const getStudent = async (req, res, id) => {
  try {
    const students = await Students.findById(id);
    if (!students) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Student Not Found!' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(students));
    }
  } catch (error) {
    console.log(error.message);
  }
};
// add a new student

// eslint-disable-next-line consistent-return
const addStudent = async (req, res) => {
  try {
    let body = [];
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { name, desc } = JSON.parse(body);
      const student = {
        name,
        desc,
      };
      const newStudent = await Students.create(student);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newStudent));
    });
  } catch (error) {
    console.log(error.message);
  }
};

// udpate student
const updateStudent = async (req, res, id) => {
  try {
    const students = await Students.findById(id);
    if (!students) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Student Not Found!' }));
    } else {
      let body = [];
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', async () => {
        const { name, desc } = JSON.parse(body);
        const student = {
          name: name || students.name,
          desc: desc || students.desc,
        };
        const updatedStudent = await Students.update(id, student);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(updatedStudent));
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// delete student
const removeStudent = async (req, res, id) => {
  try {
    const students = await Students.findById(id);
    if (!students) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Student Not Found!' }));
    } else {
      await Students.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `student ${id} removed` }));
    }
  } catch (error) {
    console.log(error.message);
  }
};
// exports the modules
module.exports = {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  removeStudent,
};

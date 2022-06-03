// Dependencies
const http = require('http');
const {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  removeStudent,
} = require('./studentsController');
// Configuration
const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;

// creating the server
const server = http.createServer((req, res) => {
  if (req.url === '/students' && req.method === 'GET') {
    getStudents(req, res);
  } else if (req.url.match(/\/students\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[2];
    getStudent(req, res, id);
  } else if (req.url === '/students' && req.method === 'POST') {
    addStudent(req, res);
  } else if (req.url.match(/\/students\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[2];
    updateStudent(req, res, id);
  } else if (req.url.match(/\/students\/([0-9]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[2];
    removeStudent(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Your Requested URL was not Found!' }));
  }
});
// Listening the server
server.listen(port, hostname, () => {
  console.log(
    `Your server is running successfully at http://${hostname}:${port}`
  );
});

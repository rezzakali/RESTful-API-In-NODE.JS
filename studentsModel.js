// Dependencies
const { v4 } = require('uuid');
const { v4: uuidv4 } = require('uuid');
let students = require('./students.json');
const { writeDataToFile } = require('./toGetBodyData');
// find all data from the local json file
const findAll = () =>
  new Promise((resolve, reject) => {
    resolve(students);
  });
// Find a single student using id
const findById = (id) =>
  new Promise((resolve, reject) => {
    const student = students.find((s) => s.id === id);

    resolve(student);
  });
// add a new student to the json file
const create = (student) =>
  new Promise((resolve, reject) => {
    const newStudent = { id: uuidv4(), ...student };
    students.push(newStudent);
    writeDataToFile('./students.json', students);
    resolve(newStudent);
  });
// update the student by id
const update = (id, student) =>
  new Promise((resolve, reject) => {
    const index = students.findIndex((p) => p.id === id);
    students[index] = { id, ...student };
    writeDataToFile('./students.json', students);
    resolve(student[index]);
  });
// delete  student by id
const remove = (id) =>
  new Promise((resolve, reject) => {
    students = students.filter((s) => s.id !== id);
    writeDataToFile('./students.json', students);
    resolve();
  });
// exports the module
module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};

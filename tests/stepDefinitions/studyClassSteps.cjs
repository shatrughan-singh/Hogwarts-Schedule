const { Given, When, Then, After } = require('@cucumber/cucumber');
const assert = require('assert');
// Dynamically import `chai`
// let expect;
// (async () => {
//   const chaiModule = await import('chai');
//   expect = chaiModule.expect;
// })();

const expect = require('expect');
const logger = require('../logger.cjs');


let studentList = [];

Given('the following teachers are present:', function (dataTable) {
  logger.info("loggggg>>>>>studentName", dataTable );
  teacherList = dataTable.hashes().map((row) => ({
    name: row.Teacher,
    attendance: row.Attendance
  }));
});

Given('the following students have their teacher allocations:', function (dataTable) {
  studentList = dataTable.hashes().map((row) => ({
    name: row.Student,
    subject: row.Subject,
    allocatedTeacher: row['Allocated Teacher'] || null
  }));
});

When('I view the "Current Schedule"', function () {
  // Update the current schedule based on teacher attendance
  studentList = studentList.map((student) => {
    const assignedTeacher = teacherList.find(
      (teacher) => teacher.name === student.allocatedTeacher
    );

    if (!assignedTeacher || assignedTeacher.attendance === "Absent") {
      const fallbackTeacher = teacherList
        .filter((teacher) => teacher.attendance === "Present")
        .sort((a, b) => a.hierarchy - b.hierarchy)[0];
      return {
        ...student,
        currentTeacher: fallbackTeacher ? fallbackTeacher.name : "Not Assigned"
      };
    }

    return {
      ...student,
      currentTeacher: assignedTeacher.name
    };
  });
});

Then('{string} should be assigned to {string}', function (studentName, teacher) {
  logger.info("loggggg>>>>>studentName", {string}  );

  // Find the student object from the studentList
  const student = studentList.find((s) => s.name === studentName);

  if (!student) {
    throw new Error(`Student ${studentName} not found`);
  }
  // Check if the assigned teacher matches the expected one
  expect(student.currentTeacher).to.equal(teacher);
});

When('I change "{string}" attendance to "{string}"', function (teacherName, attendanceStatus) {
  // Update the attendance of a teacher
  const teacher = teacherList.find((t) => t.name === teacherName);
  if (teacher) {
    teacher.attendance = attendanceStatus;
  }
});

Then('I should see the following updated teacher assignments:', function (dataTable) {
  // Verify the updated teacher assignments are correct after attendance changes
  dataTable.hashes().forEach((expectedRow) => {
    const student = studentList.find(
      (s) => s.name === expectedRow.Student
    );
    assert.strictEqual(student.currentTeacher, expectedRow.Teacher);
  });
});
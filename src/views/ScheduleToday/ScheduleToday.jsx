import React, { useState, useEffect } from "react";
import "./ScheduleToday.css";
import ImageComponent from "../../components/ImageComponent";
import SelectComponent from "../../components/SelectComponent";

// Teacher hierarchy
const teacherHierarchy = {
  "Horace Slughorn": ["Rubeus Hagrid"],
  "Severus Snape": ["Rubeus Hagrid"],
  "Rubeus Hagrid": ["Minerva McGonagall"],
  "Minerva McGonagall": ["Professor Dumbledore"],
  "Professor Dumbledore": [],
};

const initialTeachers = [
  { name: "Professor Dumbledore", hierarchy: 1, attendance: "Present", imageUrl: '/images/Professor_Dumbledore.jpg', },
  { name: "Minerva McGonagall", hierarchy: 2, attendance: "Present", imageUrl: '/images/Professor_McGonagall.jpg', },
  { name: "Rubeus Hagrid", hierarchy: 3, attendance: "Present", imageUrl: '/images/Professor_Rubeus.jpg', },
  { name: "Horace Slughorn", hierarchy: 4, attendance: "Present", imageUrl: '/images/Professor_Horace.jpg', },
  { name: "Severus Snape", hierarchy: 5, attendance: "Present", imageUrl: '/images/Professor_Severus.png', },
];

const initialStudents = [
  {
    name: "Harry Potter",
    subject: "Potions Master",
    teacher: "Horace Slughorn",
    imageUrl: '/images/Image_Harry.jpg',
  },
  {
    name: "Hermione Granger",
    subject: "Potions Master",
    teacher: "",
    imageUrl: '/images/Image_Hermione.jpg',
  },
  {
    name: "Ron Weasley",
    subject: "Potions Master",
    teacher: "Severus Snape",
    imageUrl: '/images/Image_Ron.jpg',
  },
  {
    name: "Draco Malfoy",
    subject: "Potions Master",
    teacher: "Horace Slughorn",
    imageUrl: '/images/Image_Harry.jpg',
  },
  {
    name: "Padma Patil",
    subject: "Potions Master",
    teacher: "",
    imageUrl: '/images/Image_Padma.jpg',
  },
  {
    name: "Luna Lovegood",
    subject: "Potions Master",
    teacher: "Severus Snape",
    imageUrl: '/images/Image_Luna.png',
  },
];

const ScheduleToday = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [students, setStudents] = useState(initialStudents);

  // Function to assign teachers based on availability and hierarchy
  const assignTeachers = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (!student.teacher) {
          // If no teacher is allocated, assign the standby teacher (Rubeus Hagrid)
          student.teacher = "Rubeus Hagrid";
        }
        return student;
      })
    );
  };

  // Function to reassign students based on the teacher absence
  const reassignStudents = (absentTeachers) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        let assignedTeacher = student.teacher;
        if (absentTeachers.includes(assignedTeacher)) {
          // Traverse up the hierarchy to find a teacher
          while (assignedTeacher && absentTeachers.includes(assignedTeacher)) {
            const higherTeacher = teacherHierarchy[assignedTeacher]?.[0];
            assignedTeacher = higherTeacher || "Not Assigned"; // If no higher teacher, assign "Not Assigned"
          }
        }
        return { ...student, teacher: assignedTeacher };
      })
    );
  };

  const handleAttendanceChange = (teacherName, status) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.name === teacherName ? { ...teacher, attendance: status } : teacher
      )
    );
  };

  useEffect(() => {
    assignTeachers(); // Assign teachers initially for unassigned students
  }, []);

  useEffect(() => {
    const absentTeachers = teachers.filter((teacher) => teacher.attendance === "Absent").map((teacher) => teacher.name);
    reassignStudents(absentTeachers); // Reassign students when attendance changes
  }, [teachers]); // Trigger reassign on teacher attendance change

  return (
        <>
          <h1
            style={{
              textAlign: "center",
              width: "100%",
              fontSize: "42px",
              fontWeight: "800",
            }}
          >
            Schedule Today
          </h1>
          <div className="schedule-container">
            <div className="section">
              <h2>Attendance</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Teacher</th>
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher, index) => (
                      <tr key={teacher.name} data-testid={`teacher-row-${index}`}>
                        <td><ImageComponent teacher={teacher}></ImageComponent></td>
                        <td>{teacher.name}</td>
                        <td>
                          <SelectComponent teacher={teacher} setTeachers={setTeachers} index={index}></SelectComponent>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
    
            <div className="separator"></div>
    
            <div className="section">
              <h2>Current Schedule</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Student</th>
                      <th>Subject</th>
                      <th>Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.name}>
                        <td>
                          <img
                            src={student.imageUrl}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </td>
                        <td>{student.name}</td>
                        <td>{student.subject}</td>
                        <td>{student.teacher}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      );
};

export default ScheduleToday;


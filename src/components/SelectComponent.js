import React from "react";

const SelectComponent = ({ teacher, setTeachers, index }) => {
  const handleAttendanceChange = (teacherName, attendance) => {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.name === teacherName ? { ...teacher, attendance } : teacher
      )
    );
  };
  return (
    <div>
      <select
        value={teacher.attendance}
        onChange={(e) => handleAttendanceChange(teacher.name, e.target.value)}
        data-testid={`attendance-select-${index}`}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
    </div>
  );
};

export default SelectComponent;

import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

export default function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  const removeStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents(students.map((s) => (s.id === id ? updatedStudent : s)));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        📘 Sistema de Boletim Escolar
      </h1>
      <StudentForm onAdd={addStudent} />
      <StudentList
        students={students}
        onRemove={removeStudent}
        onUpdate={updateStudent}
      />
    </div>
  );
}
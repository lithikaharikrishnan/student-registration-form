
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./index.css";

function App() {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem("students");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [page, setPage] = useState("dashboard");
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = (studentData) => {
    if (editingStudent) {
      setStudents((previous) =>
        previous.map((student) =>
          student.id === editingStudent.id
            ? {
                ...studentData,
                id: student.id,
                createdAt: student.createdAt
              }
            : student
        )
      );
      setEditingStudent(null);
    } else {
      const newStudent = {
        ...studentData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      setStudents((previous) => [...previous, newStudent]);
    }

    setPage("students");
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents((previous) =>
        previous.filter((student) => student.id !== id)
      );
    }
  };

  const editStudent = (student) => {
    setEditingStudent(student);
    setPage("register");
  };

  const cancelEdit = () => {
    setEditingStudent(null);
    setPage("students");
  };

  return (
    <div className="app">
      <Navbar setPage={setPage} />

      <main className="main-content">
        {page === "dashboard" && (
          <Dashboard students={students} />
        )}

        {page === "register" && (
          <StudentForm
            addStudent={addStudent}
            editingStudent={editingStudent}
            cancelEdit={cancelEdit}
            students={students}
          />
        )}

        {page === "students" && (
          <StudentList
            students={students}
            deleteStudent={deleteStudent}
            editStudent={editStudent}
          />
        )}
      </main>

      <footer className="footer">
        Student Registration Management System
        <br />
        © 2026 All Rights Reserved
      </footer>
    </div>
  );
}

export default App;

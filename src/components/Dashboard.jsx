
import {
  Users,
  UserPlus,
  GraduationCap
} from "lucide-react";

import "../style/Dashboard.css";

function Dashboard({ students }) {
  const totalStudents = students.length;

  const today = new Date().toDateString();

  const newStudents = students.filter(
    (student) =>
      student.createdAt &&
      new Date(student.createdAt).toDateString() === today
  ).length;

  const departments = new Set(
    students.map((student) => student.department)
  ).size;

  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <h1>Student Dashboard</h1>
        <p>Welcome to Student Registration Management System</p>
      </div>

      <div className="stats-container">
        <div className="stat-card blue">
          <Users size={32} />
          <h2>{totalStudents}</h2>
          <p>Total Students</p>
        </div>

        <div className="stat-card green">
          <UserPlus size={32} />
          <h2>{newStudents}</h2>
          <p>Today's Registrations</p>
        </div>

        <div className="stat-card orange">
          <GraduationCap size={32} />
          <h2>{departments}</h2>
          <p>Total Departments</p>
        </div>
      </div>

      <div className="dashboard-info">
        <h2>Registration Overview</h2>
        <p>
          Currently {totalStudents} students are registered
          in the system.
        </p>
      </div>

      <div className="recent-section">
        <h2>Recently Registered Students</h2>

        {students.length === 0 ? (
          <p>No student registrations yet.</p>
        ) : (
          students.slice(-5).reverse().map((student) => (
            <div className="recent-student" key={student.id}>
              <div>
                <strong>{student.name}</strong>
                <p>{student.registerNumber}</p>
              </div>
              <span>{student.department}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;

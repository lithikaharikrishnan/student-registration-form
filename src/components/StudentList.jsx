
import { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Users
} from "lucide-react";

import StudentDetails from "./StudentDetails";
import "../style/StudentList.css";

function StudentList({ students, deleteStudent, editStudent }) {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter((student) => {
    const keyword = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(keyword) ||
      student.registerNumber.toLowerCase().includes(keyword) ||
      student.email.toLowerCase().includes(keyword) ||
      student.department.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="student-list-page">
      <div className="list-heading">
        <div>
          <h1>Student Records</h1>
          <p>Manage all registered students</p>
        </div>

        <div className="total-badge">
          <Users size={20} />
          Total: {students.length}
        </div>
      </div>

      <div className="search-box">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search by name, register number, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Register No.</th>
              <th>Department</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-message">
                  No student records found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.registerNumber}</td>
                  <td>{student.department}</td>
                  <td>{student.email}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="view-btn"
                        title="View"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        className="edit-btn"
                        title="Edit"
                        onClick={() => editStudent(student)}
                      >
                        <Edit size={17} />
                      </button>

                      <button
                        className="delete-btn"
                        title="Delete"
                        onClick={() => deleteStudent(student.id)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <StudentDetails
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

export default StudentList;

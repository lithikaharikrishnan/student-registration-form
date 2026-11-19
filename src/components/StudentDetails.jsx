
import { X, GraduationCap } from "lucide-react";
import "../style/StudentDetails.css";

function StudentDetails({ student, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="details-header">
          <h2>Student Details</h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="student-avatar">
          <GraduationCap size={35} />
        </div>

        <h3>{student.name}</h3>
        <p className="student-register">{student.registerNumber}</p>

        <div className="details-content">
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Academic Year:</strong> {student.year}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p>
            <strong>Registered:</strong>{" "}
            {student.createdAt
              ? new Date(student.createdAt).toLocaleDateString()
              : "Not available"}
          </p>
        </div>

        <button className="details-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default StudentDetails;

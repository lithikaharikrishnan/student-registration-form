
import React, { useState, useEffect } from "react";
import "../style/StudentForm.css";

const initialForm = {
  name: "",
  registerNumber: "",
  email: "",
  phone: "",
  department: "",
  year: "",
  gender: ""
};

function StudentForm({
  addStudent,
  editingStudent,
  cancelEdit
}) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || "",
        registerNumber: editingStudent.registerNumber || "",
        email: editingStudent.email || "",
        phone: editingStudent.phone || "",
        department: editingStudent.department || "",
        year: editingStudent.year || "",
        gender: editingStudent.gender || ""
      });
    } else {
      setFormData(initialForm);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClear = () => {
    setFormData(initialForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyField = Object.values(formData).some(
      (value) => !value.trim()
    );

    if (emptyField) {
      alert("Please fill all the fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Enter a valid email address.");
      return;
    }

    if (typeof addStudent !== "function") {
      alert("Registration function is not connected. Check App.jsx.");
      return;
    }

    addStudent({
      ...formData,
      name: formData.name.trim(),
      registerNumber: formData.registerNumber.trim(),
      email: formData.email.trim().toLowerCase()
    });

    setFormData(initialForm);
  };

  return (
    <div className="form-page">

      <div className="form-heading">
        <h1>
          {editingStudent
            ? "Edit Student Details"
            : "Student Registration"}
        </h1>
        <p>Enter student information below</p>
      </div>

      <form className="student-form" onSubmit={handleSubmit}>

        <div className="form-grid">

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Register Number *</label>
            <input
              type="text"
              name="registerNumber"
              placeholder="Enter register number"
              value={formData.registerNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              maxLength="10"
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="AI & Data Science">AI & Data Science</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>

          <div className="form-group">
            <label>Academic Year *</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

        </div>

        <div className="form-buttons">

          <button type="submit" className="submit-btn">
            {editingStudent ? "Update Student" : "Register Student"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={handleClear}
          >
            Clear Form
          </button>

          {editingStudent && (
            <button
              type="button"
              className="cancel-btn"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}

        </div>

      </form>
    </div>
  );
}

export default StudentForm;

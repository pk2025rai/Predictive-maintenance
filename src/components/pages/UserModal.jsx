import React, { useState } from "react";
import "../styles/usersModal.css";

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    role: "",
    phone: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.designation ||
      !formData.role ||
      !formData.phone
    ) {
      alert("Please fill all fields");
      return;
    }

    onCreate({
      ...formData,
      createdAt: new Date().toISOString(),
    });

    setFormData({
      name: "",
      designation: "",
      role: "",
      phone: "",
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="create-user-modal">
        <div className="modal-header">
          <h3>Create User</h3>
          <span className="close-btn" onClick={onClose}>
            ✕
          </span>
        </div>

        <div className="modal-form">
          <div className="input-group">
            <label>Enter Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Enter Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Enter Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Enter Phone no.</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="create-btn" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateUserModal;

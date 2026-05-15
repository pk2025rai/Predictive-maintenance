import React, { useEffect, useState } from "react";
import "../styles/usersModal.css";

const EditUserModal = ({ isOpen, onClose, userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    role: "",
    phone: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="create-user-modal">

        <div className="modal-header">
          <h3>Update User</h3>

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
          Update
        </button>

      </div>
    </div>
  );
};

export default EditUserModal;
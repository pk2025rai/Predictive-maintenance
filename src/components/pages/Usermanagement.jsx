import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { format } from "date-fns";
import "../styles/UserManagement.css";
import CreateUserModal from "./UserModal";
import EditUserModal from "./EditModal";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Default mock users
  const defaultUsers = [
    {
      name: "Abhi Kumar",
      designation: "Manager",
      contact: "9876543210",
      role: "Admin",
      createdAt: "2025-07-25T10:00:00",
    },
    {
      name: "Samrat Smith",
      designation: "Team Lead",
      contact: "9123456780",
      role: "User",
      createdAt: "2025-07-24T14:30:00",
    },
    {
      name: "Ravi Kumar",
      designation: "Developer",
      contact: "9012345678",
      role: "Editor",
      createdAt: "2025-07-23T09:45:00",
    },
  ];
  const handleCreateNewUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  useEffect(() => {
    axios
      .get("https://pdm-be.onrender.com/api/v1/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        // Use default data if request fails
        setUsers(defaultUsers);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const normalizeDate = (dateStr) => {
    if (!dateStr) return null;
    return dateStr.replace(" ", "T").replace(/:(\d{6})$/, ".$1");
  };
  const handleEdit = (user, index) => {
    setSelectedUser(user);
    setSelectedIndex(index);
    setEditModal(true);
  };
  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = [...users];

    updatedUsers[selectedIndex] = updatedUser;

    setUsers(updatedUsers);
  };
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);

    setUsers(updatedUsers);
  };

  return (
    <div className="user-management-container">
      <div className="top-bar">
        <input
          type="text"
          placeholder="🔍 Search"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="create-user-btn" onClick={() => setOpenModal(true)}>
          + Create User
        </button>
      </div>

      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Phone Number</th>
              <th>Roles</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className={index % 2 !== 0 ? "alt-row" : ""}>
                <td>{user.name}</td>
                <td>{user.designation}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  {user.createdAt
                    ? format(
                        new Date(normalizeDate(user.createdAt)),
                        "yyyy-MM-dd HH:mm:ss",
                      )
                    : "N/A"}
                </td>
                <td className="action-icons">
                  <FaEdit
                    color="blue"
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    onClick={() => handleEdit(user, index)}
                  />
                  <FaTrash
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateUserModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreateNewUser}
      />
      <EditUserModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        userData={selectedUser}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default UserManagement;

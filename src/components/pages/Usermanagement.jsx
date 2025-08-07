import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { format } from "date-fns";
import "../styles/UserManagement.css";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    axios
      .get("http://localhost:8000/get-users")
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
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const normalizeDate = (dateStr) => {
    if (!dateStr) return null;
    return dateStr.replace(" ", "T").replace(/:(\d{6})$/, ".$1");
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
        <button className="create-user-btn">+ Create User</button>
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
                <td>{user.contact}</td>
                <td>{user.role}</td>
                <td>
                  {user.createdAt
                    ? format(
                        new Date(normalizeDate(user.createdAt)),
                        "yyyy-MM-dd HH:mm:ss"
                      )
                    : "N/A"}
                </td>
                <td className="action-icons">
                  <FaEdit
                    color="blue"
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    onClick={() => alert(`Edit user: ${user.name}`)}
                  />
                  <FaTrash
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={() => alert(`Delete user: ${user.name}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

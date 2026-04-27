import React, { useState } from "react";
import "../styles/History.css";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upper");

  // ✅ Upper Threshold Data
  const upperData = [
    {
      date: "23/04/2026 12:18",
      machine: "M1",
      last: "20/04/2026",
      next: "30/05/2026",
      sensors: [5, 2, 6, 3, 7, 4, 8, 5],
    },
    {
      date: "23/04/2026 13:17",
      machine: "M2",
      last: "21/04/2026",
      next: "01/06/2026",
      sensors: [4, 3, 5, 2, 6, 3, 7, 4],
    },
    {
      date: "24/04/2026 10:45",
      machine: "M3",
      last: "22/04/2026",
      next: "05/06/2026",
      sensors: [6, 3, 7, 4, 8, 5, 9, 6],
    },
  ];

  // ✅ Lower Threshold Data
  const lowerData = [
    {
      date: "23/04/2026 14:20",
      machine: "M1",
      last: "20/04/2026",
      next: "30/05/2026",
      sensors: [2, 1, 3, 1, 2, 1, 3, 2],
    },
    {
      date: "24/04/2026 09:30",
      machine: "M2",
      last: "21/04/2026",
      next: "01/06/2026",
      sensors: [1, 1, 2, 1, 2, 1, 2, 1],
    },
    {
      date: "24/04/2026 11:10",
      machine: "M3",
      last: "22/04/2026",
      next: "05/06/2026",
      sensors: [2, 1, 3, 2, 3, 2, 4, 2],
    },
  ];

  const data = activeTab === "upper" ? upperData : lowerData;

  return (
    <div className="history-page">

      {/* 🔝 Top Row */}
      <div className="history-top">

        {/* Tabs */}
        <div className="history-tabs">
          <span
            className={activeTab === "upper" ? "active" : ""}
            onClick={() => setActiveTab("upper")}
          >
            Upper Threshold Value
          </span>

          <span
            className={activeTab === "lower" ? "active" : ""}
            onClick={() => setActiveTab("lower")}
          >
            Lower Threshold Value
          </span>
        </div>

        {/* Right side (search + back) */}
        <div className="right-controls">
          <input
            type="text"
            placeholder="Search by machine name or no."
            className="history-search"
          />

          <span
            className="back-link"
            onClick={() => navigate("/dashboard/config")}
          >
            ← Configuration
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Machine</th>
              <th>Last Maintenance</th>
              <th>Next Maintenance</th>
              <th>Sensor 1 OLD</th>
              <th>Sensor 1 NEW</th>
              <th>Sensor 2 OLD</th>
              <th>Sensor 2 NEW</th>
              <th>Sensor 3 OLD</th>
              <th>Sensor 3 NEW</th>
              <th>Sensor 4 OLD</th>
              <th>Sensor 4 NEW</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.machine}</td>
                <td>{row.last}</td>
                <td>{row.next}</td>

                {row.sensors.map((val, i) => (
                  <td key={i}>{val}</td>
                ))}

                <td>⋮</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
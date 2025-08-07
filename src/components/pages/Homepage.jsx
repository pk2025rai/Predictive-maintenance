import React, { useState } from "react";
import "../styles/Home.css";
import { FaClock, FaTools } from "react-icons/fa";
import { MdBuild, MdAccessTime } from "react-icons/md";
import machines from '../data/data'
const Home = () => {
  const [selectedArea, setSelectedArea] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAreaChange = (e) => setSelectedArea(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const filteredMachines = machines.filter((m) => {
    const matchArea = selectedArea === "All" || m.area === selectedArea;
    const failureDate = new Date(m.lastFailure);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchStart = !start || failureDate >= start;
    const matchEnd = !end || failureDate <= end;

    return matchArea && matchStart && matchEnd;
  });

  return (
    <div className="home-container">
      <div className="filter-bar">
        <input type="date" value={startDate} onChange={handleStartDateChange} />
        <input type="date" value={endDate} onChange={handleEndDateChange} />
        <select onChange={handleAreaChange} value={selectedArea}>
          <option value="All">All Areas</option>
          <option value="Area 1">Area 1</option>
          <option value="Area 2">Area 2</option>
        </select>
      </div>

      <div className="machine-grid">
        {filteredMachines.map((m) => (
          <div className="machine-card" key={m.id}>
            <div className="machine-header">MACHINE {m.id}</div>

            <div className="machine-detail">
              <span>
                <FaClock /> Last Failure
              </span>
              <span className="highlight">
                {new Date(m.lastFailure).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>

            <div className="machine-detail">
              <span>
                <FaTools /> Last Maintenance
              </span>
              <span>15 Jun 2025</span>
            </div>

            <div className="machine-detail">
              <span>
                <MdBuild /> Next Maintenance
              </span>
              <span>10 Aug 2025</span>
            </div>

            <div className="machine-detail">
              <span>
                <MdAccessTime /> Predicted Failure Time
              </span>
              <span>28 Jun 2025, 11:30 PM</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

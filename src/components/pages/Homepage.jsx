import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMachines, getAlerts } from "../data/api";
import "../styles/Home.css";
import { FaClock, FaTools } from "react-icons/fa";
import { MdBuild, MdAccessTime } from "react-icons/md";
import settings from "../assets/settings.png";
const Home = () => {
  const [selectedArea, setSelectedArea] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [machines, setMachines] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const handleAreaChange = (e) => setSelectedArea(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  useEffect(() => {
    fetchMachines();
    fetchAlerts();
  }, []);
  const fetchAlerts = async () => {
    try {
      const res = await getAlerts();
      setAlerts(res.data);
    } catch (err) {
      console.error("Error fetching alerts", err);
    }
  };
  const getAlertForMachine = (machineId) => {
    const found = alerts.find((a) => a.machine_id === machineId);
    return found ? found.alert : "NA";
  };

  const fetchMachines = async () => {
    try {
      const res = await getMachines();

      const formatted = await Promise.all(
        res.data.map(async (m, index) => {
          try {
            const configRes = await axios.get(
              `https://pdm-be.onrender.com/api/v1/config/${m.machine_id}`,
            );

            console.log(configRes.data);

            return {
              id: index + 1,
              area: index % 2 === 0 ? "Area 1" : "Area 2",
              ...m,
              ...configRes.data,
            };
          } catch (err) {
            console.error("CONFIG ERROR", err);

            return {
              id: index + 1,
              area: index % 2 === 0 ? "Area 1" : "Area 2",
              ...m,
            };
          }
        }),
      );

      setMachines(formatted);
    } catch (err) {
      console.error("Error fetching machines", err);
    }
  };
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
            <div className="machine-header">
              <img
                src={settings}
                alt="machine"
                className="machine-header-icon"
              />
              <span>{m.machine_id.toUpperCase()}</span>
            </div>

            <div className="card-content">
              {/* LAST FAILURE */}
              <div className="machine-detail">
                <div className="detail-left">
                  <FaClock className="icon red-icon" />

                  <div className="detail-text">
                    <div className="detail-label">Last Failure</div>

                    <div className="detail-value red-text">
                      {m.last_failure || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* LAST MAINTENANCE */}
              <div className="machine-detail">
                <div className="detail-left">
                  <FaTools className="icon gray-icon" />

                  <div className="detail-text">
                    <div className="detail-label">Last Maintenance</div>

                    <div className="detail-value black-text">
                      {m.last_maintenance || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* NEXT MAINTENANCE */}
              <div className="machine-detail">
                <div className="detail-left">
                  <MdBuild className="icon gray-icon" />

                  <div className="detail-text">
                    <div className="detail-label">Next Maintenance</div>

                    <div className="detail-value green-text">
                      {m.next_maintenance || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* PREDICTED FAILURE */}
              <div className="machine-detail">
                <div className="detail-left">
                  <MdAccessTime className="icon gray-icon" />

                  <div className="detail-text">
                    <div className="detail-label">Predicted Failure Time</div>

                    <div className="detail-value">
                      <span className="black-text">
                        {m.predicted_failure || "N/A"}
                      </span>{" "}
                      <span className="red-text"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* EQUIPMENT */}
              <div className="equipment-row">
                <div>
                  <div className="equipment-label">Equipment -</div>

                  <div className="equipment-name">Equipment Name</div>
                </div>

                <a href="/dashboard/cost" className="view-cost">
                  View cost
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

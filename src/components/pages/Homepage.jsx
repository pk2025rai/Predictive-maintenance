import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMachines, getAlerts } from "../data/api";
import "../styles/Home.css";
import { FaClock, FaCog, FaTools } from "react-icons/fa";
import { MdBuild, MdAccessTime } from "react-icons/md";
import settings from "../assets/settings.png";
// import pre from "../assets/presettings.png";

const API_BASE_URL = "http://localhost:8000";
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
              `${API_BASE_URL}/api/v1/config/${m.machine_id}`,
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
    <div className="page-wrapper">
      <div className="home-container">
        {/* BREADCRUMB */}
        <div className="breadcrumb">
          Menu / <span>Home</span>
        </div>

        {/* FILTER BAR */}
        <div className="filter-bar">
          {/* START DATE */}
          <input
            type="text"
            placeholder="Start Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            value={startDate}
            onChange={handleStartDateChange}
            className="filter-input"
          />

          {/* END DATE */}
          <input
            type="text"
            placeholder="End Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            value={endDate}
            onChange={handleEndDateChange}
            className="filter-input"
          />

          {/* AREA */}
          <select
            onChange={handleAreaChange}
            value={selectedArea}
            className="filter-input"
          >
            <option value="All">Select Area</option>
            <option value="Area 1">Area 1</option>
            <option value="Area 2">Area 2</option>
          </select>

          {/* DATE FILTER */}
          <select className="filter-input">
            <option>Date Filters</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>

        {/* MACHINE GRID */}
        <div className="machine-grid">
          {filteredMachines.map((m) => (
            <div className="machine-card" key={m.id}>
              {/* CARD HEADER */}
              <div className="machine-header">
                <div className="gear-wrapper">
                  <FaCog className="big-gear" />

                  <FaCog className="small-gear" />
                </div>

                <span>MACHINE {m.id}</span>
              </div>

              {/* CARD CONTENT */}
              <div className="card-content">
                {/* LAST FAILURE */}
                <div className="machine-detail">
                  <div className="detail-left">
                    <FaClock className="icon red-icon" />

                    <div className="detail-text">
                      <div className="detail-label">Last Failure</div>

                      <div className="detail-value red-text">
                        {m.last_failure || "12 Jun 2025, 02:10 AM"}
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
                        {m.last_maintenance || "01 Jun 2025"}
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
                        {m.next_maintenance || "01 Aug 2025"}
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
                        <span className="black-text">28 Jun 2025,</span>{" "}
                        <span className="red-text">11:30 PM</span>
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
    </div>
  );
};

export default Home;

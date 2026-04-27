import React, { useState, useEffect } from "react";
import { getMachines, getAlerts } from "../data/api";
import "../styles/Home.css";
import { FaClock, FaTools } from "react-icons/fa";
import { MdBuild, MdAccessTime } from "react-icons/md";
// import machines from "../data/data";
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

      // Convert backend data → match your UI format
      const formatted = res.data.map((m, index) => ({
        id: index + 1,
        area: index % 2 === 0 ? "Area 1" : "Area 2", // temporary (since backend doesn't send area)
        lastFailure: new Date().toISOString(), // placeholder
        ...m,
      }));

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
            <div className="machine-header">{m.machine_name}</div>

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
                <FaTools /> Health Score
              </span>
              <span className="highlight">{m.health_score}%</span>
            </div>

            <div className="machine-detail">
              <span>
                <MdBuild /> Status
              </span>
              <span className={m.status === "Healthy" ? "green" : "orange"}>
                {m.status}
              </span>
            </div>

            <div className="machine-detail">
              <span>
                <MdAccessTime /> Predicted Failure Time
              </span>
              <span>
                {m.health_score > 80
                  ? "Low Risk"
                  : m.health_score > 60
                    ? "Medium Risk"
                    : "High Risk"}
              </span>
            </div>
            <div className="machine-detail">
              <span>
                <MdAccessTime /> Alert
              </span>
              <span
                className={
                  getAlertForMachine(m.machine_id) !== "NA" ? "alert" : ""
                }
              >
                {getAlertForMachine(m.machine_id)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

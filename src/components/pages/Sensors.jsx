import React, { useState } from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "../styles/Sensor.css";
import sensorHealthData from '../data/data'

const SensorHealth = () => {
  const [openCardId, setOpenCardId] = useState(null);
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const toggleCard = (id) => {
    setOpenCardId((prevId) => (prevId === id ? null : id));
  };

  const filteredMachines = sensorHealthData.filter((machine) =>
    selectedArea === "All Areas" ? true : machine.area === selectedArea
  );

  return (
    <div className="sensor-health-wrapper" style={{ padding: "20px" }}>
      {/* Filter Controls */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {/* Start Date */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="dd-mm-yyyy"
          style={{
            padding: "8px 10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            minWidth: "150px",
            fontSize: "14px",
            height: "38px",
          }}
        />

        {/* End Date */}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="dd-mm-yyyy"
          style={{
            padding: "8px 10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            minWidth: "150px",
            fontSize: "14px",
            height: "38px",
          }}
        />

        {/* Area Selector */}
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          style={{
            padding: "8px 10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            minWidth: "150px",
            fontSize: "14px",
            height: "38px",
          }}
        >
          <option>All Areas</option>
          <option>Area 1</option>
          <option>Area 2</option>
        </select>
      </div>

      {/* Machine Cards */}
      {filteredMachines.map((machine) => (
        <div
          key={machine.id}
          style={{
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div
            onClick={() => toggleCard(machine.id)}
            style={{
              padding: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontWeight: 600,
              fontSize: "1.2rem",
              borderBottom:
                openCardId === machine.id ? "1px solid #eee" : "none",
            }}
          >
            <span>⚙️ {machine.machine.toUpperCase()} </span>
            <span>{openCardId === machine.id ? "▲" : "▼"}</span>
          </div>

          {openCardId === machine.id && (
            <div
              style={{
                display: "flex",
                padding: "20px",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
             
              <div style={{ flex: 1, minWidth: "300px" }}>
                <h4
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    width: "fit-content",
                  }}
                >
                  Graph A
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={machine.sensors}>
                    <defs>
                      <linearGradient
                        id={`colorValue-${machine.id}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      label={{
                        value: "Sensor Value",
                        angle: -90,
                        position: "insideLeft",
                        offset: 0,
                         dx:10,
                        dy: 40,
                         style: { fontWeight: "bold" }
                      
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill={`url(#colorValue-${machine.id})`}
                      name="Sensor Value"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Graph B - Bar Chart */}
              <div style={{ flex: 1, minWidth: "300px" }}>
                <h4
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    width: "fit-content",
                  }}
                >
                  Graph B
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={machine.sensors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      label={{
                        value: "Health (%)",
                        angle: -90,
                        position: "insideLeft",
                        offset: 0,
                        dx:10,
                        dy: 30,
                         style: { fontWeight: "bold" }
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="health" fill="#a389f4" name="Health" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SensorHealth;

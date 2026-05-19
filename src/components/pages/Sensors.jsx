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
  LabelList,
} from "recharts";
import "../styles/Sensor.css";
// import sensorHealthData from "../data/data";
import Papa from "papaparse";
import axios from "axios";
import { useEffect } from "react";
const API_BASE_URL = "http://localhost:8000";
const SensorHealth = () => {
  const [openCardId, setOpenCardId] = useState(null);
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [uploadedData, setUploadedData] = useState([]);
  const [sensorHealthData, setSensorHealthData] = useState([]);
  const toggleCard = (id) => {
    setOpenCardId((prevId) => (prevId === id ? null : id));
  };

  const dataSource = uploadedData.length > 0 ? uploadedData : sensorHealthData;

  const filteredMachines = dataSource.filter((machine) =>
    selectedArea === "All Areas" ? true : machine.area === selectedArea,
  );
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("CSV Data:", results.data); // 🔥 check this in console

        const formatted = [
          {
            id: 1,
            machine: file.name, // dynamic machine name
            area: "Area 1",
            sensors: results.data
              .filter((_, index) => index % 10 === 0) // 🔥 take every 10th point
              .map((row, index) => ({
                name: row.timestamp || `T${index + 1}`,

                value: Number(row["X-RMS-V 04 (mm/s)"]) / 1000 || 0,

                health: Math.max(
                  0,
                  100 - Number(row["X-RMS-V 04 (mm/s)"]) / 1000,
                ),
              })),
          },
        ];
        console.log(results.data[0]);
        setUploadedData(formatted);
      },
    });
  };
  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    try {
      const machinesRes = await axios.get(`${API_BASE_URL}/api/v1/machines`);

      const machineData = await Promise.all(
        machinesRes.data.map(async (machine, index) => {
          const trendRes = await axios.get(
            `${API_BASE_URL}/api/v1/sensors/trend?machine_id=${machine.machine_id}`,
          );

          const healthRes = await axios.get(
            `${API_BASE_URL}/api/v1/health/components?machine_id=${machine.machine_id}`,
          );

          return {
            id: index + 1,
            machine: machine.machine_id,
            area: index % 2 === 0 ? "Area 1" : "Area 2",
            sensors: trendRes.data.data.map((sensor, i) => ({
              name: sensor.sensor,
              value: sensor.value,
              health: healthRes.data.components[i]?.health || 0,
            })),
          };
        }),
      );

      setSensorHealthData(machineData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="sensor-health-wrapper"
      style={{
        padding: "8px",
        background: "#eff0f7",
        minHeight: "100vh",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div className="sensor-breadcrumb">
        Menu / <span>Sensor Health</span>
      </div>

      {/* Filter Controls */}
      {/* FILTER BAR */}

      <div className="sensor-filter-bar">
        {/* START DATE */}

        <div className="filter-input-wrapper">
          <input
            type="text"
            placeholder="Start Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="sensor-filter-input"
          />

          <span className="filter-arrow">⌄</span>
        </div>

        {/* END DATE */}

        <div className="filter-input-wrapper">
          <input
            type="text"
            placeholder="End Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="sensor-filter-input"
          />

          <span className="filter-arrow">⌄</span>
        </div>

        {/* AREA */}

        <div className="filter-input-wrapper">
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="sensor-filter-input"
          >
            <option>Select Area</option>
            <option>Area 1</option>
            <option>Area 2</option>
          </select>

          <span className="filter-arrow">⌄</span>
        </div>

        {/* DATE FILTERS */}

        <div className="filter-input-wrapper">
          <select className="sensor-filter-input">
            <option>Date Filters</option>

            <option>Today</option>

            <option>Yesterday</option>

            <option>This Week</option>

            <option>Last Week</option>

            <option>This Month</option>

            <option>Last Month</option>
          </select>

          <span className="filter-arrow">⌄</span>
        </div>
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
            <span>⚙️ MACHINE {machine.id}</span>
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
                    backgroundColor: "rgb(114, 68, 249)",
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
                          stopColor="#8979FF"
                          stopOpacity={0.3}
                        />

                        <stop
                          offset="95%"
                          stopColor="#8979FF"
                          stopOpacity={0.05}
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
                        dx: 10,
                        dy: 40,
                        style: { fontWeight: "bold" },
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8979FF"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill={`url(#colorValue-${machine.id})`}
                      name="Sensors"
                      dot={{
                        r: 3,
                        stroke: "#8979FF",
                        strokeWidth: 1,
                        fill: "#FFFFFF",
                      }}
                      activeDot={{
                        r: 4,
                        fill: "#8979FF",
                        stroke: "#FFFFFF",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Graph B - Bar Chart */}
              <div style={{ flex: 1, minWidth: "300px" }}>
                <h4
                  style={{
                    color: "white",
                    backgroundColor: "rgb(114, 68, 249)",
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
                        dx: 10,
                        dy: 30,
                        style: { fontWeight: "bold" },
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="health"
                      fill="#8979FF"
                      name="Health"
                      barSize={80}
                      radius={[0, 0, 0, 0]}
                    >
                      <LabelList
                        dataKey="health"
                        position="top"
                        fontSize={13}
                        fill="#666"
                      />
                    </Bar>
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

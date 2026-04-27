import React, { useState } from "react";
import "../styles/Configuration.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import settings from "../assets/settings.png";
import { useNavigate } from "react-router-dom";

const machines = [
  "MACHINE 1",
  "MACHINE 2",
  "MACHINE 3",
  "MACHINE 4",
  "MACHINE 5",
  "MACHINE 6",
];

const ConfigurationPage = () => {
  const [activeMachine, setActiveMachine] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  const [nextDate, setNextDate] = useState(null);

  const [thresholds, setThresholds] = useState(
    machines.map(() => ({
      upper: [0, 0, 0, 0],
      lower: [0, 0, 0, 0],
    })),
  );
  const navigate = useNavigate();
  const toggleMachine = (index) => {
    setActiveMachine(activeMachine === index ? null : index);
  };

  const handleThresholdChange = (machineIndex, type, sensorIndex, value) => {
    const updated = [...thresholds];
    updated[machineIndex][type][sensorIndex] = value;
    setThresholds(updated);
  };

  const incrementThreshold = (machineIndex, type, sensorIndex) => {
    handleThresholdChange(
      machineIndex,
      type,
      sensorIndex,
      thresholds[machineIndex][type][sensorIndex] + 1,
    );
  };

  const decrementThreshold = (machineIndex, type, sensorIndex) => {
    handleThresholdChange(
      machineIndex,
      type,
      sensorIndex,
      Math.max(0, thresholds[machineIndex][type][sensorIndex] - 1),
    );
  };

  const renderSensorInputs = (machineIndex, type) => (
    <div className="sensor-row">
      {thresholds[machineIndex][type].map((value, sensorIndex) => (
        <div className="sensor-group">
          <div className="sensor-box">
            <span className="sensor-label">Sensor {sensorIndex + 1}</span>

            <div className="sensor-input">
              <input
                type="number"
                value={value}
                onChange={(e) =>
                  handleThresholdChange(
                    machineIndex,
                    type,
                    sensorIndex,
                    parseInt(e.target.value) || 0,
                  )
                }
              />
              <div className="stepper">
                <button
                  onClick={() =>
                    decrementThreshold(machineIndex, type, sensorIndex)
                  }
                >
                  −
                </button>
                <button
                  onClick={() =>
                    incrementThreshold(machineIndex, type, sensorIndex)
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="configuration-page">
      <div className="config-header">
        <div className="breadcrumb">
          {/* Menu / <span>Configuration</span> */}
        </div>

       <button
  className="history-btn"
  onClick={() => navigate("/dashboard/history")}
>
  ⟲ Check History
</button>
      </div>
      {machines.map((machine, index) => (
        <div
          className={`machine-cards ${activeMachine === index ? "active" : ""}`}
          key={index}
        >
          <div className="machine-headers" onClick={() => toggleMachine(index)}>
            <div className="machine-title">
              <span className="machine-label">
                <img src={settings} alt="icon" className="machine-icon" />
                {machine}
              </span>
              <span className="arrow">
                {activeMachine === index ? "▲" : "▼"}
              </span>
            </div>
          </div>

          {activeMachine === index && (
            <div className="machine-body">
              <div className="date-inputs">
                <div className="date-box">
                  <span className="sensor-label">Last Maintenance Date</span>
                  <DatePicker
                    selected={lastDate}
                    onChange={(date) => setLastDate(date)}
                    className="date-input"
                    placeholderText="dd/mm/yyyy"
                  />
                </div>

                <div className="date-box">
                  <span className="sensor-label">
                    Next Scheduled Maintenance
                  </span>
                  <DatePicker
                    selected={nextDate}
                    onChange={(date) => setNextDate(date)}
                    className="date-input"
                    placeholderText="dd/mm/yyyy"
                  />
                </div>
              </div>

              <div className="threshold-block">
                <h4>Upper Threshold Value</h4>
                {renderSensorInputs(index, "upper")}
              </div>

              <div className="threshold-block">
                <h4>Lower Threshold Value</h4>
                {renderSensorInputs(index, "lower")}
              </div>

              <button className="update-btn">Update</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConfigurationPage;

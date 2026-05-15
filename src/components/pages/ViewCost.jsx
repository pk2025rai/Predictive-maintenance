import React from "react";
import "../styles/ViewCost.css";
import { FaClock, FaTools } from "react-icons/fa";
import { MdBuild, MdAccessTime } from "react-icons/md";

const ViewCost = () => {
  const spareParts = [
    { description: "Washing Section", cost: "00" },
    { description: "Washing Section", cost: "00" },
    { description: "Washing Section", cost: "00" },
    { description: "Washing Section", cost: "00" },
    { description: "Washing Section", cost: "00" },
    { description: "Washing Section", cost: "00" },
  ];

  const serviceCosts = [
    { description: "Washing Section", cost: "00" },
    { description: "Washing Section", cost: "00" },
    { description: "Washing Section", cost: "00" },
    { description: "Washing Section", cost: "00" },
    { description: "Washing Section", cost: "00" },
    { description: "Washing Section", cost: "00" },
  ];

  return (
    <div className="viewcost-container">
      <div className="viewcost-content">
        <div className="machine-equipment">
          <div>
            <p className="label">Machine -</p>
            <h3>MC1</h3>
          </div>

          <div>
            <p className="label">Equipment -</p>
            <h3>Motor</h3>
          </div>
        </div>

        <div className="status-container">
          <div className="status-box">
            <FaClock className="icon red" />

            <div>
              <p className="status-title">Last Failure</p>

              <h4 className="red-text">14 May 2026, 06:10 AM</h4>
            </div>
          </div>

          <div className="status-box">
            <FaTools className="icon gray" />

            <div>
              <p className="status-title">Last Maintenance</p>

              <h4>01 May 2026</h4>
            </div>
          </div>

          <div className="status-box">
            <MdBuild className="icon gray" />

            <div>
              <p className="status-title">Next Maintenance</p>

              <h4 className="green-text">01 Aug 2026</h4>
            </div>
          </div>

          <div className="status-box">
            <MdAccessTime className="icon gray" />

            <div>
              <p className="status-title">Predicted Failure Time</p>

              <h4>
                28 Jun 202, <span className="red-text">11:30 PM</span>
              </h4>
            </div>
          </div>
        </div>

        <div className="table-section">
          <div className="table-card">
            <div className="table-header">Spare Part Cost</div>

            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Cost</th>
                </tr>
              </thead>

              <tbody>
                {spareParts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-card">
            <div className="table-header">Service Cost</div>

            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Cost</th>
                </tr>
              </thead>

              <tbody>
                {serviceCosts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCost;

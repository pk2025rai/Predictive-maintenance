import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Homepage from "./components/pages/Homepage";
import Sensors from "./components/pages/Sensors";
import Configuration from "./components/pages/Configuration";
import Usermanagement from "./components/pages/Usermanagement";
import Login from "./components/Login/Login";
import './App.css'
import HistoryPage from "./components/pages/History";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route index element={<Homepage />} />
          <Route path="sensors" element={<Sensors />} />
          <Route path="configuration" element={<Configuration />} />
          <Route path="user-management" element={<Usermanagement />} />
        </Route> */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Homepage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="sensors" element={<Sensors />} />
          <Route path="config" element={<Configuration />} />
          <Route path="users" element={<Usermanagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

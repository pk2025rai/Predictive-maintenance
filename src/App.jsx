import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/pages/Dashboard'
import Homepage from './components/pages/Homepage'
import Sensors from './components/pages/Sensors'
import Configuration from './components/pages/Configuration'
import Usermanagement from './components/pages/Usermanagement'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Homepage />} />
          <Route path="sensors" element={<Sensors />} />
          <Route path="configuration" element={<Configuration />} />
          <Route path="user-management" element={<Usermanagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

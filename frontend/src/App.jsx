import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import ServiceForm from './pages/ServiceForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<ServiceForm />} />
        <Route path="/admin/edit/:id" element={<ServiceForm />} />
      </Routes>
    </Router>
  );
}

export default App;

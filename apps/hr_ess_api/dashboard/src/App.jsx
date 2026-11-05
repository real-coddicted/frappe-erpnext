import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Leave from './components/Leave';
import Attendance from './components/Attendance';
import Salary from './components/Salary';
import Tax from './components/Tax';
import Team from './components/Team';
import Approvals from './components/Approvals';
import Profile from './components/Profile';


const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-screen"><div className="spinner"></div></div>;
  }
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />}>
              <Route path="leave" element={<Leave />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="salary" element={<Salary />} />
              <Route path="tax" element={<Tax />} />
              <Route path="team" element={<Team />} />
              <Route path="approvals" element={<Approvals />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

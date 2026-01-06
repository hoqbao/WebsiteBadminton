// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// --- IMPORT COMPONENT & LAYOUT ---
// ❌ KHÔNG import Navbar ở đây nữa
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout'; // Import Layout

// --- IMPORT PAGES ---
import Home from './pages/Home';
import Login from './pages/Login';
import CourtDetail from './pages/CourtDetail'; // Đảm bảo đúng đường dẫn file
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      {/* ⚠️ ĐÃ XÓA <Navbar /> Ở ĐÂY ĐỂ KHÔNG HIỆN TOÀN CỤC */}
      
      <Routes>
        {/* === GROUP 1: CÁC TRANG CÓ NAVBAR (Dùng MainLayout) === */}
        <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/court/:id" element={<CourtDetail />} />
            
            <Route path="/profile" element={
                <ProtectedRoute>
                    <UserProfile />
                </ProtectedRoute>
            } />
        </Route>

        {/* === GROUP 2: TRANG LOGIN (KHÔNG CÓ NAVBAR) === */}
        <Route path="/login" element={<Login />} />

        {/* === GROUP 3: ADMIN (Thường dùng Layout riêng hoặc không Navbar chính) === */}
        <Route path="/admin" element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
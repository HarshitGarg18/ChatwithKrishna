import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components ko import kar rahe hain - Path sahi check kar lena
import Login from './components/Login';
import Signup from './components/Signup';
import ChatComponent from './ChatComponent'; // Agar ye seedhe src mein hai

function App() {
  // Check karne ke liye ki user logged in hai ya nahi
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <div className="app-main-wrapper">
      <Routes>
        {/* 1. Home Path: Agar koi seedha aaye toh use login par bhej do */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 2. Login Route */}
        <Route path="/login" element={<Login />} />

        {/* 3. Signup Route */}
        <Route path="/signup" element={<Signup />} />

        {/* 4. Chat Route (Protected): Sirf logged in users ke liye */}
        <Route 
          path="/chat" 
          element={isAuthenticated() ? <ChatComponent /> : <Navigate to="/login" />} 
        />

        {/* 5. Fallback: Agar koi galat URL daale toh login par redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
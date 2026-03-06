import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Localhost ko baad mein Render ke URL se badalna hai
      const res = await axios.post('https://chatwithkrishna.onrender.com/api/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      navigate('/chat');
    } catch (err) {
      alert(err.response?.data?.message || "Login fail ho gaya!");
    }
  };

  return (
    <div className="app-container">
      <div className="auth-card">
        {/* Divine Icon aur Title card ke andar rakha hai taaki spacing sahi rahe */}
        <div className="divine-icon">🪶</div>
        <h2 className="auth-title">PRANAM<br/>PARTH</h2>
        
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">PRAVESH KAREIN</button>
        </form>
  
        <p style={{ marginTop: '25px', fontSize: '14px', textAlign: 'center' }}>
          Naye hain? <Link to="/signup" style={{ color: 'var(--divine-orange)', fontWeight: 'bold', textDecoration: 'none' }}>Naya khata banayein</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
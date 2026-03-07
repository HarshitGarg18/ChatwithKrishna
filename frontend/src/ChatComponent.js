import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Typewriter from './components/Typewriter'; 

const API_BASE = "https://chatwithkrishna.onrender.com/api";

function ChatComponent() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user?.name || "Parth";

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Fetch chat history
  useEffect(() => {

    const fetchHistory = async () => {
      try {

        const res = await axios.get(`${API_BASE}/krishna/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const historyData = res.data.reverse().flatMap(chat => [
          { role: 'user', text: chat.prompt, isOld: true },
          { role: 'krishna', text: chat.response, isOld: true }
        ]);

        setMessages(historyData);

      } catch (err) {

        if (err.response?.status === 401) {
          handleLogout();
        }

      }
    };

    if (token) {
      fetchHistory();
    } else {
      navigate('/login');
    }

  }, [token, navigate]);



  const handleSend = async (e) => {

    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      text: input,
      isOld: false
    };

    setMessages(prev => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {

      const res = await axios.post(
        `${API_BASE}/krishna/ask`,
        { prompt: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const krishnaMessage = {
        role: 'krishna',
        text: res.data.krishnaGuidance,
        isOld: false
      };

      setMessages(prev => [...prev, krishnaMessage]);

    } catch (err) {

      setMessages(prev => [
        ...prev,
        {
          role: 'krishna',
          text: "Kshama karein, Parth. Sampark toot gaya hai.",
          isOld: false
        }
      ]);

    } finally {

      setLoading(false);

    }

  };


  const divineBgStyle = {
    position: 'relative',
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    backgroundImage: `linear-gradient(rgba(255, 250, 240, 0.85), rgba(255, 250, 240, 0.85)), url(${process.env.PUBLIC_URL + '/krishna_bg.jpg'})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'local'
  };


  return (

    <div className="app-container">

      <header className="header">

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🪶</span>

          <div>
            <h1 style={{ margin: 0, fontSize: '1.2rem' }}>
              KRISHNA SAMVAD
            </h1>
            <small>Pranam, {userName} (Arjun)</small>
          </div>

        </div>

        <button onClick={handleLogout} className="logout-btn">
          LOGOUT
        </button>

      </header>



      <div className="chat-window" style={divineBgStyle}>

        {messages.length === 0 && !loading && (

          <div style={{ textAlign: 'center', marginTop: '50px', color: '#999' }}>
            "Apne man ka bhay tyaago, {userName}. Pucho jo puchna hai."
          </div>

        )}



        {messages.map((msg, i) => (

          <div
            key={i}
            className={`message ${msg.role === 'user' ? 'user-message' : 'krishna-message'}`}
          >

            <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px', opacity: 0.7 }}>
              {msg.role === 'user' ? userName.toUpperCase() : 'KRISHNA'}
            </div>

            <div style={{ fontSize: '15px' }}>
              {msg.role === 'krishna' && !msg.isOld
                ? <Typewriter text={msg.text} />
                : msg.text}
            </div>

          </div>

        ))}



        {loading && (

          <div style={{ alignSelf: 'flex-start', color: '#ea580c', fontStyle: 'italic', padding: '10px' }}>
            Krishna is thinking...
          </div>

        )}

        <div ref={chatEndRef} />

      </div>



      <form onSubmit={handleSend} className="input-area">

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Apna sandeh kahein..."
        />

        <button type="submit" disabled={loading}>
          BHEJEIN
        </button>

      </form>

    </div>

  );

}

export default ChatComponent;
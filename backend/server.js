require('dotenv').config();
const express = require('express');

const cors = require('cors');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes');



connectDB();

const app = express();


app.use(express.json());
app.use(cors({
    origin: "chat-with-krishna-alpha.vercel.app",
    credentials : true
  }));

app.get('/', (req, res) => {
    res.send('Krishna AI Server is Running...');
});



app.use('/api/auth', authRoutes);     
app.use('/api/krishna', chatRoutes);  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
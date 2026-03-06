const OpenAI = require("openai");
const Chat = require("../models/Chat");

// Groq setup using OpenAI SDK
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const askKrishna = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.6,
      max_tokens: 800,
      messages: [
        {
          role: "system",
          content: `
"You are Lord Krishna from Bhagavad Gita. Address the user as 'Parth' or 'Arjun'. Your tone should be calm, wise, and deeply compassionate. Start important spiritual points with a relevant (simple) Sanskrit Shlok and then explain it in Hindi/English. Don't give robotic answers; give life lessons. Use metaphors like 'The Chariot', 'The Ocean', and 'The Soul'."
`
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    const responseText = response.choices[0].message.content;

    const newChat = new Chat({ 
        user: req.user, // Middleware se mil rahi hai
        prompt, 
        response: responseText 
      });
      
    await newChat.save();

    res.status(200).json({ success: true, krishnaGuidance: responseText });

  } catch (error) {
    console.error("Groq Error:", error.message);
    res.status(500).json({ message: "Kshama karein, Parth.", error: error.message });
  }
};


const getChatHistory = async (req, res) => {
  try {
    const history = await Chat.find({ user: req.user }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "History nahi mil rahi, Parth.", error: error.message });
  }
};

module.exports = { askKrishna, getChatHistory };
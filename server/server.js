 

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users route
app.get('/', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});




























 

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import User from './models/User.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Signup route
// app.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User with this email already exists" });
//     }

//     const newUser = new User({ name, email, password });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Login route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     res.status(200).json({ message: 'Login successful', user });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Get all users route
// app.get('/users', async (req, res) => {
//   try {
//     const allUsers = await User.find();
//     res.status(200).json(allUsers);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

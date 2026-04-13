require("dotenv").config();

const PORT = process.env.PORT || 5000;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const noteRoutes = require('./routes/noteRoutes');


const app = express();
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

 // connectDB();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://keep-notes-olive-seven.vercel.app"
  ],
 credentials: true,
}));
app.use(express.json());
app.use("/api/users", authRoutes);
app.use("/api/notes", noteRoutes);

// Test route
app.get("/api/health", (req, res) => {
  res.json({ message: "API is running" });
});

// Database connection
     connectDB();
 mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err)); 

// Start server

app.listen(PORT, () => {
  console.log(`Server running on ${ PORT}`);
});

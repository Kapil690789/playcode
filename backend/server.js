const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth"); // Ensure this path is correct
const codeRoutes = require("./routes/code"); // Ensure this path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; // Ensure the port can be overridden by the environment

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes); // Handles authentication (SignUp/SignIn)
app.use("/api", codeRoutes); // Handles code-related operations

// Default route for root
app.get("/", (req, res) => {
  res.send("Welcome to the Playcode Backend API!");
});

// Start the server only when not in Vercel or another serverless environment
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel (or any other serverless platform)
module.exports = app;

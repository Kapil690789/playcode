const express = require("express");
const CodeSnippet = require("../models/CodeSnippet");
const auth = require("../middleware/auth");
const router = express.Router();

// Save code snippet
router.post("/save", auth, async (req, res) => {
    console.log("Save request received:", req.body); // Add a log to check request body
    try {
      const { code } = req.body;
      const newSnippet = new CodeSnippet({ code, userId: req.userId });
      await newSnippet.save();
      res.status(201).json({ message: "Code saved successfully!" });
    } catch (err) {
      console.error("Error saving code:", err); // Log error for debugging
      res.status(500).json({ error: "Failed to save code" });
    }
  });
  

// Fetch user's code snippets
router.get("/code", auth, async (req, res) => {
  try {
    const snippets = await CodeSnippet.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(snippets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch code snippets" });
  }
});

// Export the router
module.exports = router; // Ensure this is at the end of the file
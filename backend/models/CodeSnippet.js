const mongoose = require("mongoose");

const codeSnippetSchema = new mongoose.Schema({
  code: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CodeSnippet", codeSnippetSchema);
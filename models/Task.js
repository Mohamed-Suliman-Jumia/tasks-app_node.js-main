const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 50 },
  body: { type: String, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
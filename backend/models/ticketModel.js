const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true, default: "pendding" },
  userId: { type: String, required: true },
});

module.exports = Ticket = mongoose.model("Ticket", ticketSchema);

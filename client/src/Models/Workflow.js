const mongoose = require("mongoose")

const workflowSchema = new mongoose.Schema({
  name: String,
  type: String,
  version: Number,
  status: String,
  startedBy: String,
  startDate: String,
  endDate: String,
  is_active: Boolean
})

module.exports = mongoose.model("Workflow", workflowSchema)
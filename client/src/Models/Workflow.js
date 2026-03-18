const mongoose = require('mongoose')

const WorkflowSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  version:     { type: Number, default: 1 },
  is_active:   { type: Boolean, default: true },
  input_schema:{ type: Object, default: {} },
  start_step_id: { type: String, default: '' },
  created_at:  { type: Date, default: Date.now }
})

module.exports = mongoose.model('Workflow', WorkflowSchema)
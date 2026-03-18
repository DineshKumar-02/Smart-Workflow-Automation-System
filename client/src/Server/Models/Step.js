const mongoose = require('mongoose')

const StepSchema = new mongoose.Schema({
  workflow_id: { type: String, required: true },
  name:        { type: String, required: true },
  step_type:   { type: String, enum: ['task','approval','notification'], default: 'task' },
  order:       { type: Number, default: 1 },
  metadata:    { type: Object, default: {} },
  created_at:  { type: Date, default: Date.now }
})

module.exports = mongoose.model('Step', StepSchema)
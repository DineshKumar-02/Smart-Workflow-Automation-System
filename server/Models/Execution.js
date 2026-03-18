// const mongoose = require('mongoose')

// const ExecutionSchema = new mongoose.Schema({
//   workflow_id:  { type: String, required: true },
//   status:       { type: String, default: 'pending' },
//   data:         { type: Object, default: {} },
//   logs:         { type: Array,  default: [] },
//   triggered_by: { type: String, default: 'user' },
//   started_at:   { type: Date,   default: Date.now }
// })

// module.exports = mongoose.model('Execution', ExecutionSchema)


const mongoose = require('mongoose')

const ExecutionSchema = new mongoose.Schema({
  workflow_id:  { type: String, required: true },
  status:       { type: String, default: 'pending' },
  data:         { type: Object, default: {} },
  logs:         { type: Array,  default: [] },
  triggered_by: { type: String, default: 'user' },
  started_at:   { type: Date,   default: Date.now }
})

module.exports = mongoose.model('Execution', ExecutionSchema)
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/flowforge')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err))

// Routes
app.use('/api/workflows', require('./routes/workflowRoutes'))

app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'))
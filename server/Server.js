const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/flowforge')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err))

app.use('/api/workflows', require('./routes/workflowRoutes'))

app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'))
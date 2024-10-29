const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();
const app = express()
app.use(cors())
const port = 2000
app.use(express.json());
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/todo', require('./routes/todo'))
app.use('/api/expense', require('./routes/expense'))
app.use('/uploads', express.static('uploads'))


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
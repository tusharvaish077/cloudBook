const connectToMongo = require('./db');
const express = require('express') 
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000   



app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// Available routes
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Cloudbook app is running on port ${port}`)
})
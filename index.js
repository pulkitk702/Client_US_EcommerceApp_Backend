const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');
app.use(cors());
const client = require('./db');
app.use(express.json());

const userRoutes =require('./routes/userRoutes')
app.use('/api/users',userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

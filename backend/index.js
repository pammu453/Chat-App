const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: "https://fantastic-seahorse-9c7a99.netlify.app",
}));
app.use(bodyParser.json());

const chatRoutes = require('./routes/chat.js');
app.use('/api/chat', chatRoutes);

// app.use(express.static(path.join(__dirname, '/frontend/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

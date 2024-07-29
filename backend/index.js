const express = require('express');
const connectToMongo = require('./db'); 
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); // Import the fs module
const cors = require('cors');

const app = express();
const port = 5000;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));


// Connect to MongoDB
connectToMongo();

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON');
    return res.status(400).send({ error: 'Invalid JSON' });
  }
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/images', require('./routes/images'));

app.listen(port, () => {
  console.log(` Dear Diary backend App listening on port ${port}`);
});

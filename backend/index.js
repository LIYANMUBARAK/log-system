const express = require('express');
const cors = require('cors');
const logRoutes = require('./routes/logs');
const rateLimit = require('express-rate-limit');
const app = express();

const PORT = 3000;


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // 30 reqs
  message: "Too many requests, please try again later.",
});

app.use(limiter);

app.use(cors());
app.use(express.json());
app.use('/logs', logRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

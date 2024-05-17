/*const express = require('express');
const mysql = require('./database');
const app = express();
const port = 3000;


// Serve the static HTML file
app.use(express.static('public'));

// SSE endpoint
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendUpdates = () => {
    mysql.query('SELECT * FROM Encomendas', (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
        return;
      }

      res.write(`data: ${JSON.stringify(results)}\n\n`);
    });
  };

  // Send updates every 10 seconds
  const intervalId = setInterval(sendUpdates, 10000);

  // Clear interval when client closes connection
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/

const express = require('express');
const path = require('path');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/api/products', (req, res) => {
    pool.query('SELECT * FROM Produtos', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

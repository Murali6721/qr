const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// Middleware to parse JSON data
app.use(bodyParser.json());

// MySQL Connection Configuration
const db = mysql.createConnection({
    host: 'root@localhost:3306',
    user: 'muralidhar',
    password: 'Murali@6721',
    database: 'db',
  });
  
  // Test the database connection
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database!');
  });

// Endpoint to handle data sent from the frontend
app.post('/location', (req, res) => {
    const { timestam, latitude, longitude } = req.body;
        // Insert the data into the 'products' table
        const sqlQuery = 'INSERT INTO location (timestam, latitude, longitude) VALUES (?, ?, ?)';
        const values = [timestam, latitude, longitude];

        db.query(sqlQuery, values, (err, result) => {
            
            if (err) {
                console.error('Error storing data in the database:', err);
                res.status(500).json({ error: "An error occurred while storing data." });
            } else {
                console.log('Data stored in the database:', {
                    timestam: timestam,
                    latitude: latitude,
                    longitude: longitude
                });
                res.json({ message: "Data stored successfully!" });
            }
        });
});


app.get('/location', (req, res) => {
    // Fetch all product data from the database
    const sql = 'SELECT * FROM location';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(200).json(results);
    });
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow requests from the frontend
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'test', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/counter', (req, res) => {
    const query = 'SELECT Counter FROM testc WHERE id = 1';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching counter:', err);
            res.status(500).send(err);
        } else if (result.length === 0) {
            res.status(404).json({ error: 'Counter not found' });
        } else {
            res.json({ value: result[0].Counter }); // Access the 'Counter' column from the result
        }
    });
});

// API to update the counter value
app.post('/counter', (req, res) => {
    const { value } = req.body;
    const query = 'UPDATE testc SET Counter = ? WHERE id = 1';
    db.query(query, [value], (err) => {
        if (err) {
            console.error('Error updating counter:', err);
            res.status(500).send(err);
        } else {
            res.send('Counter updated successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

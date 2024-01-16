const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 're_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (error, results) => {
        if (error) throw error;
        res.status(201).send('User registered');
      }
    );
});
  
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      async (error, results) => {
        if (error) throw error;
  
        if (results.length > 0) {
          const match = await bcrypt.compare(password, results[0].password);
  
          if (match) {
            const token = jwt.sign({ username }, 'your_secret_key', {
              expiresIn: '1h'
            });
            res.json({ token });
          } else {
            res.status(401).send('Invalid credentials');
          }
        } else {
          res.status(401).send('Invalid credentials');
        }
      }
    );
});


app.post('/api/reset-password', async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  // ตรวจสอบรหัสผ่านเดิม
  pool.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (error, results) => {
      if (error) throw error;

      if (results.length > 0) {
        const match = await bcrypt.compare(oldPassword, results[0].password);

        if (match) {
          // เปลี่ยนรหัสผ่านใหม่
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          pool.query(
            'UPDATE users SET password = ? WHERE username = ?',
            [hashedPassword, username],
            (error) => {
              if (error) throw error;
              res.status(200).send('Password reset successful');
            }
          );
        } else {
          res.status(401).send('Invalid old password');
        }
      } else {
        res.status(401).send('User not found');
      }
    }
  );
});

app.listen(port, () => {
    console.log('Server is running');
});
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Secret key for JWT
const secretKey = 'your-secret-key';

// Dummy user data
const users = [
  { id: 1, username: 'admin', password: 'adminpassword' },
  { id: 2, username: 'user', password: 'userpassword' }
];

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected data' });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
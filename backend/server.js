
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = 'jsonwebtoken'); // Corrected: const jwt = require('jsonwebtoken'); - This will be fixed in the next step as it's a thinking process artifact.

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory store for users (replace with a database in production)
const users = [];

// IMPORTANT: Use an environment variable for JWT_SECRET in production!
const JWT_SECRET = 'your-very-secure-and-super-secret-key-please-change-me';

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// --- Authentication Routes ---

// Register new user
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }


  try {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10
    const newUser = { id: Date.now().toString(), email, password: hashedPassword };
    users.push(newUser);

    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ 
      token, 
      user: { email: newUser.email } 
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials. Password incorrect.' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ 
      token, 
      user: { email: user.email } 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

app.get('/', (req, res) => {
  res.send('MedLink Backend API is running!');
});


app.listen(PORT, () => {
  console.log(\`Backend server running on http://localhost:\${PORT}\`);
  console.log('Current registered users (for debugging):', users);
});

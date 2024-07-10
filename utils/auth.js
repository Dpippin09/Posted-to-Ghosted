const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Path to a JSON file for storing user data (for demonstration purposes)
const USERS_FILE = path.join(__dirname, 'users.json');

// Helper function to read users data
function readUsersData() {
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}

// Helper function to write users data
function writeUsersData(data) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsersData();

  // Check if user already exists
  if (users.some(user => user.username === username)) {
    return res.status(400).send('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 8);

  // Add new user
  users.push({ username, password: hashedPassword });
  writeUsersData(users);

  res.send('User registered successfully');
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsersData();

  // Find user
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).send('User not found');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid credentials');
  }

  res.send('User logged in successfully');
});

module.exports = router;
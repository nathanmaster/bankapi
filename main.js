const express = require('express');
const bodyParser = require('body-parser');
const Bank = require('./bank');

const app = express();
const port = 3000;

const users = new Map();
const accounts = [];
let id = 0; 

app.use(bodyParser.json());

//GET users
app.get('/users', (req, res) => {
  res.json([...users.values()]); // Convert Map values to an array for response
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  console.log('Received ID:', req.params.id);
  const userId = parseInt(req.params.id);
  const user = users.get(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST user
app.post('/users', (req, res) => {
  const newUser = {
    id: ++id,
    ...req.body
  };
  users.set(newUser.id, newUser); // Use set() to add to the Map
  console.log('New user created:', newUser);
  res.status(201).json(newUser);
});

// GET accounts
app.get('/accounts', (req, res) => {
  res.json(accounts);
});

// GET account by ID
app.get('/accounts/:id', (req, res) => {
  const account = accounts.find(a => a.id === req.params.id);
  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }
  res.json(account);
});

// POST account
app.post('/accounts', (req, res) => {
    const userId = req.body.id;
    const user = users.get(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  const newAccount = {
    id: ++id,
    userId: user.id,
    balance: 0
  };
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
import express from 'express';
import pkg from 'body-parser';
import Bank from './bank.js';

const { json } = pkg;
const app = express();
const port = 3000;

/*
const users = new Map();
const accounts = [];
let id = 0; 
*/

const bank = new Bank();

app.use(json());

//GET users
app.get('/users', (req, res) => {
  res.json(bank.getAllUsers()); // Convert Map values to an array for response
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = bank.getUser(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST user
app.post('/users', (req, res) => {
  try {
    const newUser = bank.createUser(req.body);
    //console.log('New user created: ', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  /*
  users.set(newUser.id, newUser); // Use set() to add to the Map
  console.log('New user created:', newUser);
  res.status(201).json(newUser);
  */
});

//DELETE user by id
app.delete('/user/:id', (req, res) => {
  const accountId = parseInt(req.params.id);
  if (bank.deleteUser(userId)) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'User not found'});
  }
})

// GET accounts
app.get('/accounts', (req, res) => {
  res.json(bank.getAllAccounts());
});

// GET account by ID
app.get('/accounts/:id', (req, res) => {
  const account = bank.getAccount(req.params.id);
  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }
  res.json(account);
});

// POST account
app.post('/accounts', (req, res) => {
  const userId = req.body.id;
  try {
    const newAccount = bank.createAccount(userId);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  /*
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
  */
});

//DELETE acocunt by id
app.delete('/accounts/:id', (req, res) => {
  const accountId = parseInt(req.params.id);
  if (bank.deleteAccount(accountId)) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Account not found'});
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
import express from 'express';
import pkg from 'body-parser';
import Bank from './bank.js';

const { json } = pkg;
const app = express();
const port = 3000;

const bank = new Bank();

app.use(json());

// GET users
app.get('/users', (req, res) => {
  res.json(bank.getAllUsers());
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
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  if (bank.deleteUser(userId)) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// GET accounts
app.get('/accounts', (req, res) => {
  res.json(bank.getAllAccounts());
});

// GET account by ID
app.get('/accounts/:id', (req, res) => {
  const accountId = parseInt(req.params.id);
  const account = bank.getAccount(accountId);
  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }
  res.json(account);
});

// POST account
app.post('/accounts', (req, res) => {
  const { userId, type, initialBalance } = req.body;
  if (!userId || !type) {
    return res.status(400).json({ error: 'User ID and account type are required' });
  }
  try {
    const newAccount = bank.createAccount(userId, type, initialBalance);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE account by ID
app.delete('/accounts/:id', (req, res) => {
  const accountId = parseInt(req.params.id);
  if (bank.deleteAccount(accountId)) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Account not found' });
  }
});

// GET total accounts and balance for a specific user
app.get('/users/:id/summary', (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const totalAccounts = bank.getTotalAccountsForUser(userId);
    const totalBalance = bank.getTotalBalanceForUser(userId);
    res.json({ totalAccounts, totalBalance });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

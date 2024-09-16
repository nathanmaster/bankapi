const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bank', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Parse request bodies
app.use(bodyParser.json());

// Define models
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const accountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  balance: Number
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

// Define endpoints
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

app.get('/accounts', async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
});

app.get('/accounts/:id', async (req, res) => {
  const account = await Account.findById(req.params.id);
  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }
  res.json(account);
});

app.post('/accounts', async (req, res) => {
  const account = new Account(req.body);
  await account.save();
  res.status(201).json(account);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
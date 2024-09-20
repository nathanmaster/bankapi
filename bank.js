export default class Bank {
  constructor() {
    this.users = new Map();
    this.accounts = [];
    this.id = 0; // To generate unique IDs
  }
  
  //create user
  createUser(userData) {
    const newUser = {
      id: ++this.id,
      ...userData,
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  //user getters

  getUser(userId) {
    return this.users.get(userId);
  }

  getAllUsers() {
    return [...this.users.values()]; // Convert Map values to an array
  }

  //delete user
  deleteUser(userId) {
      if (this.users.delete(userId)) {
          this.accounts = this.accounts.filter(a => a.userId !== userId)
          return true;
      }
      return false;
  }

  //create account
  createAccount(userId) {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newAccount = {
      id: ++this.id,
      userId,
      balance: 0,
    };
    this.accounts.push(newAccount);
    return newAccount;
  }

  //account getters

  getAccount(accountId) {
    return this.accounts.find(a => a.id === accountId);
  }

  getAllAccounts() {
    return this.accounts;
  }

  //delete account
  deleteAccount(accountId) {
      const index = this.accounts.findIndex(a => a.id === accountId);
      if (index !== -1) {
          this.accounts.solice(index, 1);
          return true;
      }
      return false;
  }
};

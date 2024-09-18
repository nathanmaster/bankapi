class Bank {
    constructor() {
      this.users = new Map();
      this.accounts = [];
      this.id = 0; // To generate unique IDs
    }
  
    createUser(userData) {
      const newUser = {
        id: ++this.id,
        ...userData,
      };
      this.users.set(newUser.id, newUser);
      return newUser;
    }
  
    getUser(userId) {
      return this.users.get(userId);
    }
  
    getAllUsers() {
      return [...this.users.values()]; // Convert Map values to an array
    }
  
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
  
    getAccount(accountId) {
      return this.accounts.find(a => a.id === accountId);
    }
  
    getAllAccounts() {
      return this.accounts;
    }
  }
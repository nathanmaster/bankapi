class Bank {
  constructor() {
      this.users = new Map();
      this.accounts = [];
      this.userIdCounter = 0;
      this.accountIdCounter = 0;
  }

  createUser(userData) {
      const newUser = {
          id: ++this.userIdCounter,
          ...userData,
          accounts: []
      };
      this.users.set(newUser.id, newUser);
      return newUser;
  }

  getAllUsers() {
      return Array.from(this.users.values());
  }

  getUser(userId) {
      return this.users.get(userId);
  }

  deleteUser(userId) {
      return this.users.delete(userId);
  }

  createAccount(userId, type, initialBalance = 0) {
      const user = this.getUser(userId);
      if (!user) {
          throw new Error('User not found');
      }
      const newAccount = {
          id: ++this.accountIdCounter,
          userId,
          type,
          balance: initialBalance
      };
      this.accounts.push(newAccount);
      user.accounts.push(newAccount.id);
      return newAccount;
  }

  getAllAccounts() {
      return this.accounts;
  }

  getAccount(accountId) {
      return this.accounts.find(account => account.id === accountId);
  }

  deleteAccount(accountId) {
      const accountIndex = this.accounts.findIndex(account => account.id === accountId);
      if (accountIndex === -1) {
          return false;
      }
      const account = this.accounts[accountIndex];
      const user = this.getUser(account.userId);
      user.accounts = user.accounts.filter(id => id !== accountId);
      this.accounts.splice(accountIndex, 1);
      return true;
  }

  getTotalAccountsForUser(userId) {
      const user = this.getUser(userId);
      if (!user) {
          throw new Error('User not found');
      }
      return user.accounts.length;
  }

  getTotalBalanceForUser(userId) {
      const user = this.getUser(userId);
      if (!user) {
          throw new Error('User not found');
      }
      return user.accounts.reduce((total, accountId) => {
          const account = this.getAccount(accountId);
          return total + (account ? account.balance : 0);
      }, 0);
  }
}

export default Bank;

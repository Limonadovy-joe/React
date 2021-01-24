import {User} from "./BankUser";
import {
  Account,
  AccountType,
  Transaction,
  LoginSuccessState,
  LoginFailedState,
  LoginState,
  LoginStatus
} from "./Account";


abstract class BankAccount implements Account {
  protected _amount: number;
  protected accountType: AccountType;
  protected _password: string;
  protected _login: LoginStatus | null = null;

  constructor(amount: number, accountType: AccountType, password: string) {
    this._amount = amount;
    this.accountType = accountType;
    this._password = password;
  }


  printAccountBalance() {
    console.log(`account-type: ${this.accountType}, account-balance: ${this._amount}`);
  }


  protected _notifyAboutLogin(loginState: LoginState): void {
    switch (loginState.state) {
      case "success":
        return alert(`success logged - info: ${loginState.description.loginName}, ${loginState.description.loginDate}`);
      case "failed":
        return alert(`failed to log - info: ${loginState.cause}, state: ${loginState.state}`);
    }
  }


  protected _setLoginStatus(loginState: LoginState): void {
    switch (loginState.state) {
      case "success":
        this._login = "logged";
        break;
      case "failed":
        this._login = "anonymous";
        break;
    }
  }

  login(password: string): void {

    if (password !== this._password) {
      const loginState: LoginFailedState = {
        state: 'failed',
        cause: 'user entered incorrect password',
      };
      this._setLoginStatus(loginState);
      this._notifyAboutLogin(loginState);
    } else {
      const loginState: LoginSuccessState = {
        state: "success",
        description: {
          loginDate: new Date(),
          loginName: 'test',
        }
      }
      this._setLoginStatus(loginState);
      this._notifyAboutLogin(loginState);
    }
  }


  receiveMoney(data: Transaction) {
    this._amount += data.amount;
    console.log(`Money has been received in amount: ${data.amount},
     sender: ${data.dispatcher}, date: ${data.date.toLocaleDateString()}`);
  }


  protected _checkAccountBalance(amountSending: number) {

    if (amountSending < 0) {
      throw new Error('you have to enter value that is greater or equal your account balance');
    }
    const difference: number = this._amount - amountSending;
    if (difference < 0) {
      throw new Error(`you dont have enough money to execute transmit.
      Account-balance: ${this._amount}
      sending-amount: ${amountSending}
      `);
    }
  }

  protected _checkLoginStatus(): void {
    if (this._login !== "logged") {
      throw new Error('user is not logged in');
    }
  }

  transmitMoney(recipient: User, amount: number): void {

    try {
      this._checkLoginStatus();
    } catch (e) {
      if (e instanceof Error) {
        console.log(e, e.message);
      } else {
        throw e;
      }
    }

    try {
      this._checkAccountBalance(amount);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e, e.message);
        return;
      } else {
        throw e;
      }
    }
    const transactionInfo: Transaction = {
      amount: amount,
      date: new Date(),
      dispatcher: 'test',
    };
    recipient.account.receiveMoney(transactionInfo);
    this._amount -= amount;
  }
}


export {BankAccount};

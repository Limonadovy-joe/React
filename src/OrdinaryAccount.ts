import {BankAccount} from "./BankAccount";
import {AccountType, LoginState, LoginStatus, Transaction} from "./Account";
import {User} from "./BankUser";

export interface AccountBasic {
  borrowMoney(amount: number): void;
}

class OrdinaryAccount extends BankAccount implements AccountBasic {
  _login: LoginStatus = "anonymous";

  constructor(amount: number, accountType: AccountType, password: string) {
    super(amount, accountType, password);
  }


  protected _checkAccountBalance(amountSending: number) {
    super._checkAccountBalance(amountSending);
  }

  login(password: string) {
    super.login(password);
  }

  receiveMoney(data: Transaction) {
    super.receiveMoney(data);
  }

  transmitMoney(recipient: User, amount: number) {
    super.transmitMoney(recipient, amount);
  }

  protected _setLoginStatus(loginState: LoginState) {
    super._setLoginStatus(loginState);
  }

  protected _checkLoginStatus() {
    super._checkLoginStatus();
  }

  printAccountBalance() {
    super.printAccountBalance();
  }

  protected _notifyAboutLogin(loginState: LoginState) {
    super._notifyAboutLogin(loginState);
  }

  //non-derivated
  borrowMoney(amount: number): void {
    this._amount += Math.abs(amount);
  }
}

export {OrdinaryAccount};

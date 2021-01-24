import {BankAccount} from "./BankAccount";
import {AccountType, LoginStatus, Transaction} from "./Account";
import {LoginState} from "./Account";
import {User} from "./BankUser";

export type AmountSavePercentage = 15 | 20 | 30;

export interface AccountSaver {
  saveMoney(amount: number, percentageSave: AmountSavePercentage): void;
};


class SavingsAccount extends BankAccount implements AccountSaver {
  private _amountSaved: number = 0;
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
  _calcSavedPercentage(income: number, percentageSave: AmountSavePercentage): number {

    switch (percentageSave) {
      case 15:
        return percentageSave * income;
      case 20:
        return percentageSave * income;
      case 30:
        return percentageSave * income;
    }
  }

  saveMoney(income: number, percentageSave: AmountSavePercentage) {
    const savedMoney: number = this._calcSavedPercentage(income, percentageSave);
    this._amountSaved = this._amountSaved + savedMoney;
    income = income - savedMoney;
    this._amount = this._amount + income;
  }
}

export {SavingsAccount};

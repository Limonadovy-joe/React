import {Account} from "./Account";
import {AccountBasic} from "./OrdinaryAccount";
import {AccountSaver} from "./SavingsAccount";


type AccountTypeBasic = Account & AccountBasic;
type AccountTypeSaver = Account & AccountSaver;

interface User/*<T, U>*/
{
  readonly name: string;
  account: AccountTypeBasic | AccountTypeSaver;
}

class BankUser<T extends string, U extends AccountTypeBasic | AccountTypeSaver/*Account | AccountSaver | AccountBasic*/> implements User {
  readonly name: T;
  account: U;

  constructor(name: T, account: U) {
    this.name = name;
    this.account = account;
  }
}

export {BankUser, User};

import {User} from "./BankUser";

export type AccountType = 'savings-account' | 'ordinary-account';

export interface Account {
   transmitMoney(recipient: User, amount: number): void;

  receiveMoney(data: Transaction): void;

  login(password: string): void;

  printAccountBalance(): void;
};

export type LoginStatus = 'logged' | 'anonymous';


export interface Transaction {
  amount: number;
  date: Date;
  dispatcher: string;
};


export type LoginSuccessState = {
  state: 'success',
  description: {
    loginName: string,
    loginDate: Date
  }
};

export type LoginFailedState = {
  state: 'failed',
  cause: string,
};

export type LoginState = LoginSuccessState | LoginFailedState;

export type SaveSuccessResponse = {
  state: 'success',
};

export type SaveFailedResponse = {
  state: 'failed',
  cause: string;
}

export type SaveResponse = SaveSuccessResponse | SaveFailedResponse;


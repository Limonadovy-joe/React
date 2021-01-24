// import {headline, headline___main} from './styles/main.module.css';

// import {Form} from "./numberGenerator/NumberGeneratorForm";
// import {ContainerResult} from "./numberGenerator/NumberGenerator";
// import {FormBuilder} from "./numberGenerator/FormBuilder";

import {AccountSaver, SavingsAccount } from "./SavingsAccount";
import {AccountBasic, OrdinaryAccount} from "./OrdinaryAccount";
import {Account} from "./Account";


function App() {

  // const elem: HTMLInputElement = document.querySelector('.random-generator').querySelector('input') as HTMLInputElement;
  // const elems = document.querySelector('.random-generator').querySelectorAll('input');
  // const submitBtn: HTMLButtonElement = document.querySelector('.random-generator__button-submit') as HTMLButtonElement;
  // let inputElems: Array<HTMLInputElement> = [];
  // for (let elem of elems) {
  //   let htmlInputElem: HTMLInputElement = elem as HTMLInputElement;
  //   inputElems.push(htmlInputElem);
  // }
  // const formGenerator: Form = new FormBuilder()
  //   .setInputButton(submitBtn)
  //   .setInputFields(inputElems)
  //   .build();
  // formGenerator.handleFormSubmit((data: ContainerResult) => console.log(data, `$random numbers: ${data.firstInput.randomNumber}, ${data.secondInput.randomNumber}`));
  const accountSavings: AccountSaver & Account = new SavingsAccount(10000, 'savings-account', 'jklbuzo');
  const accountBasic: AccountBasic & Account = new OrdinaryAccount(20000, 'ordinary-account', 'mast123');
  console.log(accountBasic, accountSavings);


}

export default App;


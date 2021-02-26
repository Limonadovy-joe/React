import React from "react";
import {useContext} from 'react';
import {Menu} from "./tutorial/Menu/Menu";
// import {ProductList} from "./projects/ProductList/ProductList";
// import {FilterableTaskTable} from "./projects/task-table/FilterableTaskTable";
import {GreetHeader, GreetWidget, Theme, UserType} from "./tutorial/Greet";
import {ThemeSwitcherClass} from "./projects/theme-switcher-function-components/ThemeSwitcher";
import {
  Option,
  OptionTypeCheckbox,
  OptionTypeRadio,
  OptionType
} from "./projects/custom-radio-button/RadioButtonOption";
import {CustomRadioButton} from "./projects/custom-radio-button/CustomRadioButton";

export const ThemeCtx = React.createContext<Theme>("dark");
export const UserRoleCtx = React.createContext<UserType>("Admin");


const GreetTestCtx = React.createContext<string | undefined>(undefined);

const GreetTest = () => {
  const userName = useContext(GreetTestCtx);
  return <div>Hello {userName?.toUpperCase()}</div>
}


//Type widening
// const x = 'x';
// let x1 = 'hello' as const; //typeof x1 === string
// type Test = 1 |  typeof action;

// const action = {type: 'INCREMENT'} as const; //without as const ---> {type: string}
// const value: Test = {type: 'INCREMENT'};
//
// const values = [1, 2, 3] as const;
// // values.push(3);


const options: Array<OptionType<OptionTypeCheckbox>> = [
  {
    name: 'payment',
    text: 'payment with bitcoin',
    type: 'checkbox',
    value: 'Bitcoin',
  },
  {
    name: 'payment',
    text: 'payment with credit card',
    type: 'checkbox',
    value: 'Credit Card',
  },
  {
    name: 'payment',
    text: 'payment with gold',
    type: 'checkbox',
    value: 'Gold',
  }
]

const App = (): JSX.Element => {
  return (
    <>
      <Menu/>
      <div className="container">
        {/*<FilterableTaskTable/>*/}
        <ThemeCtx.Provider value={"light"}>
          <UserRoleCtx.Provider value={'User'}>
            <GreetWidget/>
          </UserRoleCtx.Provider>
        </ThemeCtx.Provider>
        <GreetHeader/>
        <ThemeSwitcherClass/>
        <GreetTestCtx.Provider value={undefined}>
          <GreetTest/>
        </GreetTestCtx.Provider>
        <CustomRadioButton
          <OptionTypeRadio>
          headline={'Payment step:'}
          options={[
            {
              name: 'payment',
              text: 'payment with bitcoin',
              type: 'checkbox',
              value: 'Bitcoin',
            },
            {
              name: 'payment',
              text: 'payment with credit card',
              type: 'radio',
              value: 'Credit Card',
            },
            {
              name: 'payment',
              text: 'payment with gold',
              type: 'radio',
              value: 'Gold',
            }
          ]}
        />
      </div>
    </>
  );
};

export {App};


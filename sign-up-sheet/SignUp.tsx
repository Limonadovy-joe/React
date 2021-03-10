import React, {useState} from "react";
import {FormFields, SignUpForm} from "./SignUpForm";
import {SignUpList} from "./SignUpList";


export interface User {
  id: number;
  name: string;
  email: string;
}


export type HandlerFormSubmit = (data: FormFields) => void;

export const SignUp = () => {
  const [users, setUsers] = useState<Array<User>>([]);


  const _createUser: HandlerFormSubmit = ({email, name}) => {
    const user: User = {
      id: users.length + 1,
      name: email,
      email: name
    }
    setUsers(prevUsers => ([...prevUsers, user]));
  }
  const _handleFormSubmit: HandlerFormSubmit = data => _createUser(data);

  console.log(users);
  return (
    <>
      <div className='row'>
        <SignUpForm
          onFormSubmit={_handleFormSubmit}
        />
        <SignUpList
          users={users}
        />
      </div>
    </>
  );
}

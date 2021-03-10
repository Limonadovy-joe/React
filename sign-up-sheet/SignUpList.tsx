import React from "react";
import {User} from "./SignUp";

type SignUpListProps = {
  users: Array<User>
}

export const SignUpList = ({users}: SignUpListProps) => {


  return (
    <div className='mt-3 col-6'>
      <ul className='list-group'>
        <li className='list-group-item active'>Users Names:</li>
        {
          users.map(({id, name, email}) =>
            <li key={id.toString()} className='list-group-item'>{name}, {email}</li>)
        }
      </ul>
    </div>
  )
}



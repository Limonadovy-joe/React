import React, {useState, useRef} from "react";
import {HandlerFormSubmit} from "./SignUp";


type SignUpFormProps = {
  onFormSubmit: HandlerFormSubmit
}


export interface FormFields {
  name: string;
  email: string;
}

type FieldStatusValid = 'is-valid';
type FieldStatusInvalid = 'is-invalid';
type FieldStatus = FieldStatusValid | FieldStatusInvalid;

interface FieldError {
  message: string;
}

type FieldsErrorsGeneric<Fields, Error> = {
  [P in keyof Fields]: Error
}

type ValidatorLength = (input: string, condition: (input: string) => boolean) => boolean;
type FieldsErrors = FieldsErrorsGeneric<FormFields, FieldError>;

type ValidationFlag = 'was-validated' | 'needs-validation';

export const SignUpForm = ({onFormSubmit}: SignUpFormProps) => {
  const validationFlag = useRef<ValidationFlag>('needs-validation');

  const [formFields, setFormFields] = useState<FormFields>({email: '', name: ''});
  const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors>(
    {
      email: {
        message: ''
      },
      name: {
        message: ''
      }
    });


  const _handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.target.name as keyof FormFields;
    validationFlag.current = 'needs-validation';
    setFormFields(prevState => ({...prevState, [target]: evt.target.value}));
  }


  const _checkLength: ValidatorLength = (input, condition) => condition(input);

  const _validateInput: {//[p in P]: { message: string }
    <P extends keyof FormFields, V extends ValidatorLength>(fieldName: P, validator: V): { [p: string]: { message: string } }
  } =
    (fieldName, validator) => {
      const data = formFields[fieldName];
      let message = '';

      if (validator(data, input => !input.length)) {
        message = `${fieldName} Required`;
      } else if (validator(data, input => input.length < 6)) {
        message = `${fieldName} field must contain at least six characters`;
      } else if (validator(data, input => input.length > 10)) {
        message = `${fieldName} field must have 10 characters`;
      }

      return {[fieldName]: {message: message}};
    };

  const _validate = (): FieldsErrors => {
    const errorMsgName = _validateInput('name', _checkLength);
    const errorMsgEmail = _validateInput('email', _checkLength);
    const test: typeof errorMsgName = {};
    console.log(errorMsgName, errorMsgEmail);
    return {...errorMsgName, ...errorMsgEmail};
  }
  //TS2739: Type '{ [x: string]: { message: string; }; }'
  //is missing the following properties from type 'FieldsErrorsGeneric ': name, email


  const _handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    validationFlag.current = 'was-validated';
    const errorMessages: FieldsErrors = _validate();
    console.log('errorMessages', errorMessages);
    setFieldsErrors(errorMessages);

    if (errorMessages.name.message || errorMessages.email.message) return;
    onFormSubmit(formFields);
  }

  const _handleFormReset = (evt: React.MouseEvent<HTMLButtonElement>) => {
    validationFlag.current = 'needs-validation';
    setFormFields({email: '', name: ''});
    setFieldsErrors({name: {message: ''}, email: {message: ''}});
  }

  console.log('formFields', formFields);
  console.log('fieldsErrors', fieldsErrors);
  return (
    <form
      className={validationFlag.current}
      onSubmit={_handleFormSubmit}
      noValidate
    >
      <div className='col-6'>
        <label htmlFor="name">Person Name:</label>
        <input
          type="text"
          className={`form-control`}
          id='name'
          name='name'
          value={formFields.name}
          // ref={inputEl}
          minLength={6}
          maxLength={10}
          required
          onChange={_handleInputChange}
        />
        <div className={`${(fieldsErrors.name.message) ? `invalid` : `valid`}-feedback`}>
          {
            fieldsErrors.name.message || `Field name has been filled properly.`
          }
        </div>
      </div>
      <div className='col-6'>
        <label htmlFor="email">Person email:</label>
        <input
          type="email"
          className={`form-control`}
          id='email'
          name='email'
          value={formFields.email}
          // ref={inputEl}
          required
          minLength={6}
          maxLength={20}
          onChange={_handleInputChange}
        />
        <div className={`${(fieldsErrors.email.message) ? `invalid` : `valid`}-feedback`}>
          {
            fieldsErrors.email.message || `Field email has been filled properly.`
          }
        </div>
      </div>
      <div className='col-4 mt-2'>
        <button className='btn btn-primary' type='submit'>
          Submit
        </button>
        <button
          className='btn btn-dark ms-2'
          type='reset'
          onClick={_handleFormReset}
        >
          Reset Form
        </button>
      </div>
    </form>
  );
}

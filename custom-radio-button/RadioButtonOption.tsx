import * as React from "react";
import {Component} from "react";
import {PaymentMethods} from "./CustomRadioButton";


export type OptionType<Type> = Type extends | OptionTypeCheckbox | OptionTypeRadio
  ? Type
  : never;


export interface OptionTypeCheckbox extends Option {
  type: 'checkbox'
}

export interface OptionTypeRadio extends Option {
  type: 'radio'
}

export interface Option {
  name: string;
  value: PaymentMethods;
  text: string;
  type?: 'radio' | 'checkbox'
}

export type RadioButtonOptionProps = {
  name: string;
  text: string;
  value: PaymentMethods;
  selected: boolean;
  onOptionChange: (value: PaymentMethods) => void;
} & Partial<RadioButtonOptionDefaultProps>;

type RadioButtonOptionDefaultProps = Readonly<typeof radioButtonOptionDefaultProps>;

const radioButtonOptionDefaultProps = {
  type: 'radio' as 'radio' | 'checkbox'
}

export class RadioButtonOption extends Component<RadioButtonOptionProps> {
  static defaultProps = radioButtonOptionDefaultProps;


  _handleOptionChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onOptionChange(this.props.value);
  }

  render() {
    const {name, text, type, selected} = this.props;


    return (
      <div className='form-check'>
        <input
          className='form-check-input'
          type={type}
          name={name}
          id={`option${text}`}
          onChange={this._handleOptionChange}
          checked={(type === "checkbox" && selected) ? true: false}
        />
        <label
          style={{fontSize: (selected) ? '25px' : '18px', color: (selected) ? 'blueviolet' : 'black'}}
          htmlFor={`option${text}`}
        >
          {text}
        </label>
      </div>
    );
  }
}



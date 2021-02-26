import * as React from "react";
import {Component} from "react";
import {OptionTypeCheckbox, OptionTypeRadio, OptionType, RadioButtonOption} from "./RadioButtonOption";


const PaymentMethodCreditCard = 'Credit Card';
const PaymentMethodBitcoin = 'Bitcoin';
const PaymentMethodGold = 'Gold';
export type PaymentMethods = typeof PaymentMethodBitcoin | typeof PaymentMethodCreditCard | typeof PaymentMethodGold;


type CustomRadioButtonState = {
  paymentMethod: PaymentMethods | undefined
}


type CustomRadioButtonProps<T> = {
  headline: string;
  options: Array<OptionType<T>>
}


export class CustomRadioButton<T = OptionTypeRadio> extends Component<CustomRadioButtonProps<T>, CustomRadioButtonState> {
  state: CustomRadioButtonState = {
    paymentMethod: undefined
  }


  _handleOptionChange = (value: PaymentMethods) => {
    console.log(value);
    this.setState({paymentMethod: value});
  }


  _renderOptions = (): Array<React.ReactNode> => {
    return this.props.options.map(({value, ...props}, index) =>
      (
        <RadioButtonOption
          key={index}
          onOptionChange={this._handleOptionChange}
          selected={this.state.paymentMethod === value}
          value={value}
          {...props}/>
      )
    );
  }

  render() {
    const {headline} = this.props;
    const {paymentMethod} = this.state;

    return (
      <div className='row'>
        <div className='col-8'>
          <h1>{headline}</h1>
          {this._renderOptions()}
          <h2>Selected payment method: {paymentMethod}</h2>
        </div>
      </div>
    );
  }
}

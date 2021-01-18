import {Result} from "./Result.js";
import Calculator from './Calculator';
import {CalculatorValidator, Validator} from "./CalculatorValidator";
import ReadError from "./ReadError";


interface Nodes {
  inputFirst: HTMLInputElement;
  inputSecond: HTMLInputElement;
  inputMode: HTMLSelectElement;
  output: HTMLInputElement;
  buttonSubmit: HTMLButtonElement;
}

interface ContainerData {
  inputFirst: number;
  inputSecond: number;
  inputMode: number;
}

enum OperationType {
  ADD,
  SUBTRACTION,
  MULTIPLY,
  DIVISION,
  SQUARE_ROOT
};


class CalculatorForm {
  private _inputFirst: HTMLInputElement;
  private _inputSecond: HTMLInputElement;
  private _inputMode: HTMLSelectElement;
  private _output: HTMLInputElement;
  private _buttonSubmit: HTMLButtonElement;
  private _calculator: Calculator;
  private _validator: Validator;

  constructor(listNodes: Nodes) {
    this._inputFirst = listNodes.inputFirst;
    this._inputSecond = listNodes.inputSecond;
    this._inputMode = listNodes.inputMode;
    this._output = listNodes.output;
    this._buttonSubmit = listNodes.buttonSubmit;
    this._calculator = new Calculator();
    this._validator = new CalculatorValidator();
  }

  private _getContainerInputValues(): ContainerData {
    const props: Array<string> = Object.keys(this)
      .filter(prop => this[prop].className)
      .filter(prop => prop.includes('input'));

    /*: Array<ContainerData>* ????????*/
    /*<ContainerData>*/
    const obj = props
      .map(prop => ({[prop]: Number(this[prop].value)}))
      .reduce((finalObj, obj) => {
        let prop = Object.keys(obj)[0];
        let value = obj[prop];
        prop = prop.substring(1, prop.length);

        if (!finalObj[prop]) {
          finalObj[prop] = Number(value);
        }
        return finalObj;
      }, {} as ContainerData);

    console.log(obj);
    return obj;
  }

  _getOperationType(mode: number): OperationType {
    switch (mode) {
      case 0:
        return OperationType.ADD;
        break;
      case 1:
        return OperationType.SUBTRACTION;
        break;
      case 2:
        return OperationType.MULTIPLY;
        break;
      case 3:
        return OperationType.DIVISION;
        break;
      case 4:
        return OperationType.SQUARE_ROOT;
        break;
    }
  }


  private _renderResult(result: Result): void {
    this._output.value = result.result.toString();
  }

  handleButtonSubmit(): void {
    this._buttonSubmit.addEventListener('click', () => {
      const containerData: ContainerData = this._getContainerInputValues();

      try {
        this._validator.validate(containerData);
      } catch (err) {
        if (err instanceof ReadError) {
          console.log(`Original error: ${err.name}, ${err.cause}`);
          alert(`${err.cause.name}, ${err.cause.message}`);
        } else {
          console.log(`throw error: ${err.name}, ${err.cause}`);
          throw err;
        }
      }
      const resultObject: Result = this._calculator.calc(containerData);
      this._renderResult(resultObject);
    });
  }

}

export {CalculatorForm, Nodes, ContainerData, OperationType};

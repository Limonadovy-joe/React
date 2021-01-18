import {ContainerData} from "./CalculatorForm";
import MathError from "./MathError";
import ReadError from "./ReadError";
import ValidationError from "./ValidationError";
import {OperationType} from "./CalculatorForm";

interface Validator {
  validate(data: ContainerData): void;
}

class CalculatorValidator implements Validator {
  constructor() {
  }

  _equalDivisorToZero(divisor: number): void {
    if (!divisor) {
      throw new MathError('divisor is zero');
    }
  }

  _validateInputTypes(inputFirst: number, inputSecond: number): void {
    if (Number.isNaN(inputFirst) || Number.isNaN(inputSecond)) {
      throw new ValidationError('Values must be numeric type. Please fill fields again.')
    }
  }


  _isMemberSquareRootNegative(data: ContainerData) {
    if (data.inputSecond < 0 && data.inputFirst % 2 === 0) {
      throw new MathError('squareRoot is negative.');
    }
  }

  validate(data: ContainerData): void {

    try {
      this._validateInputTypes(data.inputFirst, data.inputSecond)
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ReadError('ValidationError', err);
      } else {
        throw err;
      }
    }

    if (data.inputMode === OperationType.SQUARE_ROOT) {
      console.log(true);
      try {
        this._isMemberSquareRootNegative(data);
      } catch (err) {
        if (err instanceof MathError) {
          console.log('test');
          throw new ReadError('Mathematical error', err);
        } else {
          console.log('test 2');
          throw err;
        }
      }
    }

    try {
      this._equalDivisorToZero(data.inputSecond);
    } catch (err) {
      if (err instanceof MathError) {
        throw new ReadError('Mathematical error', err);
      } else {
        throw err;
      }
    }
  }
}

export {CalculatorValidator, Validator};



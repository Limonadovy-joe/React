import {Result} from "./Result.js";
import {ContainerData, OperationType} from "./CalculatorForm";

interface Calculable {
  calc(data: ContainerData): Result;
}

class Calculator implements Calculable {


  constructor() {

  }

  calc(data: ContainerData): Result {
    let resultObject = {} as Result;
    const mode: OperationType = data.inputMode;
    // const {inputFirst: valueFirst, inputSecond: valueSecond}: number = data;
    const valueFirst = data.inputFirst;
    const valueSecond = Math.abs(data.inputSecond);

    switch (mode) {
      case OperationType.ADD:
        resultObject.result = valueFirst + valueSecond;
        break;
      case OperationType.SUBTRACTION:
        resultObject.result = valueFirst - valueSecond;
        break;
      case OperationType.MULTIPLY:
        resultObject.result = valueFirst * valueSecond;
        break;
      case OperationType.DIVISION:
        resultObject.result = valueFirst / valueSecond;
        break;
      case OperationType.SQUARE_ROOT:
        resultObject.result = Math.pow(valueSecond, 1 / valueFirst);
        resultObject.result = (data.inputSecond < 0) ? (resultObject.result) * (-1) : resultObject.result;
        break;
    }
    console.log(resultObject);
    return resultObject;
  }


}


export default Calculator;

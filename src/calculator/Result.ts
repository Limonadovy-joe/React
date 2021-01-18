interface Result {
  result: number;
  typeOperation: string;
  numberFirst: number;
  numberSecond: number;
  resultError?: string;
}

class ResultInfo implements Result {
  result: number;
  typeOperation: string;
  numberFirst: number;
  numberSecond: number;

  constructor(result: number, typeOperation: string, numberFirst: number, numberSecond: number) {
    this.result = result;
    this.typeOperation = typeOperation;
    this.numberFirst = numberFirst;
    this.numberSecond = numberSecond;
  }
}

export {Result, ResultInfo};

interface Result {
  userInputElem: HTMLInputElement;
  userInput: number;
  randomNumber: number;
}

interface ContainerResult {
  [propName: string]: Result; //string index signature
}


interface Generator {
  calc(container: ContainerResult): ContainerResult;
}


class NumberGenerator implements Generator {
  constructor() {

  }

  _getRandomNumber(boundaryMax: number): number {
    return Math.floor(Math.random() * boundaryMax) + 1;
  }


  calc(container: ContainerResult): ContainerResult {
    const propsName: Array<string> = Object.keys(container);
    const numbersRandom: Array<number> = propsName
      .map(prop => container[prop].userInput)
      .map(value => this._getRandomNumber(value));
    for (let i = 0; i < propsName.length; i++){
      let prop: string = propsName[i];
      container[prop].randomNumber = numbersRandom[i];
    }
    return container;
  }
}


export {Result, ContainerResult, Generator, NumberGenerator};

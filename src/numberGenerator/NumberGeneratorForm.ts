import {Result, Generator, NumberGenerator, ContainerResult} from "./NumberGenerator";


interface Form {
  elements: Array<HTMLInputElement>;
  buttonSubmit: HTMLButtonElement | null;

  handleFormSubmit(callback: (data: ContainerResult) => void): void;
}


class NumberGeneratorForm implements Form {
  elements: Array<HTMLInputElement> = [];
  buttonSubmit: HTMLButtonElement | null;
  private _numberGenerator: Generator;

  constructor() {
    this._numberGenerator = new NumberGenerator();
    this.buttonSubmit = null;
  }


  handleFormSubmit(callback: (data: ContainerResult) => void): void {
    if (this.buttonSubmit !== null) {
      this.buttonSubmit.addEventListener('click', () => {

        const userValues: Array<number> = this._getData();
        if (!userValues.some(value => value)) {
          alert('please fill the fields');
          return;
        }
        let containerData: ContainerResult = this._updateInputPropsContainerResult();
        containerData = this._numberGenerator.calc(containerData);
        callback(containerData);
      });
    }
  }


  _updateInputPropsContainerResult(): ContainerResult {
    return this.elements
      .map(input => ({['classname']: input.className, ['userInputValue']: input.value, ['inputElem']: input}))
      .reduce((container, object) => {
        const inputName = object.classname;

        container[inputName] = {} as Result;
        container[inputName].userInput = Number(object.userInputValue);
        container[inputName].userInputElem = object.inputElem;

        return container;
      }, {} as ContainerResult);
  }

  _getData(): Array<number> {
    const userValues: Array<number> = this.elements.map(inputElem => Number(inputElem.value));
    return userValues;
  }
}

export {NumberGeneratorForm, Form};



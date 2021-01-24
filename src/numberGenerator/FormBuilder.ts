import {Form, NumberGeneratorForm} from "./NumberGeneratorForm";


class FormBuilder {
  private readonly _form: Form;


  constructor() {
    this._form = new NumberGeneratorForm();
  }

  setInputFields(elements: Array<HTMLInputElement> | HTMLInputElement): FormBuilder {
    if (Array.isArray(elements)) {  //instead of typeof
      this._form.elements = [...elements];
    } else {
      this._form.elements.push(elements);
    }
    return this;
  }


  setInputButton(button: HTMLButtonElement): FormBuilder {
    this._form.buttonSubmit = button;
    return this;
  }

  build(): Form {
    return this._form;
  }

}

export {FormBuilder};

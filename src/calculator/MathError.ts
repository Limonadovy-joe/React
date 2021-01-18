import ValidationError from "./ValidationError";

class MathError extends ValidationError {
  constructor(message:string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export default MathError;

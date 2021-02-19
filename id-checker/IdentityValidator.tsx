import * as React from "react";
import {Component} from "react";
import {IdentityForm, IdentityRecord} from "./IdentityForm";
import {IdentityPartList} from "./IdentityPartList";
import {IdentityInfoPanel} from "./IdentityInfoPanel";


export type ValidationPairState = "Success" | "Failed";

export interface IdentityPair {
  pair: string;
  validationState: ValidationPairState;
}


type ValidationSuccess = {
  state: "success"
}

type ValidationIdPairRangeError = {
  state: "IdPairRangeError",
}


type ValidationFormatError = {
  state: "formatError",
}


type ValidationRangeError = {
  state: "rangeError",
}

type ValidationExistError = {
  state: "validityError",
}

export type ValidationState =
  | ValidationSuccess
  | ValidationFormatError
  | ValidationRangeError
  | ValidationIdPairRangeError
  | ValidationExistError;


export type FormValidationResult = "is-valid" | "is-invalid" | "";

export type ValidationResult = {
  text: string;
  validationResult: FormValidationResult;
}

type IdentityValidatorProps = {
  onFormControl: (pairs: Array<IdentityPair>) => void;
}

type IdentityValidatorState = {
  formStatus: ValidationResult;
  identityPairs: Array<IdentityPair>;
  identityInformation: IdentityInfo
}


type ValidationAction = (id: string) => void;

type IdentityPairValidator = (identityPart: string) => boolean;
type IdentityPairValidators = Array<IdentityPairValidator>;

type IdentityType = "nine-characters" | "ten-characters";
type IdentityDigitPosition = "even" | "odd";


interface IdentityBirth {
  year: number | undefined;
  month: number | undefined;
  day: number | undefined;
}


type IdentitySex = "male" | "female";

export interface IdentityInfo {
  birth: IdentityBirth;
  sex: IdentitySex | undefined
}


export class IdentityValidator extends Component<IdentityValidatorProps, IdentityValidatorState> {
  state: IdentityValidatorState = {
    formStatus: {
      validationResult: "",
      text: "",
    },
    identityPairs: [],
    identityInformation: {
      birth: {
        month: undefined,
        year: undefined
      },
      sex: undefined
    }
  }

  IDENTITY_PART_FIRST_CHARS_MAX: number;
  IDENTITY_PART_SECOND_CHARS_MAX: number;
  IDENTITY_PART_SECOND_CHARS_MIN: number;
  IDENTITY_NINE_DIGITS_EXCEPTION_REMINDER: number;

  componentDidMount() {
    this.IDENTITY_PART_FIRST_CHARS_MAX = 6;
    this.IDENTITY_PART_SECOND_CHARS_MAX = 4;
    this.IDENTITY_PART_SECOND_CHARS_MIN = 3;
    this.IDENTITY_NINE_DIGITS_EXCEPTION_REMINDER = 10; //1985
  }

  _generateFormStatus = (validationResult: ValidationState): FormValidationResult => {
    let formStatus: FormValidationResult;

    switch (validationResult.state) {
      case "formatError":
        formStatus = "is-invalid";
        break;
      case "rangeError":
        formStatus = "is-invalid";
        break;
      case "IdPairRangeError":
        formStatus = "is-invalid";
        break;
      case "validityError":
        formStatus = "is-invalid";
        break;
      case "success":
        formStatus = "is-valid";
        break;
    }
    return formStatus;
  }


  _containIdNotAllowedChars: ValidationAction = (id: string) => {
    if (!Number.isInteger(Number(id)) || id.includes(".")) {
      throw new Error('Id contains not allowed chars: ');
    }
  }

  _checkIdLength = (identityRecord: IdentityRecord) => {
    if (identityRecord.partFirst.length < this.IDENTITY_PART_FIRST_CHARS_MAX
      || identityRecord.partFirst.length > this.IDENTITY_PART_FIRST_CHARS_MAX
      || identityRecord.partSecond.length < this.IDENTITY_PART_SECOND_CHARS_MIN
      || identityRecord.partSecond.length > this.IDENTITY_PART_SECOND_CHARS_MAX) {
      throw new Error("ID number has no correct count of digits.");
    }
  }


  _createIdPairs = (id: string): Array<string> => {
    const pairs: Array<string> = [];
    let tmpString = '';
    [...id].forEach((char, index, array) => {
      if (index % 2 === 1 && index < 6) {
        tmpString = `${array[index - 1]}${array[index]}`
        pairs.push(tmpString);
        tmpString = '';
      }
    });
    return pairs;
  }

  _createIdQuaternion = (id: string): string => {
    return id.substring(6, id.length)
  }


  _checkIdPairRangeStatus = (pairs: Array<IdentityPair>) => {
    for (let pair of pairs) {
      if (pair.validationState === "Failed") {
        throw new Error("Id does not exist");
      }
    }
  }


  _checkIdPairRange(identityRange: number | Array<Array<number>>, identityPart: string): boolean {
    if (typeof identityRange === "number") {
      return Number(identityPart) <= identityRange;
    } else if (typeof identityRange === "object") {

      //check id last part: 0000 is not valid
      if (identityPart.length === 4 && [...identityPart].every((char) => char === '0')) {
        return false;
      }

      return identityRange.some(([boundaryMin, boundaryMax]) =>
        (Number(identityPart) >= boundaryMin && Number(identityPart) <= boundaryMax));
    }
  }


  _makePartials = (): IdentityPairValidators => {
    const validators: IdentityPairValidators = [];

    const validatorPartFirst = this._checkIdPairRange.bind(null, [[0, 99]]);
    validators.push(validatorPartFirst);
    const validatorPartSecond = this._checkIdPairRange.bind(null, [[1, 12], [21, 32], [51, 62], [71, 82]]);
    validators.push(validatorPartSecond);
    const validatorPartThird = this._checkIdPairRange.bind(null, [[1, 31]]);
    validators.push(validatorPartThird);
    const validatorPartFourth = this._checkIdPairRange.bind(null, [[0, 9999]]);
    validators.push(validatorPartFourth);

    return validators;
  }


  _formatIdentityPairs = (pairs: Array<IdentityPair>): Array<IdentityPair> => {
    const identityPairLast: IdentityPair = pairs[pairs.length - 1];
    const identityValidationState: ValidationPairState = identityPairLast.validationState;

    const identityPairsSeparated: Array<IdentityPair> = [...identityPairLast.pair]
      .reduce((pairs, char, index, array) => {

        if (index % 2 === 1) {
          let pair: string = array[index - 1] + char;
          pairs[pairs.length - 1] = pair;
        } else {
          pairs.push(char);
        }
        return pairs;
      }, [] as Array<string>)
      .map((pairRaw) => ({pair: pairRaw, validationState: identityValidationState} as IdentityPair));

    const identityPairsFiltered = pairs
      .filter((pair, index) => index !== pairs.length - 1);

    const identityPairs: Array<IdentityPair> = [...identityPairsFiltered, ...identityPairsSeparated];
    console.log(identityPairs);


    return identityPairs;
  }

  _generateIdPair = (id: string): Array<IdentityPair> => {
    const identityPairs: Array<string> = this._createIdPairs(id);
    const identityQuaternion: string = this._createIdQuaternion(id);
    const identitySections: Array<string> = [...identityPairs, identityQuaternion];
    const identityValidators: IdentityPairValidators = this._makePartials();

    const pairs: Array<IdentityPair> = identitySections
      .map((identityPart, index) => {
        const validator: IdentityPairValidator = identityValidators[index];
        const validatorResult: ValidationPairState = validator(identityPart) ? "Success" : "Failed";

        return {
          pair: identityPart,
          validationState: validatorResult
        } as IdentityPair;
      });
    return pairs;
  }

  _validateId = (identityRecord: IdentityRecord) => {
    const identity: string = identityRecord.partFirst + identityRecord.partSecond;

    try {
      this._containIdNotAllowedChars(identity)
    } catch (e) {
      let notAllowedChars: string = [...identity]
        .filter(char => Number.isNaN(Number(char)))
        .reduce((string, char) => string + char + ",", "");
      notAllowedChars = notAllowedChars.substring(0, notAllowedChars.length - 1);

      const status: FormValidationResult = this._generateFormStatus({
        state: "formatError",
      });
      return this.setState({
        formStatus: {
          validationResult: status,
          text: e.message + notAllowedChars
        },
        identityPairs: [],
      });
    }


    try {
      this._checkIdLength(identityRecord);
    } catch (e) {
      const status: FormValidationResult = this._generateFormStatus({
        state: "rangeError",
      });
      return this.setState({
        formStatus: {
          validationResult: status,
          text: e.message
        },
        identityPairs: []
      });
    }


    let identityPairs: Array<IdentityPair> = this._generateIdPair(identity);
    identityPairs = this._formatIdentityPairs(identityPairs); //TODO format last part of identity in generateIdPair
    try {
      this._checkIdPairRangeStatus(identityPairs);
    } catch (e) {
      const status: FormValidationResult = this._generateFormStatus({
        state: "IdPairRangeError"
      });
      return this.setState({
        formStatus: {
          validationResult: status,
          text: e.message
        },
        identityPairs: identityPairs
      });
    }

    const identityType: IdentityType = (identity.length === 9) ? "nine-characters" : "ten-characters";
    try {
      this._checkIdValidity(identity, identityType);
    } catch (e) {
      const status: FormValidationResult = this._generateFormStatus({
        state: "validityError"
      });
      identityPairs = this._setIdPairRangeStatusFailed(identityPairs);
      return this.setState({
        formStatus: {
          validationResult: status,
          text: e.message
        },
        identityPairs: identityPairs
      });
    }


    console.log(identityPairs);
    const status: FormValidationResult = this._generateFormStatus({state: "success"});
    const identityInfo: IdentityInfo = this._generateIdentityInformation(identity, identityType);
    this.setState({
      formStatus: {
        validationResult: status,
        text: "Id exists."
      },
      identityPairs: identityPairs,
      identityInformation: identityInfo
    });
  }


  _calcIdentityBirthYear = (identity: string, identityType: IdentityType): number => {
    let identityYear = Number(identity.substring(0, 2));

    if (identityType === "nine-characters" || identityType === "ten-characters" && identityYear >= 54) {
      identityYear += 1900;
    } else {
      identityYear += 2000;
    }
    return identityYear;
  }

  _calcIdentityBirthMonth = (identity: string): number => {
    let identityMonth = Number(identity.substring(2, 4));
    const identityPairRanges: Array<Array<number>> = [[1, 12], [21, 32], [51, 62], [71, 82]];
    const identityPairRange = identityPairRanges.filter(([boundaryFirst, boundarySecond]) =>
      (identityMonth >= boundaryFirst && identityMonth <= boundarySecond));

    const [[identityPairDigitFirst]] = identityPairRange;
    //in case of [1,12] ---> 1 - 1 === 0, just return identityMonth
    const identityMonthBase = identityPairDigitFirst - 1;
    console.log(`identityMonthBase`, identityMonthBase);
    if (identityMonthBase) {
      identityMonth = identityMonth - identityMonthBase;
    }
    return identityMonth;
  }


  _calcIdentitySex = (identity: string): IdentitySex => {
    const identityMonth = Number(identity.substring(2, 4));
    return (identityMonth > 50) ? "female" : "male";
  }


  _calcIdentityBirthDay = (identity: string): number => {
    return Number(identity.substring(4, 6));
  }

  _generateIdentityInformation = (identity: string, identityType: IdentityType): IdentityInfo => {
    const identityInfo: IdentityInfo = {
      birth: {
        year: this._calcIdentityBirthYear(identity, identityType),
        month: this._calcIdentityBirthMonth(identity),
        day: this._calcIdentityBirthDay(identity)
      },
      sex: this._calcIdentitySex(identity),
    }
    return identityInfo;
  }

  _setIdPairRangeStatusFailed = (pairs: Array<IdentityPair>): Array<IdentityPair> => {
    return pairs.map(({pair}) => ({pair: pair, validationState: "Failed"}));
  }

  _sumIdDigitsByPosition = (digits: Array<number>, digitPosition: IdentityDigitPosition): number => {
    const divisor = (digitPosition === "even") ? 1 : 0;

    return digits
      .filter((digit, index) => index % 2 === divisor)
      .reduce((sum, digit) => sum + digit);
  }

  _checkIdValidity = (identity: string, identityType: IdentityType) => {
    const digits: Array<number> = [...identity].map(char => Number(char));


    const sumDigitsPositionOdd = this._sumIdDigitsByPosition(digits, "odd");
    const sumDigitsPositionEven = this._sumIdDigitsByPosition(digits, "even");

    const reminderAfterFirstDivision = (sumDigitsPositionOdd - sumDigitsPositionEven) % 11;
    console.log("reminderAfterFirstDivision", reminderAfterFirstDivision);

    const digitLast = digits[digits.length - 1];
    const identityToDivision = (identityType === "nine-characters")
      ? Number(identity)
      : Number(identity.substring(0, identity.length - 1));

    const mod = identityToDivision % 11;
    console.log("mod", mod);

    if (identityType === "nine-characters") {

      if (mod === 0 || mod === 10 /*&& digitLast === 0)*/) {
        return;
      }
      const identityPlusMod = Number(identity + mod);
      console.log("identityPlusMod", identityPlusMod);

      if (identityPlusMod % 11 !== 0) {
        throw new Error("Id does not exist");
      }

    } else if (identityType === "ten-characters") {

      if (mod === 0 || (mod === 10 && digitLast === 0)) {
        return;
      }

      if ((mod !== digitLast)) {
        throw new Error("Id does not exist");
      }
    }

  }


  _handleFormSubmit = (identityRecord: IdentityRecord) => {
    this._validateId(identityRecord);

  }


  render() {
    const {formStatus, identityPairs} = this.state;
    const {formStatus: {validationResult}, identityInformation} = this.state;

    return (
      <>
        <IdentityForm
          onFormSubmit={this._handleFormSubmit}
          validationResult={formStatus}
        />
        {
          identityPairs.length > 0 && <IdentityPartList pairs={identityPairs}/>
        }
        {
          validationResult === "is-valid" && <IdentityInfoPanel info={identityInformation}/>
        }
      </>
    )
  }
}

import * as React from "react";
import {Component} from "react";
import {ValidationResult} from "./IdentityValidator";


type IdentityFormProps = {
  onFormSubmit: (identityRecord: IdentityRecord) => void;
  validationResult: ValidationResult
}

type IdentityFormState = {
  idPartFirst: string;
  idPartSecond: string;
}


export interface IdentityRecord {
  partFirst: string;
  partSecond: string;
}

export class IdentityForm extends Component<IdentityFormProps, IdentityFormState> {
  state: IdentityFormState = {
    idPartFirst: '',
    idPartSecond: ''
  }


  _handleFormSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const identityRecord: IdentityRecord = {
      partFirst: this.state.idPartFirst.trim(),
      partSecond: this.state.idPartSecond.trim(),
    }
    this.props.onFormSubmit(identityRecord);
  }


  _handleIdPartFirstChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({idPartFirst: evt.target.value});
  }


  _handleIdPartSecondChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({idPartSecond: evt.target.value});
  }

  render() {
    const {validationResult: {text, validationResult}} = this.props;


    return (
      <form className="row justify-content-center g-3">
        <div className="col-8 d-flex justify-content-between align-items-center">
          <div className="col-3">
            <h5 className="text-warning text-center">Identity number</h5>
          </div>
          <div className="col-3">
            <input
              type="text"
              className={`form-control ${validationResult}`}
              id="input-id"
              onChange={this._handleIdPartFirstChange}
            />
          </div>
          <div className="col-1">
            <h1 className="text-warning text-center">/</h1>
          </div>
          <div className="col-2">
            <input
              type="text"
              className={`form-control ${validationResult}`}
              id="input-id"
              onChange={this._handleIdPartSecondChange}
            />
          </div>
          <div className="col-2 ms-4">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this._handleFormSubmit}
            >
              Check id
            </button>
          </div>
          <div className="w-100">

          </div>
        </div>
        {
          text.length > 0 &&
          <div className="col-6">
            <h3 className={`text-center ${(validationResult === "is-valid") ? "text-success" : "text-danger"}`}>
              {text}
            </h3>
          </div>
        }
      </form>
    );
  }
}



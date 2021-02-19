import * as React from "react";
import {Component} from "react";
import {IdentityPair, IdentityValidator} from "./IdentityValidator";


type IdentityCheckerState = {
  identityPairs: Array<IdentityPair>;
}

export class IdentityChecker extends Component<{}, IdentityCheckerState> {
  state: IdentityCheckerState = {
    identityPairs: []
  }


  _getValidationResult = (results: Array<IdentityPair>) => {
    console.log(results);
    this.setState({identityPairs: results});
  }


  render() {
    return (
      <div className="row">
        <h1 className="text-info text-center">Identity Checker</h1>
        <IdentityValidator
          onFormControl={this._getValidationResult}
        />
      </div>
    );
  }


}

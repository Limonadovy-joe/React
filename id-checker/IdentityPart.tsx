import * as React from "react";
import {Component} from "react";
import {IdentityPair} from "./IdentityValidator";


type IdentityPartProps = IdentityPair;

export class IdentityPart extends Component<IdentityPartProps, {}> {


  render() {
    const {pair, validationState} = this.props
    const elemBackground = (validationState === "Success") ? 'bg-success' : 'bg-danger';

    return (
      <>
        <div className={`p-4 h3 rounded text-white ${elemBackground}`}>{pair[0]}</div>
        {
          (!!pair[1]) && <div className={`p-4 h3 rounded text-white ${elemBackground}`}>{pair[1]}</div>
        }
      </>
    );
  }
}

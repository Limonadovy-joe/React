import * as React from "react";
import {Component} from "react";
import {IdentityPair} from "./IdentityValidator";
import {IdentityPart} from "./IdentityPart";


type IdentityViewProps = {
  pairs: Array<IdentityPair>
}

export class IdentityPartList extends Component<IdentityViewProps, {}> {


  render() {
    return (
      <div className="col-9 d-flex mx-auto  justify-content-between align-items-center">
        {
          this.props.pairs.map(({pair, validationState}, index) => (
            <IdentityPart pair={pair} validationState={validationState} key={index}/>
          ))
        }
      </div>
    );
  }
}

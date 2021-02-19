import * as React from "react";
import {Component} from "react";
import {IdentityInfo} from "./IdentityValidator";


type IdentityInfoProps = {
  info: IdentityInfo
}

export class IdentityInfoPanel extends Component<IdentityInfoProps, {}> {


  render() {
    const {info: {birth: {month, year, day}, sex}} = this.props;

    return (
      <div className="col-9 d-flex mx-auto  justify-content-between align-items-center">
        <h2 className="lead">Identity Info: </h2>
        <h3>Year of the birth: {year}</h3>
        <h3>Month of the birth: {month}</h3>
        <h3>Day of the birth: {day}</h3>
        <h3>Sex: {sex}</h3>
      </div>
    );
  }
}

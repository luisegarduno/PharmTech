import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
export class cartFix extends Component {
  render() {
    return (
        <Redirect from='/redirect' to='/phar' />
    );
  }
}
export default cartFix;
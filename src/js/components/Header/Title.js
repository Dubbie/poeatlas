import React from "react";

import Version from "./Version";

export default class Title extends React.Component {
  render () {
    return (
      <h1>
        {this.props.title}
        <Version version={this.props.version}/>
      </h1>
    );
  }
}

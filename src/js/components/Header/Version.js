import React from "react";

export default class Title extends React.Component {
  render () {
    return (
      <span class="version">{this.props.version}</span>
    );
  }
}

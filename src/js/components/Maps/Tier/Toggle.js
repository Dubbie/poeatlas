import React from "react";

export default class Toggle extends React.Component {

  render () {
    return (
      <img class="tier-complete" src={ this.props.src } onClick = { this.props.onClick.bind(this) }/>
    );
  }
}

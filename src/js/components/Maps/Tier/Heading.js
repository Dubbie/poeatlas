import React from "react";

export default class Heading extends React.Component {
  handleClick (e) {
    const el = e.target.parentElement.lastChild;

    el.classList.toggle('collapsed');
  }

  render () {
    return (
      <h2 class={this.props.classes}  onClick={this.handleClick.bind(this)}>Tier {this.props.tier}</h2>
    );
  }
}

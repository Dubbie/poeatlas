import React from "react";

import Title from "./Header/Title";
import Description from "./Header/Description";

export default class Header extends React.Component {
  render () {
    return (
      <header class="text-center">
        <Title title={this.props.title} version={this.props.version}/>
        <Description description={this.props.description}/>
      </header>
    );
  }
}

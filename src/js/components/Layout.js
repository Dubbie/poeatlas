import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import Maps from "./Maps";

export default class Layout extends React.Component {
  constructor () {
    super();
    this.state = {
      title: 'Atlas Progression',
      description: 'Choose your maps that you\'ve completed in your atlas below.',
      version: 'Alpha',
    };
  }

  render () {
    return (
      <div>
        <Header title={this.state.title} description={this.state.description} version={this.state.version} />
        <Maps />
        <Footer />
      </div>
    );
  }
}

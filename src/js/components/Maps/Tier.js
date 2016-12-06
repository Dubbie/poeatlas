import React from "react";

import Counter from "./Tier/Counter";
import Expando from "./Tier/Expando";
import Heading from "./Tier/Heading";
import Toggle  from "./Tier/Toggle";

export default class Tier extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      maps: props.data
    }
    this.toggleMaps = this.toggleMaps.bind(this);
  }

  changeMaps (changedMaps) {
    const items = this.state.maps;
    changedMaps.forEach(map => {
      const i = items.map(m => m.name).indexOf(map.name);
      items[i].completed = !items[i].completed;
    });
    this.setState({ items });
    this.updateStorage(items);
  }

  toggleMaps (e) {
    const items = this.state.maps;
    const value = this.getTierCompleted();
    items.map(m => m.completed = !value);
    this.setState({ items });
    this.updateStorage(items);
  }

  updateStorage (changedMaps) {
    let completedMaps = typeof(localStorage.completedMaps) !== 'undefined' ? JSON.parse(localStorage.completedMaps) : [];

    changedMaps.forEach(m => {
      if (completedMaps.includes(m.name) && !m.completed) {
        const i = completedMaps.indexOf(m.name);
        completedMaps.splice(i, 1);
      } else if (!completedMaps.includes(m.name) && m.completed) {
        completedMaps.push(m.name);
      }
    });

    localStorage.completedMaps = JSON.stringify(completedMaps);
  }

  getCompleted () {
    return this.state.maps.filter(map => map.completed).length;
  }

  getTierCompleted () {
    return this.getCompleted() === this.state.maps.length;
  }

  getToggle () {
    return this.getTierCompleted() ? "img/toggle_on.png" : "img/toggle_off.png";
  }

  render () {
    return (
      <div class="tier">
        <Heading classes = {this.props.classes} tier = {this.props.tier} />
        <Counter classes = {this.getTierCompleted() === true ? 'tier-counter hidden' : 'tier-counter'} completed={this.getCompleted()} total={this.state.maps.length}/>
        <Toggle src={this.getToggle()} onClick = {this.toggleMaps}/>
        <Expando maps={this.state.maps} changeMaps={this.changeMaps.bind(this)} collapsed={this.props.collapsed}/>
      </div>
    );
  }
}

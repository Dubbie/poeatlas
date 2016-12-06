import React from "react";

import Tier from "./Maps/Tier";

import data from '../data.json';

export default class Maps extends React.Component {

  handleData () {
    // Iterate through maps, find the different tiers
    const tiers = Array.from(new Set(data.map(m => m.tier)));
    const mapsCompleted = typeof(localStorage.completedMaps) !== 'undefined' ? JSON.parse(localStorage.completedMaps) : [];
    let elements = [];

    for (var tier of tiers) {
      // Select maps in the correct tier
      // Check if it's in the localStorage
      let difficulty = 'white';

      if (tier > 10) {
        difficulty = 'red';
      } else if (tier > 5) {
        difficulty = 'yellow';
      }

      let mapsInTier = data.filter(m => m.tier === tier);

      mapsInTier.forEach(m => {
        if (mapsCompleted.includes(m.name)) {
          m.completed = true;
        }
      });

      elements.push(
        <Tier key={tier} tier={tier} classes={'tier-heading ' + difficulty} data={mapsInTier} collapsed={tier !== 1}/>
      );
    }

    return elements;
  }

  render () {
    const tiers = this.handleData();

    return (
      <div id="maps">
        {tiers}
      </div>
    );
  }
}

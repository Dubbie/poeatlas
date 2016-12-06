import React from "react";

const Map = ({map, changeMaps}) => {
  const handleClick = (e) => {
    changeMaps([map]);
  };

  return (
    <div className={map.completed ? 'map-name completed' : 'map-name'} onClick={handleClick}>
      <a target="_blank" href={"http://pathofexile.gamepedia.com/index.php?search=" + map.name}>{map.name}</a>
    </div>
  );
};

export default Map;

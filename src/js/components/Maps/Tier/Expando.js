import React from "react";
import Map from "./Expando/Map";

const Expando = ({maps, changeMaps, collapsed}) => {
  return (
    <div className={collapsed ? "expando collapsed animated" : "expando animated"}>
      {maps.map(m => <Map key={m.id} map={m} changeMaps={changeMaps} />)}
    </div>
  );
};

export default Expando;

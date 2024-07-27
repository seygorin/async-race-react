import React from "react";
import CatSitting from "../../assets/CatSitting"; // добавить еще две иконки для финиша и для сломанной машины
import CatStanding from "../../assets/CatStanding";
import CatRunning from "../../assets/CarRunning";

function CatIcon({ cat, catRef, velocities }) {
  let IconComponent = null;

  if (velocities === 0) {
    IconComponent = <CatStanding color={cat.color} />;
  } else if (velocities > 1) {
    IconComponent = <CatRunning color={cat.color} />;
  }

  return (
    <div
      ref={catRef}
      style={{
        position: "absolute",
        top: "5px",
        left: "10px",
        width: "50px",
        height: "30px",
        transition: "transform 0.1s linear",
        zIndex: 1,
      }}
    >
      {IconComponent}
    </div>
  );
}

export default CatIcon;

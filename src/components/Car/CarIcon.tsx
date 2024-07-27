import React from "react";
import CatSitting from "../../assets/CatSitting"; // добавить еще две иконки для финиша и для сломанной машины
import CatStanding from "../../assets/CatStanding";
import CatRunning from "../../assets/CarRunning";

function CarIcon({ car, carRef, velocities }) {
  let IconComponent = null;

  if (velocities === 0) {
    IconComponent = <CatStanding color={car.color} />;
  } else if (velocities > 1) {
    IconComponent = <CatRunning color={car.color} />;
  }

  return (
    <div
      ref={carRef}
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

export default CarIcon;

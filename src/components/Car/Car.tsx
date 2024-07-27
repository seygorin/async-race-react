import React, { useEffect, useRef } from "react";

import CarIcon from "./CarIcon";
import CarInfo from "./CarInfo";
import "./Car.css";

function Car({ car, position, totalDistance, trackWidth, velocity }) {
  const carRef = useRef(null);

  useEffect(() => {
    if (carRef.current) {
      const carWidth = 290;
      const maxPosition = trackWidth - carWidth;
      const scaledPosition = Math.min(
        (position / totalDistance) * maxPosition,
        maxPosition,
      );
      carRef.current.style.transform = `translateX(${scaledPosition}px)`;
    }
  }, [position, trackWidth, totalDistance]);

  return (
    <div className="car-content">
      <CarIcon velocities={velocity} car={car} carRef={carRef} />
      <CarInfo
        car={car}
        position={position}
        totalDistance={totalDistance}
        velocity={velocity}
      />
    </div>
  );
}

export default React.memo(Car);

import React, { useEffect, useRef } from "react";

import CatIcon from "./CatIcon";
import CatInfo from "./CatInfo";
import "./Cat.css";

function Cat({ cat, position, totalDistance, trackWidth, velocity }) {
  const catRef = useRef(null);

  useEffect(() => {
    if (catRef.current) {
      const catWidth = 290;
      const maxPosition = trackWidth - catWidth;
      const scaledPosition = Math.min(
        (position / totalDistance) * maxPosition,
        maxPosition,
      );
      catRef.current.style.transform = `translateX(${scaledPosition}px)`;
    }
  }, [position, trackWidth, totalDistance]);

  return (
    <div className="cat-content">
      <CatIcon
        totalDistance={totalDistance}
        velocities={velocity}
        cat={cat}
        catRef={catRef}
        position={position}
      />
      <CatInfo
        cat={cat}
        position={position}
        totalDistance={totalDistance}
        velocity={velocity}
      />
    </div>
  );
}

export default React.memo(Cat);

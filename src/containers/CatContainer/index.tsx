import React, { useEffect, useRef } from "react";
import CatIcon from "@components/Cat/CatIcon";
import CatInfo from "@components/Cat/CatInfo";
import useStateApp from "@hooks/useStateApp";
import { Cat as CatType } from "@type/catsTypes";
import "./index.css";

interface CatProps {
  cat: CatType;
  position: number;
  totalDistance: number;
  trackWidth: number;
  velocity: number;
}

function Cat({ cat, position, totalDistance, trackWidth, velocity }: CatProps) {
  const catRef = useRef<HTMLDivElement>(null);
  const { status } = useStateApp();

  useEffect(() => {
    if (catRef.current) {
      const catWidth = 260;
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
        status={status[cat.id]}
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

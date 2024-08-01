import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CatIcon from "@components/Cat/CatIcon";
import CatInfo from "@components/Cat/CatInfo";
import { Cat as CatType } from "@store/slices/garageSlice";
import { RootState } from "@store/store";
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

  const result = useSelector(
    (state: RootState) => state.engine.results[cat.id],
  );

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
        result={result}
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

import { RefObject } from "react";
import CatSitting from "@assets/CatSitting";
import CatStanding from "@assets/CatStanding";
import CatRunning from "@assets/CatRunning";
import CatCrashing from "@assets/CatCrashing";
import { Cat as CatType } from "@type/catsTypes";
import "./index.css";

interface CatIconProps {
  position: number;
  totalDistance: number;
  cat: CatType;
  catRef: RefObject<HTMLDivElement>;
  velocities: number;
  status: "idle" | "loading" | "succeeded" | "failed";
}

function CatIcon({
  position,
  totalDistance,
  cat,
  catRef,
  velocities,
  status,
}: CatIconProps) {
  let IconComponent = null;

  if (status === "failed") {
    IconComponent = <CatCrashing color={cat.color} />;
  } else if (position >= totalDistance) {
    IconComponent = <CatSitting color={cat.color} />;
  } else if (velocities === 0) {
    IconComponent = <CatStanding color={cat.color} />;
  } else if (velocities > 0) {
    IconComponent = (
      <div className="cat-running">
        <CatRunning color={cat.color} />
      </div>
    );
  }

  return (
    <div ref={catRef} className="cat-icon">
      {IconComponent}
    </div>
  );
}

export default CatIcon;

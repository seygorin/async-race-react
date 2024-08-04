import getColor from "@utils/getColor";
import { Cat as CatType } from "@type/catsTypes";
import "./index.css";

const PROGRESS_BASE = 100;

interface CatInfoProps {
  cat: CatType;
  position: number;
  totalDistance: number;
  velocity: number;
}

const calculateProgress = (position: number, totalDistance: number) => {
  return (position / totalDistance) * PROGRESS_BASE;
};

function CatInfo({ cat, position, totalDistance, velocity }: CatInfoProps) {
  const progress = calculateProgress(position, totalDistance);
  const color = getColor(progress);

  return (
    <div className="cat-info-container">
      <span className="cat-name" style={{ color: cat.color }}>
        {cat.name}
      </span>
      <span className="cat-progress" style={{ color }}>
        {Math.round(position / PROGRESS_BASE)} / {totalDistance / PROGRESS_BASE}
        (Velocity: {velocity})
      </span>
    </div>
  );
}

export default CatInfo;

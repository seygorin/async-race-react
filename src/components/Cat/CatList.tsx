import { useMemo } from "react";
import { useSelector } from "react-redux";
import useGaragePage from "../../hooks/useGaragePage";
import CatTrack from "./CatTrack";

function CatList({ trackWidth }) {
  const { garageContentProps } = useGaragePage();
  const { cats, isRacing, positions } = garageContentProps;
  const distances = useSelector((state) => state.engine.distances);
  const velocities = useSelector((state) => state.engine.velocities);

  const totalDistance = useMemo(() => {
    const distanceValues = Object.values(distances);
    return Math.max(...distanceValues);
  }, [distances]);

  return (
    <div>
      {Array.isArray(cats) &&
        cats.map((cat) => (
          <CatTrack
            key={cat.id}
            cat={cat}
            trackWidth={trackWidth}
            isRacing={isRacing}
            position={positions[cat.id] || 0}
            totalDistance={totalDistance}
            velocity={velocities[cat.id] || 0}
          />
        ))}
    </div>
  );
}

export default CatList;

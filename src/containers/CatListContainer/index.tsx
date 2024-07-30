import { useMemo } from "react";
import { useSelector } from "react-redux";
import useGaragePage from "@hooks/useGaragePage";
import CatTrackContainer from "@containers/CatTrackContainer";
import { RootState } from "@store/store";
import { Cat as CatType } from "@store/slices/garageSlice";
import "./index.css";

interface CatListContainerProps {
  trackWidth: number;
  children: React.ReactNode;
}

function CatListContainer({ trackWidth, children }: CatListContainerProps) {
  const { garageContentProps } = useGaragePage();
  const { cats, positions } = garageContentProps;
  const distances = useSelector((state: RootState) => state.engine.distances);
  const velocities = useSelector((state: RootState) => state.engine.velocities);

  const totalDistance = useMemo(() => {
    const distanceValues = Object.values(distances);
    return Math.max(...distanceValues);
  }, [distances]);

  return (
    <div>
      {Array.isArray(cats) && cats.length > 0 ? (
        <div>
          {children}
          {cats.map((cat: CatType) => (
            <CatTrackContainer
              key={cat.id}
              cat={cat}
              trackWidth={trackWidth}
              position={positions[cat.id] || 0}
              totalDistance={totalDistance}
              velocity={velocities[cat.id] || 0}
            />
          ))}
        </div>
      ) : (
        <p className="no-data">No data</p>
      )}
    </div>
  );
}

export default CatListContainer;

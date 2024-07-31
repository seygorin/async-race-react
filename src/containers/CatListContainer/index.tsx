import React from "react";
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

const HEIGHT_FOR_CAT_TRACK = 70;

function CatListContainer({ trackWidth, children }: CatListContainerProps) {
  const { garageContentProps } = useGaragePage();
  const { cats, positions } = garageContentProps;
  const distances = useSelector((state: RootState) => state.engine.distances);
  const velocities = useSelector((state: RootState) => state.engine.velocities);

  const totalDistance = Math.max(...Object.values(distances));

  return (
    <div>
      {Array.isArray(cats) && cats.length > 0 ? (
        <div className="cat-list-container">
          {children}
          {cats.map((cat: CatType, index: number) => (
            <div
              key={cat.id}
              className="cat-track-wrapper"
              style={{ top: `${index * HEIGHT_FOR_CAT_TRACK}px` }}
            >
              <CatTrackContainer
                cat={cat}
                trackWidth={trackWidth}
                position={positions[cat.id] || 0}
                totalDistance={totalDistance}
                velocity={velocities[cat.id] || 0}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No data</p>
      )}
    </div>
  );
}

export default CatListContainer;

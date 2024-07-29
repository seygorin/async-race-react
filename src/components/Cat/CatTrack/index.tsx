import React from "react";
import CatButtons from "@components/Cat/CatButtons";
import Cat from "@containers/CatContainer";
import { Cat as CatType } from "@store/slices/garageSlice";
import "./index.css";

interface CatControlProps {
  onStartEngine: () => void;
  onStopEngine: () => void;
  onEditCat: () => void;
  onDeleteCat: () => void;
}

interface CatTrackProps {
  cat: CatType;
  trackWidth: number;
  position: number;
  totalDistance: number;
  velocity: number;
  catControlProps: CatControlProps;
}

function CatTrack({
  cat,
  trackWidth,
  position,
  totalDistance,
  velocity,
  catControlProps,
}: CatTrackProps) {
  return (
    <div className="cat-track-container">
      <div className="cat-track-controls">
        <CatButtons
          onStartEngine={catControlProps.onStartEngine}
          onStopEngine={catControlProps.onStopEngine}
          onEditCat={catControlProps.onEditCat}
          onDeleteCat={catControlProps.onDeleteCat}
          velocity={velocity}
        />
        <div
          className="cat-track"
          style={{
            width: `${trackWidth}px`,
          }}
        >
          <div className="cat-track-line" />
          <Cat
            cat={cat}
            velocity={velocity}
            position={position}
            totalDistance={totalDistance}
            trackWidth={trackWidth}
          />
        </div>
      </div>
    </div>
  );
}

export default CatTrack;

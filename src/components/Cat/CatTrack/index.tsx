import CatButtons from "@components/Cat/CatButtons";
import Cat from "@containers/CatContainer";
import { Cat as CatType } from "@type/catsTypes";
import "./index.css";

interface CatTrackProps {
  cat: CatType;
  trackWidth: number;
  position: number;
  totalDistance: number;
  velocity: number;
  onStartEngine: () => void;
  onStopEngine: () => void;
  onEditCat: () => void;
  onDeleteCat: () => void;
}

function CatTrack({
  cat,
  trackWidth,
  position,
  totalDistance,
  velocity,
  onStartEngine,
  onStopEngine,
  onEditCat,
  onDeleteCat,
}: CatTrackProps) {
  return (
    <div className="cat-track-container">
      <div className="cat-track-controls">
        <CatButtons
          onStartEngine={onStartEngine}
          onStopEngine={onStopEngine}
          onEditCat={onEditCat}
          onDeleteCat={onDeleteCat}
          velocity={velocity}
          cat={cat.id}
        />
        <div className="cat-track" style={{ width: `${trackWidth}px` }}>
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

import useRaceActions from "@hooks/Race/useRaceActions";
import useEditCat from "@hooks/Cats/useEditCat";
import CatTrack from "@components/Cat/CatTrack";
import useCatList from "@hooks/Cats/useCatList";
import { Cat as CatType } from "@type/catsTypes";

interface CatTrackContainerProps {
  cat: CatType;
  position: number;
  totalDistance: number;
  velocity: number;
  trackWidth: number;
}

function CatTrackContainer({
  cat,
  trackWidth,
  position,
  totalDistance,
  velocity,
}: CatTrackContainerProps) {
  const { handleDeleteCat } = useCatList();
  const { handleStartEngine, handleStopEngine } = useRaceActions();
  const handleEditCat = useEditCat();

  return (
    <CatTrack
      cat={cat}
      trackWidth={trackWidth}
      position={position}
      totalDistance={totalDistance}
      velocity={velocity}
      onStartEngine={() => handleStartEngine(cat.id)}
      onStopEngine={() => handleStopEngine(cat.id)}
      onEditCat={() => handleEditCat(cat)}
      onDeleteCat={() => handleDeleteCat(cat.id)}
    />
  );
}

export default CatTrackContainer;

import useRaceActions from "@hooks/useRaceActions";
import useEditCat from "@hooks/useEditCat";
import CatTrack from "@components/Cat/CatTrack";
import { Cat as CatType } from "@store/slices/garageSlice";
import { useCatList } from "@containers/CatListContainer/hook/useCatList";

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
  const handleEditCat = useEditCat(useCatList.cats);

  const catControlProps = {
    onStartEngine: () => handleStartEngine(cat.id),
    onStopEngine: () => handleStopEngine(cat.id),
    onEditCat: () => handleEditCat(cat.id),
    onDeleteCat: () => handleDeleteCat(cat.id),
  };

  return (
    <CatTrack
      cat={cat}
      trackWidth={trackWidth}
      position={position}
      totalDistance={totalDistance}
      velocity={velocity}
      catControlProps={catControlProps}
    />
  );
}

export default CatTrackContainer;

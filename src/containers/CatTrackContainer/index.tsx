import { useDispatch } from "react-redux";
import { setEditingCat } from "@store/slices/catFormSlice";
import useGaragePage from "../../hooks/useGaragePage";
import useEngineControl from "../../hooks/useEngineControls";
import CatTrack from "../../components/Cat/CatTrack";

const CatTrackContainer = ({
  cat,
  trackWidth,
  isRacing,
  position,
  totalDistance,
  velocity,
}) => {
  const dispatch = useDispatch();
  const { garageContentProps } = useGaragePage();
  const { handleDeleteCat, handleStartEngine, handleStopEngine } =
    garageContentProps;

  const { startEngine, stopEngine, error } = useEngineControl(
    cat.id,
    handleStartEngine,
    handleStopEngine,
  );

  const handleEditCat = (id) => {
    const catToEdit = garageContentProps.cats.find((cat) => cat.id === id);
    if (catToEdit) {
      dispatch(
        setEditingCat({
          id: catToEdit.id,
          name: catToEdit.name,
          color: catToEdit.color,
        }),
      );
    }
  };

  const catControlProps = {
    onStartEngine: startEngine,
    onStopEngine: stopEngine,
    onEditCat: () => handleEditCat(cat.id),
    onDeleteCat: () => handleDeleteCat(cat.id),
  };

  return (
    <CatTrack
      cat={cat}
      trackWidth={trackWidth}
      isRacing={isRacing}
      position={position}
      totalDistance={totalDistance}
      velocity={velocity}
      error={error}
      catControlProps={catControlProps}
    />
  );
};

export default CatTrackContainer;

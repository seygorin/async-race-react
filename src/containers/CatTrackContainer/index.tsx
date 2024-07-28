import React from "react";
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
  const { garageContentProps } = useGaragePage();
  const {
    handleEditCat,
    handleDeleteCat,
    handleStartEngine,
    handleStopEngine,
  } = garageContentProps;

  const { startEngine, stopEngine, error } = useEngineControl(
    cat.id,
    handleStartEngine,
    handleStopEngine,
  );

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

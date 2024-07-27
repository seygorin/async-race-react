import Track from "../Track/Track";
import GaragePagination from "./GaragePagination";

function GarageContent({
  cars,
  positions,
  isRacing,
  handleEditCar,
  handleDeleteCar,
  handleStartEngine,
  handleStopEngine,
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) {
  return (
    <>
      <Track
        cars={cars}
        positions={positions}
        handleEditCar={handleEditCar}
        handleDeleteCar={handleDeleteCar}
        handleStartEngine={handleStartEngine}
        handleStopEngine={handleStopEngine}
        isRacing={isRacing}
      />
      <GaragePagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default GarageContent;

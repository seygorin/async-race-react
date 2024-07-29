import { useSelector } from "react-redux";
import TrackContainer from "@containers/TrackContainer";
import GaragePagination from "@components/Garage/GaragePagination";
import useGaragePage from "@hooks/useGaragePage";
import { RootState } from "@store/store";

function GarageContentContainer() {
  const { totalCount, currentPage } = useSelector(
    (state: RootState) => state.garage,
  );

  const { garageContentProps } = useGaragePage();
  const { pageSize, onPageChange } = garageContentProps;

  return (
    <>
      <TrackContainer />
      <GaragePagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default GarageContentContainer;

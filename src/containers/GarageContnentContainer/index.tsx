import Track from "../TrackContainer";
import GaragePagination from "../../components/Garage/GaragePagination";
import useGaragePage from "../../hooks/useGaragePage";

function GarageContent() {
  const { garageContentProps } = useGaragePage();
  const { currentPage, totalCount, pageSize, onPageChange } =
    garageContentProps;

  return (
    <>
      <Track />
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

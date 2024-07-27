import Track from "../Track/Track";
import GaragePagination from "./GaragePagination";
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

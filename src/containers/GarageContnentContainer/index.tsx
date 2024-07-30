import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import GaragePagination from "@components/Garage/GaragePagination";
import CustomButton from "@components/common/Button";
import TrackContainer from "@containers/TrackContainer";
import WinnerModalContainer from "@containers/WinnerModalContainer";
import useGaragePage from "@hooks/useGaragePage";

import "./index.css";

function GarageContentContainer() {
  const dispatch = useDispatch();
  const { totalCount, currentPage } = useSelector(
    (state: RootState) => state.garage,
  );

  const { garageContentProps, isModalVisible, handleCloseModal } =
    useGaragePage();
  const { onPageChange } = garageContentProps;

  const toggleModal = () => {
    if (isModalVisible) {
      handleCloseModal();
    } else {
      dispatch({ type: "modal/showModal" });
    }
  };

  return (
    <>
      <TrackContainer />
      <GaragePagination
        currentPage={currentPage}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
      <CustomButton onClick={toggleModal}>
        {isModalVisible ? "Close Winner" : "Show Winner"}
      </CustomButton>
      <WinnerModalContainer />
    </>
  );
}

export default GarageContentContainer;

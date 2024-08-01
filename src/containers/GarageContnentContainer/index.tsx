import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { useNavigate } from "react-router-dom";
import GaragePagination from "@components/Garage/GaragePagination";
import CustomButton from "@components/common/Button";
import TrackContainer from "@containers/TrackContainer";
import WinnerModalContainer from "@containers/WinnerModalContainer";
import useGaragePage from "@hooks/useGaragePage";

import "./index.css";

function GarageContentContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalCount, currentPage } = useSelector(
    (state: RootState) => state.garage,
  );

  const { garageContentProps, isModalVisible, handleCloseModal } =
    useGaragePage();
  const { onPageChange } = garageContentProps;

  const handlePageChange = (page: number) => {
    onPageChange(page);
    if (page === 1) {
      navigate("/garage");
    } else {
      navigate(`/garage/${page}`);
    }
  };

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
        onPageChange={handlePageChange}
      />
      <CustomButton onClick={toggleModal}>
        {isModalVisible ? "Close Winner" : "Show Winner"}
      </CustomButton>
      <WinnerModalContainer />
    </>
  );
}

export default GarageContentContainer;

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "@store/store";
import GaragePagination from "@components/Garage/GaragePagination";
import CustomButton from "@components/common/Button";
import TrackContainer from "@containers/TrackContainer";
import WinnerModalContainer from "@containers/WinnerModalContainer";
import { usePageChange } from "@containers/CatListContainer/hook/useCatList";
import useModal from "@containers/WinnerModalContainer/hook/useModal";

import "./index.css";

function GarageContentContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { totalCount, currentPage } = useSelector(
    (state: RootState) => state.garage,
  );

  const { handlePageChange: onPageChange } = usePageChange();
  const { isModalVisible, handleCloseModal } = useModal();

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

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@store/store";
import GaragePagination from "@components/Garage/GaragePagination";
import CustomButton from "@components/common/Button";
import TrackContainer from "@containers/TrackContainer";
import WinnerModalContainer from "@containers/WinnerModalContainer";
import usePageChange from "@hooks/Track/usePageChange";
import useModal from "@hooks/Modal/useModal";
import useStateApp from "@hooks/useStateApp";

import "./index.css";

function GarageContentContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { currentPage, totalCount } = useStateApp();
  const { handlePageChange: onPageChange } = usePageChange();
  const { isModalVisible, handleCloseModal } = useModal();

  const handlePageChange = (page: number) => {
    onPageChange(page);
    navigate(page === 1 ? "/garage" : `/garage/${page}`);
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

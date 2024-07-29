import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "@store/slices/modalSlice";
import { RootState, AppDispatch } from "@store/store";

const useModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isModalVisible = useSelector(
    (state: RootState) => state.modal.isModalVisible,
  );

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  return {
    isModalVisible,
    handleCloseModal,
  };
};

export default useModal;

import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "@store/slices/modalSlice";

const useModal = () => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  return {
    isModalVisible,
    handleCloseModal,
  };
};

export default useModal;

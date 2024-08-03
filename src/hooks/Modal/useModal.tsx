import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { closeModal } from "@store/slices/modalSlice";

const useModal = () => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state: RootState) => state.modal.isModalVisible);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return { isModalVisible, handleCloseModal };
};

export default useModal;

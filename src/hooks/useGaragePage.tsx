import useModal from "@containers/WinnerModalContainer/hook/useModal";
import useCatForm from "./useCatForm";
import useGarageContent from "./useGarageContent";

const useGaragePage = () => {
  const garageContentProps = useGarageContent();
  const catFormProps = useCatForm(garageContentProps);
  const modal = useModal();

  return {
    isModalVisible: modal.isModalVisible,
    catFormProps,
    garageContentProps,
    handleCloseModal: modal.handleCloseModal,
  };
};

export default useGaragePage;

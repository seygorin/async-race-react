import useModal from "@containers/WinnerModalContainer/hook/useModal";
import useCatForm from "./useCatForm";
import useGarageContent from "./useGarageContent";

const useGaragePage = () => {
  const catList = useGarageContent();
  const catFormProps = useCatForm(catList);
  const modal = useModal();

  return {
    isModalVisible: modal.isModalVisible,
    catFormProps,
    garageContentProps: catList,
    handleCloseModal: modal.handleCloseModal,
  };
};

export default useGaragePage;

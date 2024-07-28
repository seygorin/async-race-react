import useCatList from "@containers/CatListContainer/hook/useCatList";
import useModal from "@containers/WinnerModalContainer/hook/useModal";
import useRace from "./useRace";
import useCatForm from "./useCatForm";

const useGaragePage = () => {
  const catList = useCatList();
  const race = useRace(catList.cats);
  const modal = useModal();
  const catForm = useCatForm(
    catList.handleAddCat,
    catList.handleUpdateCat,
    catList.cats,
  );

  const catFormProps = {
    catName: catForm.catName,
    catColor: catForm.catColor,
    setCatName: catForm.setCatName,
    setCatColor: catForm.setCatColor,
    handleAddCat: catForm.handleAddOrUpdateCat,
    editingCat: catForm.editingCat,
  };

  const garageContentProps = {
    ...catList,
    ...race,
    handleEditCat: catForm.handleEditCat,
    pageSize: 7,
    onPageChange: catList.handlePageChange,
  };

  return {
    isModalVisible: modal.isModalVisible,
    catFormProps,
    garageContentProps,
    handleCloseModal: modal.handleCloseModal,
  };
};

export default useGaragePage;

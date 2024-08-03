import CustomButton from "@components/common/Button";

interface EditDeleteButtonsProps {
  onEditCat: () => void;
  onDeleteCat: () => void;
  isDeleteButtonDisabled: boolean;
}

function EditDeleteButtons({
  onEditCat,
  onDeleteCat,
  isDeleteButtonDisabled,
}: EditDeleteButtonsProps) {
  return (
    <div className="cat-buttons-column">
      <CustomButton onClick={onEditCat} size="small">
        Edit
      </CustomButton>
      <CustomButton onClick={onDeleteCat} size="small" disabled={isDeleteButtonDisabled}>
        Delete
      </CustomButton>
    </div>
  );
}

export default EditDeleteButtons;

import CustomButton from "@components/common/Button";
import "./index.css";

interface CatButtonsProps {
  onStartEngine: () => void;
  onStopEngine: () => void;
  onEditCat: () => void;
  onDeleteCat: () => void;
  velocity: number;
}

function CatButtons({
  onStartEngine,
  onStopEngine,
  onEditCat,
  onDeleteCat,
  velocity,
}: CatButtonsProps) {
  return (
    <div className="cat-buttons-container">
      <div className="cat-buttons-column">
        <CustomButton onClick={onEditCat} size="small">
          Edit
        </CustomButton>
        <CustomButton onClick={onDeleteCat} size="small">
          Delete
        </CustomButton>
      </div>
      <div className="cat-buttons-column">
        <CustomButton
          onClick={onStartEngine}
          disabled={velocity > 0}
          size="small"
        >
          Start
        </CustomButton>
        <CustomButton
          onClick={onStopEngine}
          disabled={velocity === 0}
          size="small"
        >
          Stop
        </CustomButton>
      </div>
    </div>
  );
}

export default CatButtons;

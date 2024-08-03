import CustomButton from "@components/common/Button";
import useStateApp from "@hooks/useStateApp";

import "./index.css";

interface CatButtonsProps {
  cat: number;
  onStartEngine: () => void;
  onStopEngine: () => void;
  onEditCat: () => void;
  onDeleteCat: () => void;
  velocity: number;
}

function CatButtons({
  cat,
  onStartEngine,
  onStopEngine,
  onEditCat,
  onDeleteCat,
  velocity,
}: CatButtonsProps) {
  const { status } = useStateApp();

  const isCatLoading = status[cat] === "loading";

  const isStartButtonDisabled = isCatLoading || velocity > 0;
  const isStopButtonDisabled = isCatLoading || velocity === 0;

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
          disabled={isStartButtonDisabled}
          size="small"
        >
          Start
        </CustomButton>
        <CustomButton onClick={onStopEngine} disabled={isStopButtonDisabled} size="small">
          Stop
        </CustomButton>
      </div>
    </div>
  );
}

export default CatButtons;

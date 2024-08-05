import useStateApp from "@hooks/useStateApp";
import EditDeleteButtons from "./EditDeleteButtons";
import StartStopButtons from "./StartStopButtons";

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
  const { status, stoppedCats } = useStateApp();
  const isCatLoading = status[cat] === "loading";
  const isCatStopped = stoppedCats.includes(cat);
  const isStartButtonDisabled = isCatLoading || velocity > 0 || isCatStopped;
  const isStopButtonDisabled = isCatLoading || velocity === 0;
  const isDeleteButtonDisabled = isCatLoading;

  return (
    <div className="cat-buttons-container">
      <EditDeleteButtons
        onEditCat={onEditCat}
        onDeleteCat={onDeleteCat}
        isDeleteButtonDisabled={isDeleteButtonDisabled}
      />
      <StartStopButtons
        onStartEngine={onStartEngine}
        onStopEngine={onStopEngine}
        isStartButtonDisabled={isStartButtonDisabled}
        isStopButtonDisabled={isStopButtonDisabled}
      />
    </div>
  );
}

export default CatButtons;

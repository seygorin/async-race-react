import CustomButton from "@components/common/Button";

interface StartStopButtonsProps {
  onStartEngine: () => void;
  onStopEngine: () => void;
  isStartButtonDisabled: boolean;
  isStopButtonDisabled: boolean;
}

function StartStopButtons({
  onStartEngine,
  onStopEngine,
  isStartButtonDisabled,
  isStopButtonDisabled,
}: StartStopButtonsProps) {
  return (
    <div className="cat-buttons-column">
      <CustomButton onClick={onStartEngine} disabled={isStartButtonDisabled} size="small">
        Start
      </CustomButton>
      <CustomButton onClick={onStopEngine} disabled={isStopButtonDisabled} size="small">
        Stop
      </CustomButton>
    </div>
  );
}

export default StartStopButtons;

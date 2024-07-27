import CustomButton from "../Button/CustomButton";

const CarButtons = ({
  onStartEngine,
  onStopEngine,
  onEditCar,
  onDeleteCar,
  isRacing,
  velocity,
}) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <CustomButton
          onClick={onStartEngine}
          disabled={isRacing || velocity > 0}
          size="small"
        >
          Start
        </CustomButton>
        <CustomButton
          onClick={onStopEngine}
          disabled={!isRacing || velocity === 0}
          size="small"
        >
          Stop
        </CustomButton>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <CustomButton onClick={onEditCar} size="small">
          Edit
        </CustomButton>
        <CustomButton onClick={onDeleteCar} size="small">
          Delete
        </CustomButton>
      </div>
    </div>
  );
};

export default CarButtons;

import CustomButton from "../Button/CustomButton";

function CatButtons({
  onStartEngine,
  onStopEngine,
  onEditCat,
  onDeleteCat,
  isRacing,
  velocity,
}) {
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
        <CustomButton onClick={onEditCat} size="small">
          Edit
        </CustomButton>
        <CustomButton onClick={onDeleteCat} size="small">
          Delete
        </CustomButton>
      </div>
    </div>
  );
}

export default CatButtons;

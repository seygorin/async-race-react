import { Button } from "antd";

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
        <Button
          onClick={onStartEngine}
          disabled={isRacing || velocity > 0}
          size="small"
        >
          Start
        </Button>
        <Button
          onClick={onStopEngine}
          disabled={!isRacing || velocity === 0}
          size="small"
        >
          Stop
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <Button onClick={onEditCar}  size="small">
          Edit
        </Button>
        <Button onClick={onDeleteCar}  size="small">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CarButtons;

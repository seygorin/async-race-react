import { Col } from "antd";
import Car from "../Car/Car";

function TrackCar({
  car,
  velocity,
  isRacing,
  position,
  handlers,
  totalDistance,
  trackWidth,
}) {
  return (
    <Col span={24} style={{ marginBottom: "20px" }}>
      <Car
        car={car}
        velocity={velocity}
        isRacing={isRacing}
        position={position}
        handleEditCar={handlers.handleEditCar}
        handleDeleteCar={handlers.handleDeleteCar}
        handleStartEngine={handlers.handleStartEngine}
        handleStopEngine={handlers.handleStopEngine}
        totalDistance={totalDistance}
        trackWidth={trackWidth}
      />
    </Col>
  );
}

export default TrackCar;

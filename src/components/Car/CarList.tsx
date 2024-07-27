import { Row, Col } from "antd";
import Car from "./Car";

const CarList = ({
  cars,
  velocities,
  isRacing,
  positions,
  handleEditCar,
  handleDeleteCar,
  handleStartEngine,
  handleStopEngine,
  totalDistance,
  trackWidth,
}) => {
  return (
    <Row gutter={16} style={{ marginTop: "20px" }}>
      {Array.isArray(cars) &&
        cars.map((car) => (
          <Col span={24} key={car.id} style={{ marginBottom: "20px" }}>
            <Car
              car={car}
              velocity={velocities[car.id] || 0}
              isRacing={isRacing}
              position={positions[car.id] || 0}
              handleEditCar={handleEditCar}
              handleDeleteCar={handleDeleteCar}
              handleStartEngine={handleStartEngine}
              handleStopEngine={handleStopEngine}
              totalDistance={totalDistance}
              trackWidth={trackWidth}
            />
          </Col>
        ))}
    </Row>
  );
};

export default CarList;

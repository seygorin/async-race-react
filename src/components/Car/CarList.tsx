import { useMemo } from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";

import Car from "./Car";
import useGaragePage from "../../hooks/useGaragePage";

function CarList({ trackWidth }) {
  const { garageContentProps } = useGaragePage();
  const { cars, isRacing, positions } = garageContentProps;
  const distances = useSelector((state) => state.engine.distances);

  const totalDistance = useMemo(() => {
    const distanceValues = Object.values(distances);
    return Math.max(...distanceValues);
  }, [distances]);

  const velocities = useSelector((state) => state.engine.velocities);

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
              totalDistance={totalDistance}
              trackWidth={trackWidth}
            />
          </Col>
        ))}
    </Row>
  );
}

export default CarList;

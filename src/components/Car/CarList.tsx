import { useMemo } from "react";
import { useSelector } from "react-redux";
import useGaragePage from "../../hooks/useGaragePage";
import CarTrack from "./CarTrack";

function CarList({ trackWidth }) {
  const { garageContentProps } = useGaragePage();
  const { cars, isRacing, positions } = garageContentProps;
  const distances = useSelector((state) => state.engine.distances);
  const velocities = useSelector((state) => state.engine.velocities);

  const totalDistance = useMemo(() => {
    const distanceValues = Object.values(distances);
    return Math.max(...distanceValues);
  }, [distances]);

  return (
    <div>
      {Array.isArray(cars) &&
        cars.map((car) => (
          <CarTrack
            key={car.id}
            car={car}
            trackWidth={trackWidth}
            isRacing={isRacing}
            position={positions[car.id] || 0}
            totalDistance={totalDistance}
            velocity={velocities[car.id] || 0}
          />
        ))}
    </div>
  );
}

export default CarList;

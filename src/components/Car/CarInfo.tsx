function CarInfo({ car, position, totalDistance, velocity }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "100px",
        right: "0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <span>{car.name}</span>
      <span>
        {Math.round(position)} / {totalDistance} (Velocity: {velocity})
      </span>
    </div>
  );
}

export default CarInfo;

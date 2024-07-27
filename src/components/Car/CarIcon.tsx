function CarIcon({ car, carRef }) {
  return (
    <div
      ref={carRef}
      style={{
        position: "absolute",
        top: "10px",
        left: "30px",
        width: "50px",
        height: "30px",
        backgroundColor: car.color,
        transition: "transform 0.1s linear",
        zIndex: 1,
      }}
    />
  );
}

export default CarIcon;

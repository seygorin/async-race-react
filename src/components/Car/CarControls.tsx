import React from "react";
import { Button } from "antd";

function CarControls({
  handleGenerateRandomCars,
  handleStartRace,
  handleStopRace,
}) {
  return (
    <>
      <Button type="primary" onClick={handleGenerateRandomCars}>
        Generate 100 Random Cars
      </Button>
      <Button
        type="primary"
        onClick={handleStartRace}
        style={{ marginLeft: "10px" }}
      >
        Start Race
      </Button>
      <Button onClick={handleStopRace} style={{ marginLeft: "10px" }}>
        Reset Race
      </Button>
    </>
  );
}

export default CarControls;

import CustomButton from "../Button/CustomButton";

function CarControls({
  handleGenerateRandomCars,
  handleStartRace,
  handleStopRace,
}) {
  return (
    <>
      <CustomButton onClick={handleGenerateRandomCars}>
        Generate 100 Random Cars
      </CustomButton>
      <CustomButton onClick={handleStartRace} style={{ marginLeft: "10px" }}>
        Start Race
      </CustomButton>
      <CustomButton onClick={handleStopRace} style={{ marginLeft: "10px" }}>
        Reset Race
      </CustomButton>
    </>
  );
}

export default CarControls;

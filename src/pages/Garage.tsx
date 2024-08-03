import WinnerModalContainer from "@containers/WinnerModalContainer";
import GarageHeader from "@components/Garage/GarageHeader";
import GarageContent from "@containers/GarageContnentContainer";

function Garage() {
  return (
    <>
      <GarageHeader />

      <GarageContent />
      <WinnerModalContainer />
    </>
  );
}

export default Garage;

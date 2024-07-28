import WinnerModalContainer from "../containers/WinnerModalContainer";
import GarageHeader from "../components/Garage/GarageHeader";
import GarageContent from "../containers/GarageContnentContainer";

function Garage() {
  return (
    <div>
      <GarageHeader />
      <GarageContent />
      <WinnerModalContainer />
    </div>
  );
}

export default Garage;

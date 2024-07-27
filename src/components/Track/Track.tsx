import { useTrackWidth } from "../../hooks/useTrackWidth";
import StartLine from "./StartLine";
import FinishLine from "./FinishLine";
import CarList from "../Car/CarList";

function Track() {
  const trackWidth = useTrackWidth();

  return (
    <div
      style={{
        position: "relative",
        marginTop: "20px",
        width: `${trackWidth}px`,
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <StartLine />
      <FinishLine totalDistance={trackWidth} />
      <CarList trackWidth={trackWidth} />
    </div>
  );
}

export default Track;

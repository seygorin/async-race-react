import useTrackWidth from "@hooks/useTrackWidth";
import StartLine from "@components/Track/StartLine";
import FinishLine from "@components/Track/FinishLine";
import CatListContainer from "@containers/CatListContainer";
import "./index.css";

function TrackContainer() {
  const trackWidth = useTrackWidth();

  return (
    <div
      className="track-container"
      style={{
        width: `${trackWidth}px`,
      }}
    >
      <StartLine />
      <FinishLine />
      <CatListContainer trackWidth={trackWidth} />
    </div>
  );
}

export default TrackContainer;

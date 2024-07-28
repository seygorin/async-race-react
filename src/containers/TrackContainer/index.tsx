import { useTrackWidth } from "@hooks/useTrackWidth";
import StartLine from "@components/Track/StartLine";
import FinishLine from "@components/Track/FinishLine";
import CatListContainer from "@containers/CatListContainer";

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
      <FinishLine />
      <CatListContainer trackWidth={trackWidth} />
    </div>
  );
}

export default Track;

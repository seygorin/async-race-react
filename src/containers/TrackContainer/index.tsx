import useTrackWidth from "@hooks/useTrackWidth";
import StartLine from "@components/Track/StartLine";
import useGaragePage from "@hooks/useGaragePage";
import FinishLine from "@components/Track/FinishLine";
import CatListContainer from "@containers/CatListContainer";
import "./index.css";

function TrackContainer() {
  const trackWidth = useTrackWidth();

  const { garageContentProps } = useGaragePage();
  const catsCount = garageContentProps.cats.length;

  return (
    <div
      className="track-container"
      style={{
        width: `${trackWidth}px`,
      }}
    >
      <CatListContainer trackWidth={trackWidth}>
        <StartLine catsCount={catsCount} />
        <FinishLine catsCount={catsCount} />
      </CatListContainer>
    </div>
  );
}

export default TrackContainer;

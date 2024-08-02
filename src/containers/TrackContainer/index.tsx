import useTrackWidth from "@hooks/Track/useTrackWidth";
import StartLine from "@components/Track/StartLine";

import FinishLine from "@components/Track/FinishLine";
import CatListContainer from "@containers/CatListContainer";
import useCatList from "@hooks/Cats/useCatList";
import "./index.css";

function TrackContainer() {
  const trackWidth = useTrackWidth();
  const { cats } = useCatList();

  const catsCount = cats.length;

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

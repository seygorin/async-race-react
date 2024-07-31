import "./index.css";

interface StartLineProps {
  catsCount: number;
}

const MINIMAL_HEIGHT = 68;

function StartLine({ catsCount }: StartLineProps) {
  const startLineHeight = Math.max(catsCount * MINIMAL_HEIGHT);

  return (
    <div
      className="start-line"
      style={{
        height: `${startLineHeight}px`,
        transition: "height 0.5s ease-in-out",
      }}
    >
      <div className="start-line-inner">
        <span className="start-line-text">Start</span>
      </div>
    </div>
  );
}

export default StartLine;

import "./index.css";

interface FinishLineProps {
  catsCount: number;
}
const MINIMAL_HEIGHT = 68;

function FinishLine({ catsCount }: FinishLineProps) {
  const finishLineHeight = Math.max(catsCount * MINIMAL_HEIGHT);

  return (
    <div
      className="finish-line"
      style={{
        height: `${finishLineHeight}px`,
        transition: "height 0.5s ease-in-out",
      }}
    >
      <div className="finish-line-inner">
        <span className="finish-line-text">Finish</span>
      </div>
    </div>
  );
}

export default FinishLine;

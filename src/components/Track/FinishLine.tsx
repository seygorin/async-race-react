import finishLineSVG from "../../assets/finish-line.svg";

const FinishLine = ({ totalDistance }) => (
  <div
    style={{
      position: "absolute",
      right: "0",
      top: "0",
      bottom: "0",
      width: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <img
      src={finishLineSVG}
      alt="Finish Line"
      style={{ height: "100%", width: "20px" }}
    />
    <span
      style={{ position: "absolute", bottom: "-20px", whiteSpace: "nowrap" }}
    >
      Finish ({totalDistance})
    </span>
  </div>
);

export default FinishLine;

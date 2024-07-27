import startLineSVG from "../../assets/start-line.svg";

const StartLine = () => (
  <div
    style={{
      position: "absolute",
      left: "200px",
      top: "0",
      bottom: "0",
      width: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <img
      src={startLineSVG}
      alt="Start Line"
      style={{ height: "100%", width: "20px" }}
    />
    <span
      style={{ position: "absolute", bottom: "-20px", whiteSpace: "nowrap" }}
    >
      Start (0)
    </span>
  </div>
);

export default StartLine;

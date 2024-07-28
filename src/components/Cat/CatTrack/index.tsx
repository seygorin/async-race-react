import CatButtons from "@components/Cat/CatButtons";
import Cat from "@containers/CatContainer";

const CatTrack = ({
  cat,
  trackWidth,
  isRacing,
  position,
  totalDistance,
  velocity,
  error,
  catControlProps,
}) => (
  <div style={{ marginBottom: "20px" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        width: "100%",
      }}
    >
      <CatButtons
        {...catControlProps}
        isRacing={isRacing}
        velocity={velocity}
      />
      <div
        style={{
          width: `${trackWidth}px`,
          height: "50px",
          position: "relative",
          background: "#638e9e",
          overflow: "hidden",
          marginLeft: "20px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "4px",
            background:
              "repeating-linear-gradient(90deg, #fff, #fff 20px, transparent 20px, transparent 40px)",
          }}
        />
        <Cat
          cat={cat}
          velocity={velocity}
          position={position}
          totalDistance={totalDistance}
          trackWidth={trackWidth}
        />
      </div>
      {error && <div style={{ marginLeft: "10px", color: "red" }}>{error}</div>}
    </div>
  </div>
);

export default CatTrack;

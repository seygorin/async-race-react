const FinishLine = () => (
  <div
    style={{
      position: "absolute",
      zIndex: "1",
      right: "50px",
      top: "0",
      bottom: "20px",
    }}
  >
    <div
      style={{
        position: "relative",
        width: "4px",
        height: "100%",
        backgroundColor: "#fa94ac",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          position: "absolute",
          transform: "translateX(-50%) rotate(90deg)",
          whiteSpace: "nowrap",
          color: "#fa94ac",
          right: "-45px",
          fontSize: "22px",
          fontWeight: "bold",
          textShadow: `
					-1px -1px 0 #000,
					1px -1px 0 #000,
					-1px 1px 0 #000,
					1px 1px 0 #000
				`,
        }}
      >
        Finish
      </span>
    </div>
  </div>
);

export default FinishLine;

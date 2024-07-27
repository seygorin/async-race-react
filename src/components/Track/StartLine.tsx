const StartLine = () => (
  <div
    style={{
      position: "absolute",
      left: "200px",
      top: "0",
      bottom: "0",
      width: "20px",
    }}
  >
    <div
      style={{
        position: "relative",
        zIndex: "1",
        width: "4px",
        height: "96%",
        backgroundColor: "#f5e5ff",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          position: "absolute",
          transform: "translateX(-50%) rotate(90deg)",
          whiteSpace: "nowrap",
          color: '#f5e5ff',
          left: "20px",
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
        Start
      </span>
    </div>
  </div>
);

export default StartLine;

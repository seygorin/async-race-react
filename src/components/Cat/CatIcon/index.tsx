import CatSitting from "@assets/CatSitting";
import CatStanding from "@assets/CatStanding";
import CatRunning from "@assets/CatRunning";
import "./index.css";

function CatIcon({ position, totalDistance, cat, catRef, velocities }) {
  let IconComponent = null;

  if (position >= totalDistance) {
    IconComponent = <CatSitting color={cat.color} />;
  } else if (velocities === 0) {
    IconComponent = <CatStanding color={cat.color} />;
  } else if (velocities > 1) {
    IconComponent = (
      <div className="cat-running">
        <CatRunning color={cat.color} />
      </div>
    );
  }

  return (
    <div
      ref={catRef}
      style={{
        position: "absolute",
        top: "5px",
        left: "10px",
        width: "50px",
        transition: "transform 0.1s linear",
        zIndex: 1,
      }}
    >
      {IconComponent}
    </div>
  );
}

export default CatIcon;

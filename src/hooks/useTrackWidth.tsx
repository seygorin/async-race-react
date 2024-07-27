import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useTrackWidth = () => {
  const [trackWidth, setTrackWidth] = useState(0);
  const distances = useSelector((state) => state.engine.distances);

  useEffect(() => {
    const maxDistance = Math.max(...Object.values(distances));
    
    const updateTrackWidth = () => {
      const windowWidth = window.innerWidth;
      const newTrackWidth =
        maxDistance > 0 ? (windowWidth / maxDistance) * maxDistance : windowWidth;
      setTrackWidth(newTrackWidth);
    };

    updateTrackWidth();

    window.addEventListener("resize", updateTrackWidth);

    return () => {
      window.removeEventListener("resize", updateTrackWidth);
    };
  }, [distances]);

  return trackWidth;
};

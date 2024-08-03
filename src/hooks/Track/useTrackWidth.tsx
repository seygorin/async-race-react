import { useState, useEffect } from "react";
import useStateApp from "@hooks/useStateApp";

const useTrackWidth = (): number => {
  const [trackWidth, setTrackWidth] = useState<number>(0);
  const distances = useStateApp();

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

export default useTrackWidth;

import { useState, useEffect } from "react";

const MIN_TRACK_WIDTH = 300;
const MAX_TRACK_WIDTH = 1500;

export const useTrackWidth = () => {
  const [trackWidth, setTrackWidth] = useState(MIN_TRACK_WIDTH);

  useEffect(() => {
    const updateTrackWidth = () => {
      const windowWidth = window.innerWidth;
      const newTrackWidth = Math.min(
        Math.max(windowWidth, MIN_TRACK_WIDTH),
        MAX_TRACK_WIDTH,
      );
      setTrackWidth(newTrackWidth);
    };

    updateTrackWidth();

    window.addEventListener("resize", updateTrackWidth);

    return () => {
      window.removeEventListener("resize", updateTrackWidth);
    };
  }, []);

  return trackWidth;
};

import React from "react";
import { Cat as CatType } from "@store/slices/garageSlice";
import "./index.css";

const PROGRESS_BASE = 100;

interface CatInfoProps {
  cat: CatType;
  position: number;
  totalDistance: number;
  velocity: number;
}

const getColor = (progress: number) => {
  const rainbowColors = [
    { hue: 275, saturation: 100, lightness: 50 },
    { hue: 250, saturation: 100, lightness: 50 },
    { hue: 240, saturation: 100, lightness: 50 },
    { hue: 120, saturation: 100, lightness: 50 },
    { hue: 60, saturation: 100, lightness: 50 },
    { hue: 30, saturation: 100, lightness: 50 },
    { hue: 0, saturation: 100, lightness: 50 },
  ];

  const numColors = rainbowColors.length;
  const index = (progress / PROGRESS_BASE) * (numColors - 1);
  const lowerIndex = Math.floor(index);
  const upperIndex = Math.ceil(index);

  const lowerColor = rainbowColors[lowerIndex];
  const upperColor = rainbowColors[upperIndex];

  const lerp = (start: number, end: number, t: number) =>
    start + (end - start) * t;
  const t = index - lowerIndex;

  const hue = lerp(lowerColor.hue, upperColor.hue, t);
  const saturation = lerp(lowerColor.saturation, upperColor.saturation, t);
  const lightness = lerp(lowerColor.lightness, upperColor.lightness, t);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const calculateProgress = (position: number, totalDistance: number) => {
  return (position / totalDistance) * PROGRESS_BASE;
};

function CatInfo({ cat, position, totalDistance, velocity }: CatInfoProps) {
  const progress = calculateProgress(position, totalDistance);
  const color = getColor(progress);

  return (
    <div className="cat-info-container">
      <span style={{ color: cat.color }}>{cat.name}</span>
      <span style={{ color }}>
        {Math.round(position / PROGRESS_BASE)} / {totalDistance / PROGRESS_BASE}{" "}
        (Velocity: {velocity})
      </span>
    </div>
  );
}

export default CatInfo;

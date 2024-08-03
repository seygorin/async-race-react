const PROGRESS_BASE = 100;

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

  const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
  const t = index - lowerIndex;

  const hue = lerp(lowerColor.hue, upperColor.hue, t);
  const saturation = lerp(lowerColor.saturation, upperColor.saturation, t);
  const lightness = lerp(lowerColor.lightness, upperColor.lightness, t);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export default getColor;

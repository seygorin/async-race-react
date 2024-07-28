function CatInfo({ cat, position, totalDistance, velocity }) {
  const progress = (position / totalDistance) * 100;

  const getColor = (progress) => {
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
    const index = (progress / 100) * (numColors - 1);
    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);

    const lowerColor = rainbowColors[lowerIndex];
    const upperColor = rainbowColors[upperIndex];

    const lerp = (start, end, t) => start + (end - start) * t;
    const t = index - lowerIndex;

    const hue = lerp(lowerColor.hue, upperColor.hue, t);
    const saturation = lerp(lowerColor.saturation, upperColor.saturation, t);
    const lightness = lerp(lowerColor.lightness, upperColor.lightness, t);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const color = getColor(progress);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
      }}
    >
      <span style={{ color: cat.color }}>{cat.name}</span>
      <span style={{ color: color }}>
        {Math.round(position / 100)} / {totalDistance / 100} (Velocity:{" "}
        {velocity})
      </span>
    </div>
  );
}

export default CatInfo;

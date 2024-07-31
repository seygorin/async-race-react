const mockData = {
  cats: [
    { id: 0, name: "Look", color: "#ff0000" },
    { id: 1, name: "At the", color: "#ff7f00" },
    { id: 2, name: "Readme", color: "#ffff00" },
    { id: 3, name: "This is", color: "#00ff00" },
    { id: 4, name: "A example", color: "#0000ff" },
    { id: 5, name: "To See", color: "#4b0082" },
    { id: 6, name: "In Action", color: "#9400d3" },
  ],
  totalCount: 7,
  startEngine: {
    cats: [
      { id: 0, velocity: 330, distance: 500000 },
      { id: 1, velocity: 320, distance: 500000 },
      { id: 2, velocity: 310, distance: 500000 },
      { id: 3, velocity: 220, distance: 500000 },
      { id: 4, velocity: 280, distance: 500000 },
      { id: 5, velocity: 150, distance: 500000 },
      { id: 6, velocity: 310, distance: 500000 },
    ],
  },
  stopEngine: { velocity: 0, distance: 0 },
  driveEngine: {
    cats: [
      { id: 0, distance: 0, success: false },
      { id: 1, distance: 0, success: false },
      { id: 2, distance: 0, success: false },
      { id: 3, distance: 0, success: false },
      { id: 4, distance: 0, success: false },
      { id: 5, distance: 0, success: false },
      { id: 6, distance: 0, success: false },
    ],
  },
};

export default mockData;

const breeds = [
  "Siamese",
  "Persian",
  "Bengal",
  "Sphynx",
  "Maine Coon",
  "Russian Blue",
  "Abyssinian",
  "Savannah",
  "Streeters",
  "Cat",
];
const catNames = [
  "Whiskers",
  "Mittens",
  "Fluffy",
  "Simba",
  "Cotic",
  "Axe",
  "Luna",
  "Ginger",
  "Salem",
  "Kitty",
  "Tiger",
];

export const generateRandomName = () => {
  const breed = breeds[Math.floor(Math.random() * breeds.length)];
  const name = catNames[Math.floor(Math.random() * catNames.length)];
  return `${breed} ${name}`;
};

export const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomCats = (count) => {
  return Array.from({ length: count }, () => ({
    name: generateRandomName(),
    color: generateRandomColor(),
  }));
};

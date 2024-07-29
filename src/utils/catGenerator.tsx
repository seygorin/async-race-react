const HEX_COLOR_LENGTH = 6;
const HEX_BASE = 16;

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
  for (let i = 0; i < HEX_COLOR_LENGTH; i += 1) {
    color += letters[Math.floor(Math.random() * HEX_BASE)];
  }
  return color;
};

export const generateRandomCats = (count: number) => {
  return Array.from({ length: count }, () => ({
    name: generateRandomName(),
    color: generateRandomColor(),
  }));
};

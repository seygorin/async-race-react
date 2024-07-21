const brands = ["Toyota", "Ford", "Honda", "Chevrolet", "BMW"];
const models = ["Camry", "F-150", "Civic", "Impala", "3 Series"];

export const generateRandomName = () => {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${brand} ${model}`;
};

export const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomCars = (count) => {
  return Array.from({ length: count }, () => ({
    name: generateRandomName(),
    color: generateRandomColor(),
  }));
};

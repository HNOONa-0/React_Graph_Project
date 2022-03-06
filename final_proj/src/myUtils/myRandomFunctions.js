// changes
// name changed from randomNumberGenerator to randomBetween
// now is end exclusive
export const randomBetween = (i, j) => {
  if ((!i && i !== 0) || !j) throw "no arguments were passed to randomBetween";
  if (i < 0 || j < 0) throw "negative numbers in randomBetween";
  if (i === j) throw "i is equal j";
  // j - 1 is how we make it exclusive, j only is inclusive
  return i + Math.floor(Math.random() * (j - 1 - i + 1));
};

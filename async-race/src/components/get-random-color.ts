const char = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

function randomIndex(arr: string[]) {
  return Math.floor(Math.random() * arr.length);
}

export const getRandomColor = (): string => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += `${char[randomIndex(char)]}`;
  }
  return color;
};

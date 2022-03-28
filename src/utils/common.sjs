export const isType = (type, completed) => {
  console.log(type, completed);
  return `${type}${completed ? '-completed' : ''}`;
}
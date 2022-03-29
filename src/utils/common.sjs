export const isType = (type, completed) => {
  return `${type}${completed ? '-completed' : ''}`;
}
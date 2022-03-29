export const isType = (type, completed) => {
  if (type !== 'list') return type;
  return `${type}${completed ? '-completed' : ''}`;
}
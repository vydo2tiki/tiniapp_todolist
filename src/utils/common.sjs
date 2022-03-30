export const isType = (type, completed) => {
  if (type === 'vertical') return type;
  return `${type}${completed ? '-completed' : ''}`;
}
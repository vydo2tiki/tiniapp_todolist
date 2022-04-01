export const CompareKey = (a, b, key, sortmode) => {
  if (key === 'description') {
    if (sortmode === 'desc') if (a[key] > b[key]) return sortmode === 'desc' ? 1 : -1;
    if (a[key] < b[key]) return sortmode === 'desc' ? -1 : 1;
    if (a[key] === b[key]) return 0;
  } else {
    const key_a = new Date(a[key]);
    const key_b = new Date(b[key]);
    if (key_a > key_b) return sortmode === 'asc' ? 1 : -1;
    if (key_a < key_b) return sortmode === 'asc' ? -1 : 1;
    if (key_a === key_b) return 0;
  }
};

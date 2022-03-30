export const CompareKey = (a, b, key, sortmode) => {
  if (key === 'description') {
    console.log(a[key], b[key]);
    if (sortmode === 'desc') {
      return a[key] > b[key];
    }
    return a[key] <= b[key];
  } else {
    const key_a = new Date(a[key]);
    const key_b = new Date(b[key]);
    if (sortmode === 'desc') {
      return key_a > key_b;
    }
    return key_a <= key_b;
  }
}
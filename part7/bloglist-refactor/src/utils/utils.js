export const sortByValues = (obj, el) =>
  obj.sort((a, b) => (a[el] < b[el] ? 1 : b[el] < a[el] ? -1 : 0))

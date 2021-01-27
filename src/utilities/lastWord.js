export const lastWord = (words) => {
  if (words === null || words === undefined) {
    return '';
  }

  var n = words.split(' ');
  return n[n.length - 1];
};

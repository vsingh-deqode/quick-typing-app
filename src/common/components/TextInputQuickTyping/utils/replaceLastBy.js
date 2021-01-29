export const replaceLastBy = (replacement, groupOfWords) => {
  if (!groupOfWords) {
    return '';
  }

  if (!replacement) {
    return groupOfWords;
  }

  const wordsArray = groupOfWords.split(' ');
  wordsArray.pop();
  wordsArray.push(replacement);

  return wordsArray.join(' ');
};

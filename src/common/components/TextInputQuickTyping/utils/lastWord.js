export const lastWord = (groupOfWords) => {
  if (!groupOfWords) {
    return '';
  }

  const wordsArray = groupOfWords.split(' ');
  return wordsArray[wordsArray.length - 1];
};

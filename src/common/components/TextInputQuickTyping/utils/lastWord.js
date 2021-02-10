import {SPACE_DELIMITER} from '../constants';

export const lastWord = (groupOfWords) => {
  if (!groupOfWords) {
    return '';
  }

  const wordsArray = groupOfWords.split(SPACE_DELIMITER);
  return wordsArray[wordsArray.length - 1];
};

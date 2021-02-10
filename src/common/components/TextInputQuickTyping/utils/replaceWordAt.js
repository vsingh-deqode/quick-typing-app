import {SPACE_DELIMITER} from '../constants';

export const replaceWordAt = (index, word, groupOfWords) => {
  if (!groupOfWords) {
    return '';
  }

  if (!word || index < 0) {
    return groupOfWords;
  }

  const wordsArray = groupOfWords.split(SPACE_DELIMITER);
  wordsArray.splice(index, 1, word);
  return wordsArray.join(SPACE_DELIMITER);
};

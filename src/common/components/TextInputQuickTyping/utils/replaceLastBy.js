import {SPACE_DELIMITER} from '../constants';

export const replaceLastBy = (replacement, groupOfWords) => {
  if (!groupOfWords) {
    return '';
  }

  if (!replacement) {
    return groupOfWords;
  }

  const wordsArray = groupOfWords.split(SPACE_DELIMITER);
  wordsArray.pop();
  wordsArray.push(replacement);

  return wordsArray.join(SPACE_DELIMITER);
};

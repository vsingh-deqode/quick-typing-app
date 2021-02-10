import {SPACE_DELIMITER} from '../constants';
import {isTextNullOrEmpty} from './isTextNullOrEmpty';

export const unMatchedWord = (oldWords, newWords) => {
  if (isTextNullOrEmpty(oldWords) || isTextNullOrEmpty(newWords)) {
    return {word: null, index: -1};
  }

  const oldWordsArray = oldWords.split(SPACE_DELIMITER);
  const newWordsArray = newWords.split(SPACE_DELIMITER);
  let word = null;
  let index = -1;

  for (let i = 0; i < newWordsArray.length; i++) {
    if (oldWordsArray[i] !== newWordsArray[i]) {
      word = newWordsArray[i];
      index = word ? i : -1;
      break;
    }
  }

  return {word, index};
};

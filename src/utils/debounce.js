export const debounce = (fn, delay) => {
  let timer = null;
  clearTimeout(timer);
  timer = setTimeout(() => {
    fn();
  }, delay);
};

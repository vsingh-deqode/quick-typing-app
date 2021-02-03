export const debounce = (fun, delay) => {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fun(...args), delay);
  };
};

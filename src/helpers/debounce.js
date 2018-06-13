/**
 * Original: https://davidwalsh.name/javascript-debounce-function
 * Refactored from example to take advantage of ES6 syntax
 * 
 * @method debounce
 * @param {Function} func The function you want to throttle
 * @param {Number} wait Time in milliseconds you want to delay func invocation
 * @param {Boolean} immediate Set to true to invoke func before the wait time, instead of after
 */
export default function _debounce(func, wait, immediate) {
  // Placeholder for time to wait in milliseconds
  let timeout;

  return (...args) => {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;

    // Clear any existing timeouts
    clearTimeout(timeout);

    // Execute after timeout perioud
    timeout = setTimeout(later, wait);

    // If callNow evaluates true, call func, then wait for timeout
    if (callNow) {
      func.apply(this, args);
    }
  };
}

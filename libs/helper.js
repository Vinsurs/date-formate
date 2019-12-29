/**
 * @description pad num with zero
 * @param n {Number}
 * @returns {String} padded string
 */

function padWithZero(n) {
  if (n < 10) {
    n = "0" + n;
  }
  return n;
}
/**
 * @description strip space in string
 * @param str {String}
 * @returns  {string} String with leading and trailing spaces removed
 */
function trim(str) {
  return str.replace(/^(\s+)|(\s+)$/g, "");
}
/**
 * @description Determines whether a string begins with the specified character
 * @param str {String}
 * @param opt {String}
 * @returns {String} padded string
 */
function startsWith(str, opt) {
  return str.indexOf(opt) === 0;
}
/**
 * @description Determines whether a string ends with the specified character
 * @param str {String}
 * @param opt {String}
 * @returns {String} padded string
 */
function endsWith(str, opt) {
  return str.indexOf(opt) === str.length - opt.length;
}
/**
 * @description normalize num or str
 * @param item {Number|String}
 * @returns {number}
 */
function normalize(item) {
  return Number(item) || 0;
}
/**
 * @description Determines whether it is a date object
 * @param date {Date}
 * @returns {Bollean}
 */
function isDate(date) {
  return date instanceof Date;
}
module.exports = {
  padWithZero,
  trim,
  startsWith,
  endsWith,
  normalize,
  isDate
};

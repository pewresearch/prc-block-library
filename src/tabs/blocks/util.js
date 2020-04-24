export default function isSecondary (className) {
  return typeof className !== 'undefined' ? ~className.indexOf('is-style-secondary') : false;
}

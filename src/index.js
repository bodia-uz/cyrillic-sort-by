import getField from 'lodash.get';

// http://jrgraphix.net/r/Unicode/0400-04FF
const cyrillicPattern = /[\u0400-\u04FF]/i;

/**
 * Sort array. Ensure cyrillic items are first
 * @param {Array} array
 * @param {string} [path]
 * @return {Array}
 */
function cyrillicSortBy(array, path) {
  return array.slice().sort((a, b) => {
    if (path) {
      a = getField(a, path);
      b = getField(b, path);
    }

    a = typeof a === 'string' ? a.toLocaleLowerCase() : '';
    b = typeof b === 'string' ? b.toLocaleLowerCase() : '';

    const isACyrillic = cyrillicPattern.test(a.charAt(0));
    const isBCyrillic = cyrillicPattern.test(b.charAt(0));

    if (isACyrillic && !isBCyrillic) {
      return -1;
    }

    if (!isACyrillic && isBCyrillic) {
      return +1;
    }

    return a.localeCompare(b);
  });
}

export default cyrillicSortBy;

'use strict';

// {@xscripts/notExtraneous npm-check-updates}

// * https://www.npmjs.com/package/npm-check-updates#configuration-files
// @renovate
module.exports = {
  install: 'never',
  reject: [
    // ? Reject any super-pinned dependencies (e.g. find-up~5 and execa~7)
    '*~*'
  ]
};

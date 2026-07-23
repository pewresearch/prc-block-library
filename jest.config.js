/**
 * Jest configuration for prc-block-library unit tests.
 * Unit tests live under monorepo root tests/prc-block-library/unit/.
 */
const path = require('path');

const unitRoot = path.resolve(__dirname, '../../tests/prc-block-library/unit');

module.exports = {
	...require('@wordpress/scripts/config/jest-unit.config'),
	rootDir: __dirname,
	roots: [unitRoot],
	testMatch: ['**/*.test.js'],
};

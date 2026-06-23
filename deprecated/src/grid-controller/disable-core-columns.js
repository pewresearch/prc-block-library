/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Filter core/columns block settings to set inserter to false so no new columns can be added.
 */
export default function disableCoreColumns() {
	const BLOCKNAME = 'core/columns';
	const BLOCKIDENTIFIER = 'prc-block/core-columns';
	addFilter(
		'blocks.registerBlockType',
		`${BLOCKIDENTIFIER}-supports`,
		(settings) => {
			if (BLOCKNAME !== settings.name) {
				return settings;
			}

			if (settings.supports) {
				settings.supports.inserter = false;
			}

			return settings;
		}
	);
}

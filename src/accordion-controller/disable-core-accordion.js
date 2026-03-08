/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Filter core/accordion block settings to set inserter to false so no new accordions can be added.
 */
export default function disableCoreAccordion() {
	const BLOCKNAME = 'core/accordion';
	const BLOCKIDENTIFIER = 'prc-block/core-accordion';
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

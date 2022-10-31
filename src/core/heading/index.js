/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock, registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal Dependencies
 */
import './style.scss';

/**
 * Modify default settings on core/heading block. Change the default heading level to 4 and add isChapter attribute to replace prc-block/chapter.
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
addFilter(
	'blocks.registerBlockType',
	'prc-block-library/heading',
	(settings, name) => {
		if ('core/heading' !== name) {
			return settings;
		}
		const s = settings;
		s.attributes.level.default = 4;
		s.transforms.from = [
			...s.transforms.from,
			{
				type: 'block',
				blocks: ['prc-block/chapter'],
				transform: ({ value, level }) =>
					createBlock('core/heading', {
						content: value,
						level,
						isChapter: true,
					}),
			},
		];
		return s;
	},
);

registerBlockVariation('core/heading', {
	name: 'section-header',
	title: __('Section Header'),
	description: __('A heading styled for "section headings".'),
	attributes: {
		className: 'is-style-section-header',
		level: 3,
	},
});

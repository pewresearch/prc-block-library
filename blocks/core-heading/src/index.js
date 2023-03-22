/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { createBlock, registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

const BLOCKNAME = 'core-heading'.replace(/-/g, '/');
const BLOCKIDENTIFIER = 'prc-block-library/core-heading';

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function CoreHeading(props) {
				const { name, attributes, setAttributes } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}

				return (
					<Fragment>
						<BlockEdit {...props} />
						<Controls
							{...{ attributes, setAttributes, context: false }}
						/>
					</Fragment>
				);
			},
		'withCoreHeadingControls'
	),
	21
);

/**
 * Modify default settings on core/heading block. Change the default heading level to 4 and add isChapter attribute to replace prc-block/chapter at a later date.
 *
 * @param {*} settings
 * @param {*} name
 * @return
 */
function modifyDefaultSettings(settings, name) {
	if (BLOCKNAME !== name) {
		return settings;
	}
	const s = settings;
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
}
addFilter('blocks.registerBlockType', BLOCKIDENTIFIER, modifyDefaultSettings);

registerBlockVariation(BLOCKNAME, {
	name: 'chapter',
	title: __('Chapter'),
	description: __('A chapter heading.'),
	icon: 'editor-ol',
	attributes: {
		isChapter: true,
		level: 3,
	},
	isActive: ({ isChapter }) => isChapter,
});

registerBlockVariation(BLOCKNAME, {
	name: 'section-header',
	title: __('Section Header'),
	description: __('A heading styled for "section headings".'),
	attributes: {
		className: 'is-style-section-header',
		level: 3,
	},
});

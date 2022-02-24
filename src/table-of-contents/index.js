/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';

const { name } = metadata;

const settings = {
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });

// Register block variations for complete TOC sidebar widgets.
registerBlockVariation('core/group', {
    name: 'toc',
    title: __('Table of Contents Sidebar'),
    description: __('A Group block in the "alt-card" format with a table of contents list.'),
    attributes: {
        className: 'is-style-card-alt',
    },
    innerBlocks: [
        [
            'core/heading',
            {
                className: 'is-style-sub-header',
                level: 3,
                content: 'Table of Contents',
				backgroundColor: 'slate',
				textColor: 'white'
            },
        ],
		[
            'prc-block/table-of-contents',
            {},
        ],
    ],
});

registerBlockVariation('core/group', {
    name: 'toc-sticky',
    title: __('Table of Contents Sticky Sidebar'),
    description: __('A Group block in the "alt-card" format with a table of contents list.'),
    attributes: {
        className: 'is-style-card-alt',
		isSticky: true,
    },
    innerBlocks: [
        [
            'core/heading',
            {
                className: 'is-style-sub-header',
                level: 3,
                content: 'Table of Contents',
				backgroundColor: 'slate',
				textColor: 'white'
            },
        ],
		[
            'prc-block/table-of-contents',
            {},
        ],
    ],
});

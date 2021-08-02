/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType, createBlock } from '@wordpress/blocks';
/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';

const { name } = metadata;
const settings = {
    title: __('Chart'),
    description: __('Create a custom data-driven chart.'),
    category: 'widgets',
    icon: 'chart-area',
    keywords: [__('chart', 'chart builder', 'data')],
    supports: {
        // Removes support for an HTML mode.
        html: false,
    },
    example: {
        attributes: {
            chartType: 'bar',
            className: 'is-style-bar',
        },
    },
    transforms: {
        from: [
            {
                type: 'block',
                blocks: ['core/table'],
                transform: (attributes) => {
                    return createBlock('prc-block/chart-builder-data-wrapper', {
                        transformed: true,
                        tableHead: attributes.head,
                        tableBody: attributes.body,
                    });
                },
            },
        ],
        to: [
            {
                type: 'block',
                blocks: ['core/table'],
                transform: (attributes, innerBlocks) => {
                    const table = innerBlocks.filter(
                        (block) => block.name === 'core/table',
                    );
                    return createBlock('core/table', table.attributes);
                },
            },
        ],
    },
    edit,
    save,
};
console.log('wwatching');
registerBlockType(name, { ...metadata, ...settings });

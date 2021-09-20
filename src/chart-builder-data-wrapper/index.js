/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType, createBlock } from '@wordpress/blocks';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';

const { name } = metadata;
const settings = {
    title: __('PRC Chart Builder'),
    description: __('Create a custom data-driven chart.'),
    category: 'widgets',
    icon: 'chart-area',
    keywords: [__('chart')],
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
                        isConvertedChart: true,
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
registerBlockType(name, { ...metadata, ...settings });

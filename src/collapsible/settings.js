import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

const settings = [
    'prc-block/collapsible',
    {
        title: __('PRC Collapsible'),
        description: __(
            'Add a block that displays content in a single accordion.',
        ),
        category: 'layout',
        keywords: [__('Collapsible'), __('Accordion'), _('How we did this')],
        supports: {
            html: false,
            align: false,
        },
        styles: [
            {
                name: 'default',
                label: __('Default'),
                isDefault: true,
            },
            {
                name: 'alternate',
                label: __('Plus Icon'),
            },
        ],
        attributes: {
            title: {
                type: 'string',
                default: 'How we did this',
            },
        },
        transforms: {
            to: [
                {
                    type: 'block',
                    blocks: ['prc-block/callout'],
                    transform(attributes, innerBlocks) {
                        return createBlock(
                            'prc-block/callout',
                            attributes,
                            innerBlocks,
                        );
                    },
                },
            ],
        },
        edit,
        save,
    },
];

export default settings;

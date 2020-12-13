import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

const settings = [
    'prc-block/callout',
    {
        title: __('PRC Callout'),
        description: __(
            'Add a block that displays content in a oatmeal callout.',
        ),
        category: 'layout',
        keywords: [__('Callout'), __('Segment')],
        supports: {
            html: false,
            align: ['left', 'right'],
            // lightBlockWrapper: true,
        },
        transforms: {
            to: [
                {
                    type: 'block',
                    blocks: ['prc-block/collapsible'],
                    transform(attributes, innerBlocks) {
                        return createBlock(
                            'prc-block/collapsible',
                            attributes,
                            innerBlocks,
                        );
                    },
                },
            ],
        },
        attributes: {
            width: {
                type: 'integer',
                default: 320,
            },
        },
        edit,
        save,
    },
];

export default settings;

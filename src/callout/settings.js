
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

const settings = [
    'prc-block/callout',
    {
        title: __('PRC Callout'),
        description: __(
            'Add a block that displays content in a oatmeal callout.'
        ),
        category: 'layout',
        keywords: [__('Callout'), __('Segment')],
        supports: {
            html: false,
            // align: false,
            // lightBlockWrapper: true,
        },
        transforms: {
            to: [
                {
                    type: 'block',
                    blocks: [ 'prc-block/collapsible' ],
                    transform: function( attributes, innerBlocks ) {
                        return createBlock( 'prc-block/collapsible', attributes, innerBlocks );
                    },
                },
            ],
        },
        attributes: {},
        edit,
        save,
    },
];

export default settings;
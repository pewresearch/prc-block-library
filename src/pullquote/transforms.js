/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
    from: [
        {
            type: 'block',
            blocks: ['core/paragraph'],
            transform: ({ content }) => {
                return createBlock('prc-block/pullquote', {
                    value: `<p>${content}</p>`,
                    citation: 'Citation Needed',
                });
            },
        },
    ],
    to: [
        {
            type: 'block',
            blocks: ['core/paragraph'],
            transform: ({ value }) => {
                return createBlock('core/paragraph', {
                    content: value,
                });
            },
        },
    ],
};

export default transforms;

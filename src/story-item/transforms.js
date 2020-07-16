import { createBlock } from '@wordpress/blocks';

/**
 * Default transforms for generic embeds.
 * http://pewresearch.local/fact-tank/2020/06/18/maecenas-sed-diam-eget-risus-varius-blandit-sit-amet-non-magna/
 */
const transforms = {
    from: [
        {
            type: 'raw',
            isMatch: node =>
                'P' === node.nodeName &&
                /^\s*(https?:\/\/\S+)\s*$/i.test(node.textContent),
            transform: node => {
                return createBlock('prc-block/story-item', {
                    link: node.textContent.trim(),
                    className: 'is-style-top',
                    imageSize: 'A1',
                    imageSlot: 'top',
                });
            },
        },
    ],
    to: [
        {
            type: 'block',
            blocks: ['prc-block/story-item'],
            transform: ({ url }) => {
                return createBlock('prc-block/story-item', {
                    link: url,
                    className: 'is-style-top',
                    imageSize: 'A1',
                    imageSlot: 'top',
                });
            },
        },
    ],
};

export default transforms;

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
                /^https?:\/\/(www\.)?pewresearch\.(org|local)\/staff\/.+/i.test(
                    node.textContent,
                ),
            transform: node => {
                return createBlock('prc-block/staff', {
                    link: node.textContent.trim(),
                });
            },
        },
    ],
    to: [
        {
            type: 'block',
            blocks: ['prc-block/staff'],
            transform: ({ url }) => {
                return createBlock('prc-block/staff', {
                    link: url,
                });
            },
        },
    ],
};

export default transforms;

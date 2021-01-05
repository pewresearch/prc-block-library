import { createBlock } from '@wordpress/blocks';

/**
 * Match pewresearch.org post links (not staff links) and insert story items with only the url and base image options selected, this will then let the story item fetch the details (but shouldnt we actually do that as part of the transform?)
 */
const transforms = {
    from: [
        {
            type: 'raw',
            isMatch: node =>
                'P' === node.nodeName &&
                /^https?:\/\/(www\.)?pewresearch\.(org|local)\/((?!staff).)*$/i.test(
                    node.textContent,
                ),
            transform: node => {
                return createBlock('prc-block/story-item', {
                    link: node.textContent.trim(),
                    className: 'is-style-default',
                    imageSize: 'A1',
                    imageSlot: 'default',
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
                    className: 'is-style-default',
                    imageSize: 'A1',
                    imageSlot: 'default',
                });
            },
        },
    ],
};

export default transforms;

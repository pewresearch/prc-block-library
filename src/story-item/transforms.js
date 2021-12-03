/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { isEmpty } from 'lodash';

/**
 * Internal Dependencies
 */
 import { getAttributesFromURL } from './edit/helpers';

/**
 * Match pewresearch.org post links (not staff links) and insert story items with only the url and base image options selected, this will then let the story item fetch the details (but shouldnt we actually do that as part of the transform?)
 */
const regex = new RegExp(/^https?:\/\/?${window.location.host}\/((?!staff).)*$/i);
const transforms = {
    from: [
        {
            type: 'raw',
            isMatch: node =>
                'P' === node.nodeName &&
                regex.test(
                    node.textContent,
                ),
            transform: node => {
                const url = node.textContent.trim();
                console.log("you pasted a url, here is the node we matched...", url);
                if (!isEmpty(url)) {
                    return createBlock('prc-block/story-item', {
                        className: 'is-style-default',
                        imageSize: 'A1',
                        imageSlot: 'default',
                        link: url,
                        isTransformed: true,
                    });
                }
            },
        },
    ]
};

export default transforms;

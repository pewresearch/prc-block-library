/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';

const transforms = {
	from: [
		{
			type: 'raw',
			priority: 1,
			isMatch: (node) =>
				'P' === node.nodeName &&
				/^\s*(https?:\/\/\S+)\s*$/i.test(node.textContent) &&
				node.textContent.match(/^https?:\/\/(www\.)?gist\.github\.com\/.+/i),
			transform: (node) => {
				// Check for a file within the URL.
				const file = node.textContent.trim().split('#').pop();
				const fileClean = file.replace('file-', '#file-').replace('-', '.');

				return createBlock('prc-block/github-gist', {
					url: node.textContent.trim(),
					file: null !== file.match(/file*/) ? fileClean : undefined,
				});
			},
		},
		{
			type: 'prefix',
			prefix: ':gist',
			transform(content) {
				return createBlock(metadata.name, {
					content,
				});
			},
		},
	],
};

export default transforms;

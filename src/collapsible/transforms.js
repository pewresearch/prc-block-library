/**
 * WordPress Dependencies
 */
import { createBlock, rawHandler } from '@wordpress/blocks';

function cleanUpString(inputString) {
	// Remove non-closing paragraph tags at the beginning
	let cleanedString = inputString;

	// Extract the content of the first h4 tag
	let title = '';
	const regex = /<h4>(.*?)<\/h4>/i;
	const match = regex.exec(cleanedString);
	if (match && match[1]) {
		title = match[1];
		cleanedString = cleanedString.replace(regex, '');
	}

	return {
		title,
		contents: cleanedString,
	};
}

const transforms = {
	from: [
		{
			type: 'shortcode',
			tag: 'collapsible',
			transform({}, { shortcode }) {
				const { content } = shortcode;
				const { title, contents } = cleanUpString(content);
				return createBlock(
					'prc-block/collapsible',
					{
						title,
					},
					rawHandler({ HTML: contents })
				);
			},
		},
	],
};

export default transforms;

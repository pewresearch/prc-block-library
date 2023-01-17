/**
 * External Dependencies
 */
import { URLSearchToolbar } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';

export default function Controls( { attributes, setAttributes, context } ) {
	return (
		<BlockControls>
			<URLSearchToolbar
				{...{
					attributes,
					setAttributes,
					onSelect: (postAttrs) => {
						setAttributes(postAttrs);
					},
				}}
			/>
		</BlockControls>
	);
}

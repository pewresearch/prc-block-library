/**
 * WordPress Dependencies
 */
import {
	BlockControls,
	JustifyToolbar,
	JustifyContentControl,
} from '@wordpress/block-editor';

export default function JustificationControl({
	attributes,
	setAttributes,
	clientId,
}) {
	const { justification } = attributes;
	return (
		<BlockControls>
			<JustifyToolbar
				allowedControls={['left', 'center', 'right']}
				onChange={(value) => setAttributes({ justification: value })}
				value={justification}
			/>
		</BlockControls>
	);
}

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';

export default function FlipControl({ isFlipped, setIsFlipped, clientId }) {
	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					onClick={() => setIsFlipped(!isFlipped)}
					isActive={isFlipped}
					label={
						isFlipped ? 'Flip Over to Front' : 'Flip Over to Back'
					}
					icon="image-rotate"
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

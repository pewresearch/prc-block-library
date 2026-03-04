/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

export default function FlipControl({
	clientId,
	isFlipped,
	fixedHeight,
	maxHeight,
}) {
	const { updateBlockAttributes } = useDispatch('core/block-editor');
	const isSmartHeight =
		fixedHeight === undefined || fixedHeight === null || fixedHeight === -1;

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					onClick={() =>
						updateBlockAttributes(clientId, {
							isFlipped: !isFlipped,
						})
					}
					isActive={isFlipped}
					label={
						isFlipped ? 'Flip Over to Front' : 'Flip Over to Back'
					}
					icon="image-rotate"
				/>
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarButton
					onClick={() =>
						updateBlockAttributes(
							clientId,
							isSmartHeight
								? { fixedHeight: maxHeight ?? 200 }
								: { fixedHeight: -1 }
						)
					}
					isActive={isSmartHeight}
					label={
						isSmartHeight
							? __('Smart height', 'flip-card-controller')
							: __('Manual height', 'flip-card-controller')
					}
					icon={
						isSmartHeight ? 'fullscreen-exit-alt' : 'editor-expand'
					}
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

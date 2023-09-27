/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function FlipControl({ clientId }) {
	const { controllerId } = useSelect(
		(select) => {
			const { getBlockName, getBlockRootClientId } =
				select('core/block-editor');

			const name = getBlockName(clientId);
			let id = clientId;

			if ('prc-block/flip-card-controller' !== name) {
				id = getBlockRootClientId(clientId);
			}

			return {
				controllerId: id,
			};
		},
		[clientId]
	);

	// create an event listener to watch for the block elm for the controllerId
	// to have data-flipped attribute change and then update the isFlipped state
	const [isFlipped, setIsFlipped] = useState(false);
	useEffect(() => {
		const blockEditor = document.querySelector(
			'.wp-block-post-content.block-editor-block-list__layout'
		);
		const controllerBlock = blockEditor.querySelector(
			`[data-block="${controllerId}"]`
		);
		if (controllerBlock) {
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					console.log('mutation', mutation);
					if (mutation.type === 'attributes') {
						setIsFlipped(
							'true' === controllerBlock.dataset.flipped
						);
					}
				});
			});
			observer.observe(controllerBlock, {
				attributes: true,
			});
		}
	}, [controllerId]);

	const doFlip = () => {
		const blockEditor = document.querySelector(
			'.wp-block-post-content.block-editor-block-list__layout'
		);
		const controllerBlock = blockEditor.querySelector(
			`[data-block="${controllerId}"]`
		);
		if (controllerBlock) {
			const { flipped } = controllerBlock.dataset;
			controllerBlock.dataset.flipped =
				'true' === flipped ? 'false' : 'true';
		}
	};

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					onClick={() => doFlip()}
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

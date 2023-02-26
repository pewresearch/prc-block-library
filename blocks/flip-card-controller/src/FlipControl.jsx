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

const selectFrontSideClientId = (rootClientId, select) => {
	const { getBlock } = select('core/block-editor');
	// get the front side of the flip card from the rootClientId innerBlocks
	const { innerBlocks } = getBlock(rootClientId);
	const frontSide = innerBlocks.find(
		(block) => 'is-style-front' === block.attributes.className
	);
	return frontSide.clientId;
};

export default function FlipControl({ clientId }) {
	const { frontCardClientId } = useSelect(
		(select) => {
			const { getBlock, getBlockRootClientId } =
				select('core/block-editor');

			const { name, attributes } = getBlock(clientId);
			const { className } = attributes;

			let frontSideClientId = clientId;

			if ('is-style-back' === className) {
				const rootClientId = getBlockRootClientId(clientId);
				frontSideClientId = selectFrontSideClientId(
					rootClientId,
					select
				);
			}

			if ('prc-block/flip-card-controller' === name) {
				frontSideClientId = selectFrontSideClientId(clientId, select);
			}

			return {
				frontCardClientId: frontSideClientId,
			};
		},
		[clientId]
	);

	// create an event listener to watch for the block elm for the frontCardClientId
	// to have data-flipped attribute change and then update the isFlipped state
	const [isFlipped, setIsFlipped] = useState(false);
	useEffect(() => {
		const blockEditor = document.querySelector(
			'.wp-block-post-content.block-editor-block-list__layout'
		);
		const frontCardElm = blockEditor.querySelector(
			`[data-block="${frontCardClientId}"]`
		);
		if (frontCardElm) {
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					console.log('mutation', mutation);
					if (mutation.type === 'attributes') {
						setIsFlipped('true' === frontCardElm.dataset.flipped);
					}
				});
			});
			observer.observe(frontCardElm, {
				attributes: true,
			});
		}
	}, [frontCardClientId]);

	const doFlip = () => {
		const blockEditor = document.querySelector(
			'.wp-block-post-content.block-editor-block-list__layout'
		);
		const frontCardElm = blockEditor.querySelector(
			`[data-block="${frontCardClientId}"]`
		);
		if (frontCardElm) {
			console.log(
				'doFLIP = frontCardElm',
				frontCardElm,
				frontCardClientId
			);
			const { flipped } = frontCardElm.dataset;
			frontCardElm.dataset.flipped =
				'true' === flipped ? 'false' : 'true';
		}
	};

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					onClick={() => doFlip()}
					isActive={isFlipped}
					label="Flip Over"
					icon="image-rotate"
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

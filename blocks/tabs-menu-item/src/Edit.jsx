/**
 * WordPress Dependencies
 */
import { useEffect } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { cleanForSlug } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';

// eslint-disable-next-line max-lines-per-function
export default function Edit({
	attributes,
	setAttributes,
	clientId,
	isSelected,
	context,
	insertBlocksAfter,
}) {
	const { title, uuid } = attributes;
	const currentlyActive = context['prc-block/tabs/active'];

	const {
		insertBlock,
		updateBlockAttributes,
		updateBlock,
		moveBlockToPosition,
		selectNextBlock,
	} = useDispatch('core/block-editor');

	const movePane = (
		targetClientId,
		targetIndex,
		currentPaneIndex,
		toClientId
	) => {
		if (targetIndex === currentPaneIndex || -1 === currentPaneIndex) {
			return;
		}

		console.log(
			'movePane',
			targetClientId,
			targetIndex,
			currentPaneIndex,
			toClientId
		);

		moveBlockToPosition(
			targetClientId,
			toClientId,
			toClientId,
			targetIndex
		);
	};

	const {
		controllerClientId,
		panesClientId,
		currentPositionIndex,
		matchingPaneClientId,
		nextMenuItemClientId,
	} = useSelect(
		(select) => {
			if (undefined === clientId) {
				return;
			}
			const {
				getBlock,
				getBlockRootClientId,
				getAdjacentBlockClientId,
				getBlockIndex,
			} = select('core/block-editor');

			const menuBlockClientId = getBlockRootClientId(clientId);
			const controllerBlockClientId =
				getBlockRootClientId(menuBlockClientId);
			const panesBlockClientId =
				getAdjacentBlockClientId(menuBlockClientId);
			const panesBlock = getBlock(panesBlockClientId);

			let paneClientId = false;
			if (
				panesBlock.hasOwnProperty('innerBlocks') &&
				1 <= panesBlock.innerBlocks.length &&
				null !== uuid
			) {
				// console.log('panesBlock as seen from MenuItem', panesBlock);
				const matchedPane = panesBlock.innerBlocks.filter(
					(e) => e.attributes.uuid === uuid
				);
				if (0 !== matchedPane.length) {
					paneClientId = matchedPane[0].clientId;
				}
			}

			const currentIndex = getBlockIndex(clientId, menuBlockClientId);

			if (paneClientId) {
				const paneIndex = getBlockIndex(
					paneClientId,
					panesBlockClientId
				);
				if (-1 !== paneIndex) {
					movePane(
						paneClientId,
						currentIndex,
						paneIndex,
						panesBlockClientId
					);
				}
			}

			// eslint-disable-next-line consistent-return
			return {
				controllerClientId: controllerBlockClientId,
				panesClientId: panesBlockClientId,
				currentPositionIndex: currentIndex,
				matchingPaneClientId: paneClientId,
				nextMenuItemClientId: getAdjacentBlockClientId(clientId),
			};
		},
		[clientId]
	);

	const onBlockInit = () => {
		// If no uuid is set then run init sequence, create a matching tab pane block.
		if (null === uuid) {
			// We will use the first client id assigned as a uuid.
			console.log('onBlockInit', uuid, currentPositionIndex);
			const newUuid = clientId;
			setAttributes({ uuid: newUuid });
			const newPaneBlock = createBlock('prc-block/tabs-pane', {
				uuid: newUuid,
			});
			insertBlock(
				newPaneBlock,
				currentPositionIndex,
				panesClientId,
				false
			);
		}
	};

	const onBlockSelection = () => {
		if (null !== uuid && undefined !== controllerClientId) {
			updateBlockAttributes(controllerClientId, { active: uuid });
		}
		if (matchingPaneClientId) {
			// Blind update of the block to trigger a re-render.
			updateBlock(matchingPaneClientId, {});
		}
	};

	const insertNewBlock = () => {
		const attrs = {};
		return insertBlocksAfter(
			createBlock('prc-block/tabs-menu-item', attrs)
		);
	};

	const onEnterSplit = () => {
		if (null !== nextMenuItemClientId) {
			selectNextBlock(clientId);
		} else {
			insertNewBlock();
		}
	};

	useEffect(() => {
		onBlockInit();
	}, [panesClientId, currentPositionIndex]);

	useEffect(() => {
		onBlockSelection();
	}, [clientId, isSelected]);

	const blockProps = useBlockProps({
		'aria-selected': uuid === currentlyActive,
	});

	return (
		<div {...blockProps}>
			{isSelected && (
				<RichText
					tagName="div"
					value={title}
					allowedFormats={[]}
					onChange={(newTitle) =>
						setAttributes({
							title: decodeEntities(title),
							slug: cleanForSlug(newTitle),
						})
					}
					placeholder={__('Tab Title', 'prc-block-library')}
					__unstableOnSplitAtEnd={() => onEnterSplit()}
				/>
			)}
			{!isSelected && <div>{title || `Tab Title`}</div>}
		</div>
	);
}

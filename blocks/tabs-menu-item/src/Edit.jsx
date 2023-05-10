/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useEffect, useMemo } from '@wordpress/element';
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
	const currentlySelectedUUID = context?.['prc-block/tabs/activeUUID']; // @TODO: Convert this to use a wp data store registered by the tabs block.
	const { title, uuid, className } = attributes;

	const {
		insertBlock,
		moveBlockToPosition,
		selectNextBlock,
		updateBlockAttributes,
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
		menuClientId,
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

			let paneClientId = false;
			const menuBlockClientId = getBlockRootClientId(clientId);
			const controllerBlockClientId =
				getBlockRootClientId(menuBlockClientId);

			// Find the matching pane block.
			const panesBlockClientId =
				getAdjacentBlockClientId(menuBlockClientId);
			const panesBlock = getBlock(panesBlockClientId);
			if (
				panesBlock.hasOwnProperty('innerBlocks') &&
				1 <= panesBlock.innerBlocks.length &&
				null !== uuid
			) {
				const matchedPane = panesBlock.innerBlocks.filter(
					(e) => e.attributes.uuid === uuid
				);
				if (0 !== matchedPane.length) {
					paneClientId = matchedPane[0].clientId;
				}
			}

			const currentIndex = getBlockIndex(clientId, menuBlockClientId);

			// @TODO: This whole thing needs optimization, needs to be using useEffect or useCallback at least.
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

			return {
				controllerClientId: controllerBlockClientId,
				panesClientId: panesBlockClientId,
				currentPositionIndex: currentIndex,
				matchingPaneClientId: paneClientId,
				nextMenuItemClientId: getAdjacentBlockClientId(clientId),
				menuClientId: menuBlockClientId,
			};
		},
		[clientId]
	);

	const onBlockInit = () => {
		// If no uuid is set then run init sequence, create a matching tab pane block.
		if (null === uuid) {
			// We will use the first client id assigned as a uuid.
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

	/**
	 * Inserts a new tabs menu item block after the current block.
	 *
	 * @return
	 */
	const insertNewBlock = () => {
		const attrs = {};
		return insertBlocksAfter(
			createBlock('prc-block/tabs-menu-item', attrs)
		);
	};

	/**
	 * Insert a new block, or select the next block
	 * if one is available when the user presses enter at the end of the block.
	 */
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
		if (isSelected) {
			updateBlockAttributes(controllerClientId, {
				activeUUID: uuid,
			});
		}
	}, [isSelected, uuid, controllerClientId]);

	const isActive = useMemo(() => {
		return isSelected || currentlySelectedUUID === uuid;
	}, [isSelected, currentlySelectedUUID, uuid]);

	const blockProps = useBlockProps({
		className: classnames(className, {
			'is-active': isActive,
		}),
	});

	return (
		<div {...blockProps}>
			<RichText
				tagName="div"
				value={title}
				allowedFormats={[]}
				onChange={(newTitle) =>
					setAttributes({
						title: decodeEntities(newTitle),
						slug: cleanForSlug(newTitle),
					})
				}
				placeholder={__('Tab Title', 'prc-block-library')}
				__unstableOnSplitAtEnd={() => onEnterSplit()}
			/>
		</div>
	);
}

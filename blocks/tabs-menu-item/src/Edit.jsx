/**
 * WordPress Dependencies
 */
import { useEffect, useRef } from '@wordpress/element';
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

	const paneRef = useRef();

	const { insertBlock, moveBlockToPosition, selectNextBlock } =
		useDispatch('core/block-editor');

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

			const menuBlockClientId = getBlockRootClientId(clientId);
			const panesBlockClientId =
				getAdjacentBlockClientId(menuBlockClientId);
			const panesBlock = getBlock(panesBlockClientId);

			let paneClientId = false;
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
				panesClientId: panesBlockClientId,
				currentPositionIndex: currentIndex,
				matchingPaneClientId: paneClientId,
				nextMenuItemClientId: getAdjacentBlockClientId(clientId),
				menuClientId: menuBlockClientId,
			};
		},
		[clientId]
	);

	const onBlockInit = async () => {
		// If no uuid is set then run init sequence, create a matching tab pane block.
		if (null === uuid) {
			// We will use the first client id assigned as a uuid.
			console.log('onBlockInit', uuid, currentPositionIndex);
			const newUuid = clientId;
			setAttributes({ uuid: newUuid });
			const newPaneBlock = createBlock('prc-block/tabs-pane', {
				uuid: newUuid,
			});

			const newBlock = insertBlock(
				newPaneBlock,
				currentPositionIndex,
				panesClientId,
				false
			);

			// Set the paneRef to the new block.
			await newBlock.then((e) => {
				paneRef.current = e;
				console.log('e..', e);
			});
		}
	};

	const onBlockSelection = () => {
		// make sure all currently active panes are hidden.
		const activePanes = document.querySelectorAll(
			`[data-block="${panesClientId}"] [data-type^="prc-block/tabs-pane"][aria-hidden="false"]`
		);
		activePanes.forEach((e) => {
			e.setAttribute('aria-hidden', 'true');
		});
		const activeMenus = document.querySelectorAll(
			`[data-block="${menuClientId}"] [data-type^="prc-block/tabs-menu-item"][aria-selected="true"]`
		);
		activeMenus.forEach((e) => {
			e.setAttribute('aria-selected', 'false');
		});

		// .. Activate Menu Item
		const menuItemElm = document.querySelector(
			`[data-block="${menuClientId}"] [data-block="${clientId}"]`
		);
		if (menuItemElm) {
			menuItemElm.setAttribute('aria-selected', 'true');
		}

		// .. Activate Pane
		const matchingPaneElm = document.querySelector(
			`[data-block="${panesClientId}"] [data-uuid="${uuid}"]`
		);
		if (matchingPaneElm) {
			matchingPaneElm.setAttribute('aria-hidden', 'false');
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
		if (isSelected) {
			onBlockSelection();
		}
	}, [clientId, isSelected]);

	const blockProps = useBlockProps();

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

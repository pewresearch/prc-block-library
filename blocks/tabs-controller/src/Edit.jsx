/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useEffect, useState, useMemo } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */

const BLOCKS_TEMPLATE = [
	['prc-block/tabs-menu', {}],
	['prc-block/tabs-panes', {}],
];
const ALLOWED_BLOCKS = ['prc-block/tabs-menu', 'prc-block/tabs-panes'];

const findRemovedDiff = (past, present) => {
	const comparer = (otherArray) => (current) =>
		0 ===
		otherArray.filter(
			(other) => other.attributes.uuid === current.attributes.uuid
		).length;

	const onlyInA = past.filter(comparer(present));
	const onlyInB = present.filter(comparer(past));
	return onlyInA.concat(onlyInB);
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.context
 * @param            props.clientId
 * @param            props.isSelected
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected: _isSelected,
}) {
	const [menuBlocksPast, setMenuBlocksPast] = useState(false);
	const { vertical } = attributes;

	const { removeBlock, selectBlock } = useDispatch('core/block-editor');
	const { setClientId, setActiveUUIDPair } = useDispatch('prc-block/tabs-controller');

	// Get menu blocks, get pane blocks
	const {
		menuBlocks,
		paneBlocks,
		matchedPaneClientId,
		activeUUID,
		isTyping,
	} = useSelect(
		(select) => {
			if (undefined === clientId) {
				return;
			}
			const _activeUUID = select('prc-block/tabs-controller').getActiveUUID(clientId);

			const tabsControllerInnerBlocks = select('core/block-editor').getBlocks(clientId);
			const mBlocks =
				1 <= tabsControllerInnerBlocks.length
					? tabsControllerInnerBlocks.filter((e) => 'prc-block/tabs-menu' === e.name)
					: [];
			const pBlocks =
				1 <= tabsControllerInnerBlocks.length
					? tabsControllerInnerBlocks.filter(
							(e) => 'prc-block/tabs-panes' === e.name
					  )
					: [];

			let activePaneClientId = false;
			if (1 <= pBlocks.length) {
				const activePane = pBlocks[0].innerBlocks.filter(
					(e) => e.attributes.uuid === _activeUUID
				);
				if (1 <= activePane.length) {
					activePaneClientId = activePane[0].clientId;
				}
			}

			return {
				menuBlocks:
					1 <= mBlocks.length ? mBlocks[0].innerBlocks : false,
				paneBlocks:
					1 <= pBlocks.length ? pBlocks[0].innerBlocks : false,
				matchedPaneClientId: activePaneClientId,
				activeUUID: _activeUUID,
				isTyping: select('core/block-editor').isTyping(),
			};
		},
		[clientId]
	);

	const isSelected = useSelect((select) => {
		return _isSelected || select('core/block-editor').hasSelectedInnerBlock(clientId, true);
	}, [_isSelected, clientId]);

	/**
	 * When the block initializes we want to set the client id higher up in the prc-block/tabs-controller data store.
	 */
	useEffect(() => {
		setClientId(clientId);
		if (undefined === activeUUID) {
			// If there is no activeUUID then we need to set one. Get the first menuBlock uuid from its attributes and set it.
			if (1 <= menuBlocks.length) {
				setActiveUUIDPair(clientId, menuBlocks[0].attributes.uuid)
			}
		}
	}, [clientId, activeUUID, menuBlocks, paneBlocks]);

	/**
	 * Watch for changes on the menu block, if a menu item block has been removed then we need to remove the corresponding tab-pane block to keep things tidy.
	 */
	useEffect(() => {
		// Check for differences in menuBlocks and menuBlocksPast
		// if there are differences then we have added or removed a block
		// and if removed then we'll need to remove the corresponding tab-pane block.
		if (menuBlocks.length < menuBlocksPast.length) { // This is the signal that we have removed something.
			// Find what the diff from menuBlocks and menuBlocksPast is,
			// then get the uuid, then search the paneBlocks and remove the matched pane block in question.
			const removedMenuItemBlock = findRemovedDiff(menuBlocksPast, menuBlocks);
			const matchedPaneBlock = paneBlocks.filter(
				(e) => e.attributes.uuid === removedMenuItemBlock[0].attributes.uuid
			);
			if (0 !== matchedPaneBlock.length) {
				removeBlock(matchedPaneBlock[0].clientId);
			}
		}
		setMenuBlocksPast(menuBlocks);
	}, [menuBlocks]);

	/**
	 * When a tab is selected, we need to focus the corresponding tab-pane block.
	 * @TODO: I am unsure about this behavior; we should kick this back to @shangwood for review. They may just want it to focus on the menu item when clicked and then you can click in to the tab block.
	 */
	useEffect(() => {
		if (!isSelected || undefined === activeUUID) {
			return;
		}
		selectBlock(matchedPaneClientId);
	}, [isSelected, activeUUID, matchedPaneClientId]);

	const blockProps = useBlockProps({
		className: classNames({
			'is-vertical-tabs': vertical,
			'is-horizontal-tabs': !vertical,
		}),
	});

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			renderAppender: false,
			orientation: vertical ? 'vertical' : 'horizontal',
			template: BLOCKS_TEMPLATE,
		}
	);

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps} />
		</div>
	);
}

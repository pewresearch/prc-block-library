/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment, useEffect, useState } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { dispatch, useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const BLOCKS_TEMPLATE = [
	['prc-block/tabs-menu', {}],
	['prc-block/tabs-panes', {}],
];

const ALLOWED_BLOCKS = ['prc-block/tabs-menu', 'prc-block/tabs-panes'];

const findRemovedDiff = (past, present) => {
	const comparer = (otherArray) => (current) =>
		0 ===
		otherArray.filter(
			(other) => other.attributes.uuid === current.attributes.uuid,
		).length;

	const onlyInA = past.filter(comparer(present));
	const onlyInB = present.filter(comparer(past));
	return onlyInA.concat(onlyInB);
};

function ControllerEdit({ attributes, setAttributes, clientId }) {
	const [menuBlocksPast, setMenuBlocksPast] = useState(false);
	const { vertical } = attributes;

	const blockProps = useBlockProps({
		className: classNames({
			'is-vertical-tabs': vertical,
			'is-horizontal-tabs': !vertical,
		}),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		renderAppender: false,
		orientation: vertical ? 'vertical' : 'horizontal',
		template: BLOCKS_TEMPLATE,
		templateLock: 'all',
	});

	// Get menu blocks, get page blocks
	const { menuBlocks, paneBlocks } = useSelect(
		(select) => {
			if (undefined === clientId) {
				return;
			}
			const rootBlocks = select('core/block-editor').getBlocks(clientId);
			const mBlocks =
				1 <= rootBlocks.length
					? rootBlocks.filter((e) => 'prc-block/tabs-menu' === e.name)
					: [];
			const pBlocks =
				1 <= rootBlocks.length
					? rootBlocks.filter((e) => 'prc-block/tabs-panes' === e.name)
					: [];
			// eslint-disable-next-line consistent-return
			return {
				menuBlocks: 1 <= mBlocks.length ? mBlocks[0].innerBlocks : false,
				paneBlocks: 1 <= pBlocks.length ? pBlocks[0].innerBlocks : false,
			};
		},
		[clientId],
	);

	// When a menu item block is removed find the matching page block by uuid and remove it.
	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log('menuBlocks', menuBlocks);
		if (menuBlocks.length < menuBlocksPast.length) {
			// We have removed something.
			// Find what the diff from menuBlocks and menuBlocksPast is, then get the uuid then search the pageBlocks and remove the block in question.
			const removed = findRemovedDiff(menuBlocksPast, menuBlocks);
			const matchedPane = paneBlocks.filter(
				(e) => e.attributes.uuid === removed[0].attributes.uuid,
			);
			dispatch('core/block-editor').removeBlock(matchedPane[0].clientId);
			// Need to set active the next available menu item block
		}
		setMenuBlocksPast(menuBlocks);
	}, [menuBlocks]);

	return (
		<Fragment>
			<div {...innerBlocksProps} />
			<Controls {...{ attributes, setAttributes }} />
		</Fragment>
	);
}

export default ControllerEdit;

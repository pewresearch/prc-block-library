/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { clampSlideIndex } from '../carousel-controller/use-editor-active-slide';

const TEMPLATE = [
	[
		'core/paragraph',
		{
			placeholder: 'Type / to add blocks inside the carousel slide.',
		},
	],
];

export default function Edit({
	clientId,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	// Coverflow CSS takes inactive slides out of flow. Keep is-active on the
	// slide wrapper via React so useBlockProps cannot drop it on re-render.
	const isCoverflowActive = useSelect(
		(select) => {
			const {
				getBlockRootClientId,
				getBlockIndex,
				getBlockAttributes,
				getBlockCount,
			} = select(blockEditorStore);
			const rootClientId = getBlockRootClientId(clientId);
			if (!rootClientId) {
				return false;
			}
			const parentAttributes = getBlockAttributes(rootClientId);
			if (parentAttributes?.viewType !== 'coverflow') {
				return false;
			}
			const slideIndex = getBlockIndex(clientId, rootClientId);
			const activeIndex = clampSlideIndex(
				parentAttributes.editorActiveSlideIndex ?? 0,
				getBlockCount(rootClientId)
			);
			return slideIndex === activeIndex;
		},
		[clientId]
	);

	const blockProps = useBlockProps({
		className: clsx(layoutClassNames, {
			'is-active': isCoverflowActive,
		}),
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		templateLock: false,
		template: TEMPLATE,
	});

	return <div {...innerBlocksProps} />;
}

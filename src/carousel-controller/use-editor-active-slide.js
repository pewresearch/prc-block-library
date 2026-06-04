/**
 * WordPress Dependencies
 */
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useCallback, useRef } from '@wordpress/element';

/**
 * @param {number} index      Candidate slide index.
 * @param {number} slideCount Number of slides.
 * @return {number} Index clamped to [0, slideCount - 1], or 0 when empty.
 */
export const clampSlideIndex = (index, slideCount) => {
	if (slideCount <= 0) {
		return 0;
	}
	return Math.min(Math.max(0, index), slideCount - 1);
};

/**
 * Editor-only active slide index (local attribute), decoupled from selection.
 *
 * @param {Object}           options
 * @param {string}           options.clientId               Carousel controller client id.
 * @param {number|undefined} options.editorActiveSlideIndex Local attribute value.
 */
export function useEditorActiveSlide({ clientId, editorActiveSlideIndex }) {
	const {
		selectBlock,
		updateBlockAttributes,
		__unstableMarkNextChangeAsNotPersistent,
	} = useDispatch(blockEditorStore);

	const { innerBlocks, selectedSlideIndex } = useSelect(
		(select) => {
			const {
				getBlock,
				getBlocks,
				getSelectedBlockClientId,
				getBlockParentsByBlockName,
			} = select(blockEditorStore);
			const currentlySelectedBlockClientId = getSelectedBlockClientId();
			const currentlySelectedBlock = getBlock(
				currentlySelectedBlockClientId
			);
			const _innerBlocks = getBlocks(clientId);
			const slideClientIds = new Set(
				_innerBlocks.map((block) => block.clientId)
			);
			let currentlySelectedSlideBlock = null;
			if (currentlySelectedBlock?.name === 'prc-block/carousel-slide') {
				if (slideClientIds.has(currentlySelectedBlockClientId)) {
					currentlySelectedSlideBlock =
						currentlySelectedBlockClientId;
				}
			} else if (currentlySelectedBlockClientId) {
				const slideParents = getBlockParentsByBlockName(
					currentlySelectedBlockClientId,
					'prc-block/carousel-slide'
				);
				currentlySelectedSlideBlock =
					slideParents.find((slideId) =>
						slideClientIds.has(slideId)
					) ?? null;
			}

			let _selectedSlideIndex = null;
			if (currentlySelectedSlideBlock) {
				_selectedSlideIndex = _innerBlocks.findIndex(
					(block) => block.clientId === currentlySelectedSlideBlock
				);
				if (_selectedSlideIndex < 0) {
					_selectedSlideIndex = null;
				}
			}

			return {
				innerBlocks: _innerBlocks,
				selectedSlideIndex: _selectedSlideIndex,
			};
		},
		[clientId]
	);

	const slideCount = innerBlocks.length;
	const prevSelectedSlideIndexRef = useRef(selectedSlideIndex);
	const resolvedEditorActiveSlideIndex =
		editorActiveSlideIndex ??
		(selectedSlideIndex !== null && selectedSlideIndex >= 0
			? selectedSlideIndex
			: 0);
	const activeIndex = clampSlideIndex(
		resolvedEditorActiveSlideIndex,
		slideCount
	);
	const activeSlideClientId = innerBlocks[activeIndex]?.clientId ?? null;

	const setActiveIndex = useCallback(
		(nextIndex) => {
			if (slideCount <= 0) {
				return;
			}
			const next = clampSlideIndex(nextIndex, slideCount);
			__unstableMarkNextChangeAsNotPersistent();
			updateBlockAttributes(clientId, {
				editorActiveSlideIndex: next,
			});
			const slideClientId = innerBlocks[next]?.clientId;
			if (slideClientId) {
				selectBlock(slideClientId);
			}
		},
		[
			clientId,
			innerBlocks,
			slideCount,
			selectBlock,
			updateBlockAttributes,
			__unstableMarkNextChangeAsNotPersistent,
		]
	);

	useEffect(() => {
		if (editorActiveSlideIndex === undefined) {
			const initialIndex =
				selectedSlideIndex !== null && selectedSlideIndex >= 0
					? selectedSlideIndex
					: 0;
			__unstableMarkNextChangeAsNotPersistent();
			updateBlockAttributes(clientId, {
				editorActiveSlideIndex: initialIndex,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- mount init only
	}, []);

	useEffect(() => {
		const prevSelected = prevSelectedSlideIndexRef.current;
		prevSelectedSlideIndexRef.current = selectedSlideIndex;

		if (selectedSlideIndex === null || selectedSlideIndex < 0) {
			return;
		}
		// Only follow canvas selection changes. Dot/arrow navigation updates
		// editorActiveSlideIndex before selectBlock updates selectedSlideIndex;
		// syncing on editorActiveSlideIndex changes would revert the new index.
		if (selectedSlideIndex === prevSelected) {
			// Attribute unset on load: still persist selection even though the ref
			// was seeded with the current index (avoids defaulting UI to slide 0).
			if (editorActiveSlideIndex !== undefined) {
				return;
			}
		}
		if (selectedSlideIndex !== editorActiveSlideIndex) {
			__unstableMarkNextChangeAsNotPersistent();
			updateBlockAttributes(clientId, {
				editorActiveSlideIndex: selectedSlideIndex,
			});
		}
	}, [
		selectedSlideIndex,
		editorActiveSlideIndex,
		clientId,
		updateBlockAttributes,
		__unstableMarkNextChangeAsNotPersistent,
	]);

	useEffect(() => {
		if (slideCount <= 0 || editorActiveSlideIndex === undefined) {
			return;
		}
		const clamped = clampSlideIndex(editorActiveSlideIndex, slideCount);
		if (clamped !== editorActiveSlideIndex) {
			__unstableMarkNextChangeAsNotPersistent();
			updateBlockAttributes(clientId, {
				editorActiveSlideIndex: clamped,
			});
		}
	}, [
		slideCount,
		editorActiveSlideIndex,
		clientId,
		updateBlockAttributes,
		__unstableMarkNextChangeAsNotPersistent,
	]);

	return {
		innerBlocks,
		slideCount,
		activeIndex,
		activeSlideClientId,
		setActiveIndex,
	};
}

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import {
	Fragment,
	useMemo,
	useState,
	useCallback,
	useRef,
	useEffect,
} from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	InnerBlocks,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const getTickDensity = (count) => {
	if (count <= 10) {
		return 'sparse';
	} else if (count <= 20) {
		return 'medium';
	} else if (count <= 40) {
		return 'dense';
	} else {
		return 'very-dense';
	}
};

export default function Edit({
	attributes,
	setAttributes,
	clientId,
	isSelected,
}) {
	const { currentActiveIndex, tickMarkInterval, tickMarkHeight, showAllTickMarks, hideLastTick, tickLabelAngle, visibleTicks } = attributes;
	const inputRef = useRef();
	const { selectBlock, updateBlockAttributes } =
		useDispatch(blockEditorStore);


	const { maxSteps, ticks } = useSelect(
		(select) => {
			return {
				maxSteps: select(blockEditorStore).getBlocks(clientId).length,
				ticks: select(blockEditorStore).getBlocks(clientId),
			};
		},
		[clientId]
	);

	const ticksClientIds = useMemo(() => {
		return ticks.map((block) => block.clientId);
	}, [ticks]);

	// Calculate tick positions
	const tickPositions = useMemo(() => {
		return ticks.map((_, index) => {
			const totalItems = ticks.length;
			return totalItems > 1 ? (index / (totalItems - 1)) * 100 : 0;
		});
	}, [ticks]);

	const setActiveTick = useCallback(
		(index) => {
			setAttributes({ currentActiveIndex: index });
			selectBlock(ticksClientIds[index], ticksClientIds, index);
		},
		[setAttributes, selectBlock, ticksClientIds]
	);

	const useManualControl = useMemo(() => {
		return showAllTickMarks || tickMarkInterval !== 1;
	}, [showAllTickMarks, tickMarkInterval]);

	const tickDensity = useMemo(() => {
		// Only calculate density when not using manual control
		if (useManualControl) {
			return 'sparse';
		}
		return getTickDensity(ticks?.length);
	}, [ticks, useManualControl]);

	/**
	 * Block props for the timeline block.
	 */
	const blockProps = useBlockProps({
		'data-tick-density': tickDensity,
		'data-show-all-ticks': showAllTickMarks ? 'true' : 'false',
		'data-manual-control': useManualControl ? 'true' : 'false',
		style: {
			'--tick-height': `${tickMarkHeight}px`,
			'--tick-label-angle': `${tickLabelAngle ?? 0}deg`,
		},
	});
	/**
	 * Innerblocks props for the timeline content.
	 */
	const innerBlockProps = useInnerBlocksProps(
		{},
		{
			__experimentalCaptureToolbars: true,
			clientId,
			orientation: 'horizontal',
		}
	);

	/**
	 * This set's up a listener for the slider input.
	 * When the slider's value changes it selects the block using it's clientId by
	 * matching the value it receives, the index, from the blocks array.
	 */
	useEffect(() => {
		const slider = inputRef.current;
		const handleInput = function () {
			// Get the value that has been updated.
			const { value } = this;
			const newActiveIndex = value - 1;
			setActiveTick(newActiveIndex);
		};
		slider.addEventListener('input', handleInput);
		return () => {
			slider.removeEventListener('input', handleInput);
		};
	}, [setActiveTick, selectBlock]);

	/**
	 * This effect ensures the slider's value matches the currentActiveIndex attribute.
	 */
	useEffect(() => {
		if (currentActiveIndex) {
			console.log('Update slider value to match currentActiveIndex');
			inputRef.current.value = currentActiveIndex;
		}
	}, [currentActiveIndex]);

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, clientId, ticks }} />
			<div {...blockProps}>
				<div className="tick-slider">
					<ul className="ticks">
						{ticks.map((tick, index) => {
							const { metadata } = tick.attributes;
							const { name } = metadata;
							const position = tickPositions[index];

							// Determine if this tick should be visible based on settings
							const isFirst = index === 0;
							const isLast = index === ticks.length - 1;
							const isFirstOrLast = isFirst || isLast;

							// Check if we should hide the last tick
							const hideThisTick = hideLastTick && isLast;

							// Check if using specific tick selection
							const useSpecificSelection = visibleTicks && visibleTicks.length > 0;
							const isSpecificallySelected = useSpecificSelection && visibleTicks.includes(index);

							const shouldShowTick = !hideThisTick && (
								useSpecificSelection ? isSpecificallySelected : (
									showAllTickMarks ||
									isFirstOrLast ||
									(index % tickMarkInterval === 0)
								)
							);

							return (
								<li
									key={tick.clientId}
									className="tick"
									role="presentation"
									style={{
										left: `${position}%`,
										opacity: shouldShowTick ? 1 : 0,
										pointerEvents: shouldShowTick ? 'auto' : 'none',
									}}
								>
									<RichText
										tagName="span"
										onChange={(value) =>
											updateBlockAttributes(
												tick.clientId,
												{
													metadata: {
														...metadata,
														name: value,
													},
												}
											)
										}
										placeholder={'Tick'}
										value={name}
										withoutInteractiveFormatting
									/>
								</li>
							);
						})}
					</ul>
					<div className="timeline-controls">
						<input
							ref={inputRef}
							type="range"
							min={1}
							max={maxSteps}
							value={currentActiveIndex}
						/>
					</div>
				</div>
				{innerBlockProps.children}
			</div>
		</Fragment>
	);
}

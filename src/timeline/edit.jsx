/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment, useMemo, useCallback, useRef } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	store as blockEditorStore,
	withColors,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { Icon } from '@prc/icons';
import classnames from 'classnames';
import Controls from './controls';

const getTickDensity = (count) => {
	if (count <= 10) {
		return 'sparse';
	}
	if (count <= 20) {
		return 'medium';
	}
	if (count <= 40) {
		return 'dense';
	}
	return 'very-dense';
};

function Edit({
	attributes,
	setAttributes,
	clientId,
	tickMarkColor,
	setTickMarkColor,
}) {
	const {
		currentActiveIndex,
		tickMarkInterval,
		tickMarkHeight,
		showAllTickMarks,
		hideLastTick,
		tickLabelAngle,
		visibleTicks,
		tickMarkWidth,
		enableAutoPlay,
	} = attributes;
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
			if (ticksClientIds[index]) {
				selectBlock(ticksClientIds[index]);
			}
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

	const safeSliderMax = Math.max(0, maxSteps - 1);
	const sliderValue = Math.min(
		Math.max(currentActiveIndex ?? 0, 0),
		safeSliderMax
	);

	const blockStyle = useMemo(() => {
		const style = {
			'--tick-height': `${tickMarkHeight}px`,
			'--tick-label-angle': `${tickLabelAngle ?? 0}deg`,
			'--tick-width': `${tickMarkWidth ?? 2}px`,
		};
		if (tickMarkColor?.color) {
			style['--tick-color'] = tickMarkColor.color;
		}
		return style;
	}, [tickMarkHeight, tickLabelAngle, tickMarkWidth, tickMarkColor]);

	/**
	 * Block props for the timeline block.
	 * Tick CSS custom properties are applied on `.tick-slider`, not `useBlockProps`, so they are
	 * not lost when WordPress merges `wrapperProps.style` (spacing, typography, etc.) on the block wrapper.
	 */
	const blockProps = useBlockProps({
		'data-tick-density': tickDensity,
		'data-show-all-ticks': showAllTickMarks ? 'true' : 'false',
		'data-manual-control': useManualControl ? 'true' : 'false',
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

	return (
		<Fragment>
			<Controls
				{...{
					attributes,
					setAttributes,
					clientId,
					ticks,
					colors: { tickMarkColor, setTickMarkColor },
				}}
			/>
			<div {...blockProps}>
				<div className="tick-slider" style={blockStyle}>
					<ul className="ticks">
						{ticks.map((tick, index) => {
							const labelText =
								tick.attributes.metadata?.name ??
								tick.attributes.label ??
								'';
							const position = tickPositions[index];

							// Determine if this tick should be visible based on settings
							const isFirst = index === 0;
							const isLast = index === ticks.length - 1;
							const isFirstOrLast = isFirst || isLast;

							// Check if we should hide the last tick
							const hideThisTick = hideLastTick && isLast;

							// Check if using specific tick selection
							const useSpecificSelection =
								visibleTicks && visibleTicks.length > 0;
							const isSpecificallySelected =
								useSpecificSelection &&
								visibleTicks.includes(index);

							const shouldShowTick =
								!hideThisTick &&
								(useSpecificSelection
									? isSpecificallySelected
									: showAllTickMarks ||
									  isFirstOrLast ||
									  index % tickMarkInterval === 0);

							return (
								<li
									key={tick.clientId}
									className="tick"
									role="presentation"
									style={{
										left: `${position}%`,
										opacity: shouldShowTick ? 1 : 0,
										pointerEvents: shouldShowTick
											? 'auto'
											: 'none',
									}}
								>
									<RichText
										tagName="span"
										onChange={(value) =>
											updateBlockAttributes(
												tick.clientId,
												{
													metadata: {
														...(tick.attributes
															.metadata || {}),
														name: value,
													},
												}
											)
										}
										placeholder={'Tick'}
										value={labelText}
										withoutInteractiveFormatting
									/>
								</li>
							);
						})}
					</ul>
					<div className="timeline-controls">
						<button
							type="button"
							className={classnames('play-pause-button', {
								'is-playing': enableAutoPlay,
							})}
							aria-label={__(
								'Play or pause timeline',
								'prc-block-library'
							)}
							tabIndex={-1}
							onClick={(event) => {
								event.preventDefault();
							}}
						>
							<Icon library="solid" icon="play" size={0.8} />
							<Icon library="solid" icon="pause" size={0.8} />
						</button>
						<input
							ref={inputRef}
							type="range"
							min={0}
							max={safeSliderMax}
							value={sliderValue}
							onChange={(event) => {
								const v = parseInt(event.target.value, 10);
								if (!Number.isNaN(v)) {
									setActiveTick(v);
								}
							}}
						/>
					</div>
				</div>
				{innerBlockProps.children}
			</div>
		</Fragment>
	);
}

export default withColors({ tickMarkColor: 'color' })(Edit);

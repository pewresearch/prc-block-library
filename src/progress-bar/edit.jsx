/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { useBlockProps, withColors, RichText, __experimentalUseColorProps as useColorProps } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
/**
 * Internal Dependencies
 */
import Controls from './controls';

function Edit({
	attributes,
	setAttributes,
	clientId,
	barColor,
	setBarColor,
	valueColor,
	setValueColor,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const { label, value, maxValue, labelFormat, barHeight, valuePosition, labelPosition, valueFontSize } = attributes;

	const colorProps = useColorProps(attributes);

	const backgroundColor = useMemo(() => colorProps.style.backgroundColor, [colorProps.style.backgroundColor]);
	const backgroundColorClass = useMemo(() => colorProps?.className?.split(' ').filter(
		(className) => className.includes('-background-color') || className.includes('has-background')
	), [colorProps?.className]);
	const textColor = useMemo(() => colorProps.style.color, [colorProps.style.color]);
	// Include all the classnames that are not a background color class
	const textColorClass = useMemo(() => colorProps?.className?.split(' ').filter(
		(className) => !backgroundColorClass.includes(className)
	), [colorProps?.className, backgroundColorClass]);

	const blockProps = useBlockProps({
		className: clsx(layoutClassNames, {
			'prc-progress-bar-label-right': labelPosition === 'right',
		}),
	});

	const progressBarWidth = useMemo(() => {
		if (maxValue === 0) {
			return 0;
		}
		return value / maxValue * 100;
	}, [value, maxValue]);

	return (
		<>
			<Controls
				{...{
					attributes,
					setAttributes,
					colors: {
						barColor,
						setBarColor,
						valueColor,
						setValueColor,
					},
					clientId,
				}}
			/>
			<div {...blockProps}>
				<RichText
					tagName="label"
					className={clsx("prc-progress-bar-label", textColorClass)}
					style={{ color: textColor }}
					value={label}
					onChange={(newLabel) => setAttributes({ label: newLabel })}
				/>
				<div className={clsx("prc-progress-bar", backgroundColorClass)} style={{ backgroundColor }}>
					<div className="prc-progress-bar-value" style={{ width: `${progressBarWidth}%`, backgroundColor: barColor.color, color: valueColor.color, height: `${barHeight}px` }}>
						{valuePosition === 'inside' && <span className="prc-progress-bar-value-text" style={{ fontSize: `${valueFontSize}px` }}>{labelFormat === 'percentage' ? `${value}%` : `${value}/${maxValue}`}</span>}
					</div>
					{valuePosition === 'outside' && <span className="prc-progress-bar-value-text" style={{ fontSize: `${valueFontSize}px` }}>{labelFormat === 'percentage' ? `${value}%` : `${value}/${maxValue}`}</span>}
				</div>
			</div>
		</>
	);
}

export default withColors(
	{ barColor: 'color', valueColor: 'color' },
)(Edit);

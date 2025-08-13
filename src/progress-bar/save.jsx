/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { useBlockProps, RichText, __experimentalGetColorClassesAndStyles as getColorClassesAndStyles, } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */

export default function Save({ attributes }) {
	const { labelPosition, label, valuePosition, valueFontSize, barColor, valueColor, barHeight } = attributes;

	const blockProps = useBlockProps.save({
		className: clsx({
			'prc-progress-bar-label-right': labelPosition === 'right',
		}),
	});

	const colorProps = getColorClassesAndStyles(attributes);
	const backgroundColor = colorProps.style.backgroundColor;
	const backgroundColorClass = colorProps?.className?.split(' ').filter(
		(className) => className.includes('-background-color') || className.includes('has-background')
	);
	const textColor = colorProps.style.color;
	// Include all the classnames that are not a background color class
	const textColorClass = colorProps?.className?.split(' ').filter(
		(className) => !backgroundColorClass.includes(className)
	);

	return (
		<div {...blockProps}>
			<RichText.Content
				tagName="label"
				className={clsx("prc-progress-bar-label", textColorClass)}
				style={{ color: textColor }}
				value={label}
			/>
			<div className={clsx("prc-progress-bar", backgroundColorClass)} style={{backgroundColor}}>
				<div className="prc-progress-bar-value">
					{valuePosition === 'inside' && <span className="prc-progress-bar-value-text" style={{ fontSize: `${valueFontSize}px` }}></span>}
				</div>
				{valuePosition === 'outside' && <span className="prc-progress-bar-value-text" style={{ fontSize: `${valueFontSize}px` }}></span>}
			</div>
		</div>
	);
}

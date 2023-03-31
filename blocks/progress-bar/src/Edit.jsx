/**
 * WordPress Dependencies
 */
import { useBlockProps, withColors } from '@wordpress/block-editor';
/**
 * Internal Dependencies
 */
import Controls from './Controls';
import ProgressBar from './ProgressBar';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
function Edit({
	attributes,
	setAttributes,
	barColor,
	setBarColor,
	backgroundColor,
	setBackgroundColor,
}) {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<Controls
				{...{
					attributes,
					setAttributes,
					colors: {
						barColor,
						setBarColor,
						backgroundColor,
						setBackgroundColor,
					},
				}}
			/>
			<ProgressBar
				{...{
					...attributes,
					barColor: barColor.color,
					backgroundColor: backgroundColor.color,
				}}
			/>
		</div>
	);
}

export default withColors(
	{ barColor: 'color' },
	{ backgroundColor: 'color' },
)(Edit);

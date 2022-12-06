/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	withColors,
	getColorClassName,
} from '@wordpress/block-editor';

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
	className,
	barColor,
	setBarColor,
	backgroundColor,
	setBackgroundColor,
}) {
	const blockProps = useBlockProps({
		className: classnames( className, {
			'has-bar-color': !! barColor.color || !! barColor?.class,
			[ getColorClassName( 'color', barColor?.slug ) ]:
				!! barColor?.slug,
			'has-background': !! backgroundColor.color || backgroundColor.class,
			[ getColorClassName( 'background-color', backgroundColor?.slug ) ]:
				!! backgroundColor?.slug,
		} ),
		style: {
			backgroundColor: ! backgroundColor?.slug && backgroundColor?.color,
		},
	});

	return (
		<div {...blockProps}>
			<Controls {...{ attributes, setAttributes, colors: { barColor, setBarColor, backgroundColor, setBackgroundColor } }} />
			<ProgressBar {...attributes} />
		</div>
	);
}

export default withColors(
	{ barColor: 'color' },
	{ backgroundColor: 'color' },
)(Edit);

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import {
	useInnerBlocksProps,
	useBlockProps,
	withColors,
	getColorClassName,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

const ALLOWED_BLOCKS = ['prc-block/grid-column'];

const DEFAULT_TEMPLATE = [
	[
		'prc-block/grid-column',
		{
			gridLayout: {
				index: 1,
				desktopSpan: 3,
				tabletSpan: 2,
				mobileSpan: 4,
			},
		},
	],
	[
		'prc-block/grid-column',
		{
			gridLayout: {
				index: 2,
				desktopSpan: 6,
				tabletSpan: 4,
				mobileSpan: 4,
			},
		},
	],
	[
		'prc-block/grid-column',
		{
			gridLayout: {
				index: 3,
				desktopSpan: 3,
				tabletSpan: 2,
				mobileSpan: 4,
			},
		},
	],
];

const edit = ({
	attributes,
	setAttributes,
	className,
	textColor,
	setTextColor,
	backgroundColor,
	setBackgroundColor,
	dividerColor,
	setDividerColor,
}) => {
	const { verticalAlignment } = attributes;

	const blockProps = useBlockProps({
		className: classnames( className, {
			'has-text-color': !! textColor.color || !! textColor?.class,
			[ getColorClassName( 'color', textColor?.slug ) ]:
				!! textColor?.slug,
			'has-background': !! backgroundColor.color || backgroundColor.class,
			[ getColorClassName( 'background-color', backgroundColor?.slug ) ]:
				!! backgroundColor?.slug,
			'has-divider': !! dividerColor.color || dividerColor.class,
			[ getColorClassName( 'divider-color', dividerColor?.slug ) ]:
				!! dividerColor?.slug,
			[`are-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
		} ),
		style: {
			color: ! textColor?.slug && textColor?.color,
			backgroundColor: ! backgroundColor?.slug && backgroundColor?.color,
		},
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
		template: DEFAULT_TEMPLATE,
		templateLock: false,
		renderAppender: false,
	});

	return (
		<Fragment>
			<Controls
				{...{
					attributes,
					setAttributes,
					colors: {
						textColor,
						setTextColor,
						backgroundColor,
						setBackgroundColor,
						dividerColor,
						setDividerColor,
					},
				}}
			/>
			<div {...innerBlocksProps} />
		</Fragment>
	);
};

export default withColors(
	{ textColor: 'color' },
	{ backgroundColor: 'color' },
	{ dividerColor: 'color' },
)(edit);

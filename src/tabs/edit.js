/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	withColors,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { TabFill } from '../tab/slotfill';
import useColorSupports from './use-color-supports';
import Controls from './controls';
import GapStyles from './gap-styles';

const TABS_TEMPLATE = [
	['prc-block/tab', { label: 'Tab 1', anchor: 'tab-1' }],
	['prc-block/tab', { label: 'Tab 2', anchor: 'tab-2' }],
];

const DEFAULT_BLOCK = {
	name: 'prc-block/tab',
	attributesToCopy: ['className', 'fontFamily', 'fontSize'],
};

function Edit({
	clientId,
	attributes,
	setAttributes,
	tabInactiveColor,
	setTabInactiveColor,
	tabHoverColor,
	setTabHoverColor,
	tabActiveColor,
	setTabActiveColor,
	tabTextColor,
	setTabTextColor,
	tabActiveTextColor,
	setTabActiveTextColor,
	tabHoverTextColor,
	setTabHoverTextColor,
}) {
	const { style, orientation } = attributes;
	const tabsListBlockSpacing = style?.spacing?.blockGap || null;

	/**
	 * Provide additional non-core color supports for tab background and text colors.
	 * TODO: Talk to Gutenberg team about how to add these into the style engine proper, so that defaults can be set in the style book??
	 */
	const additionalColorSupportingStyles = useColorSupports(attributes);

	/**
	 * Block props for the tabs container.
	 */
	const blockProps = useBlockProps({
		className: clsx(
			'vertical' === orientation ? 'is-vertical' : 'is-horizontal'
		),
		style: {
			...style,
			...additionalColorSupportingStyles,
		},
	});

	/**
	 * Innerblocks props for the tabs content.
	 */
	const innerBlockProps = useInnerBlocksProps(blockProps, {
		defaultBlock: DEFAULT_BLOCK,
		directInsert: true,
		__experimentalCaptureToolbars: true,
		clientId,
		orientation,
		template: TABS_TEMPLATE,
		renderAppender: false, // We handle this via a slotfill.
	});

	return (
		<>
			<Controls
				{...{
					clientId,
					attributes,
					setAttributes,
					tabInactiveColor,
					setTabInactiveColor,
					tabHoverColor,
					setTabHoverColor,
					tabActiveColor,
					setTabActiveColor,
					tabTextColor,
					setTabTextColor,
					tabActiveTextColor,
					setTabActiveTextColor,
					tabHoverTextColor,
					setTabHoverTextColor,
				}}
			/>
			<div {...innerBlockProps}>
				{innerBlockProps.children}
				<TabFill tabsClientId={clientId}>
					<div className="wp-block-prc-block-tabs__tab-item__inserter">
						<InnerBlocks.ButtonBlockAppender />
					</div>
				</TabFill>
				<GapStyles
					blockGap={tabsListBlockSpacing}
					clientId={clientId}
					orientation={orientation}
				/>
			</div>
		</>
	);
}

export default withColors(
	'tabInactiveColor',
	'tabHoverColor',
	'tabActiveColor',
	'tabTextColor',
	'tabActiveTextColor',
	'tabHoverTextColor'
)(Edit);

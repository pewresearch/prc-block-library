/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { Button } from '@wordpress/components';
import {
	Inserter,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

/**
 * useHasSelectedInnerBlock
 * Determine whether one of the inner blocks currently is selected
 *
 * @param {Object} props
 * @param props.clientId
 * @return {boolean} wether the block is the ancestor of selected blocks
 */
const useHasSelectedInnerBlock = ({ clientId }) =>
	useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, true),
	);

/**
 * CustomBlockAppender.
 *
 * Provide a Button component to trigger the inserter.
 * Any undocumented props are spread onto the Button component.
 *
 * @param {Object} props              All props sent to this component.
 * @param {string} props.rootClientId Client ID of the block where this is being used.
 * @param {string} [props.buttonText] Text to display in the Button.
 * @param {string} [props.icon]       The icon to use.
 * @return {Function} The component.
 */
function CustomBlockAppender({
	rootClientId,
	buttonText,
	icon,
	className = 'custom-block-appender',
	...buttonProps
}) {
	return (
		<Inserter
			isAppender
			rootClientId={rootClientId}
			renderToggle={({ onToggle, disabled }) => (
				<div
					style={{
						textAlign: 'center',
					}}
				>
					<Button
						className={`${className}`}
						onClick={onToggle}
						disabled={disabled}
						icon={icon}
						{...buttonProps}
					>
						{buttonText}
					</Button>
				</div>
			)}
		/>
	);
}

const ALLOWED_BLOCKS = [
	'prc-block/quote-sorter-dropdown',
	'prc-block/quote-sorter-search-bar',
	'prc-block/quote-sorter-quote',
	'prc-block/quote-sorter-quotes',
	'prc-block/quote-sorter-quote-text',
	'prc-block/quote-sorter-quote-attribution',
	'prc-block/quote-sorter-dynamic-text',
	'prc-block/grid',
	'core/group',
];
const TEMPLATE = [
	[
		'prc-block/quote-sorter-search-bar',
		{
			placeholder: __('Search for a quote ...'),
		},
	],
	[
		'prc-block/quote-sorter-quotes',
		{},
		Array.from({ length: 5 }, () => ['prc-block/quote-sorter-quote']),
	],
];

const edit = ({
	attributes,
	className,
	setAttributes,
	clientId,
	isSelected,
}) => {
	const hasSelectedInnerBlock = useHasSelectedInnerBlock({ clientId });
	console.log(
		'hasSelectedInnerBlock',
		hasSelectedInnerBlock,
		!hasSelectedInnerBlock,
		isSelected,
	);

	const blockProps = useBlockProps({
		className: classnames(className),
	});

	console.log({ blockProps });

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		template: TEMPLATE,
		renderAppender:
			hasSelectedInnerBlock || isSelected
				? () => (
						<CustomBlockAppender
							rootClientId={clientId}
							isSecondary
							showTooltip
							icon="plus"
							label={__('Insert Quote Sorter Blocks', 'prc-block-library')}
							buttonText={__('Insert Quote Sorter Blocks', 'prc-block-library')}
						/>
				  )
				: false,
	});

	return (
		<Fragment>
			<Controls attributes={attributes} setAttributes={setAttributes} />
			<div {...innerBlocksProps} />
		</Fragment>
	);
};

export default edit;

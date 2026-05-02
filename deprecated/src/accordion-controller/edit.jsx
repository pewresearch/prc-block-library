/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
	Warning,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */

const DEFAULT_BLOCK = {
	name: 'prc-block/accordion',
	attributesToCopy: [
		'className',
		'backgroundColor',
		'fontFamily',
		'fontSize',
		'style',
	],
};

const TEMPLATE = [['prc-block/accordion', {}, []]];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                            Properties passed to the function.
 * @param {Object}   props.attributes                 Available block attributes.
 * @param {string}   props.className
 * @param {string}   props.__unstableLayoutClassNames
 * @param {string}   props.clientId
 * @param {Function} props.setAttributes              Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	className,
	__unstableLayoutClassNames: layoutClassNames,
	setAttributes,
}) {
	const { structuredData = false } = attributes;

	const blockProps = useBlockProps({
		className: clsx(className, layoutClassNames),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		defaultBlock: DEFAULT_BLOCK,
		directInsert: true,
		orientation: 'vertical',
		renderAppender: InnerBlocks.ButtonBlockAppender,
		template: TEMPLATE,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Accordion Settings', 'prc-block-library')}
					initialOpen={true}
				>
					<ToggleControl
						label={__(
							'Include Structured Data',
							'prc-block-library'
						)}
						checked={structuredData}
						onChange={(value) =>
							setAttributes({ structuredData: value })
						}
						help={
							structuredData
								? __(
										'FAQ schema will be output for this accordion.',
										'prc-block-library'
								  )
								: __(
										'FAQ schema disabled.',
										'prc-block-library'
								  )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps}>
				<Warning>
					This block is deprecated. Please use the new Accordion block
					instead.
				</Warning>
				{innerBlocksProps.children}
			</div>
		</>
	);
}

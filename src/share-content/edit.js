/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';

const ALLOWED_BLOCKS = [];

const edit = ({ attributes, className, setAttributes }) => {
	const { shareTargetUrl, description, title } = attributes;

	const blockProps = useBlockProps({
		className: classnames(className),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
	});

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Share Content Settings')}>
					<TextControl
						label={__('Description')}
						value={description}
						onChange={(v) => setAttributes({ description: v })}
					/>
					<TextControl
						label={__('Title')}
						value={title}
						onChange={(v) => setAttributes({ title: v })}
					/>
					<TextControl
						label={__('Target URL')}
						value={shareTargetUrl}
						onChange={(v) => setAttributes({ shareTargetUrl: v })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps} />
		</Fragment>
	);
};

export default edit;

/**
 * External Dependencies
 */
import classnames from 'classnames';
import { Input } from 'semantic-ui-react';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextareaControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [];

const edit = ({ attributes, className, setAttributes }) => {
	const { placeholder } = attributes;

	const blockProps = useBlockProps({
		className: classnames(className, 'ui list'),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
	});

	return (
		<div {...innerBlocksProps}>
			<InspectorControls>
				<PanelBody title={__('Filter options')}>
					<TextareaControl
						label={__('Placeholder text')}
						value={placeholder}
						onChange={(value) => setAttributes({ placeholder: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<Input
				icon="search"
				fluid
				placeholder={placeholder}
				onChange={(e, { value }) => {
					console.log(value);
				}}
			/>
		</div>
	);
};

export default edit;

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	SelectControl,
	TextControl,
	__experimentalNumberControl as NumberControl,
	PanelBody,
	Placeholder,
} from '@wordpress/components';

const edit = ({ attributes, className, setAttributes }) => {
	const { subText, perPage, type } = attributes;

	// block controls for subText, perPage, and type

	const blockProps = useBlockProps({
		className: classnames(className),
	});

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Roper DB Settings')}>
					<TextControl
						label={__('Sub Text')}
						value={subText}
						onChange={(v) => setAttributes({ subText: v })}
					/>
					<BaseControl label={__('Per Page')}>
						<NumberControl
							value={perPage}
							min={5}
							max={20}
							onChange={(v) => setAttributes({ perPage: v })}
						/>
					</BaseControl>
					<SelectControl
						label={__('Type')}
						value={type}
						options={[
							{ label: 'Default', value: 'default' },
							{ label: 'Global', value: 'global' },
						]}
						onChange={(v) => setAttributes({ type: v })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<Placeholder
					icon="database"
					label={__(' Roper DB Search')}
					instructions={__(
						'This block will render the Roper Database search on the frontend. You can edit the settings in the block inspector.',
					)}
				>
					<p>
						Will render <pre style={{ display: 'inline' }}>{type}</pre> Roper
						Search
					</p>
				</Placeholder>
			</div>
		</Fragment>
	);
};

export default edit;

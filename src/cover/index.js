/**
 * External Dependencies
 */
import { MediaDropZone } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { registerBlockStyle } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import './style.scss';

registerBlockStyle('core/cover', [
	{
		name: 'disable-mobile-collapse',
		label: 'Disable Mobile Collapse',
	},
]);

addFilter(
	'editor.BlockEdit',
	'prc-block/cover',
	createHigherOrderComponent(
		(BlockEdit) =>
			function GroupBlockAdvancedControls(props) {
				const { name, attributes, setAttributes } = props;
				if ('core/cover' !== name) {
					return <BlockEdit {...props} />;
				}
				const { mobileId } = attributes;
				return (
					<Fragment>
						<InspectorControls>
							<PanelBody title={__('Media (mobile) settings')}>
								<MediaDropZone
									attachmentId={mobileId}
									label={__('Set Mobile Background')}
									onUpdate={(attachment) => {
										setAttributes({
											mobileId: attachment.id,
											mobileUrl: attachment.source_url,
										});
									}}
								/>
							</PanelBody>
						</InspectorControls>
						<BlockEdit {...props} />
					</Fragment>
				);
			},
		'withCoverMobileMediaControls',
	),
	21,
);

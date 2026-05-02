/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	ExternalLink,
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */
import { POST_TYPE, POST_TYPE_LABEL } from './constants';

function InspectorPanel({ attributes, setAttributes }) {
	const { ref, iframeTemplate } = attributes;
	const [title, setTitle] = useEntityProp(
		'postType',
		POST_TYPE,
		'title',
		ref
	);
	const [permalink] = useEntityProp('postType', POST_TYPE, 'link', ref);
	return (
		<InspectorControls>
			<PanelBody title="Entity Info">
				<div>
					<SelectControl
						__nextHasNoMarginBottom
						label={__('Iframe template', 'entity-as-iframe')}
						help={__(
							'Content: post body only. Branded: theme iframed template + masthead when applicable.',
							'entity-as-iframe'
						)}
						value={iframeTemplate || 'content'}
						options={[
							{
								label: __(
									'Content (minimal)',
									'entity-as-iframe'
								),
								value: 'content',
							},
							{
								label: __('Branded', 'entity-as-iframe'),
								value: 'branded',
							},
						]}
						onChange={(value) =>
							setAttributes({ iframeTemplate: value })
						}
					/>
					<TextControl
						__nextHasNoMarginBottom
						label={sprintf(
							/* translators: %s: post type label (e.g. Post). */
							__('%s Title', 'entity-as-iframe'),
							POST_TYPE_LABEL
						)}
						value={title}
						onChange={setTitle}
					/>
					<ExternalLink href={permalink}>
						Open {POST_TYPE_LABEL.toLowerCase()} in new window
					</ExternalLink>
				</div>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return (
		<Fragment>
			<InspectorPanel {...{ attributes, setAttributes, context }} />
		</Fragment>
	);
}

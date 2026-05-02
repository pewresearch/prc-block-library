/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 */
import './style.scss';

const BLOCKNAME = 'core/accordion';
const BLOCKIDENTIFIER = 'prc-block-library/core-accordion';

/**
 * Add structuredData attribute to core/accordion block.
 */
addFilter(
	'blocks.registerBlockType',
	`${BLOCKIDENTIFIER}-attributes`,
	(settings) => {
		if (BLOCKNAME !== settings.name) {
			return settings;
		}

		return {
			...settings,
			attributes: {
				...settings.attributes,
				structuredData: {
					type: 'boolean',
					default: false,
				},
			},
		};
	},
	10
);

/**
 * Add Inspector Controls for structuredData toggle.
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { attributes, setAttributes, name } = props;

		if (BLOCKNAME !== name) {
			return <BlockEdit {...props} />;
		}

		const { structuredData } = attributes;

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						title={__('Structured Data', 'core-accordion')}
						initialOpen={false}
					>
						<ToggleControl
							label={__(
								'Enable FAQPage Schema',
								'core-accordion'
							)}
							help={__(
								'Add schema.org FAQPage markup for better SEO',
								'core-accordion'
							)}
							checked={structuredData}
							onChange={(value) =>
								setAttributes({ structuredData: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withInspectorControls');

addFilter(
	'editor.BlockEdit',
	`${BLOCKIDENTIFIER}-inspector-controls`,
	withInspectorControls
);

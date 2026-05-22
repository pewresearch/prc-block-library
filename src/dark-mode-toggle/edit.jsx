/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { Icon } from '@wordpress/icons';

/**
 * Inline moon SVG used in the editor preview button.
 */
const moonIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="20"
		height="20"
	>
		<path
			d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.1 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05Z"
			fill="currentColor"
		/>
	</svg>
);

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { showLabel, lightLabel, darkLabel } = attributes;

	const blockProps = useBlockProps({
		className: 'wp-block-prc-block-dark-mode-toggle',
		type: 'button',
		ariaLabel: __('Toggle dark mode'),
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Toggle Settings')}>
					<ToggleControl
						label={__('Show label')}
						checked={!!showLabel}
						onChange={(value) =>
							setAttributes({ showLabel: value })
						}
						help={__(
							'Show the text label next to the toggle icon.'
						)}
					/>
					<TextControl
						label={__('Dark mode label')}
						value={darkLabel}
						onChange={(value) =>
							setAttributes({ darkLabel: value })
						}
						help={__(
							'Shown when the site is currently in light mode (clicking switches to dark).'
						)}
					/>
					<TextControl
						label={__('Light mode label')}
						value={lightLabel}
						onChange={(value) =>
							setAttributes({ lightLabel: value })
						}
						help={__(
							'Shown when the site is currently in dark mode (clicking switches to light).'
						)}
					/>
				</PanelBody>
			</InspectorControls>
			<button {...blockProps}>
				<span
					className="prc-dark-mode-toggle__icon"
					aria-hidden="true"
				>
					<Icon icon={moonIcon} />
				</span>
				{showLabel && (
					<span className="prc-dark-mode-toggle__label">
						{darkLabel}
					</span>
				)}
			</button>
		</>
	);
}

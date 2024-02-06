/**
 * External Dependencies
 */
import { link as icon } from '@wordpress/icons';
import { TaxonomySelect } from '@prc/components';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToolbarButton, ToolbarGroup } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import LinkControl from './link-control';

export default function Controls({
	attributes,
	setAttributes,
	isSelected,
	context,
	clientId,
	popoverAnchor,
}) {
	const { className, url } = attributes;

	const [isLinkOpen, setIsLinkOpen] = useState(false);

	const onClose = () => {
		setIsLinkOpen(false);
	};

	const { taxonomy } = attributes;

	const allowLink = 'is-style-sub-expand' !== className;

	useEffect(() => {
		// Show the LinkControl on mount if the URL is empty
		// ( When adding a new menu item)
		// This can't be done in the useState call because it conflicts
		// with the autofocus behavior of the BlockListBlock component.
		if (!url) {
			setIsLinkOpen(true);
		}
	}, [url]);

	/**
	 * The hook shouldn't be necessary but due to a focus loss happening
	 * when selecting a suggestion in the link popover, we force close on block unselection.
	 */
	useEffect(() => {
		if (!isSelected) {
			setIsLinkOpen(false);
		}
	}, [isSelected]);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__(
						'Taxonomy Menu Link Settings',
						'prc-block-library'
					)}
				>
					<TaxonomySelect
						value={taxonomy}
						onChange={(newTaxonomy) => {
							setAttributes({ taxonomy: newTaxonomy });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				{allowLink && (
					<ToolbarGroup>
						<ToolbarButton
							isActive={isLinkOpen}
							icon={icon}
							label={__('Link', 'prc-block-library')}
							onClick={() => setIsLinkOpen(!isLinkOpen)}
						/>
						{isLinkOpen && (
							<LinkControl
								anchor={popoverAnchor}
								onClose={onClose}
								attributes={attributes}
								setAttributes={setAttributes}
							/>
						)}
					</ToolbarGroup>
				)}
			</BlockControls>
		</Fragment>
	);
}

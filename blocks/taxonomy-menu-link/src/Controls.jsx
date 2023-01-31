/**
 * External Dependencies
 */
import { link as linkIcon, addSubmenu } from '@wordpress/icons';
import { TaxonomySelect } from '@prc/components';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import {
	BlockControls,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	CardDivider,
	PanelBody,
	Popover,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */
import LinkControl from './LinkControl';

export default function Controls({
	attributes,
	setAttributes,
	isSelected,
	context,
	clientId,
	popoverAnchor
}) {
	const orientation = context['taxonomy-menu/layout']?.orientation;
	const {className, url} = attributes;

	const [isLinkOpen, setIsLinkOpen] = useState(false);

	const onClose = () => {
		setIsLinkOpen(false);
	}

	const { enableSubMenu, taxonomy } = attributes;
	const { allowSubMenu } = useSelect((select) => {
		if ( 'vertical' !== orientation ) {
			return { allowSubMenu: false };
		}
		const rootClientId =
			select(blockEditorStore).getBlockRootClientId(clientId);
		const rootBlockName = select(blockEditorStore).getBlockName(rootClientId);
		return {
			allowSubMenu: 'prc-block/taxonomy-menu-link' !== rootBlockName && 'is-style-sub-heading' !== className,
		};
	}, []);

	const allowLink = 'is-style-sub-expand' !== className;

	useEffect( () => {
		// Show the LinkControl on mount if the URL is empty
		// ( When adding a new menu item)
		// This can't be done in the useState call because it conflicts
		// with the autofocus behavior of the BlockListBlock component.
		if ( ! url ) {
			setIsLinkOpen( true );
		}
	}, [ url ] );

	/**
	 * The hook shouldn't be necessary but due to a focus loss happening
	 * when selecting a suggestion in the link popover, we force close on block unselection.
	 */
	useEffect( () => {
		if ( ! isSelected ) {
			setIsLinkOpen( false );
		}
	}, [ isSelected ] );

	return (
		<Fragment>
		<InspectorControls>
			<PanelBody title={__('Taxonomy Menu Link Settings', 'prc-block-library')}>
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
					<ToolbarButton isActive={isLinkOpen} icon={ linkIcon } label={__('Link', 'prc-block-library')} onClick={()=> setIsLinkOpen(!isLinkOpen)}/>
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
			{'vertical' === orientation && (
				<ToolbarGroup>
					{allowSubMenu && (
						<ToolbarButton
							icon={addSubmenu}
							label={__(
								`${enableSubMenu ? 'Disable' : 'Enable'} Sub Menu`,
								'prc-block-library',
							)}
							onClick={() => {
								setAttributes({ enableSubMenu: !enableSubMenu });
							}}
							isActive={enableSubMenu}
						/>
					)}
				</ToolbarGroup>
			)}
		</BlockControls>
		</Fragment>
	);
}

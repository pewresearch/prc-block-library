/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
// eslint-disable-next-line no-restricted-imports
import { createInterpolateElement, Fragment } from '@wordpress/element';
import {
	ComboboxControl,
	Notice,
	__experimentalHStack as HStack, // eslint-disable-line
	__experimentalToggleGroupControl as ToggleGroupControl, // eslint-disable-line
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon, // eslint-disable-line
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import useMenuTemplatePart from './use-menu-template-part';

export default function MenuTemplatePartControl({
	menuSlug,
	onChange = () => {},
}) {
	const siteUrl = useSelect((select) => select('core').getSite().url);
	const menuTemplateUrl = siteUrl
		? `${siteUrl}/wp-admin/site-editor.php?path=%2Fpatterns&categoryType=wp_template_part&categoryId=menu`
		: '';

	// Fetch all template parts.
	const { menuOptions, hasMenus, selectedMenuAndExists } =
		useMenuTemplatePart({
			menuSlug,
			setMenuSlug: (newVal) => onChange(newVal),
		});

	// Notice for when no menus have been created.
	const noMenusNotice = (
		<Notice status="warning" isDismissible={false}>
			{createInterpolateElement(
				__(
					'No menu templates could be found. Create a new one in the <a>Site Editor</a>.',
					'mega-menu-block'
				),
				{
					a: (
						<a // eslint-disable-line
							href={menuTemplateUrl}
							target="_blank"
							rel="noreferrer"
						/>
					),
				}
			)}
		</Notice>
	);

	// Notice for when the selected menu template no longer exists.
	const menuDoesntExistNotice = (
		<Notice status="warning" isDismissible={false}>
			{__(
				'The selected menu template no longer exists. Choose another.',
				'mega-menu-block'
			)}
		</Notice>
	);

	return (
		<Fragment>
			<ComboboxControl
				label={__('Menu Template', 'mega-menu-block')}
				value={menuSlug}
				options={menuOptions}
				onChange={onChange}
				help={
					hasMenus &&
					createInterpolateElement(
						__(
							'Create and modify menu templates in the <a>Site Editor</a>.',
							'mega-menu-block'
						),
						{
							a: (
							<a // eslint-disable-line
									href={menuTemplateUrl}
									target="_blank"
									rel="noreferrer"
								/>
							),
						}
					)
				}
			/>
			{!hasMenus && noMenusNotice}
			{hasMenus && !selectedMenuAndExists && menuDoesntExistNotice}
		</Fragment>
	);
}

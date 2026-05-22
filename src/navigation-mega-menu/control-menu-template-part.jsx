/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
// eslint-disable-next-line no-restricted-imports
import { createInterpolateElement, Fragment } from '@wordpress/element';
import { Button, ComboboxControl, Notice } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import useMenuTemplatePart from './use-menu-template-part';

export default function MenuTemplatePartControl({
	menuSlug,
	onChange = () => {},
}) {
	const siteUrl = window.prcPlatform?.siteUrl;

	const menuTemplateUrl = siteUrl
		? `${siteUrl}/wp-admin/site-editor.php?path=%2Fpatterns&categoryType=wp_template_part&categoryId=menu`
		: '';

	const { menuOptions, hasMenus, selectedMenuAndExists, menuId } =
		useMenuTemplatePart({
			menuSlug,
			setMenuSlug: (newVal) => onChange(newVal),
		});

	console.log('useMenuTemplatePart', {
		menuOptions,
		hasMenus,
		selectedMenuAndExists,
		menuId,
	});

	// Direct link to the specific template part when menuId is available.
	// Falls back to the menu patterns list so the link always appears when
	// a valid template is selected.
	const editTemplateUrl = (() => {
		if (!siteUrl) {
			return '';
		}
		if (menuId) {
			return `${siteUrl}/wp-admin/site-editor.php?p=${encodeURIComponent(`/wp_template_part/${menuId}`)}&canvas=edit`;
		}
		return menuTemplateUrl;
	})();

	const selectedMenuLabel =
		menuOptions.find((o) => o.value === menuSlug)?.label ?? menuSlug;

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
			/>
			{!hasMenus && noMenusNotice}
			{hasMenus && !selectedMenuAndExists && menuDoesntExistNotice}
			{selectedMenuAndExists && editTemplateUrl && (
				<Button
					variant="link"
					href={editTemplateUrl}
					target="_blank"
					rel="noreferrer"
					style={{ marginTop: '8px', display: 'inline-flex' }}
				>
					{selectedMenuLabel
						? sprintf(
								/* translators: %s: template part name */
								__(
									'Edit "%s" in Site Editor',
									'mega-menu-block'
								),
								selectedMenuLabel
							)
						: __('Edit template in Site Editor', 'mega-menu-block')}
				</Button>
			)}
		</Fragment>
	);
}

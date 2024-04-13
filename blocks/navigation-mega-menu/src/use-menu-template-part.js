/**
 * WordPress Dependencies
 */
import { useEntityRecords } from '@wordpress/core-data';
import { useMemo } from 'react';

export default function useMenuTemplatePart({
	menuSlug,
	setMenuSlug = () => {},
}) {
	// Fetch all template parts.
	const { hasResolved, records } = useEntityRecords(
		'postType',
		'wp_template_part',
		{
			per_page: -1,
		}
	);

	// Filter the template parts for those in the 'menu' area.
	const menuOptions = useMemo(() => {
		const selectedMenu = records.find((item) => item.slug === menuSlug);
		if (selectedMenu) {
			return [
				{
					label: selectedMenu.title.rendered,
					value: selectedMenu.slug,
				},
			];
		}
		return records
			.filter(
				(item) =>
					item.area === 'menu' || item.title.rendered.includes('menu')
			)
			.map((item) => ({
				label: item.title.rendered,
				value: item.slug,
			}));
	}, [menuSlug, records]);

	const hasMenus = useMemo(() => menuOptions.length > 0, [menuOptions]);
	const selectedMenuAndExists = useMemo(
		() =>
			menuSlug &&
			menuOptions?.length &&
			menuOptions.some((item) => item.value === menuSlug),
		[menuSlug, menuOptions]
	);
	const menuId = useMemo(() => {
		if (!menuSlug || !hasResolved) {
			return;
		}
		const r =
			hasResolved &&
			records &&
			records.find((item) => item.slug === menuSlug);
		console.log('r...', r);
		if (r.theme && r.slug) {
			return `${r.theme}//${r.slug}`;
		}
	}, [menuSlug, hasResolved, records]);

	console.log(
		'useMenuTemplatePart',
		menuOptions,
		hasMenus,
		selectedMenuAndExists,
		records,
		menuId
	);

	return {
		menuOptions,
		hasMenus,
		selectedMenuAndExists,
		menuId,
		setMenuSlug,
	};
}

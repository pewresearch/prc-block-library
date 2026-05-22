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

	const menuOptions = useMemo(() => {
		if (!records || !records.length) {
			return [];
		}
		return records.map((item) => ({
			label: item.title.rendered,
			value: item.slug,
		}));
	}, [records]);

	const hasMenus = useMemo(() => menuOptions.length > 0, [menuOptions]);
	const selectedMenuAndExists = useMemo(
		() =>
			menuSlug &&
			menuOptions?.length &&
			menuOptions.some((item) => item.value === menuSlug),
		[menuSlug, menuOptions]
	);
	const menuId = useMemo(() => {
		if (!menuSlug || !hasResolved || !records || !records.length) {
			return;
		}
		const r = records.find((item) => item.slug === menuSlug);
		if (!r) {
			return;
		}
		// WP core-data already stores the compound `theme//slug` as `r.id`
		// for wp_template_part records. Use it directly; fall back to manual
		// construction; final fallback is slug-only so the link always appears.
		if (r.id) {
			return r.id;
		}
		if (r.theme) {
			return `${r.theme}//${r.slug}`;
		}
		return r.slug;
	}, [menuSlug, hasResolved, records]);

	return {
		menuOptions,
		hasMenus,
		selectedMenuAndExists,
		menuId,
		setMenuSlug,
	};
}

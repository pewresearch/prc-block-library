## Common Block Library Styles

### Baseball Card

To opt in to these styles automatically, simply add `'prc-block-library--baseball-card'` in your `block.json` file like so:

```json
{
	...,
	"editorStyle": "file:./index.css",
	"style": ["file:./style-index.css","prc-block-library--baseball-card"],
}
```

`{include image example} TK`

### Pagination

To opt in to these styles automatically, simply add `'prc-block-library--pagination'` in your `block.json` file like so:

```json
{
	...,
	"editorStyle": "file:./index.css",
	"style": ["file:./style-index.css","prc-block-library--pagination"],
}
```

`{include image example} TK`

### Additional Color Supports

This class extends additional color attributes and dynamic style generation for `border`, `activeBackgroundColor`, `activeTextColor`, `hoverBackgroundColor`, and `hoverTextColor`. To opt in to these styles automatically, simply add `'prc-block-library--additional-color-supports'` in your `block.json` file like so:

```json
{
	...
	"editorStyle": "file:./index.css",
	"style": ["file:./style-index.css","prc-block-library--additional-color-supports"],
}
```

You will have to create your own color controls and add the appropriate class names to your block's markup, however helper functions and boilerplate code are provider below:

For example, if you want to add active and hover color controls, you can start with this boilerplate:

```js
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo } from '@wordpress/element';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

export default function ColorControls({
	attributes,
	colors,
	clientId,
}) {
	const { className } = attributes;

	const colorProps = useMultipleOriginColorsAndGradients();

	const colorSettings = useMemo(() => {
		const {
			activeBackgroundColor,
			setActiveBackgroundColor,
			activeTextColor,
			setActiveTextColor,
			hoverBackgroundColor,
			setHoverBackgroundColor,
			hoverTextColor,
			setHoverTextColor
		} = colors;

		const t = [
			{
				colorValue: activeTextColor?.color,
				onColorChange: setActiveTextColor,
				label: __('Active Text'),
			},
			{
				colorValue: activeBackgroundColor?.color,
				onColorChange: setActiveBackgroundColor,
				label: __('Active Background'),
			},
			{
				colorValue: hoverTextColor?.color,
				onColorChange: setHoverTextColor,
				label: __('Hover Text'),
			},
			{
				colorValue: hoverBackgroundColor?.color,
				onColorChange: setHoverBackgroundColor,
				label: __('Hover Background'),
			},
		];
	}, [colors, className]);

	return (
		<Fragment>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={ colorSettings }
					panelId={ clientId }
					hasColorsOrGradients={ false }
					disableCustomColors={ true }
					__experimentalIsRenderedInSidebar
					{ ...colorProps }
				/>
			</InspectorControls>
		</Fragment>
	);
}
```

```jsx
<ul className="wp-block-prc-block-XYZ__list">
	<li className={classNames('wp-block-prc-block-XYZ__list-item', {
		'is-active': true
		'has-active-background': !!colors.activeBackgroundColor.color || colors.activeBackgroundColor.class,
		[`has-active-${colors?.activeBackgroundColor?.slug}-background-color`]: !!colors?.activeBackgroundColor?.slug,
		'has-active-color': !!colors.activeTextColor.color || colors.activeTextColor.class,
		[`has-active-${colors?.activeTextColor?.slug}-color`]: !!colors?.activeTextColor?.slug,
		'has-focus-background': !!colors.activeBackgroundColor.color || colors.activeBackgroundColor.class,
		[`has-focus-${colors?.activeBackgroundColor?.slug}-background-color`]: !!colors?.activeBackgroundColor?.slug,
		'has-focus-color': !!colors.activeTextColor.color || colors.activeTextColor.class,
		[`has-focus-${colors?.activeTextColor?.slug}-color`]: !!colors?.activeTextColor?.slug,
		'has-hover-background': !!colors.hoverBackgroundColor.color || colors.hoverBackgroundColor.class,
		[`has-hover-${colors?.hoverBackgroundColor?.slug}-background-color`]: !!colors?.activeBackgroundColor?.slug,
		'has-hover-color': !!colors.hoverTextColor.color || colors.hoverTextColor.class,
		[`has-hover-${colors?.hoverTextColor?.slug}-color`]: !!colors?.hoverTextColor?.slug,
	})}>
		My List Item
	</li>
</ul>
```

```php
<?php
$color_supports = new Additional_Color_Supports();
$is_active = true;
$list_item_classnames = $color_supports->get_list_classnames(
	'wp-block-prc-block-XYZ',
	$is_active,
	$attributes,
);
```

### Core Shared Styles

All blocks that have a `wp-block-` classname prefix will automatically be styled with these shared styles.

#### Responsive Content Justification

- **`.is-content-justification-space-between__on-mobile__right`**
  - On mobile (`max-width: 768px`), sets `justify-content: flex-end;` (aligns content to the right), when already set to `space-between` on desktop.

- **`.is-content-justification-space-between__on-mobile__left`**
  - On mobile, sets `justify-content: flex-start;` (aligns content to the left), when already set to `space-between` on desktop.

- **`.is-content-justification-right__on-mobile__space-between`**
  - On mobile, sets `justify-content: space-between;` (evenly distributes content with space between each item), when already set to `right` on desktop.

- **`.is-content-justification-left__on-mobile__space-between`**
  - On mobile, sets `justify-content: space-between;` (evenly distributes content with space between each item), when already set to `left` on desktop.
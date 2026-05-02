# Card

Display content in a card container with an optional heading.

## Block Metadata

| Property   | Value                                                       |
| ---------- | ----------------------------------------------------------- |
| Name       | `prc-block/card`                                            |
| Title      | Card                                                        |
| Category   | `design`                                                    |
| Version    | `1.0.0`                                                     |
| API        | 3                                                           |
| Textdomain | `card`                                                      |
| Example    | Yes (`heading` + inner `core/paragraph` — inserter preview) |

## Attributes

| Attribute                      | Type     | Default | Source                                  | Description                                                                              |
| ------------------------------ | -------- | ------- | --------------------------------------- | ---------------------------------------------------------------------------------------- |
| `heading`                      | `string` | --      | `html` (selector: `.prc-card__heading`) | The card heading text displayed above the content area.                                  |
| `headingBackgroundColor`       | `string` | --      | --                                      | Preset color slug for the heading background. If unset, falls back to `ui-stable-black`. |
| `customHeadingBackgroundColor` | `string` | --      | --                                      | Custom hex color for the heading background.                                             |
| `headingTextColor`             | `string` | --      | --                                      | Preset color slug for the heading text. If unset, falls back to `ui-stable-white`.       |
| `customHeadingTextColor`       | `string` | --      | --                                      | Custom hex color for the heading text.                                                   |

## Supports

| Feature                | Enabled | Notes                                          |
| ---------------------- | ------- | ---------------------------------------------- |
| Anchor                 | Yes     |                                                |
| HTML editing           | No      |                                                |
| Color: background      | Yes     |                                                |
| Color: text            | Yes     |                                                |
| Spacing: blockGap      | Yes     | Controls gap between items in the content area |
| Spacing: margin        | Yes     | Skip serialization; applied manually           |
| Spacing: padding       | Yes     | Skip serialization; applied to content area    |
| Typography: fontSize   | Yes     |                                                |
| Typography: fontFamily | Yes     |                                                |
| Position: sticky       | Yes     | Card can be made sticky                        |

## Context

| Context    | Description        |
| ---------- | ------------------ |
| `postId`   | Current post ID.   |
| `postType` | Current post type. |

## Inner Blocks

This is a container block. Any blocks can be placed inside the card's content area. No template or restrictions are defined -- the inner blocks area is fully open.

## Usage Instructions

1. Insert the **Card** block.
2. Type a heading in the heading area (rendered as `<h2>`). The heading is styled as uppercase, small text with a colored background.
3. Add any content blocks inside the card content area below the heading.
4. Customize the heading colors using the sidebar color controls (heading text color and heading background color). By default, the heading uses `ui-stable-black` background and `ui-stable-white` text from the design system theme presets.
5. Adjust padding and margin as needed -- padding applies to the content area, margin to the outer wrapper.
6. The card supports sticky positioning for sidebar use cases.

## Block Markup Example

```html
<div
	class="wp-block-prc-block-card"
	style="--custom-heading-background-color: #000; --custom-heading-text-color: #fff;"
>
	<h2 class="prc-card__heading">CARD HEADING</h2>
	<div
		class="prc-card__content"
		style="padding-left: 1em; padding-right: 1em; --card-gap: 0.5em;"
	>
		<p>Card content goes here.</p>
	</div>
</div>
```

## PHP Rendering

The `render_block_callback` in `class-card.php`:

1. Generates CSS custom properties for heading colors (`--custom-heading-text-color`, `--custom-heading-background-color`) from the custom color attributes.
2. Applies these as inline styles on the root element using `WP_HTML_Tag_Processor`.

### Empty Card Hiding

The class registers a late-priority `render_block` filter (`hide_empty_card`, priority 100) that checks if the `.prc-card__content` div is empty. If it contains no content, the entire card is hidden (returns empty string). This runs after all inner blocks have rendered.

## Styles

```css
.wp-block-prc-block-card {
	--card-gap-default: 0.5em;
}
.prc-card__heading {
	margin: 0;
	padding: 0.525em 1em;
	font-size: 0.825em;
	font-weight: 400;
	letter-spacing: 0.1em;
	line-height: 1.28571429em;
	text-transform: uppercase;
	background-color: var(
		--custom-heading-background-color,
		var(--wp--preset--color--ui-stable-black)
	);
	color: var(
		--custom-heading-text-color,
		var(--wp--preset--color--ui-stable-white)
	);
}
.prc-card__content {
	display: flex;
	flex-direction: column;
	gap: var(--card-gap, var(--card-gap-default));
}
```

The heading has a distinctive "baseball card" style: uppercase, small font size, wide letter spacing, and a colored background strip. The content area uses flexbox column layout with configurable gap.

## Related Blocks

This block is standalone. It is commonly used in sidebars and content layouts to group related information.

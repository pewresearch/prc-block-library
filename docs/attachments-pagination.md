# Attachments Pagination

Displays paginated navigation for the attachments of the parent post of the current attachment. This is only intended for use on attachment pages.

## Block Metadata

| Property   | Value                                                       |
| ---------- | ----------------------------------------------------------- |
| Name       | `prc-block/attachments-pagination`                          |
| Title      | Attachments Pagination                                      |
| Category   | `text`                                                      |
| Version    | `0.1.0`                                                     |
| API        | 3                                                           |
| Textdomain | `attachments-pagination`                                    |
| Example    | Yes (empty object — default attributes in inserter preview) |

## Attributes

| Attribute               | Type     | Default                                                | Description                                                                       |
| ----------------------- | -------- | ------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `hoverBackgroundColor`  | `string` | `"ui-beige-very-light"`                                | Preset color slug for hover state background.                                     |
| `hoverTextColor`        | `string` | `"ui-black"`                                           | Preset color slug for hover state text.                                           |
| `activeBackgroundColor` | `string` | `"ui-gray-very-light"`                                 | Preset color slug for active (current) page background.                           |
| `activeTextColor`       | `string` | `"ui-black"`                                           | Preset color slug for active page text.                                           |
| `backgroundColor`       | `string` | `"ui-white"`                                           | Preset color slug for default background.                                         |
| `style`                 | `object` | `{ spacing: { blockGap: "var:preset\|spacing\|20" } }` | Block style object with default block gap.                                        |
| `parentId`              | `number` | --                                                     | Override the parent post ID. If not set, falls back to the current post's parent. |

## Supports

| Feature                | Enabled                           | Notes |
| ---------------------- | --------------------------------- | ----- |
| Anchor                 | Yes                               |       |
| HTML editing           | No                                |       |
| Color: background      | Yes                               |       |
| Color: text            | Yes                               |       |
| Spacing: blockGap      | Yes                               |       |
| Spacing: margin        | Yes (all sides, default controls) |       |
| Typography: fontSize   | Yes                               |       |
| Typography: fontFamily | No (default control enabled)      |       |

## Context

| Context    | Description            |
| ---------- | ---------------------- |
| `postId`   | The current post ID.   |
| `postType` | The current post type. |

## Additional Dependencies

This block depends on shared stylesheets:

-   `prc-block-library--pagination`: Shared pagination component styles.
-   `prc-block-library--additional-color-supports`: Additional color support styles.

## Usage Instructions

1. This block is designed for **attachment page templates** only.
2. Insert the **Attachments Pagination** block into your attachment template.
3. The block automatically renders a numbered pagination control (Previous / 1 2 3 ... / Next) for navigating between sibling attachments.
4. The currently active attachment is highlighted.
5. Use the color controls to customize hover and active state colors.
6. Optionally override `parentId` to paginate attachments from a specific post.

## Block Markup Example

```html
<div class="wp-block-prc-block-attachments-pagination">
	<div class="common-block-style__pagination__container">
		<div class="common-block-style__pagination">
			<div class="common-block-style__pagination__pagination-previous">
				<a href="/prev-attachment/">Previous</a>
			</div>
			<div class="common-block-style__pagination__pagination-numbers">
				<a
					href="/attachment-1/"
					class="common-block-style__pagination__page-numbers"
					>1</a
				>
				<span
					class="common-block-style__pagination__page-numbers attachments-pagination__item--active"
					>2</span
				>
				<a
					href="/attachment-3/"
					class="common-block-style__pagination__page-numbers"
					>3</a
				>
			</div>
			<div class="common-block-style__pagination__pagination-next">
				<a href="/next-attachment/">Next</a>
			</div>
		</div>
	</div>
</div>
```

## PHP Rendering

The `render_block_callback` in `class-attachments-pagination.php` is fully server-side rendered:

1. Determines the parent post ID from the `parentId` attribute or falls back to `wp_get_post_parent_id()`.
2. Calls `get_attachments()` which queries image attachments for the parent post (up to 50), filtering out art direction images, single-word titles, PDFs, Getty images, and images with `menu_order > 0`.
3. Results are cached for 1 hour.
4. Determines which attachment is active (matches `get_the_ID()`).
5. Passes the attachment list to `\PRC\Platform\Block_Utils\Pagination` to generate numbered pagination markup with Previous/Next navigation.

## Frontend Interactivity

This block does not have a view script. Navigation is handled via standard anchor links.

## Styles

```css
.wp-block-prc-block-attachments-pagination {
	color: inherit;
	background: inherit;
	font-family: var(--wp--preset--font-family--sans-serif);
}
```

Pagination styling is provided by the shared `prc-block-library--pagination` stylesheet.

## Related Blocks

-   [Attachments List](./attachments-list.md) -- companion block that displays the full list of attachments

# Attachments List

Displays a list of attachments for the parent post of the current attachment. This block is intended to be used on attachment pages only.

## Block Metadata

| Property   | Value                                                     |
| ---------- | --------------------------------------------------------- |
| Name       | `prc-block/attachments-list`                              |
| Title      | Attachments List                                          |
| Category   | `text`                                                    |
| Version    | `0.2.0`                                                   |
| API        | 3                                                         |
| Textdomain | `attachments-list`                                        |
| Example    | Yes (sample `heading` / `hideHeading` — inserter preview) |

## Attributes

| Attribute                     | Type      | Default                                                | Description                                                                                        |
| ----------------------------- | --------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `headingBackgroundColor`      | `string`  | `"ui-black"`                                           | Preset color slug for the heading background.                                                      |
| `headingTextColor`            | `string`  | `"ui-white"`                                           | Preset color slug for the heading text.                                                            |
| `hoverBackgroundColor`        | `string`  | --                                                     | Preset color slug for list item hover background.                                                  |
| `hoverTextColor`              | `string`  | --                                                     | Preset color slug for list item hover text.                                                        |
| `customHoverBackgroundColor`  | `string`  | --                                                     | Custom hex color for hover background.                                                             |
| `customHoverTextColor`        | `string`  | --                                                     | Custom hex color for hover text.                                                                   |
| `activeBackgroundColor`       | `string`  | --                                                     | Preset color slug for the active (current) item background.                                        |
| `activeTextColor`             | `string`  | --                                                     | Preset color slug for the active item text.                                                        |
| `customActiveBackgroundColor` | `string`  | --                                                     | Custom hex color for active item background.                                                       |
| `customActiveTextColor`       | `string`  | --                                                     | Custom hex color for active item text.                                                             |
| `backgroundColor`             | `string`  | `"ui-white"`                                           | Preset color slug for the overall background.                                                      |
| `heading`                     | `string`  | `"Attachments"`                                        | The heading text displayed above the list.                                                         |
| `hideHeading`                 | `boolean` | `false`                                                | Whether to hide the heading.                                                                       |
| `style`                       | `object`  | `{ spacing: { blockGap: "var:preset\|spacing\|20" } }` | Block style object with default block gap.                                                         |
| `parentId`                    | `number`  | --                                                     | Override the parent post ID to fetch attachments from. If not set, uses the current post's parent. |

## Supports

| Feature                | Enabled                      | Notes |
| ---------------------- | ---------------------------- | ----- |
| Anchor                 | Yes                          |       |
| HTML editing           | No                           |       |
| Color: background      | Yes                          |       |
| Color: text            | Yes                          |       |
| Spacing: margin        | Yes                          |       |
| Spacing: padding       | Yes                          |       |
| Spacing: blockGap      | Yes                          |       |
| Typography: fontSize   | Yes                          |       |
| Typography: fontFamily | No (default control enabled) |       |

## Context

This block uses the following context from parent blocks:

| Context    | Description                                              |
| ---------- | -------------------------------------------------------- |
| `postId`   | The current post ID (used to determine the parent post). |
| `postType` | The current post type.                                   |

## Usage Instructions

1. This block is designed for use in **attachment page templates** only.
2. Insert the **Attachments List** block into your attachment template.
3. The block automatically queries and displays all sibling attachments (images attached to the same parent post).
4. The current attachment is highlighted with the active state styles.
5. The parent post itself is included as the first item in the list.
6. Use the color controls to customize heading, hover, and active state colors.
7. Optionally override the `parentId` attribute to fetch attachments from a specific post.

## Block Markup Example

```html
<ul
	class="wp-block-prc-block-attachments-list wp-block-prc-block-attachments-list__list"
	style="--hover-background-color: #f5f5f5; --hover-text-color: #000; --active-background-color: #e0e0e0; --active-text-color: #000; --block-gap: 0.5em;"
>
	<li
		class="wp-block-prc-block-attachments-list__list-item flex-align-center"
	>
		<a href="/parent-post-url/">Parent Post Title</a>
	</li>
	<li
		class="wp-block-prc-block-attachments-list__list-item flex-align-center is-active"
	>
		<a href="/attachment-url/">Current Attachment Title</a>
	</li>
	<li
		class="wp-block-prc-block-attachments-list__list-item flex-align-center"
	>
		<a href="/another-attachment/">Another Attachment Title</a>
	</li>
</ul>
```

## PHP Rendering

The `render_block_callback` in `class-attachments-list.php` is server-side rendered:

1. Determines the parent post ID from the `parentId` attribute or falls back to `wp_get_post_parent_id()`.
2. Calls `get_attachments()` which:
    - First collects all Chart Builder synced chart references from the parent post content.
    - Then queries all image attachments for the parent post (up to 50).
    - Filters out: art direction images, images with `menu_order > 0`, single-word titles, PDFs, and Getty-copyrighted images.
    - Results are cached for 1 hour.
3. Renders the list with the parent post as the first item, followed by all attachments.
4. The currently viewed attachment gets an `is-active` class.
5. Injects CSS custom properties for hover/active colors via `WP_HTML_Tag_Processor`.

## Frontend Interactivity

This block does not have a view script. All interactivity is handled via CSS hover/active states.

## Styles

List items respond to CSS custom properties for hover and active states:

-   `--hover-background-color` / `--hover-text-color`: Applied on `:hover`.
-   `--active-background-color` / `--active-text-color`: Applied when `.is-active`.
-   `--block-gap`: Controls spacing between list items.

The list uses a vertical flex layout with no default list styling.

## Related Blocks

-   [Attachments Pagination](./attachments-pagination.md) -- companion block for paginated navigation between attachments

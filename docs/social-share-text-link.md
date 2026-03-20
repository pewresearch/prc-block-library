# Social Share Text Link

## Block Overview

| Property    | Value                                            |
| ----------- | ------------------------------------------------ |
| Name        | `prc-block/social-share-text-link`               |
| Title       | Social Share Text Link                           |
| Category    | `widgets`                                        |
| Version     | 1.0.0                                            |
| Description | Add a text link to a social share group.         |

## Supports

| Feature         | Enabled                              |
| --------------- | ------------------------------------ |
| HTML editing    | No                                   |
| Anchor          | Yes                                  |
| Alignment       | No                                   |
| Spacing         | blockGap, margin (top/bottom), padding |
| Typography      | fontSize, fontFamily                 |

## Attributes

| Attribute       | Type      | Default | Description                                            |
| --------------- | --------- | ------- | ------------------------------------------------------ |
| `label`         | `string`  | _(none)_ | The visible text of the link.                          |
| `opensInNewTab` | `boolean` | `false` | Whether the link opens in a new browser tab.           |
| `url`           | `string`  | _(none)_ | The URL the link points to.                            |

## Uses Context

| Context Key                | Description                                    |
| -------------------------- | ---------------------------------------------- |
| `openInNewTab`             | Whether links open in a new tab.               |
| `showLabels`               | Whether to show labels on social links.        |
| `iconColor`                | Color slug for the icon/text color.            |
| `iconColorValue`           | Hex color value for the icon/text.             |
| `iconBackgroundColor`      | Color slug for the background.                 |
| `iconBackgroundColorValue` | Hex color value for the background.            |

## Available Styles

None defined.

## Inner Blocks

This block does not accept inner blocks.

## Parent / Ancestor Requirements

**Required parent:** `core/social-links`

This block must be placed inside a Social Links block.

## Usage Instructions

1. Insert a **Social Links** (`core/social-links`) block.
2. Add the **Social Share Text Link** block as a child.
3. Type the link text directly in the block using the inline RichText editor (supports bold formatting).
4. Use `Cmd+K` (Mac) or `Ctrl+K` (Windows) or the link toolbar button to set the URL.
5. The link will inherit icon color and background color from the parent Social Links block.
6. If no label is set, the block will not render on the frontend.

## Example

From `block.json`:
```json
{
  "attributes": {
    "label": "Read more..."
  }
}
```

## Block Markup Example

```html
<a class="wp-block-prc-block-social-share-text-link has-white-color"
   href="https://example.com/article"
   rel="nofollow"
   target="_blank">
  Read more...
</a>
```

## PHP Rendering

The block is server-side rendered via `Social_Share_Text_Link::render_callback()`:

- Returns empty string if no `label` is set or if the block object is invalid.
- Reads `iconColor` and `iconBackgroundColor` from context and applies them as CSS classes.
- Renders as an `<a>` tag with:
  - `href` from the `url` attribute.
  - `rel="nofollow"` always set.
  - `target="_blank"` if `opensInNewTab` is true.
- The label content is sanitized via `wp_kses()`, allowing `code`, `em`, `img`, `s`, `span`, `strong` tags.

## Frontend Interactivity

No view script. This is a static rendered link.

## Related Blocks

- **`core/social-links`** -- Parent block providing context for colors and layout.
- **`prc-block/social-share-sheet`** -- Another social sharing child block for native share sheet.
- **`prc-block/social-share-url-field`** -- Provides a copyable URL field within social links.

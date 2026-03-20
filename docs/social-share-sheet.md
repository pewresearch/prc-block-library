# Social Share Sheet

## Block Overview

| Property    | Value                                                                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Name        | `prc-block/social-share-sheet`                                                                                                                  |
| Title       | Social Share Sheet                                                                                                                              |
| Category    | `widgets`                                                                                                                                       |
| Version     | 0.1.0                                                                                                                                           |
| Description | Invokes a browser's native navigator.share share sheet. If the browser does not support the Web Share API, a fallback share sheet is displayed.  |

## Supports

| Feature        | Enabled |
| -------------- | ------- |
| HTML editing   | No      |
| Anchor         | Yes     |
| Interactivity  | Yes     |

## Attributes

| Attribute | Type     | Default   | Description                                      |
| --------- | -------- | --------- | ------------------------------------------------ |
| `label`   | `string` | `"Share"` | Label text for the share button.                 |
| `url`     | `string` | `""`      | URL to share. Typically populated from context.   |

## Uses Context

| Context Key                     | Description                                    |
| ------------------------------- | ---------------------------------------------- |
| `postId`                        | Current post ID.                               |
| `queryId`                       | Query loop ID.                                 |
| `openInNewTab`                  | Whether links open in a new tab.               |
| `showLabels`                    | Whether to show labels on social links.        |
| `iconColor`                     | Color slug for the icon.                        |
| `iconColorValue`                | Hex color value for the icon.                   |
| `iconBackgroundColor`           | Color slug for the icon background.             |
| `iconBackgroundColorValue`      | Hex color value for the icon background.        |
| `core/socialLinksTitle`         | Title for sharing.                              |
| `core/socialLinksUrl`           | URL for sharing.                                |
| `core/socialLinksDescription`   | Description for sharing.                        |
| `core/socialLinksImageId`       | Image attachment ID for sharing.                |
| `core/socialLinksHashtags`      | Hashtags for sharing.                           |

## Available Styles

None defined.

## Inner Blocks

Accepts inner blocks. The allowed blocks are inherited from the parent `core/social-links` block (typically `core/social-link` blocks). These serve as fallback social links when the Web Share API is not supported.

## Parent / Ancestor Requirements

**Required parent:** `core/social-links`

This block must be placed inside a Social Links block.

## Usage Instructions

1. Insert a **Social Links** (`core/social-links`) block.
2. Add the **Social Share Sheet** block as a child.
3. Optionally add `core/social-link` blocks inside the share sheet as fallbacks for browsers that do not support the Web Share API.
4. Configure the parent Social Links block's title, description, URL, and image to control what gets shared.
5. On supported browsers, clicking the share button invokes the native share sheet. On unsupported browsers, the fallback social link icons are displayed instead.

## Block Markup Example

```html
<div class="wp-block-prc-block-social-share-sheet"
     data-wp-interactive='{"namespace":"prc-block/social-share-sheet"}'
     data-wp-context='{"title":"Article Title","text":"Description","url":"https://example.com","hashtags":"#pew","image":false}'
     data-wp-on--click="actions.onClick"
     data-wp-class--web-share-supported="state.enabled"
     data-wp-init="callbacks.detectWebShareSupport">
  <a href="https://example.com" class="has-white-color">
    <!-- share icon SVG -->
  </a>
  <!-- Fallback social link items (hidden when Web Share is supported) -->
  <li class="wp-social-link wp-social-link-twitter">...</li>
</div>
```

## PHP Rendering

The block is server-side rendered via `Social_Share_Sheet::render_callback()`:

- Reads context values for `iconColor`, `iconBackgroundColor`, `core/socialLinksTitle`, `core/socialLinksDescription`, `core/socialLinksUrl`, `core/socialLinksHashtags`, and `core/socialLinksImageId`.
- Detects if the current device is mobile via `\PRC\Platform\get_current_device()`.
- Sets up Interactivity API state (`enabled`) and context (title, text, url, hashtags, image URL).
- Renders a share icon (`\PRC\Platform\Icons\render('solid', 'share')`) wrapped in an anchor tag.
- Prepends hashtags with `#` and joins them with commas.
- If an image ID is provided, resolves it to a full-size URL via `wp_get_attachment_image_url()`.
- Appends the fallback inner block content (social links) after the native share button.

## Frontend Interactivity

The `view.js` uses the WordPress Interactivity API:

- **`state.enabled`**: Boolean indicating whether the Web Share API is supported.
- **`callbacks.detectWebShareSupport`**: Runs on init to check `window.navigator.share` availability and sets `state.enabled` accordingly.
- **`actions.onClick`**: When Web Share is supported, prevents the default link behavior and calls `window.navigator.share()` with the title, text, and URL from context.
- Uses a `isSharing` flag to prevent multiple simultaneous share calls.

CSS toggles visibility: when `.web-share-supported` is present, fallback `<li>` items are hidden and the native `<a>` share button is shown. When not supported, the reverse applies.

## Related Blocks

- **`core/social-links`** -- Parent block that provides context (title, URL, description, hashtags, image).
- **`core/social-link`** -- Can be placed inside as fallback share options.
- **`prc-block/social-share-text-link`** -- Another social sharing child block for text-based links.
- **`prc-block/social-share-url-field`** -- Provides a copyable URL field within social links.

# Social Share URL Field

## Block Overview

| Property | Value                                                                                     |
| -------- | ----------------------------------------------------------------------------------------- |
| Name     | `prc-block/social-share-url-field`                                                        |
| Title    | Social Share Url Field                                                                    |
| Category | `marketing`                                                                               |
| Version  | 0.1.0                                                                                     |
| Keywords | social                                                                                    |
| Example  | Yes (inner `form-input-text` URL field — inserter preview; parent is `core/social-links`) |

## Supports

| Feature       | Enabled              |
| ------------- | -------------------- |
| HTML editing  | No                   |
| Anchor        | No                   |
| Alignment     | No                   |
| Spacing       | margin (top/bottom)  |
| Typography    | fontSize, fontFamily |
| Interactivity | Yes                  |

## Attributes

This block has no custom attributes. The URL is derived from context.

## Allowed Inner Blocks

Only `prc-block/form-input-text` is allowed as an inner block (defined in `block.json` `allowedBlocks`).

## Uses Context

| Context Key                   | Description                           |
| ----------------------------- | ------------------------------------- |
| `postId`                      | Current post ID.                      |
| `core/socialLinksTitle`       | Title from parent social links.       |
| `core/socialLinksDescription` | Description from parent social links. |
| `core/socialLinksUrl`         | URL from parent social links.         |

## Available Styles

None defined.

## Parent / Ancestor Requirements

**Required parent:** `core/social-links`

This block must be placed inside a Social Links block.

## Usage Instructions

1. Insert a **Social Links** (`core/social-links`) block.
2. Add the **Social Share Url Field** block as a child.
3. The block automatically displays a "Share This Link:" label with a text input containing the share URL.
4. The URL is resolved from context: first from the parent Social Links URL, then from the current post's shortlink as a fallback.
5. On the frontend, clicking the input field auto-selects the URL text for easy copying.

## Block Markup Example

```html
<div
	class="wp-block-prc-block-social-share-url-field"
	data-wp-interactive="prc-block/social-share-url-field"
	data-wp-context='{"url":"https://pewrsr.ch/abc123"}'
>
	<span class="label">Share This Link:</span>
	<div class="wp-block-prc-block-form-input-text">
		<input
			type="text"
			data-wp-on--click="actions.onInputClick"
			data-wp-bind--value="context.url"
		/>
	</div>
</div>
```

## PHP Rendering

The block is server-side rendered via `Social_Share_URL_Field::render_block_callback()`:

-   Reads `core/socialLinksUrl` from context for the URL.
-   Falls back to `wp_get_shortlink($context['postId'])` if no URL is provided in context.
-   Sets up Interactivity API with the `prc-block/social-share-url-field` namespace and passes the URL in context.
-   Uses `WP_HTML_Tag_Processor` to find the inner `<input>` tag and add:
    -   `data-wp-on--click="actions.onInputClick"` for click-to-select behavior.
    -   `data-wp-bind--value="context.url"` to bind the input value to the URL.
-   Wraps everything in a `<div>` with a "Share This Link:" label span.

## Frontend Interactivity

The `view.js` uses the WordPress Interactivity API:

-   **`state.inputType`** (derived): Returns `"text"`.
-   **`state.inputValue`** (derived): Returns the URL from context.
-   **`state.inputName`** (derived): Returns `"shareUrl"`.
-   **`actions.onInputClick`**: Focuses and selects the input text when clicked, making it easy for users to copy the URL.
-   **`actions.onInputBlur`**: Deselects and blurs the input field.

## Related Blocks

-   **`core/social-links`** -- Parent block providing context for the URL.
-   **`prc-block/form-input-text`** -- The allowed inner block that provides the text input element.
-   **`prc-block/social-share-sheet`** -- Another social sharing child block for native share sheet.
-   **`prc-block/social-share-text-link`** -- Another social sharing child block for text-based links.

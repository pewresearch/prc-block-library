# Core Details

PRC's override/extension of the WordPress `core/details` block, branded as "Collapsible" in the editor.

## Block Namespace

`prc-block/core-details`

**Target Block:** `core/details`

## What PRC Customizes

-   Replaces native browser disclosure markers with custom FontAwesome caret icons (prevents iOS Safari emoji glyph fallback)
-   Adds "Plus/Minus Icon" and "Knight Co-Branded" block styles
-   Adds "close when focus lost" behavior via the Interactivity API
-   Syncs **[Entity as Iframe](entity-as-iframe.md)** blocks inside the panel with the `<details open>` state (lazy iframe `src` + resizer when expanded)
-   Provides Pew-Knight Initiative co-branded collapsible with logo and link-to-collection behavior
-   Registers block variations ("Collapsible" and "Pew Knight Co-Branded") with pre-configured styling
-   Adds transforms from the legacy `prc-block/collapsible` block

## Supports Modifications

| Support         | Value                            |
| --------------- | -------------------------------- |
| `interactivity` | `true` (defined in `block.json`) |

## Additional Attributes

| Attribute            | Type      | Default | Description                                                   |
| -------------------- | --------- | ------- | ------------------------------------------------------------- |
| `closeWhenFocusLost` | `boolean` | `false` | Automatically close the details element when clicking outside |

Registered via `block_type_metadata` filter.

## Available Styles

| Style Name              | Label             | Description                                                                                                                |
| ----------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `plus-icon`             | Plus/Minus Icon   | Replaces caret with circle-plus/circle-minus icons, bold summary text                                                      |
| `pew-knight-co-branded` | Knight Co-Branded | Displays Pew-Knight Initiative logo in summary, hides text, uses plus/minus icons. Supports dark mode with alternate logo. |

Both styles inject inline CSS with data URI icon references.

**Base icon styles** (applied globally to all `core/details`):

-   Removes native `list-style` and `::-webkit-details-marker`
-   Adds a caret-down `::after` pseudo-element on summary
-   Swaps to caret-up when `[open]`

**Dark mode (caret icons):** `style.scss` compiles to `style-index.css` and is registered via `block.json` (`style`). `Core_Details` enqueues that stylesheet on the frontend (with the global icon inline CSS) and in the block editor. For users in dark mode (`prefers-color-scheme: dark`) while logged in (`body.logged-in`, consistent with the Knight co-branded dark logo), the summary `::after` caret uses `filter: invert(1)` so black SVG data-URI icons read correctly on dark UI.

## Style Overrides

From `editor.scss`:

-   Resets color and background inheritance for the editor wrapper

From `style.scss` (built as `style-index.css`):

-   Dark-mode inversion for the default disclosure caret on `summary::after` (see above)

## Editor Enhancements

From `index.jsx` and `controls.jsx`:

-   Wraps the block edit with a **"Details Settings"** Inspector panel
-   Provides a `ToggleControl` for the "Close when focus lost" attribute
-   Registers block variations and transforms on load

## Frontend Interactivity

From `view.js`:

Extends the `core/details` Interactivity API store with two actions:

1. **`actions.handleOutsideClick`:** When `closeWhenFocusLost` is enabled, listens for document-level clicks and closes the details element if the click target is outside it. Uses `withSyncEvent` for synchronous event handling.

2. **`actions.handleSummaryClick`:** For Knight Co-Branded style, detects clicks within the logo zone (first 183px of the summary element). If clicked in the logo zone, prevents the default toggle behavior and opens the Pew-Knight Initiative collection URL in a new tab. Supports RTL layouts.

**Entity as Iframe (same `core/details` store):**

When the rendered block contains an **Entity as Iframe** block, PHP adds:

-   **`data-wp-context`** includes **`isOpen`** (initial value from the server-rendered `open` attribute).
-   **`data-wp-on--toggle="actions.syncDetailsOpenFromToggle"`** on `<details>` so `context.isOpen` stays aligned with the native open state.
-   **`data-wp-watch--sync-entity-iframes="callbacks.syncEntityIframeWithDetails"`** so nested entity iframe `isActive` tracks **`context.isOpen`** (lazy iframe `src` + resizer when expanded).
-   **`data-wp-on--pointerenter="callbacks.prefetchEntityIframeOnSummaryPointer"`** on `<summary>` for best-effort prefetch of `data-entity-iframe-prefetch-url` before first open.

**Context passed via `data-wp-context` (examples):**

```json
{
	"closeWhenFocusLost": true,
	"knightCollectionUrl": "https://www.pewresearch.org/collections/pew-knight-initiative/",
	"isOpen": false
}
```

When only entity iframe is enabled (no focus-lost, no Knight style), context may omit `closeWhenFocusLost` / `knightCollectionUrl` and include only `isOpen`.

## PHP Rendering

**Class:** `Core_Details`

Key behaviors:

1. **Asset registration:** Registers `editorScript`, `editorStyle`, `style` (`style-index.css`), and `viewScriptModule` from `block.json`. Enqueues the `style` handle together with the global inline `prc-core-details-icons` rules on `enqueue_block_assets`, and in the editor via `enqueue_block_editor_assets`, so caret dark-mode rules load wherever the collapsible UI appears.
2. **Interactivity directives:** When `closeWhenFocusLost` is true, the Knight style is active, **or** the block contains an entity iframe, injects `data-wp-interactive="core/details"` and `data-wp-context` (merged keys: `closeWhenFocusLost` and `knightCollectionUrl` when applicable; `isOpen` when an entity iframe is present). When focus-lost is enabled, adds `data-wp-on-document--click="actions.handleOutsideClick"`. When an entity iframe is present, adds `data-wp-on--toggle`, `data-wp-watch--sync-entity-iframes`, and `data-wp-on--pointerenter` on `<summary>` as described above.
3. **Knight logo click:** When the Knight style is active, injects `data-wp-on--click="actions.handleSummaryClick"` on `<summary>` (can coexist with entity iframe prefetch on the same `<summary>`).
4. **View script enqueuing:** Enqueues the view script module when focus-lost, Knight style, **or** entity iframe integration is needed
5. **Errant tag cleanup:** `filter_details_output` removes empty `<a>` tags (from Word doc copy-paste)
6. **Print engine:** Registers a print callback that forces `<details open>` on `/print` routes so closed accordion panels render expanded content for PDF capture

## Block Markup Example

```html
<details
	class="wp-block-details is-style-plus-icon has-ui-beige-very-light-background-color has-background"
	data-wp-interactive="core/details"
	data-wp-context='{"closeWhenFocusLost":true}'
	data-wp-on-document--click="actions.handleOutsideClick"
>
	<summary>About this research</summary>
	<p>Methodology content here...</p>
</details>
```

## Variations

| Variation Name          | Title                 | Description                                                                                                        |
| ----------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `collapsible`           | Collapsible           | Pre-styled with plus-icon style, beige background, "About this research" summary, border, and sans-serif font      |
| `pew-knight-co-branded` | Pew Knight Co-Branded | Knight Initiative branding with logo, top/bottom borders only, pre-populated with a link paragraph and placeholder |

## Transforms

Transforms from the legacy `prc-block/collapsible` block:

-   **Priority 1:** Non-co-branded collapsibles transform to `core/details` with `is-style-plus-icon`
-   **Priority 2:** Co-branded collapsibles transform to `core/details` with `is-style-pew-knight-co-branded`

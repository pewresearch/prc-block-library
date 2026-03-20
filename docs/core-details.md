# Core Details

PRC's override/extension of the WordPress `core/details` block, branded as "Collapsible" in the editor.

## Block Namespace

`prc-block/core-details`

**Target Block:** `core/details`

## What PRC Customizes

- Replaces native browser disclosure markers with custom FontAwesome caret icons (prevents iOS Safari emoji glyph fallback)
- Adds "Plus/Minus Icon" and "Knight Co-Branded" block styles
- Adds "close when focus lost" behavior via the Interactivity API
- Provides Pew-Knight Initiative co-branded collapsible with logo and link-to-collection behavior
- Registers block variations ("Collapsible" and "Pew Knight Co-Branded") with pre-configured styling
- Adds transforms from the legacy `prc-block/collapsible` block

## Supports Modifications

| Support       | Value  |
|---------------|--------|
| `interactivity` | `true` (defined in `block.json`) |

## Additional Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `closeWhenFocusLost` | `boolean` | `false` | Automatically close the details element when clicking outside |

Registered via `block_type_metadata` filter.

## Available Styles

| Style Name | Label | Description |
|------------|-------|-------------|
| `plus-icon` | Plus/Minus Icon | Replaces caret with circle-plus/circle-minus icons, bold summary text |
| `pew-knight-co-branded` | Knight Co-Branded | Displays Pew-Knight Initiative logo in summary, hides text, uses plus/minus icons. Supports dark mode with alternate logo. |

Both styles inject inline CSS with data URI icon references.

**Base icon styles** (applied globally to all `core/details`):
- Removes native `list-style` and `::-webkit-details-marker`
- Adds a caret-down `::after` pseudo-element on summary
- Swaps to caret-up when `[open]`

## Style Overrides

From `editor.scss`:

- Resets color and background inheritance for the editor wrapper

## Editor Enhancements

From `index.jsx` and `controls.jsx`:

- Wraps the block edit with a **"Details Settings"** Inspector panel
- Provides a `ToggleControl` for the "Close when focus lost" attribute
- Registers block variations and transforms on load

## Frontend Interactivity

From `view.js`:

Extends the `core/details` Interactivity API store with two actions:

1. **`actions.handleOutsideClick`:** When `closeWhenFocusLost` is enabled, listens for document-level clicks and closes the details element if the click target is outside it. Uses `withSyncEvent` for synchronous event handling.

2. **`actions.handleSummaryClick`:** For Knight Co-Branded style, detects clicks within the logo zone (first 183px of the summary element). If clicked in the logo zone, prevents the default toggle behavior and opens the Pew-Knight Initiative collection URL in a new tab. Supports RTL layouts.

**Context passed via `data-wp-context`:**

```json
{
  "closeWhenFocusLost": true,
  "knightCollectionUrl": "https://www.pewresearch.org/collections/pew-knight-initiative/"
}
```

## PHP Rendering

**Class:** `Core_Details`

Key behaviors:

1. **Interactivity directives:** When `closeWhenFocusLost` is true or the Knight style is active, injects:
   - `data-wp-interactive="core/details"`
   - `data-wp-context` with configuration
   - `data-wp-on-document--click="actions.handleOutsideClick"` (for focus-lost)
   - `data-wp-on--click="actions.handleSummaryClick"` on `<summary>` (for Knight logo click)
2. **View script enqueuing:** Only enqueues the view script module when interactivity features are needed
3. **Errant tag cleanup:** `filter_details_output` removes empty `<a>` tags (from Word doc copy-paste)

## Block Markup Example

```html
<details class="wp-block-details is-style-plus-icon has-ui-beige-very-light-background-color has-background"
         data-wp-interactive="core/details"
         data-wp-context='{"closeWhenFocusLost":true}'
         data-wp-on-document--click="actions.handleOutsideClick">
  <summary>About this research</summary>
  <p>Methodology content here...</p>
</details>
```

## Variations

| Variation Name | Title | Description |
|----------------|-------|-------------|
| `collapsible` | Collapsible | Pre-styled with plus-icon style, beige background, "About this research" summary, border, and sans-serif font |
| `pew-knight-co-branded` | Pew Knight Co-Branded | Knight Initiative branding with logo, top/bottom borders only, pre-populated with a link paragraph and placeholder |

## Transforms

Transforms from the legacy `prc-block/collapsible` block:

- **Priority 1:** Non-co-branded collapsibles transform to `core/details` with `is-style-plus-icon`
- **Priority 2:** Co-branded collapsibles transform to `core/details` with `is-style-pew-knight-co-branded`

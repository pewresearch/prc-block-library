# Tokens List

**A list of interactive filter tokens (pill buttons) that communicate with a target namespace store**

## Block Metadata

| Property  | Value                      |
| --------- | -------------------------- |
| Name      | `prc-block/tokens-list`    |
| Category  | `theme`                    |
| API       | Version 3                  |
| Textdomain| `tokens-list`              |

## Supports

| Feature         | Value                                                                            |
| --------------- | -------------------------------------------------------------------------------- |
| Anchor          | `true`                                                                           |
| HTML editing    | `false`                                                                          |
| Interactivity   | `true`                                                                           |
| Layout          | Flex (horizontal by default, vertical alignment center, orientation switchable)   |
| Spacing         | `blockGap`, `padding`, `margin`                                                  |
| Color           | `background`, `text`, `button` (with contrast checker)                           |
| Typography      | `fontSize`, `lineHeight`, `fontFamily`, `fontWeight`, `fontStyle`, `textTransform`, `textDecoration`, `letterSpacing` |

## Attributes

| Attribute | Type     | Default | Source    | Description                                                                 |
| --------- | -------- | ------- | --------- | --------------------------------------------------------------------------- |
| `label`   | `string` | --      | HTML `label` element | An optional label displayed before the token buttons (e.g., "Filtered by..."). |
| `tokens`  | `array`  | `[]`    | --        | Array of token objects, each with `label` (string), `value` (string), `slug` (string), and `isSelected` (boolean, default `false`). |

### Token Object Shape

```json
{
  "label": "United States",
  "value": "us",
  "slug": "united-states",
  "isSelected": false
}
```

## Context

**Uses context:**

| Context Key     | Description                                         |
| --------------- | --------------------------------------------------- |
| `tokens/list`   | An array of token objects provided by a parent block. Merged with the block's own `tokens` attribute. |

## Inner Blocks

Allows `core/button` blocks as children. The block uses the `InnerBlocksAsContextTemplate` pattern to render a single `core/button` as a template that is replicated for each token.

### Token Button Variation

The block registers a `core/button` variation named `prc-block/tokens-list__button` with the following default attributes:

| Property           | Value                              |
| ------------------ | ---------------------------------- |
| `className`        | `is-style-icon__clear`             |
| `backgroundColor`  | `ui-gray-very-light`               |
| `textColor`        | `ui-black`                         |
| `fontFamily`       | `sans-serif`                       |
| `tagName`          | `button`                           |
| `text`             | `Token Label`                      |
| Border             | 1px solid #dadbdb, radius 50px     |
| Padding            | preset spacing 30 (top/bottom), 40 (left/right) |

## Parent / Ancestor Requirements

None. This block can be placed anywhere, though it is designed to work with a parent block that provides `tokens/list` context and a target interactive namespace.

## Available Styles

No registered block styles.

## Usage Instructions

1. Insert a **Tokens List** block where you want filter tokens to appear.
2. Optionally set a label (e.g., "Filtered by...") that displays before the token buttons.
3. The tokens are typically provided dynamically via the `tokens/list` block context from a parent block, or through the `tokens` attribute.
4. The inner `core/button` block serves as a visual template for how each token will look. Style it to control the appearance of all tokens.
5. A "Reset" / clear button is automatically appended after the token list.
6. The block is hidden on the frontend when there are no active tokens (`has-tokens` class controls visibility).

## PHP Rendering

The block is server-side rendered via `Tokens_List::render_block_callback()`. It:

1. Merges `tokens` from the block attribute with any `tokens/list` context from parent blocks.
2. Uses `WP_HTML_Tag_Processor` to augment the saved markup with Interactivity API attributes:
   - `data-wp-interactive="prc-block/tokens-list"` on the wrapper.
   - `data-wp-class--has-tokens="state.hasTokens"` to toggle visibility.
   - `data-wp-context` with the block ID and `targetNamespace`.
3. Converts the inner button markup into a `<template data-wp-each--token="state.tokens">` loop, so each token in the store produces a button.
4. Appends a "clear all" button via `construct_clear_button()` that triggers `actions.clearAllTokens`.
5. Sets `data-wp-text`, `data-wp-bind--value`, `data-wp-bind--name`, and `data-wp-on--click` on each token button.

## Frontend Interactivity

Uses the WordPress Interactivity API store `prc-block/tokens-list`. This block acts as a bridge to a **target namespace** -- another block's interactive store that manages the actual filter state.

### Derived State

- **`state.tokens`** -- Reads `tokens` from the `targetNamespace` store. Returns an empty array if the target store is unavailable.
- **`state.hasTokens`** -- Returns `true` if the target namespace has any tokens.
- **`state.tokenName`** -- Returns `token-{slug}` for the current token context.

### Actions

- **`actions.clearAllTokens`** -- Generator function that calls `targetNamespaceActions.onClear(null, null)` on the target namespace store, clearing all active filters.
- **`actions.onTokenClick`** -- Generator function that calls `targetNamespaceActions.onClear(value, slug)` on the target namespace store, removing the specific clicked token/filter.

### Target Namespace Pattern

The `targetNamespace` is stored in the block's `data-wp-context`. The target store must expose:
- `state.tokens` -- Array of token objects.
- `actions.onClear(value, slug)` -- Action to remove a specific token or clear all (when both args are null).

## Block Markup Example

```html
<div class="wp-block-prc-block-tokens-list"
     id="prc-block-tokens-list-1"
     data-wp-interactive="prc-block/tokens-list"
     data-wp-class--has-tokens="state.hasTokens"
     data-wp-context='{"id":"prc-block-tokens-list-1","targetNamespace":"prc-block/some-filter"}'>
  <label class="prc-block-tokens-list__label">Filtered by</label>
  <div class="prc-block-tokens-list__tokens">
    <template data-wp-each--token="state.tokens" data-wp-each-key="context.token.value">
      <div>
        <button class="wp-block-button__link is-style-icon__clear"
                data-wp-text="context.token.label"
                data-wp-bind--value="context.token.value"
                data-wp-bind--name="state.tokenName"
                data-wp-on--click="actions.onTokenClick">
        </button>
      </div>
    </template>
  </div>
  <div class="prc-block-tokens-list__clear-button"
       data-wp-context='{"token":{"label":"Reset","value":"reset","slug":"reset"}}'>
    <button data-wp-on--click="actions.clearAllTokens">Reset</button>
  </div>
</div>
```

## Frontend Styles

- The block is hidden when no tokens are present (`:not(.has-tokens):not(.wp-block) { display: none }`).
- The tokens container inherits flex layout properties from the parent.
- The clear/reset button has a transparent background.
- Empty labels are hidden on the frontend.

## Related Blocks

- **`core/button`** -- Used as the inner block template for each token. A registered variation `prc-block/tokens-list__button` provides default styling.
- Any block providing `tokens/list` context can serve as a data source for this block.

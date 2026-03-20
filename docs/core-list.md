# Core List

PRC's override/extension of the WordPress `core/list` block.

## Block Namespace

`prc-block/core-list`

## What PRC Customizes

- Enables `blockGap` spacing support (not enabled by default in core)
- Registers an "Unstyled List" block style that removes list bullets/numbers
- Applies a `--block-gap` CSS custom property to control spacing between list items
- Adds the `wp-block-list` class to the rendered list element on the frontend

## Supports Modifications

| Support       | Change                       |
|---------------|------------------------------|
| `spacing.blockGap` | Enabled (`true`) -- allows gap control between list items |

The `blockGap` support is added both in PHP (`add_attributes` filter on `block_type_metadata`) and in JS (`blocks.registerBlockType` filter).

## Additional Attributes

None beyond core. The `blockGap` support is added via the supports API, not as a custom attribute.

## Available Styles

| Style Name               | Label          | Description                     |
|--------------------------|----------------|---------------------------------|
| `list-style-type-none`   | Unstyled List  | Removes bullets and `::before` pseudo-element content |

Registered in `index.js` via `registerBlockStyle`.

## Style Overrides

**File:** `style.scss`

- `.is-style-list-style-type-none` -- sets `list-style-type: none` and removes `li::before` content
- `.wp-block-list li:first-child` -- removes `margin-block-start`
- `.wp-block-list li:not(:first-child)` -- uses `var(--block-gap)` for `margin-block-start` spacing

## Editor Enhancements

**File:** `index.js`

- Adds a higher-order component (`editor.BlockListBlock` filter) that injects `--block-gap` as a CSS custom property on the block wrapper in the editor
- Uses `getBlockGapSupportValue` from `@prc/block-utils` to compute the gap value

## Frontend Interactivity

None. No `view.js` file.

## PHP Rendering

**File:** `class-core-list.php`

- **`add_attributes`** (`block_type_metadata` filter) -- enables `spacing.blockGap` support on the core/list block metadata
- **`render`** (`render_block` filter) -- processes `core/list-item` blocks to:
  - Add the `wp-block-list` class to the list element (`ul` or `ol`)
  - Set a `--block-gap` CSS custom property from the block's gap attribute

Note: The render filter targets `core/list-item` (not `core/list`) to apply the gap styling.

## Block Markup Example

```html
<ul class="wp-block-list" style="--block-gap: 1em;">
  <li>Item one</li>
  <li>Item two</li>
  <li>Item three</li>
</ul>
```

With the unstyled style:

```html
<ul class="wp-block-list is-style-list-style-type-none" style="--block-gap: 0.5em;">
  <li>Item one</li>
  <li>Item two</li>
</ul>
```

## Variations

None.

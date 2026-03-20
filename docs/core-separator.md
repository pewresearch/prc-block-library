# Core Separator

PRC's override/extension of the WordPress `core/separator` block.

## Block Namespace

`prc-block/core-separator`

## What PRC Customizes

- Removes the "Wide Line" block style from the editor
- Overrides separator rendering to use only a top border (removes bottom border)
- Ensures consistent 1px border width

## Supports Modifications

None.

## Additional Attributes

None.

## Available Styles

None. The core "Wide Line" style is removed via `unregisterBlockStyle`.

## Style Overrides

**File:** `style.scss`

- **Border normalization** -- `border-bottom: none` on `.wp-block-separator`; non-editor separators (`:not(.wp-block)`) get `border-top-width: 1px`

## Editor Enhancements

**File:** `index.js`

- On DOM ready, unregisters the `wide-line` block style from `core/separator` using `unregisterBlockStyle`
- Imports `style.scss` for editor/frontend styles

## Frontend Interactivity

None. No `view.js` file.

## PHP Rendering

**File:** `class-core-separator.php`

- **`register_assets`** (`init` hook) -- registers the style handle
- **`register_editor_script`** (`enqueue_block_editor_assets` hook) -- enqueues the editor script (for style unregistration)
- **`register_style`** (`enqueue_block_assets` hook) -- enqueues the style

No render filter modifications.

## Block Markup Example

```html
<hr class="wp-block-separator has-alpha-channel-opacity" />
```

## Variations

None.

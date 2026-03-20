# Core Paragraph

PRC's override/extension of the WordPress `core/paragraph` block.

## Block Namespace

`prc-block/core-paragraph`

## What PRC Customizes

- Registers a "Big Number" block style with auto-incrementing numbered paragraphs
- Adjusts drop cap styling
- Adds link styling for paragraph links inside `.post-content`
- Handles legacy image alignment in migrated content
- Initializes a CSS counter reset on the block editor root container

## Supports Modifications

None.

## Additional Attributes

None.

## Available Styles

| Style Name       | Label      | Description                                                  |
|------------------|------------|--------------------------------------------------------------|
| `has-big-number` | Big Number | Auto-incrementing large gold number floated left before each paragraph |

Registered in PHP via `register_block_style`.

## Style Overrides

**File:** `style.scss`

- **Drop Cap** -- `p.has-drop-cap:not(:focus):first-letter` sized at `3.6em`, `line-height: 1`, with `padding-right: 0.14em`
- **Big Number style** -- `counter-increment: big-number` on styled paragraphs; the `::before` pseudo-element displays the counter as a large gold (`#ec9f2e`) number at `3.2em` in sans-serif bold, floated left. Strong text inside uses sans-serif at `1.2em`
- **Paragraph margins** -- first/last paragraph margin normalization (`margin-block-start: 0` / `margin-block-end: 0`)
- **Post content links** -- `text-decoration-thickness: 1px`, `text-underline-offset: 5px`
- **Legacy image alignment** -- handles `img.alignright`, `img.alignleft`, and `a.image-box` floats from migrated content

## Editor Enhancements

**File:** `index.js`

- On DOM ready, sets `counter-reset: section` on the block editor root container (`.block-editor-block-list__layout.is-root-container`) to support the Big Number counter in the editor

## Frontend Interactivity

None. No `view.js` file.

## PHP Rendering

**File:** `class-core-paragraph.php`

- **`register_new_styles`** (`init` hook) -- registers the `has-big-number` block style
- No render filter modifications

## Block Markup Example

```html
<!-- Big Number style -->
<p class="is-style-has-big-number">
  <strong>Key Finding Title</strong> The survey found that...
</p>
<p class="is-style-has-big-number">
  <strong>Another Finding</strong> Additionally, results show...
</p>
```

The first paragraph renders with a gold "1" floated left, the second with "2", and so on.

## Variations

None.

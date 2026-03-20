# Core Media Text

PRC's minimal override of the WordPress `core/media-text` block.

## Block Namespace

`core/media-text` (no separate PRC block.json -- PHP-only override)

## What PRC Customizes

- Defaults the `align` attribute to `"center"` and adds `"center"` to allowed alignments
- Adds inline styles for margin, content border, quote/cite formatting within the media-text block

## Supports Modifications

| Support  | Change                                                          |
|----------|-----------------------------------------------------------------|
| `align`  | Default changed to `"center"`; allowed values: `wide`, `full`, `center` |

Applied via `block_type_metadata` filter in `default_align_center`.

## Additional Attributes

None beyond the modified `align` default.

## Available Styles

None.

## Style Overrides

Inline styles applied via `wp_add_inline_style`:

- **Block margin** -- `margin-block-end: 1.5em`
- **Content border** -- `border-left: 3px solid white` on `.wp-block-media-text__content` at `min-width: 768px`
- **Blockquote** -- zero padding and margin on nested `.wp-block-quote`
- **Citation** -- `cite` styled as a right-aligned block at `font-size: 15px`, `width: calc(100% + 8%)`, with a `::before` pseudo-element displaying an underscore character positioned above
- **Color inheritance** -- `.has-text-color` variants inherit color on quote and citation elements

## Editor Enhancements

None. No editor script.

## Frontend Interactivity

None. No view script.

## PHP Rendering

**File:** `class-core-media-text.php`

- **`default_align_center`** (`block_type_metadata` filter) -- sets `align` attribute default to `"center"` and updates `supports.align` to include `center`
- **`register_style`** (`enqueue_block_assets` hook) -- adds inline CSS to `wp-block-library` (in admin) or `wp-block-media-text` (on frontend)

No render filter modifications to block content.

## Block Markup Example

```html
<div class="wp-block-media-text aligncenter">
  <figure class="wp-block-media-text__media">
    <img src="photo.jpg" alt="Description" />
  </figure>
  <div class="wp-block-media-text__content">
    <blockquote class="wp-block-quote">
      <p>Quote text here.</p>
      <cite>Attribution</cite>
    </blockquote>
  </div>
</div>
```

## Variations

None.

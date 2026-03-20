# Core Post Title

PRC's override/extension of the WordPress `core/post-title` block.

## Block Namespace

`prc-block/core-post-title`

## What PRC Customizes

- Adds `aria-level="1"` for accessibility on the rendered title element
- Adds `data-post-parent-id` and `data-post-type` data attributes for styling hooks
- Registers an "Essay Title" block style with larger font size
- Reduces font size for child post titles (non-page post types with a parent)
- Registers print engine callbacks for cover title styling

## Supports Modifications

None.

## Additional Attributes

None beyond core. Data attributes are added at render time via `WP_HTML_Tag_Processor`.

## Available Styles

| Style Name    | Label        | Description                              |
|---------------|--------------|------------------------------------------|
| `essay-title` | Essay Title  | Sets font size to `48px` with `line-height: 1.2` |

Registered in PHP via `register_block_style` with inline CSS.

## Style Overrides

**File:** `style.scss`

- **Child post titles** -- `.wp-block-post-title[data-post-parent-id]:not([data-post-type="page"])` uses `var(--wp--preset--font-size--h-two)` font size, making child post titles display at h2 size instead of the default

## Editor Enhancements

None. No editor script beyond style imports.

## Frontend Interactivity

None. No `view.js` file.

## PHP Rendering

**File:** `class-core-post-title.php`

- **`register_assets`** (`init` hook) -- registers style handle and calls `register_new_styles`
- **`register_new_styles`** (`init` hook) -- registers the `essay-title` block style with inline CSS
- **`register_style`** (`enqueue_block_assets` hook) -- enqueues the style
- **`render`** (`render_block` filter) -- uses `WP_HTML_Tag_Processor` to:
  - Set `aria-level="1"` on the title element
  - Set `data-post-parent-id` if the post has a parent
  - Set `data-post-type` to the current post type
- **`register_print_callbacks`** (`prc_print_engine_register_block_callbacks` hook) -- registers print styles for `.print-engine-cover__title` at 65px/75px

## Block Markup Example

```html
<!-- Standard post title -->
<h2 class="wp-block-post-title" aria-level="1" data-post-type="post">
  Research Report Title
</h2>

<!-- Child post title -->
<h2 class="wp-block-post-title" aria-level="1" data-post-parent-id="42" data-post-type="post">
  Chapter Title
</h2>

<!-- Essay Title style -->
<h2 class="wp-block-post-title is-style-essay-title" aria-level="1" data-post-type="post">
  Long-Form Essay Title
</h2>
```

## Variations

None.

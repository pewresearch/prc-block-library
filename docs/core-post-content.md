# Core Post Content

PRC's override/extension of the WordPress `core/post-content` block.

## Block Namespace

`prc-block/core-post-content`

## What PRC Customizes

- Resets the CSS counter for the Big Number paragraph style within post content
- Adds link underlines for all paragraph links
- Overrides `h5` heading styles to italic Georgia
- Uses CSS container queries for responsive alignment of floated blocks (alignleft/alignright)
- Adjusts heading font sizes for mobile viewports via container queries
- Handles attachment page rendering for images, VideoPress videos, and unsupported file types
- Provides a fallback for posts using the `layout-no-container-query` template with standard media queries

## Supports Modifications

None.

## Additional Attributes

None.

## Available Styles

None.

## Style Overrides

**File:** `style.scss`

- **Counter reset** -- `counter-reset: big-number` on `.wp-block-post-content` to support the Big Number paragraph style
- **Link underlines** -- `text-decoration: underline` on `p a` inside post content
- **H5 override** -- forces Georgia font family, italic style, no text-transform, 1em font-size, zero letter-spacing
- **Wide content well** (container query `min-width: 860px`) -- adjusts `margin-left`/`margin-right` for `.alignleft` and `.alignright` blocks relative to `--wp--style--global--wide-size`
- **Standard content well** (container query `min-width: 639px`) -- adjusts alignment margins relative to `--wp--style--global--content-size`
- **Mobile** (container query `max-width: 638px`) -- centers aligned blocks, removes float
- **Mobile headings** (container query `max-width: 480px`) -- reduces h1 through h4 font sizes
- **No-container-query fallback** -- uses `@media` queries for the `layout-no-container-query` body class

**File:** `editor.scss`

- Inherits `color` and `background` from parent on `.wp-block-prc-block-core-post-content.wp-block`

## Editor Enhancements

**File:** `index.js`

- Imports `style.scss` and `editor.scss` for editor/frontend styles
- Defines `BLOCKNAME` and `BLOCKIDENTIFIER` constants; no additional editor logic

## Frontend Interactivity

None. No `view.js` file.

## PHP Rendering

**File:** `class-core-post-content.php`

- **`register_assets`** (`init` hook) -- registers the block's style handle
- **`register_style`** (`enqueue_block_assets` hook) -- enqueues the style
- **`render`** (`render_block` filter) -- on attachment pages, replaces block content with:
  - **Images** -- renders a `figure.wp-block-image` with the large-size image plus a download link to the full-size image
  - **Videos** -- renders a VideoPress shortcode if a `videopress_guid` meta value exists
  - **Other file types** -- displays a "File type not yet supported" message

## Block Markup Example

```html
<!-- Standard post content wrapper -->
<div class="wp-block-post-content">
  <p><a href="/link">Underlined link</a></p>
  <h5>Italic Georgia Subheading</h5>
</div>
```

On an attachment page (image):

```html
<figure class="wp-block-image aligncenter size-large">
  <img src="image-large.jpg" alt="Title" class="wp-image-123">
</figure>
<h5>Download</h5>
<a href="image-full.jpg" download>Title</a>
```

## Variations

None.

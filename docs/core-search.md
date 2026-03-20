# Core Search

PRC's override/extension of the WordPress `core/search` block.

## Block Namespace

`prc-block/core-search`

## What PRC Customizes

- Injects a hidden input field for Decoded post type searches to filter by `ep_filter_formats=decoded`
- Overrides search block layout to use flexbox with centered button alignment
- Styles the search button icon for consistent sizing

## Supports Modifications

None.

## Additional Attributes

None.

## Available Styles

None.

## Style Overrides

**File:** `style.scss`

- **Block layout** -- `.wp-block-search` set to `display: flex` with `align-items: stretch`
- **Inside wrapper** -- zero margin and padding on `.wp-block-search__inside-wrapper`
- **Search button** -- `.wp-block-search__button.has-icon` set to `width: 36px`, flexbox centered, inherited height, zero margin/padding
- **White-on-black variant** -- `.has-ui-white-color.has-ui-black-background-color` sets SVG path color to white

## Editor Enhancements

None. No editor script.

## Frontend Interactivity

None. No `view.js` file.

## PHP Rendering

**File:** `class-core-search.php`

- **`register_assets`** (`init` hook) -- registers the style handle
- **`register_style`** (`enqueue_block_assets` hook) -- enqueues the style
- **`render`** (`render_block` filter) -- when the current post type is `decoded`, injects `<input type="hidden" name="ep_filter_formats" value="decoded" />` before the closing `</form>` tag (if not already present) to ensure ElasticPress filters search results to the Decoded format

## Block Markup Example

```html
<!-- Standard search block -->
<form class="wp-block-search" role="search" action="/">
  <div class="wp-block-search__inside-wrapper">
    <input type="search" name="s" placeholder="Search..." />
    <button class="wp-block-search__button has-icon wp-element-button">
      <svg>...</svg>
    </button>
  </div>
</form>

<!-- On a Decoded post type page -->
<form class="wp-block-search" role="search" action="/">
  <div class="wp-block-search__inside-wrapper">
    <input type="search" name="s" placeholder="Search..." />
    <button class="wp-block-search__button has-icon wp-element-button">
      <svg>...</svg>
    </button>
  </div>
  <input type="hidden" name="ep_filter_formats" value="decoded" />
</form>
```

## Variations

None.

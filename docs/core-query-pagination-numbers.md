# Core Query Pagination Numbers

PRC's minimal override of the WordPress `core/query-pagination` block rendering.

## Block Namespace

`core/query-pagination` (no separate PRC block.json -- PHP-only override targeting `core/query-pagination`)

## What PRC Customizes

- Wraps the `core/query-pagination` block output in a container div with PRC's pagination styles
- Enqueues a shared `prc-block-library--pagination` stylesheet

## Supports Modifications

None.

## Additional Attributes

None.

## Available Styles

None. Uses a shared pagination stylesheet (`prc-block-library--pagination`).

## Style Overrides

Styles are provided by the externally registered `prc-block-library--pagination` stylesheet, not inline.

## Editor Enhancements

None. No editor script.

## Frontend Interactivity

None. No view script.

## PHP Rendering

**File:** `class-core-query-pagination-numbers.php`

- **`enqueue_common_pagination_styles`** (`render_block` filter) -- when the block name is `core/query-pagination`:
  - Enqueues the `prc-block-library--pagination` style handle
  - Wraps the block content in a `<div class="common-block-style__pagination__container">` element

## Block Markup Example

```html
<div class="common-block-style__pagination__container">
  <div class="wp-block-query-pagination">
    <a class="wp-block-query-pagination-previous" href="?page=1">Previous</a>
    <div class="wp-block-query-pagination-numbers">
      <a class="page-numbers" href="?page=1">1</a>
      <span class="page-numbers current">2</span>
      <a class="page-numbers" href="?page=3">3</a>
    </div>
    <a class="wp-block-query-pagination-next" href="?page=3">Next</a>
  </div>
</div>
```

## Variations

None.

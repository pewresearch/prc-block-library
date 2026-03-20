# Core Categories

PRC's minimal override of the WordPress `core/categories` block.

## Block Namespace

`core/categories` (no separate PRC block.json -- PHP-only override)

## What PRC Customizes

- Registers a "Columns" block style that displays categories in a two-column CSS columns layout without list bullets

## Supports Modifications

None.

## Additional Attributes

None.

## Available Styles

| Style Name | Label   | Description                                           |
|------------|---------|-------------------------------------------------------|
| `columns`  | Columns | Two-column layout using CSS `columns: 2`, no list-style |

Registered in PHP via `register_block_style` with minified inline CSS.

## Style Overrides

Inline style applied via `register_block_style`:

```css
.wp-block-categories.is-style-columns {
  columns: 2;
  column-gap: 1em;
  padding: 0;
}
.wp-block-categories.is-style-columns li {
  list-style: none;
}
```

## Editor Enhancements

None. No editor script.

## Frontend Interactivity

None. No view script.

## PHP Rendering

**File:** `class-core-categories.php`

- **`register_columns_style`** (`init` hook) -- registers the `columns` block style with inline CSS (minified via `MatthiasMullie\Minify`)

No render filter modifications.

## Block Markup Example

```html
<ul class="wp-block-categories is-style-columns">
  <li><a href="/category/politics">Politics</a></li>
  <li><a href="/category/science">Science</a></li>
  <li><a href="/category/technology">Technology</a></li>
  <li><a href="/category/society">Society</a></li>
</ul>
```

## Variations

None.

# Core List Item

PRC's minimal override of the WordPress `core/list-item` block.

## Block Namespace

`core/list-item` (no separate PRC block.json -- PHP-only override)

## What PRC Customizes

- Registers a "Float Image Right" block style that floats images inside list items to the right

## Supports Modifications

None.

## Additional Attributes

None.

## Available Styles

| Style Name                      | Label              | Description                                        |
|---------------------------------|--------------------|----------------------------------------------------|
| `list-item-float-image-right`   | Float Image Right  | Floats images within the list item to the right with left/bottom margin |

Registered in PHP via `register_block_style` with inline CSS.

## Style Overrides

Inline style applied via `register_block_style`:

```css
.wp-block-list-item.is-style-list-item-float-image-right img {
  float: right;
  margin-left: 1em;
  margin-bottom: 1em;
}
```

## Editor Enhancements

None. No editor script.

## Frontend Interactivity

None. No view script.

## PHP Rendering

**File:** `class-core-list-item.php`

- **`register_new_styles`** (`init` hook) -- registers the `list-item-float-image-right` block style with inline CSS

No render filter modifications.

## Block Markup Example

```html
<li class="wp-block-list-item is-style-list-item-float-image-right">
  <img src="photo.jpg" alt="Example" />
  Text content that wraps around the floated image.
</li>
```

## Variations

None.

# Icon

## Block Name & Description

**Title:** Icon
**Description:** Renders a Font Awesome icon.

## Block Namespace

`prc-block/icon`

## Category

`design`

## Supports

| Feature | Enabled | Details |
|---------|---------|---------|
| Anchor | Yes | |
| HTML editing | No | |
| Spacing | Yes | `blockGap`, `margin` (top/bottom), `padding` (default control) |
| Color | Yes | Background, text, link |
| Typography | Yes | Font size (default control), line height |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | `number` | `1` | Icon size in `em` units |
| `library` | `string` | `"solid"` | Font Awesome icon library (e.g., `solid`, `regular`, `brands`) |
| `icon` | `string` | `"star"` | Icon name from the selected library |

## Available Styles

None.

## Inner Blocks

None. This is a leaf block.

## Parent / Ancestor Requirements

None. Can be placed anywhere.

## Usage Instructions

1. Insert the Icon block.
2. In the Inspector Panel under "Block Controls":
   - **Icon Library** -- Select which Font Awesome library to use (solid, regular, brands, etc.). The available libraries are populated from the `@prc/icons` package's `IconLibraryIndex`.
   - **Icon** -- Choose a specific icon from the selected library. Icons are listed with human-readable names.
   - **Size (in em)** -- Adjust the icon size. Accepts decimal values with a step of 0.1.
3. The icon renders inline in the editor using the `<Icon>` component from `@prc/icons`.
4. Use block-level color controls to change the icon's color.

## Block Markup Example

```html
<span class="wp-block-prc-block-icon">
  <svg><!-- Font Awesome SVG icon markup --></svg>
</span>
```

## PHP Rendering

Server-side rendered via `render_callback` in `Icon`. The PHP:

1. Reads the `library`, `icon`, and `size` attributes.
2. Calls `\PRC\Platform\Icons\render($library, $icon, $size)` to generate the SVG markup.
3. Wraps the SVG in a `<span>` with the block wrapper attributes.

The block has no `save` function -- it is entirely dynamic/server-rendered.

## Frontend Interactivity

None.

## Related Blocks

- `prc-block/logo` -- PRC logo block (also renders SVG graphics)

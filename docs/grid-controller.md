# Grid Controller (Responsive Grid)

## Block Name & Description

**Title:** Responsive Grid
**Description:** Display content in a grid of responsive columns. The columns use 12 columns on desktop and tablet, and 4 columns on mobile. Control each column's span and start position precisely at different breakpoints.

## Block Namespace

`prc-block/grid-controller`

## Category

`design`

## Supports

| Feature | Enabled | Details |
|---------|---------|---------|
| Anchor | Yes | |
| HTML editing | No | |
| Alignment | Yes | `wide`, `full` |
| List View | Yes | |
| Color | Yes | Background, link, text |
| Spacing | Yes | `blockGap` (horizontal + vertical sides), `margin` (top/bottom), `padding` |
| Border | Yes | Color, style, width (all default controls) |
| Typography | Yes | Font size, line height, font family (default controls) |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `verticalAlignment` | `string` | — | Vertical alignment for all columns: `top`, `center`, `bottom`, `stretch`. Grid-level stretch sets `align-items: stretch` on the controller; each column still receives the same attribute so front-end markup stays consistent with the editor. |
| `dividerColor` | `string` | `"ui-gray-light"` | Named color preset for column divider lines |
| `dividerStyle` | `string` | `"solid"` | CSS border style for dividers |
| `dividerInset` | `number` | `0` | Inset in pixels from the top/bottom of divider lines |
| `style` | `object` | `{ spacing: { blockGap: { left: "var:preset\|spacing\|50" } } }` | Default block gap (column gutter) |

## Available Styles

None registered in block.json.

## Layout Variations

The block ships with **8 layout presets** available from the placeholder and layout toolbar:

| Variation | Title | Layout |
|-----------|-------|--------|
| `two-columns-equal` | 6 / 6 | Two equal columns (default) |
| `two-columns-one-third-two-thirds` | 4 / 8 | Narrow + wide columns |
| `two-columns-two-thirds-one-third` | 8 / 4 | Wide + narrow columns |
| `three-columns-equal` | 4 / 4 / 4 | Three equal columns |
| `three-columns-wider-center` | 3 / 6 / 3 | Narrow + wide center + narrow |
| `two-by-two-grid` | 6/6 + 6/6 | Four columns in 2x2 grid |
| `three-plus-one-feature` | 4/4/4 + 12 | Three columns then full-width row |
| `feature-plus-three` | 12 + 4/4/4 | Full-width row then three columns |

All variations scope to `block` (available only from the block's own picker, not the global inserter).

## Inner Blocks

Yes. This is a container block.

**Allowed blocks:** `prc-block/grid-column` only.

Columns are created automatically when choosing a layout variation or using the column count control. The block disables `core/columns` when registered to encourage using this grid system instead.

## Parent / Ancestor Requirements

None. Can be placed at any level.

## Usage Instructions

1. Insert the Responsive Grid block.
2. Choose a layout variation from the placeholder picker, or use the layout toolbar dropdown.
3. **Add/remove columns** using the toolbar buttons or the "Columns" range control in the Dimensions inspector panel.
4. **Adjust column spans** by selecting individual columns and resizing or using the inspector span controls.
5. **Vertical alignment** can be set at the grid level via the toolbar (**Align top**, **Align middle**, **Align bottom**, **Stretch to fill**). That updates the grid block and **every child column** so the layout matches in the editor and on the front end. **Stretch** makes columns fill the row height (`align-items: stretch` on the grid). Per-column alignment overrides still work: setting alignment on a column clears the grid’s `verticalAlignment` (see grid-column docs).
6. **Divider settings** are configured per-grid:
   - **Divider color**: Set in the Color panel (inspector).
   - **Divider style**: Set in the Divider Controls panel (solid, dashed, dotted, etc.).
   - **Divider inset**: Set the top/bottom inset distance in pixels.
7. **Block gap**: The horizontal gap controls the gutter between columns; the vertical gap controls the row gap. Both are configurable in the Dimensions panel.
8. **Column ordering**: Reorder columns at different breakpoints using the Column Order panel.

## Grid System Details

| Breakpoint | Grid Columns | CSS Variable |
|------------|-------------|--------------|
| Desktop (>= 960px) | 12 | `--desktop-span` |
| Tablet (600px - 959px) | 12 | `--tablet-span` |
| Mobile (< 600px) | 4 | `--mobile-span` |

The grid uses `display: grid` with `grid-template-columns: repeat(N, 1fr)`. Column spans are applied via CSS custom properties (`grid-column-end: span var(--desktop-span, 4)`). Ordering uses `order: var(--tablet-order)` and `order: var(--mobile-order)` at respective breakpoints.

Vertical alignment classes on the controller map to `align-items` (`start` / `center` / `end` / `stretch`). Each column uses `is-vertically-aligned-*` with `align-self` so per-column choices can differ; a column set to **stretch** uses `align-self: stretch` and fills the row height for that track.

Dividers use `::before` pseudo-elements that intelligently switch between:
- **Vertical dividers** (border-left) for side-by-side columns
- **Horizontal dividers** (border-top) for full-width columns that wrap to a new row

## Block Markup Example

```html
<div class="wp-block-prc-block-grid-controller has-divider has-ui-gray-light-divider-color is-vertically-aligned-top"
     style="--grid-gutter: var(--wp--preset--spacing--50);--grid-row-gap: var(--wp--preset--spacing--50); --divider-color: var(--wp--preset--color--ui-gray-light);">
  <div class="wp-block-prc-block-grid-column is-vertically-aligned-top"
       style="--desktop-span:6;--tablet-span:6;--mobile-span:4;"
       data-desktop-span="6" data-tablet-span="6" data-mobile-span="4">
    <!-- Column 1 content -->
  </div>
  <div class="wp-block-prc-block-grid-column is-vertically-aligned-top has-desktop-divider has-tablet-divider"
       style="--desktop-span:6;--tablet-span:6;--mobile-span:4;"
       data-desktop-span="6" data-tablet-span="6" data-mobile-span="4">
    <!-- Column 2 content -->
  </div>
</div>
```

## PHP Rendering

Server-side rendered via `render_block_callback` in `Grid_Controller`. The PHP:

1. Generates CSS custom properties for gutter (`--grid-gutter`, `--grid-row-gap`) from `style.spacing.blockGap`, converting preset tokens to CSS variable references.
2. Generates divider CSS custom properties (`--divider-color`, `--divider-style`, `--divider-inset`).
3. Adds divider-related classes (`has-divider`, `has-{color}-divider-color`).
4. Adds vertical alignment class (e.g., `is-vertically-aligned-top`, `is-vertically-aligned-stretch`). If `verticalAlignment` is omitted, PHP defaults to `top`.
5. Wraps inner block content in a `<div>` with all computed attributes.

## Frontend Interactivity

None. Layout is purely CSS-driven using CSS Grid.

## Related Blocks

- `prc-block/grid-column` -- Required child; individual responsive columns

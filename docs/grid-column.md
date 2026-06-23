# Grid Column (Responsive Column)

> **Deprecated.** Children of a core **Group** block using the **Grid** layout are now plain blocks with native per-viewport span controls plus a PRC **Column order** control (Dimensions panel). This block is hidden from the inserter but still renders existing content; migrate via **Transform → Group** on the parent Responsive Grid. See [core-group/README.md](../src/core-group/README.md).

## Block Name & Description

**Title:** Responsive Column
**Description:** A responsive grid column. Set the column's span and start position at different breakpoints to create complex responsive grid layouts.

## Block inserter example

`block.json` defines an `example` with sample `gridLayout` spans and a `core/paragraph` (“Column content.”). The block is not directly insertable (`inserter: false`); the preview shape applies when the column appears in grid templates or listings.

## Block Namespace

`prc-block/grid-column`

## Category

`design`

## Supports

| Feature      | Enabled | Details                                                                                                     |
| ------------ | ------- | ----------------------------------------------------------------------------------------------------------- |
| Anchor       | Yes     |                                                                                                             |
| Reusable     | No      |                                                                                                             |
| Inserter     | No      | Cannot be inserted directly; only created via parent grid controller                                        |
| HTML editing | No      |                                                                                                             |
| Color        | Yes     | Background, text, link                                                                                      |
| Spacing      | Yes     | `blockGap`, `margin`, `padding` (default control). Block gap is also exposed as a CSS variable (see below). |
| Border       | Yes     | Color, style, width (all default controls)                                                                  |
| Typography   | Yes     | Font size, line height, font family (default controls)                                                      |
| Layout       | Yes     | Experimental layout support                                                                                 |

## Attributes

| Attribute           | Type              | Default   | Description                                                                                                                                                                                                |
| ------------------- | ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gridLayout`        | `object`          | See below | Object controlling responsive grid behavior                                                                                                                                                                |
| `verticalAlignment` | `string`          | —         | `top`, `center`, `bottom`, or `stretch`. Stretch makes the column fill the grid row height (`align-self: stretch`). If the attribute is absent in saved markup, PHP still defaults the front end to `top`. |
| `allowedBlocks`     | `array`           | —         | Restrict which blocks can be placed inside                                                                                                                                                                 |
| `templateLock`      | `string\|boolean` | `false`   | Lock mode: `"all"`, `"insert"`, `"contentOnly"`, or `false`                                                                                                                                                |

### `gridLayout` Object

| Property         | Type            | Default | Description                                           |
| ---------------- | --------------- | ------- | ----------------------------------------------------- |
| `index`          | `number`        | `0`     | Column position index (1-based when active)           |
| `desktopSpan`    | `number`        | `4`     | Number of grid columns to span on desktop (out of 12) |
| `tabletSpan`     | `number`        | `4`     | Number of grid columns to span on tablet (out of 12)  |
| `mobileSpan`     | `number`        | `4`     | Number of grid columns to span on mobile (out of 4)   |
| `tabletStart`    | `number\|null`  | `null`  | Grid start position on tablet                         |
| `mobileStart`    | `number\|null`  | `null`  | Grid start position on mobile                         |
| `tabletPosition` | `number\|null`  | `null`  | Custom order position on tablet                       |
| `mobilePosition` | `number\|null`  | `null`  | Custom order position on mobile                       |
| `desktopDivider` | `boolean\|null` | `null`  | Show divider line on desktop                          |
| `tabletDivider`  | `boolean\|null` | `null`  | Show divider line on tablet                           |
| `mobileDivider`  | `boolean\|null` | `null`  | Show divider line on mobile                           |

## Available Styles

None.

## CSS custom properties

In addition to span and order variables, the block exposes the column’s **block spacing gap** as a custom property so child blocks and theme CSS can reuse the same value (for example padding or `calc()` that should track the column’s vertical gap).

| Property            | Source                                                                                                                                                                             | Where it appears                                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--grid-column-gap` | Block spacing **Block gap** (vertical axis: unified string or `top` when split). Resolved via `getBlockGapSupportValue` / `get_block_gap_support_value` with dimension `vertical`. | **Editor:** on the inner blocks wrapper (`useInnerBlocksProps`). **Front end:** on the column wrapper from `render_block_callback` (only when the resolved value is not empty and not `inherit`). |

Preset spacing tokens are output as `var(--wp--preset--spacing--*)` (or equivalent) so they match the rest of the editor.

## Inner Blocks

Yes. This is a container block. Any blocks can be placed inside the column.

## Parent / Ancestor Requirements

**Parent:** `prc-block/grid-controller`

This block can only exist as a direct child of a Responsive Grid block.

## Provides Context

| Context Key                 | Source            |
| --------------------------- | ----------------- |
| `grid/column/desktop/span`  | `gridSpan`        |
| `grid/column/desktop/start` | `gridStart`       |
| `grid/column/desktop/row`   | `gridRow`         |
| `grid/column/tablet/span`   | `tabletGridSpan`  |
| `grid/column/tablet/start`  | `tabletGridStart` |
| `grid/column/tablet/row`    | `tabletGridRow`   |
| `grid/column/mobile/span`   | `mobileGridSpan`  |
| `grid/column/mobile/start`  | `mobileGridStart` |
| `grid/column/mobile/row`    | `mobileGridRow`   |

## Usage Instructions

1. This block is automatically created by the parent `prc-block/grid-controller` when you choose a layout variation or add columns.
2. **Resize columns** by selecting a column and dragging the right-side resize handle. The column snaps to grid tracks.
3. **Inspector controls** provide precise span settings per breakpoint (desktop/tablet/mobile) via the Span Controls panel.
4. **Vertical alignment** is available in the block toolbar: **Align top**, **Align middle**, **Align bottom**, and **Stretch to fill** (Core toolbar). Stretch sets `align-self: stretch` on the column so it matches the row height of the grid. Choosing alignment on a column clears the parent grid’s `verticalAlignment` so per-column settings win.
5. **Column ordering** can be customized per breakpoint using the Column Order panel in the inspector. Set `tabletPosition` and `mobilePosition` to reorder columns at smaller viewports.
6. **Dividers** between columns are controlled per-breakpoint. These show as vertical lines between side-by-side columns, or horizontal lines above full-width columns.
7. Use the **Add Column** and **Remove Column** toolbar buttons to manage columns from within the column itself.

## Block Markup Example

```html
<div
	class="wp-block-prc-block-grid-column is-vertically-aligned-top has-desktop-divider has-tablet-divider"
	style="--desktop-span:8;--tablet-span:6;--mobile-span:4;--grid-column-gap:var(--wp--preset--spacing--40);"
	data-desktop-span="8"
	data-tablet-span="6"
	data-mobile-span="4"
>
	<!-- Inner block content -->
</div>
```

## PHP Rendering

Server-side rendered via `render_block_callback` in `Grid_Column`. The PHP:

1. Parses `gridLayout` attributes with defaults.
2. Generates CSS custom properties: `--desktop-span`, `--tablet-span`, `--mobile-span` (and optionally `--tablet-order`, `--mobile-order`, and `--grid-column-gap` when block gap is set).
3. Adds data attributes: `data-desktop-span`, `data-tablet-span`, `data-mobile-span`.
4. Adds vertical alignment class (e.g., `is-vertically-aligned-top`, `is-vertically-aligned-stretch`). If `verticalAlignment` is omitted from stored attributes, PHP defaults to `top` and outputs `is-vertically-aligned-top`.
5. Adds divider classes (`has-desktop-divider`, `has-tablet-divider`, `has-mobile-divider`) based on `gridLayout` divider attributes.
6. The `enforce_divider_classes` filter provides an additional enforcement layer for divider classes.
7. The `apply_legacy_divider_fallback` filter handles legacy blocks that predate explicit divider attributes by inferring dividers from the column index.
8. The `handle_align_to_gutter` filter adds the `prc-block-grid-column--align-to-gutter` class when the `alignToGutter` attribute is enabled on any block.

## Frontend Interactivity

None. Layout is purely CSS-driven using CSS Grid with custom properties and media queries.

## Related Blocks

- `prc-block/grid-controller` -- Required parent; provides the CSS Grid container

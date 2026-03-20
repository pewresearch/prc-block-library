# Power Table

A full-featured data table with sortable columns, hidden columns, responsive scroll/stack modes, caption, title, source note, and cell-level styling. Forked from Aki Hamano's Flexible Table Block.

## Namespace

`prc-block/table`

## Category

`text`

## Supports

| Feature | Detail |
|---|---|
| Anchor | Yes |
| Interactivity | Yes |
| Align | `left`, `right`, `wide`, `full` |
| Color | Background, text, gradients, link (skip serialization for text/background/gradients) |
| Typography | `fontSize`, `fontFamily` |
| Spacing | `margin`, `padding` |
| Border | Color, style, width (no radius) |

Custom selector mapping routes font-size to `> table` and font-family to the root wrapper.

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `contentJustification` | `string` | -- | Text alignment for cells |
| `hasFixedLayout` | `boolean` | `true` | Use `table-layout: fixed` |
| `isScrollOnPc` | `boolean` | `false` | Horizontal scroll on desktop |
| `isScrollOnMobile` | `boolean` | `false` | Horizontal scroll on mobile |
| `isStackedOnMobile` | `boolean` | `false` | Stack rows vertically on mobile |
| `sticky` | `string` | -- | Sticky header/first-column mode |
| `tableStyles` | `string` | -- | Inline styles on `<table>` (sourced from markup) |
| `sourceNote` | `string` | -- | Rich text source note below table |
| `tableTitle` | `string` | -- | Rich text title (`<h4>`) above table |
| `tableTitleStyles` | `string` | -- | Inline styles on title |
| `captionSide` | `string` | `"top"` | Position of the `<figcaption>` |
| `caption` | `string` | -- | Rich text caption |
| `captionStyles` | `string` | -- | Inline styles on caption |
| `head` | `array` | `[]` | Header rows, each containing `cells` with `content`, `styles`, `tag`, `className`, `id`, `headers`, `scope`, `rowSpan`, `colSpan` |
| `body` | `array` | `[]` | Body rows (same cell schema as `head`) |
| `foot` | `array` | `[]` | Footer rows (same cell schema as `head`) |
| `hiddenColumns` | `array` | `[]` | Indices of columns hidden from display |
| `isSortable` | `boolean` | `false` | Enable client-side column sorting |
| `sortableColumns` | `array` | `[]` | Column indices that are sortable (empty = all) |

## Available Styles

None declared in `block.json`. Styling is controlled via block attributes and CSS custom properties.

## Inner Blocks

None. Table content is stored entirely in the `head`, `body`, and `foot` attributes.

## Parent / Ancestor Requirements

None.

## Context

| Direction | Key | Maps to |
|---|---|---|
| Uses | `remote-data-blocks/remoteData` | External data integration |

## Usage

Insert the Power Table block and use the placeholder to set initial row/column counts. The editor provides:

- **Data settings** -- import/export, row and column management.
- **Table settings** -- fixed layout, scroll modes, stacked mobile, sticky headers.
- **Cell settings** -- per-cell tag (`td`/`th`), scope, rowspan/colspan, alignment, individual styles.
- **Title & Caption** -- optional `<h4>` title and `<figcaption>` with configurable position.
- **Source Note** -- `<p>` below the table for citation/source text.
- **Sorting** -- toggle `isSortable` and optionally restrict to specific columns with `sortableColumns`.

Hidden columns allow selectively hiding data columns without removing them from the underlying data.

## Block Markup (save)

```html
<figure class="wp-block-prc-block-table">
  <h4 style="...">{tableTitle}</h4>
  <table style="...">
    <thead>
      <tr><th>...</th></tr>
    </thead>
    <tbody>
      <tr><td>...</td></tr>
    </tbody>
    <tfoot>
      <tr><td>...</td></tr>
    </tfoot>
  </table>
  <figcaption style="...">{caption}</figcaption>
  <p>{sourceNote}</p>
</figure>
```

Sortable header cells receive `data-sortable`, `data-column-index`, and `role="columnheader"` attributes. Cells with underscore-prefix numbers (e.g. `_123`) emit a `data-sort-value` for correct numeric sorting with display formatting preserved.

## PHP Rendering

`class-table.php` (`PRC\Platform\Blocks\Table`)

Minimal server-side logic. Registers the block via metadata. Loads helper classes:

- `class-helper.php` -- generates global table CSS, minification.
- `class-settings.php` -- table block settings/options.
- `class-api.php` -- REST API endpoints for table data operations.

Editor-only: enqueues inline CSS via `enqueue_block_editor_assets` for global table styles scoped to `.editor-styles-wrapper`.

## Frontend Interactivity

`view.js` registers the `prc-block/table` Interactivity API store.

**Sorting engine** supports multiple data types:
- **Dates** -- ISO, US, EU formats, and natural language dates.
- **Durations** -- parses `Xh Ym` / `Xhr Ymin` patterns into total minutes.
- **Numbers** -- strips currency symbols (`$`, `EUR`, etc.), commas, percent signs.
- **Strings** -- locale-aware `localeCompare` fallback.

**State:**
- `sortIndicator` -- returns arrow character based on current sort direction.
- `mobileSortDirectionLabel` -- label for mobile sort toggle button.

**Actions:**
- `onHeaderClick` -- cycles sort direction (asc -> desc -> none) on sortable header cells.
- `onMobileSortChange` -- handles mobile `<select>` dropdown for column selection.
- `onMobileSortDirectionToggle` -- toggles between asc/desc for mobile UI.

**Callbacks:**
- `onInit` -- stores `data-original-index` on each `<tr>` for reset-to-original-order support.

Sorting modifies DOM order directly (re-appending rows to `<tbody>`) and updates `aria-sort` attributes on header cells.

## Related Blocks

| Block | Relationship |
|---|---|
| `core/table` | Core WordPress table (simpler, fewer features) |

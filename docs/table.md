# Power Table

A full-featured data table with sortable columns, optional per-column and per-cell decimal rounding (body/footer), hidden columns, responsive scroll/stack modes, caption, title, source note, and cell-level styling. Forked from Aki Hamano's Flexible Table Block.

## Block inserter example

`block.json` defines an `example` with sample `head` / `body` cell data (WordPress release / jazz musician sample rows) — inserter preview. The previous standalone `example.ts` was inlined into `block.json`.

## Namespace

`prc-block/table`

## Category

`text`

## Supports

| Feature       | Detail                                                                               |
| ------------- | ------------------------------------------------------------------------------------ |
| Anchor        | Yes                                                                                  |
| Interactivity | Yes                                                                                  |
| Align         | `left`, `right`, `wide`, `full`                                                      |
| Color         | Background, text, gradients, link (skip serialization for text/background/gradients) |
| Typography    | `fontSize`, `fontFamily`                                                             |
| Spacing       | `margin`, `padding`                                                                  |
| Border        | Color, style, width (no radius)                                                      |

Custom selector mapping routes font-size to `> table` and font-family to the root wrapper.

**Interactivity:** `block.json` enables `supports.interactivity` for the sortable client (`view.js`). The `<figure>` gets `data-wp-interactive` and related directives **only when `isSortable` is true**. Decimal rounding alone does **not** add Interactivity markup; rounding is applied in `render_block` (PHP).

## Attributes

| Attribute              | Type      | Default | Description                                                                                                                                                                                     |
| ---------------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contentJustification` | `string`  | --      | Text alignment for cells                                                                                                                                                                        |
| `hasFixedLayout`       | `boolean` | `true`  | Use `table-layout: fixed`                                                                                                                                                                       |
| `isScrollOnPc`         | `boolean` | `false` | Horizontal scroll on desktop                                                                                                                                                                    |
| `isScrollOnMobile`     | `boolean` | `false` | Horizontal scroll on mobile                                                                                                                                                                     |
| `isStackedOnMobile`    | `boolean` | `false` | Stack rows vertically on mobile                                                                                                                                                                 |
| `sticky`               | `string`  | --      | Sticky header/first-column mode                                                                                                                                                                 |
| `tableStyles`          | `string`  | --      | Inline styles on `<table>` (sourced from markup)                                                                                                                                                |
| `sourceNote`           | `string`  | --      | Rich text source note below table                                                                                                                                                               |
| `tableTitle`           | `string`  | --      | Rich text title (`<h4>`) above table                                                                                                                                                            |
| `tableTitleStyles`     | `string`  | --      | Inline styles on title                                                                                                                                                                          |
| `captionSide`          | `string`  | `"top"` | Position of the `<figcaption>`                                                                                                                                                                  |
| `caption`              | `string`  | --      | Rich text caption                                                                                                                                                                               |
| `captionStyles`        | `string`  | --      | Inline styles on caption                                                                                                                                                                        |
| `head`                 | `array`   | `[]`    | Header rows; each `cells[]` entry matches the shared cell schema (including optional `roundDecimals` in `block.json`). Rounding **display** ignores `thead` — see Usage.                        |
| `body`                 | `array`   | `[]`    | Body rows; same cell schema. Optional per-cell `roundDecimals` (`1`–`10`) overrides column rounding for that cell (serialized as `data-prc-round-decimals` when saved).                         |
| `foot`                 | `array`   | `[]`    | Footer rows; same as `body` for rounding and `data-prc-*` markers.                                                                                                                              |
| `columnRoundDecimals`  | `array`   | `[]`    | Per **virtual column index**: omit or `null` = no column rounding; `1`–`10` = round half-up to that many decimal places for **body/footer** cells in that column (header cells are not rounded) |
| `hiddenColumns`        | `array`   | `[]`    | Virtual column indices hidden from display (aligned with `data-prc-v-col` on body/footer cells)                                                                                                 |
| `isSortable`           | `boolean` | `false` | Enable client-side column sorting                                                                                                                                                               |
| `sortableColumns`      | `array`   | `[]`    | Virtual column indices that are sortable in the first header row (empty = all)                                                                                                                  |

## Available Styles

None declared in `block.json`. Styling is controlled via block attributes and CSS custom properties.

## Inner Blocks

None. Table content is stored entirely in the `head`, `body`, and `foot` attributes.

## Parent / Ancestor Requirements

None.

## Context

| Direction | Key                             | Maps to                   |
| --------- | ------------------------------- | ------------------------- |
| Uses      | `remote-data-blocks/remoteData` | External data integration |

## Usage

Insert the Power Table block and use the placeholder to set initial row/column counts. The editor provides:

-   **Data settings** -- import/export, row and column management. **CSV import** (`src/table/csv-parser.js`) maps each parsed cell value into `content` **as returned by the parser**; `null` / `undefined` are not forced to `''` at import time (previously they were stringified to empty strings). Prefer normalizing empty cells in the editor if your pipeline requires strings.
-   **Table settings** -- fixed layout, scroll modes, stacked mobile, sticky headers.
-   **Cell settings** -- per-cell tag (`td`/`th`), scope, rowspan/colspan, alignment, individual styles.
-   **Title & Caption** -- optional `<h4>` title and `<figcaption>` with configurable position.
-   **Source Note** -- `<p>` below the table for citation/source text.
-   **Sorting** -- toggle `isSortable` and optionally restrict to specific columns with `sortableColumns` (virtual column indices).
-   **Decimal rounding** -- Right-click a cell to open the context menu: **Round column…** (Off or 1–10 decimal places for that virtual column on body/footer cells) and **Round cell…** on body/footer cells only (inherit column setting or 1–10). Same attributes: `columnRoundDecimals` and per-cell `roundDecimals`. Half-up rounding; header (`thead`) cells are never rounded. **Editor preview (Phase A):** when a body/footer cell is not selected, the editor shows the same rounded plain text as the **front** for cells that contain only plain text (no inline markup), using `src/table/utils/round-display.ts`. Rich cells (bold, links, etc.) show raw content. **Front end:** rounded display text and `data-sort-value` (pre-round plain) are produced in **`render_block`** (PHP) — not in the Interactivity client — so numbers stay correct without JavaScript. See [design spec](../../../docs/superpowers/specs/2026-03-24-table-rounding-interactivity-design.md).

### Context menu (editor)

Right-click a cell to open a **Popover** (`src/table/elements/context-menu.tsx`) anchored to that cell. The main menu includes **Copy cell content**, **Round column…**, and **Round cell…** (body/footer only), and can be extended via `TableCellContextMenuSlot`.

**Round column…** and **Round cell…** open nested option lists (decimal presets and Off / Inherit). **← Back** returns to the main menu. **Escape** from a nested view returns to the main menu; **Escape** from the main menu closes the popover.

The menu closes when focus or input moves outside the menu panel: listeners on `pointerdown`, `mousedown`, `click`, and `contextmenu` run in the **capture** phase on `document`, and “inside” is determined with a **ref** on the menu content node (not a global `querySelector` by class), so multiple tables on the page and nested submenu navigation still dismiss correctly. The parent table component does not register a second copy of those listeners.

Hidden columns use **virtual** column indices (accounting for `colspan`), consistent with sortable columns and saved `data-prc-v-col` markers.

## Block Markup (save)

Saved post content is **static HTML** (no Interactivity API `data-wp-*` attributes in the document). The root is a `<figure class="wp-block-prc-block-table">` (plus optional `is-sortable`, scroll/stack classes).

**Validation:** Sortable / hidden-column classes on cells (`is-sortable`, `is-column-hidden`) are **recomputed in `save.tsx`** from block attributes. If those tokens also remain in the parsed cell `class` string, they stack on every load/save and can break block validation. On mount, the editor runs `src/table/utils/table-attribute-normalize.ts` to strip those tokens and coerce `roundDecimals` to a number so stored HTML matches `save()` output. `toTableAttributes` applies the same normalization when persisting from the virtual table.

Body and footer cells (`tbody` / `tfoot`) include:

-   `data-prc-v-col` — virtual column index for that cell (handles merged cells via `colspan`).
-   `data-prc-round-decimals` — optional; present when that cell overrides rounding (`1`–`10`).

**Rendered front end (differs from saved HTML when rounding is on):** For non-admin requests, `render_block` may replace eligible body/footer cell text with half-up rounded values and set `data-sort-value` to the pre-round plain string. Saved post content in the database stays **author/raw**; the transform is output-only.

```html
<figure class="wp-block-prc-block-table">
	<h4 style="...">{tableTitle}</h4>
	<table style="...">
		<thead>
			<tr>
				<th class="is-sortable">...</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td data-prc-v-col="0">...</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<td data-prc-v-col="0" data-prc-round-decimals="2">...</td>
			</tr>
		</tfoot>
	</table>
	<figcaption style="...">{caption}</figcaption>
	<p>{sourceNote}</p>
</figure>
```

Sortable header cells in the **first** `thead` row are marked with classes such as `is-sortable` and `is-column-hidden` where applicable. **Interactive** attributes for sorting (`data-wp-on--click`, `data-column-index`, `role="button"`, etc.) are **not** stored in the saved HTML; they are injected at render time (see below).

## PHP rendering

`class-table.php` (`PRC\Platform\Blocks\Table`)

Registers the block from metadata with a **`render_callback`** — the static method `Table::render_block` on the same class.

**Early exit:** If `$content` is empty, it is returned as-is. If the block is neither sortable nor configured for rounding (`Table::has_rounding()` — any `columnRoundDecimals` entry in `1`–`10`, or any body/footer cell with `roundDecimals` in `1`–`10`), saved markup is returned unchanged.

**Server-side rounding (front end only):** When `has_rounding()` is true and **`! is_admin()`**, the saved HTML is passed through **`Rounding_Walker::apply()`** (`class-table-rounding-walker.php`). The walker walks **direct** `tbody` / `tfoot` → `tr` → `td`/`th` (nested tables inside a cell are not mistaken for outer body rows). For each eligible plain-text cell, **`Round_Display`** (`class-round-display.php`) mirrors `src/table/utils/round-display.ts` (half-up, same Phase A skip rules: no element children, no dates/durations, etc.). **`parse_date()`** must align with **`Date.parse`**: PHP’s **`strtotime()`** can misread some decimal-only strings as times, so those are excluded before the strtotime fallback (same long decimals that `Date.parse` rejects). It replaces cell text with the rounded value and sets **`data-sort-value`** to the pre-round plain string for sorting. The editor does not run this path — it keeps **raw** stored RichText; preview uses the TS helpers.

**Interactivity wrapper (sorting only):** `data-wp-interactive`, `data-wp-context` (`sortColumn`, `sortDirection`, `sortableColumns` only — **no** `columnRoundDecimals`), and `data-wp-init` are added only when **`isSortable`** is true. Rounding-only tables do **not** get a `data-wp-*` wrapper on the figure.

When sortable, the callback also uses `WP_HTML_Tag_Processor` to inject sort controls on **first-row** `thead` header cells (`data-wp-on--click`, `data-column-index`, `role`, `tabindex`, `is-sortable` class as needed — same virtual index model as `sortableColumns` / `hiddenColumns`).

Idempotent guards avoid duplicating wrapper directives if `data-wp-interactive` is already present; per-header cells skip injection if `data-wp-on--click` is already set.

**Implementation note — `inject_header_sort_directives()`:** The scan uses `WP_HTML_Tag_Processor::next_tag( array( 'tag_closers' => 'visit' ) )`. In WordPress, closing tags (for example `</thead>`, `</tr>`) are only visited when `tag_closers` is `visit`; otherwise `is_tag_closer()` is never true and thead scoping would be wrong. **Do not** replace this loop with plain `next_tag()` without revisiting that state machine.

Other loaded classes:

-   `class-helper.php` — global table CSS, minification.
-   `class-settings.php` — table block settings/options.
-   `class-api.php` — REST API endpoints for table data operations.
-   `class-round-display.php` — PHP parity with `round-display.ts` for server rounding.
-   `class-table-rounding-walker.php` — DOM walker that applies rounding to `tbody`/`tfoot` cells.

Editor-only: enqueues inline CSS via `enqueue_block_editor_assets` for global table styles scoped to `.editor-styles-wrapper`.

## Frontend Interactivity

`view.js` registers the `prc-block/table` Interactivity API store **only when the block is sortable** (saved HTML is augmented with `data-wp-interactive` in `render_block`). The server-rendered `data-wp-context` JSON includes **`sortColumn`**, **`sortDirection`**, and **`sortableColumns`** only.

**Rounding:** Display rounding and `data-sort-value` for rounded cells are **not** applied in the client. They are produced in **`render_block`** (PHP). Shared parsing and half-up rules are implemented in **`src/table/utils/round-display.ts`** for the editor and tests, and mirrored in **`class-round-display.php`** for the server.

**Sorting engine** supports multiple data types:

-   **Dates** -- ISO, US, EU formats, and natural language dates.
-   **Durations** -- parses `Xh Ym` / `Xhr Ymin` patterns into total minutes.
-   **Numbers** -- strips currency symbols (`$`, `EUR`, etc.), commas, percent signs.
-   **Strings** -- locale-aware `localeCompare` when both cells parse as non-numeric.

**Cell value source:** Each cell’s sort key is **`data-sort-value`** when set (e.g. by PHP for rounded numbers), otherwise the cell’s **`textContent`** (visible plain text). The client does not read `innerHTML` for sorting, so ordering matches what users see and is consistent across browsers.

**Mixed columns:** If one cell parses as numeric/date/duration and another does not (e.g. numbers plus `N/A`), **numeric values sort before non-numeric** in ascending order (and the inverse after the descending flip), instead of mixing number and string `localeCompare`, which keeps the comparator well-defined across engines (including Firefox).

**DOM reorder:** Sorted `<tbody>` rows are moved with a **`DocumentFragment`** (one append to `tbody`) rather than repeated `appendChild` per row, to avoid incremental table reflow quirks in Firefox.

**State:**

-   `sortIndicator` -- returns arrow character based on current sort direction.
-   `mobileSortDirectionLabel` -- label for mobile sort toggle button.

**Actions:**

-   `onHeaderClick` -- cycles sort direction (asc -> desc -> none) on sortable header cells.
-   `onMobileSortChange` -- handles mobile `<select>` dropdown for column selection.
-   `onMobileSortDirectionToggle` -- toggles between asc/desc for mobile UI.

**Callbacks:**

-   `onInit` -- stores `data-original-index` on each `<tbody>` row for reset-to-original-order support (no client-side rounding).

**Cell lookup:** Body cells are found by **`data-prc-v-col`** attribute (virtual column index) rather than positional `querySelectorAll` index, so tables with `colspan` cells resolve the correct column. Rows that lack a cell at the target virtual column (e.g. a group header spanning the full width) sort to the end rather than comparing as "equal" to everything, which would break comparator transitivity.

Sorting reorders `<tbody>` rows (see **DOM reorder** above), then updates `aria-sort` and sort-indicator classes on header cells. Prefer **`data-sort-value`** when present (set by PHP for rounded numeric cells) so sort order matches pre-round values; otherwise visible **`textContent`** is parsed.

## Related Blocks

| Block        | Relationship                                   |
| ------------ | ---------------------------------------------- |
| `core/table` | Core WordPress table (simpler, fewer features) |

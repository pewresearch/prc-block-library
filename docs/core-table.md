# Core Table

PRC's override/extension of the WordPress `core/table` block.

## Block Namespace

`prc-block/core-table`

## What PRC Customizes

- Adds `allowSorting` and `sortingOptions` attributes for DataTables-powered sortable tables
- Allows CSV file uploads via the WordPress media library
- Provides a CSV Import panel in the editor sidebar with file input and drag-and-drop support
- Registers a "Plain Table" block style
- Handles legacy HTML tables with `prc-table` class by migrating them to `wp-block-table` classes
- Initializes DataTables on sortable tables with searching/info/paging disabled
- Custom table styling with dotted borders and minimal visual treatment

## Supports Modifications

None beyond custom attributes.

## Additional Attributes

| Attribute        | Type      | Default | Description                              |
|------------------|-----------|---------|------------------------------------------|
| `allowSorting`   | `boolean` | `false` | Enables DataTables sorting on the table  |
| `sortingOptions` | `array`   | --      | Configuration options for DataTables sorting |

Added via `block_type_metadata` filter in `add_attributes`.

## Available Styles

| Style Name    | Label       | Description                                    |
|---------------|-------------|------------------------------------------------|
| `plain-table` | Plain Table | Inherits background color on tbody cells       |

Registered in PHP via `register_block_style` with inline CSS.

## Style Overrides

**File:** `style.scss`

- **Table base** (`:not(.is-style-plain-table)`) -- `color: black`, inherited background
- **Caption** -- `font-size: 0.8em`, `color: #999`, `margin-top: 1.25em`
- **Table element** -- zero bottom border, `border-spacing: 2px`
- **Thead** -- zero bottom border; `th` cells get white background, no borders, bold text, left-aligned
- **Tbody** -- `td` cells have no left/top/right borders, `dotted` bottom border in `#ddd`
- **Cell min-width** -- `4em` on all `td` elements
- **Legacy HTML tables** -- `.html-fallback-table` set to `font-size: 14px`

## Editor Enhancements

**File:** `index.js`

- HOC wrapping `editor.BlockEdit` for `core/table` to inject the `Controls` component
- Imports `style.scss` for editor/frontend styles

**File:** `controls.jsx`

- "CSV Import" inspector panel with:
  - A `Button` that triggers a hidden file input for CSV selection
  - A `DropZone` for drag-and-drop CSV import
  - Both pass files to the `handleCSV` parser

**File:** `csv-parser.js`

- Parses CSV files using the `comma-separated-values` library
- Converts the first row to table head cells and remaining rows to table body cells
- Updates the block's `head` and `body` attributes with the parsed data

## Frontend Interactivity

**File:** `view.js`

- On DOM ready, initializes DataTable on all `.wp-block-table.sortable-table` elements
- DataTable configuration: `searching: false`, `info: false`, `lengthChange: false`, `paging: false`, `responsive: true`

## PHP Rendering

**File:** `class-core-table.php`

- **`add_attributes`** (`block_type_metadata` filter) -- adds `allowSorting` and `sortingOptions` attributes
- **`register_assets`** (`init` hook) -- registers editor script, style, and view script handles; calls `register_new_styles`
- **`register_new_styles`** -- registers the `plain-table` block style
- **`allow_csv_mime_type`** (`upload_mimes` filter) -- adds `text/csv` to allowed upload types
- **`enqueue_view_style`** (`render_block` filter) -- handles two scenarios:
  - For `core/table` blocks: enqueues the style
  - For `core/html` blocks containing `prc-table`: migrates class to `wp-block-table has-sans-serif-font-family html-fallback-table`; if `data-ordering="true"` is present, adds `sortable-table` class, generates a unique ID, and enqueues the DataTables view script and styles

## Block Markup Example

```html
<!-- Standard table -->
<figure class="wp-block-table">
  <table>
    <thead>
      <tr><th>Category</th><th>Percentage</th></tr>
    </thead>
    <tbody>
      <tr><td>Group A</td><td>45%</td></tr>
      <tr><td>Group B</td><td>55%</td></tr>
    </tbody>
  </table>
</figure>

<!-- Sortable table -->
<figure class="wp-block-table sortable-table" id="prc-sortable-table-1">
  <table>
    <thead>
      <tr><th>Country</th><th>Value</th></tr>
    </thead>
    <tbody>
      <tr><td>United States</td><td>72</td></tr>
      <tr><td>Germany</td><td>68</td></tr>
    </tbody>
  </table>
</figure>
```

## Variations

None.

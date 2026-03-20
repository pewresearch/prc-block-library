# Remote Pivot Table

Pivots the data of a remote tabular data source, allowing for pseudo-pivot-table functionality. Select a data source orientation (column or row) and choose which columns to pivot by.

## Block Namespace

`prc-block/remote-pivot-table`

## Category

`media`

## Supports

| Feature | Enabled |
|---------|---------|
| Anchor | Yes |
| HTML | No |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `primaryKey` | `string` | -- | The column name to use as the primary key for pivoting. |
| `selectedColumns` | `array` (of strings) | `[]` | The column names selected for pivoting. |
| `dataSource` | `string` | `"row"` | The pivot orientation. One of: `column`, `row`. |

## Uses Context

| Context | Description |
|---------|-------------|
| `remote-data-blocks/remoteData` | The remote data results provided by a parent remote data block. |
| `remote-data-blocks/pivotedData` | The pivoted data structure (set by this block's PHP context filter). |

## Available Styles

No block style variations defined.

## Inner Blocks

This is a container block. The expected inner block structure is:

- `prc-block/tabs` (tab container)
  - `prc-block/tab` (individual tab)
    - `core/table` (table template for rendering pivoted data)

The first tab's first `core/table` block is used as a template. The PHP renderer clones this table markup for each pivot group, replacing the `<tbody>` content with the pivoted rows.

## Parent/Ancestor Requirements

Must be used inside a remote data block that provides the `remote-data-blocks/remoteData` context.

## Usage Instructions

1. Set up a **Remote Data Block** parent that provides tabular data via context.
2. Insert a **Remote Pivot Table** block inside the remote data block.
3. In the **Inspector Panel > Remote Data: Pivot Table**:
   - **Selected Columns**: Multi-select the columns you want to include in the pivot.
   - **Data Source**: Choose the pivot orientation:
     - `Row` -- Creates groups keyed by primary key value, each containing selected column data.
     - `Column` -- Creates groups keyed by each selected column, mapping primary key values to that column's values.
   - **Primary Key**: Select which column serves as the unique identifier for rows.
4. Add a `prc-block/tabs` block inside with a `prc-block/tab` containing a `core/table` as the display template.
5. Optionally use the **Column Sum Block Binding** panel to insert a paragraph block bound to the sum of a specific column's values.

## Block Binding: Column Sum

The block registers a custom block binding source `prc-block/remote-pivot-table-sum` (both client-side and server-side).

To use it, create a `core/paragraph` block with metadata bindings:

```json
{
  "metadata": {
    "bindings": {
      "content": {
        "source": "prc-block/remote-pivot-table-sum",
        "args": {
          "column": "revenue"
        }
      }
    }
  }
}
```

This will display the sum of all numeric values in the specified column from the remote data.

## Block Markup Example

The block saves inner block content. The server renders it as:

```html
<div class="wp-block-prc-block-remote-pivot-table">
  <!-- Rendered tabs with pivoted data tables -->
  <div class="wp-block-prc-block-tabs">
    <div class="tab-label">Column A</div>
    <div class="tab-content">
      <table>
        <tbody>
          <tr><td>Row Key 1</td><td>1,234</td></tr>
          <tr><td>Row Key 2</td><td>5,678</td></tr>
        </tbody>
      </table>
    </div>
    <!-- More tabs... -->
  </div>
</div>
```

## PHP Rendering

The `render_remote_pivot_table_callback` method:

1. Expects inner blocks to follow the structure: `prc-block/tabs` > `prc-block/tab` > `core/table`.
2. Extracts the first table block's rendered markup as a template.
3. Reads pivoted data from the `remote-data-blocks/pivotedData` context.
4. For each pivot group, renders a tab with:
   - **Label**: The pivot group key
   - **Content**: The table template with `<tbody>` replaced by rows of pivoted data
5. Data is sorted descending by value (numeric-aware).
6. Numeric values are formatted with comma separators.
7. Renders via the shared `\PRC\Platform\Blocks\render_tabs()` helper.

**Context filter (`pivot_in_context`):**

Hooks into `render_block_context` to pre-compute the pivoted data before inner blocks render:

- **Row mode**: Creates an associative array keyed by primary key values, each containing only the selected columns.
- **Column mode**: Creates an associative array keyed by column names, each mapping primary key values to that column's data.

The pivoted data is stored in `remote-data-blocks/pivotedData` context.

**Block bindings (`register_block_bindings`):**

Registers `prc-block/remote-pivot-table-sum` binding source that sums numeric values for a specified column from the remote data results.

## Frontend Interactivity

No dedicated frontend JavaScript. The block binding system handles both client-side (editor preview) and server-side (frontend render) through registered binding sources.

## Related Blocks

- Remote Data Blocks -- Parent blocks that provide the `remote-data-blocks/remoteData` context
- `prc-block/tabs` -- Tab container for displaying pivoted data groups
- `prc-block/tab` -- Individual tab within the tabs container
- `core/table` -- Table block used as a rendering template

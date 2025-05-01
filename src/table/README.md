# PRC Table Block

Forked from Aki Hamano's [Flexible Table Block](https://github.com/Aki-Hamano/flexible-table-block).

** Dev Note **
---

For in-depth documentation on the virtual table (vTable) architecture, see [VTABLE.md](./utils/table-state.md).

## Key Differences
x
- This block is a fork of the [Flexible Table Block](https://github.com/Aki-Hamano/flexible-table-block) by Aki Hamano.
- It adds new features and fixes some issues with extensibility.
- Adds a new right click context menu to the table cells. Currently supports copying and pasting from the system clipboard.
  - Adds a new `TableCellContextMenuFill` component that allows plugins to inject their own context menu items. You can use this by calling the `TableCellContextMenu` slotfill.
- Adds table title and source note to the table.
- Adds a filterable static site name/branding mark to the frontend of tables.
- Adds cell hover background color support.
- Adds support for PRC Copilot aided table title and caption generation.
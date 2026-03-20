# Dialog

Render content in a modal dialog. Includes a trigger to open the dialog and a dialog element (`<dialog/>`) to display content.

## Block Metadata

| Property    | Value                 |
|-------------|-----------------------|
| Namespace   | `prc-block/dialog`    |
| Category    | `media`               |
| Version     | `1.1.0`               |
| API Version | `3`                   |
| Keywords    | dialog, modal, popup  |

## Supports

| Feature       | Value                              |
|---------------|------------------------------------|
| Anchor        | `false`                            |
| HTML editing  | `false`                            |
| List View     | `true`                             |
| Font size     | `true` (default controls enabled)  |
| Font family   | `true` (default controls enabled)  |
| Interactivity | `true`                             |

## Attributes

| Attribute            | Type      | Default | Role    | Description                                                                                 |
|----------------------|-----------|---------|---------|---------------------------------------------------------------------------------------------|
| `dialogId`           | `string`  | `""`    | —       | Unique identifier for the dialog. Defaults to the block's `clientId` in the editor. Must be unique on the page. |
| `editorIsDialogOpen` | `boolean` | `false` | `local` | Editor-only state tracking whether the dialog content is currently visible for editing. Not saved to post content. |

## Provided Context

| Context Key      | Source Attribute      |
|------------------|-----------------------|
| `dialog/id`      | `dialogId`            |
| `dialog/isOpen`  | `editorIsDialogOpen`  |

## Allowed Inner Blocks

- `prc-block/dialog-element`
- `prc-block/dialog-trigger`

## Inner Blocks Template

The block initializes with a locked template:

1. **Dialog Trigger** (`prc-block/dialog-trigger`) — Contains a paragraph for trigger text.
2. **Dialog Element** (`prc-block/dialog-element`) — Contains a heading bound to the dialog label.

Template lock is set to `insert` (blocks cannot be added/removed, but content can be edited).

## Parent/Ancestor Requirements

None. This is the top-level container for dialog functionality.

## Usage Instructions

1. Insert the **Dialog** block from the block inserter (under the Media category, or search for "dialog", "modal", or "popup").
2. Type trigger text in the **Dialog Trigger** area — this is what users will click to open the dialog.
3. Click **"Edit Dialog"** in the block toolbar or inspector panel to reveal the dialog element for editing.
4. Add content inside the **Dialog Element** (headings, paragraphs, images, etc.).
5. Click **"Close Dialog"** to return to the trigger view.
6. The **Dialog ID** can be customized in the inspector panel. It must be unique on the page.
7. The dialog auto-opens for editing when you select the dialog element or its inner blocks.

## Block Markup Example

```html
<!-- wp:prc-block/dialog {"dialogId":"my-dialog"} -->
  <!-- wp:prc-block/dialog-trigger -->
    <!-- wp:paragraph -->
    <p>Click to open</p>
    <!-- /wp:paragraph -->
  <!-- /wp:prc-block/dialog-trigger -->

  <!-- wp:prc-block/dialog-element -->
    <!-- wp:heading -->
    <h2>Dialog Title</h2>
    <!-- /wp:heading -->
  <!-- /wp:prc-block/dialog-element -->
<!-- /wp:prc-block/dialog -->
```

## PHP Rendering

The `Dialog` PHP class provides a server-side render callback:

1. Requires a `dialogId` attribute. If missing, outputs a `_doing_it_wrong` warning and returns empty.
2. A `render_block_data` filter provides a fallback: if no `dialogId` is set, it generates one via `wp_unique_id('dialog-')`.
3. Wraps inner content in a `<div>` with Interactivity API directives: `data-wp-interactive="prc-block/dialog"`, `data-wp-context` (containing the dialog ID), and `data-wp-key`.

Rendered output:

```html
<div class="wp-block-prc-block-dialog"
     data-wp-interactive="prc-block/dialog"
     data-wp-context='{"id":"my-dialog"}'
     data-wp-key="my-dialog">
  <!-- trigger and dialog element content -->
</div>
```

## Frontend Interactivity

The Dialog block itself serves as the container. The actual interactivity logic lives in the `prc-block/dialog-element` view script (see [dialog-element.md](./dialog-element.md)). The dialog block establishes the Interactivity API context that its children consume.

## Related Blocks

- [`prc-block/dialog-trigger`](./dialog-trigger.md) — The clickable trigger element (required child).
- [`prc-block/dialog-element`](./dialog-element.md) — The modal dialog content container (required child).

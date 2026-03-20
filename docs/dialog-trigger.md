# Dialog Trigger

The content inside this block will act as the clickable "trigger" to display the dialog element.

## Block Metadata

| Property    | Value                         |
|-------------|-------------------------------|
| Namespace   | `prc-block/dialog-trigger`    |
| Category    | `media`                       |
| Version     | `1.1.0`                       |
| API Version | `3`                           |

## Supports

| Feature         | Value                             |
|-----------------|-----------------------------------|
| HTML editing    | `false`                           |
| Align           | `false`                           |
| Inserter        | `false` (only via parent Dialog)  |
| Spacing margin  | `top`, `bottom`                   |
| Spacing padding | `true` (default controls enabled) |
| Font size       | `true` (default controls enabled) |
| Font family     | `true` (default controls enabled) |
| Interactivity   | `true`                            |

## Attributes

None. This block has no custom attributes.

## Context

**Uses Context:**

| Context Key        | Description                                    |
|--------------------|------------------------------------------------|
| `dialog/id`        | The dialog ID from the parent Dialog block.    |
| `dialog/className` | Class name from the parent Dialog block.       |
| `dialog/isOpen`    | Editor open state from the parent Dialog block.|

## Inner Blocks

Any blocks can be placed inside the trigger. The template lock is `false`, allowing full flexibility. The default template (set by the parent Dialog block) includes a single paragraph with placeholder text.

## Parent/Ancestor Requirements

| Parent             | Required |
|--------------------|----------|
| `prc-block/dialog` | Yes      |

## Usage Instructions

1. This block is automatically inserted inside a **Dialog** block. It cannot be inserted independently.
2. Type or add content that will serve as the clickable trigger (text, buttons, images, etc.).
3. The entire trigger area is rendered as a `<button>` element on the frontend.
4. In the editor, a toolbar button allows toggling between the trigger view and the dialog editing view.

## Block Markup Example

```html
<!-- wp:prc-block/dialog-trigger -->
  <!-- wp:paragraph -->
  <p>Click to open dialog</p>
  <!-- /wp:paragraph -->
<!-- /wp:prc-block/dialog-trigger -->
```

## PHP Rendering

The `Dialog_Trigger` PHP class provides a server-side render callback:

1. Reads the `dialog/id` from parent block context.
2. Wraps inner content in a `<button>` element with:
   - A unique ID via `wp_unique_id('dialog-trigger-')`.
   - `aria-haspopup="dialog"` for accessibility.
   - `aria-controls` pointing to the dialog element's ID.
   - `data-wp-bind--aria-expanded="state.isOpen"` for dynamic ARIA state.
   - `data-wp-interactive="prc-block/dialog"` to connect to the dialog store.
   - `data-wp-on--click="actions.onClickOpen"` to handle click events.

Rendered output:

```html
<button class="wp-block-prc-block-dialog-trigger"
        id="dialog-trigger-1"
        aria-haspopup="dialog"
        aria-controls="my-dialog"
        data-wp-bind--aria-expanded="state.isOpen"
        data-wp-interactive="prc-block/dialog"
        data-wp-on--click="actions.onClickOpen"
        type="button">
  <p>Click to open dialog</p>
</button>
```

## Frontend Interactivity

The trigger does not have its own view script. It uses the `prc-block/dialog` Interactivity API store (provided by `dialog-element`'s view script):

- **Click handler** (`actions.onClickOpen`): Prevents default click behavior and calls `actions.open(id)` to open the associated dialog.
- **ARIA binding** (`state.isOpen`): Dynamically updates `aria-expanded` to reflect the dialog's open/closed state.

## Related Blocks

- [`prc-block/dialog`](./dialog.md) — Parent container block (required).
- [`prc-block/dialog-element`](./dialog-element.md) — Sibling dialog content block that this trigger opens.

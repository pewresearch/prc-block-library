# Dialog Element

The modal dialog content container. Renders as a native HTML `<dialog>` element with configurable size, position, animation, backdrop color, and auto-activation behavior.

## Block Metadata

| Property    | Value                                                                     |
| ----------- | ------------------------------------------------------------------------- |
| Namespace   | `prc-block/dialog-element`                                                |
| Category    | `media`                                                                   |
| Version     | `1.1.0`                                                                   |
| API Version | `3`                                                                       |
| Example     | Yes (medium + fade, `core/heading` / `core/paragraph` — inserter preview) |

## Supports

| Feature          | Value                             |
| ---------------- | --------------------------------- |
| HTML editing     | `false`                           |
| Align            | `false`                           |
| Inserter         | `false` (only via parent Dialog)  |
| Color background | `true`                            |
| Color text       | `true`                            |
| Color link       | `true`                            |
| Color gradients  | `true`                            |
| Contrast checker | `true`                            |
| Layout editing   | `true`                            |
| Shadow           | `true`                            |
| Border           | color, radius, style, width       |
| Spacing          | block gap, padding                |
| Font size        | `true` (default controls enabled) |
| Font family      | `true` (default controls enabled) |
| Interactivity    | `true`                            |

## Attributes

| Attribute              | Type      | Default    | Enum Values                                                                                                      | Description                                                                                   |
| ---------------------- | --------- | ---------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `dialogLabel`          | `string`  | `""`       | —                                                                                                                | Accessible label for the dialog, provided via context to child blocks through block bindings. |
| `backdropColor`        | `string`  | —          | —                                                                                                                | Preset color slug for the dialog backdrop.                                                    |
| `customBackdropColor`  | `string`  | —          | —                                                                                                                | Custom hex color for the dialog backdrop.                                                     |
| `autoActivateOnRender` | `boolean` | `false`    | —                                                                                                                | When true, the dialog opens automatically on page load.                                       |
| `animation`            | `string`  | `"fade"`   | `fade`, `pop`, `bounce`, `slide`, `slide-up`, `slide-left`, `slide-right`, `zoom`                                | The animation style for opening/closing the dialog.                                           |
| `animationDuration`    | `number`  | `500`      | —                                                                                                                | Duration of the animation in milliseconds.                                                    |
| `autoActivationTimer`  | `number`  | `-1`       | —                                                                                                                | Time in milliseconds before auto-opening. `-1` disables auto-activation.                      |
| `enableDeepLink`       | `boolean` | `false`    | —                                                                                                                | Allow the dialog to be opened via URL parameter (`?dialogId=<id>`).                           |
| `dialogSize`           | `string`  | `"medium"` | `small`, `medium`, `large`                                                                                       | Size preset for the dialog.                                                                   |
| `dialogPosition`       | `string`  | `"center"` | `center`, `top`, `bottom`, `center left`, `center right`, `top left`, `top right`, `bottom left`, `bottom right` | Position of the dialog on screen.                                                             |

## Context

**Uses Context:**

| Context Key        | Description                                     |
| ------------------ | ----------------------------------------------- |
| `dialog/id`        | The dialog ID from the parent Dialog block.     |
| `dialog/className` | Class name from the parent Dialog block.        |
| `dialog/isOpen`    | Editor open state from the parent Dialog block. |

**Provides Context:**

| Context Key    | Source Attribute |
| -------------- | ---------------- |
| `dialog/label` | `dialogLabel`    |

## Inner Blocks

Any blocks can be placed inside the dialog element. The template lock is set to `false`, allowing full content flexibility. The default template includes a heading bound to the dialog label via block bindings.

## Parent/Ancestor Requirements

| Parent             | Required |
| ------------------ | -------- |
| `prc-block/dialog` | Yes      |

## Usage Instructions

1. This block is automatically inserted inside a **Dialog** block. It cannot be inserted independently.
2. Click **"Edit Dialog"** on the parent Dialog block's toolbar to open the dialog for editing.
3. Add any content inside — headings, paragraphs, images, buttons, etc.
4. Configure the dialog in the inspector panel:
    - **Size**: Small, Medium, or Large.
    - **Position**: Use the alignment matrix control in the toolbar.
    - **Animation**: Choose from fade, pop, bounce, slide variants, or zoom.
    - **Animation Duration**: Set in milliseconds.
    - **Deep Linking**: Enable to allow opening via `?dialogId=<id>` URL parameter.
    - **Auto Activation Timer**: Enable and set a delay (ms) for auto-opening.
    - **Backdrop Color**: Set via the color panel.
5. Press **Escape** or click **"Close Dialog"** to close the editing view.

## Block Markup Example

```html
<!-- wp:prc-block/dialog-element {"dialogSize":"medium","animation":"fade"} -->
<!-- wp:heading {"level":2} -->
<h2>Dialog Title</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Dialog content goes here.</p>
<!-- /wp:paragraph -->
<!-- /wp:prc-block/dialog-element -->
```

## PHP Rendering

The `Dialog_Element` PHP class provides a comprehensive server-side render callback:

1. Reads the dialog ID from parent block context (`dialog/id`). Returns empty if missing.
2. Checks the `dialogId` query variable to determine if the dialog should be open on page load.
3. Registers interactivity state via `wp_interactivity_state('prc-block/dialog', ...)` with dialog configuration including activation timer, animation duration, open state, deep link setting, and closing state.
4. Generates inline CSS for animation duration, backdrop color, and position.
5. Adds accessible `aria-labelledby` pointing to the first heading in content (or creates a hidden `<h2>` fallback).
6. Renders as a native `<dialog>` element with extensive Interactivity API directives.
7. Includes a close button with a filterable icon (`prc_dialog_block_close_icon` filter).
8. Registers a block bindings source (`prc-block/dialog-element-label`) that reads the `dialog/label` context for heading bindings.

Rendered output:

```html
<dialog
	class="wp-block-prc-block-dialog-element is-size-medium is-animation-fade"
	id="my-dialog"
	role="dialog"
	aria-modal="true"
	aria-labelledby="dialog-heading-1"
	data-wp-interactive="prc-block/dialog"
	data-wp-init="callbacks.onInit"
	data-wp-class--is-closing="state.isClosing"
	data-wp-on--click="callbacks.onBackdropClick"
	data-wp-on-document--keydown="callbacks.onESCKey"
	data-wp-watch--on-dialog-open="callbacks.onOpen"
	data-wp-watch--on-dialog-close="callbacks.onClose"
>
	<button
		class="wp-block-prc-block-dialog-element__close-button"
		data-wp-on--click="actions.onClickClose"
		type="button"
		aria-label="Close dialog"
	>
		<!-- icon -->
	</button>
	<div class="wp-block-prc-block-dialog-element__inner">
		<!-- inner content -->
	</div>
</dialog>
```

## Frontend Interactivity

Uses the WordPress Interactivity API with store namespace `prc-block/dialog`.

**State (derived):**

-   `state.id` — The dialog ID from context.
-   `state.dialog` — The dialog configuration object from `state.dialogs[id]`.
-   `state.dialogElement` — The DOM element reference via `document.getElementById(id)`.

**Actions:**

-   `closeAll()` — Closes all open dialogs.
-   `onClickOpen(event)` — Opens the dialog when the trigger is clicked. Prevents default event behavior.
-   `onClickClose(event)` — Closes the dialog when the close button is clicked.
-   `open(id)` — Programmatically open a dialog by ID. Can be called from other stores: `store('prc-block/dialog').actions.open('dialog-id')`.
-   `close(id)` — Programmatically close a dialog by ID.

**Callbacks:**

-   `onESCKey(event)` — Closes the dialog on Escape key press.
-   `onOpen()` — Watcher that calls `dialogElement.showModal()` when `isOpen` becomes true. Updates URL if deep linking is enabled.
-   `onClose()` — Watcher that runs closing animation, then calls `dialogElement.close()`, removes URL parameter, and resets state. Respects animation duration.
-   `onBackdropClick(event)` — Closes the dialog when clicking outside the dialog bounds (on the backdrop).
-   `onInit()` — Handles auto-activation timer. If set, opens the dialog after the configured delay (only if no other dialogs are already open).

## Related Blocks

-   [`prc-block/dialog`](./dialog.md) — Parent container block (required).
-   [`prc-block/dialog-trigger`](./dialog-trigger.md) — Sibling trigger block that opens this dialog.

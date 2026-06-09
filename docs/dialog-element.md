# Dialog Element

The modal dialog content container. Renders as a native HTML `<dialog>` element with configurable size, position, animation, backdrop color, layout variant (default or bottom sheet), scroll-depth auto-open, dismissal persistence, and other auto-activation behavior.

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

| Attribute                   | Type      | Default      | Enum Values                                                                                                      | Description                                                                                          |
| --------------------------- | --------- | ------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `dialogLabel`               | `string`  | `""`         | —                                                                                                                | Accessible label for the dialog, provided via context to child blocks through block bindings.        |
| `backdropColor`             | `string`  | —            | —                                                                                                                | Preset color slug for the dialog backdrop.                                                           |
| `customBackdropColor`       | `string`  | —            | —                                                                                                                | Custom hex color for the dialog backdrop.                                                            |
| `autoActivateOnRender`      | `boolean` | `false`      | —                                                                                                                | When true, the dialog opens automatically on page load.                                              |
| `animation`                 | `string`  | `"fade"`     | `fade`, `pop`, `bounce`, `slide`, `slide-up`, `slide-left`, `slide-right`, `zoom`                                | The animation style for opening/closing the dialog.                                                  |
| `animationDuration`         | `number`  | `500`        | —                                                                                                                | Duration of the animation in milliseconds.                                                           |
| `autoActivationTimer`       | `number`  | `-1`         | —                                                                                                                | Time in milliseconds before auto-opening. `-1` disables auto-activation.                             |
| `enableDeepLink`            | `boolean` | `false`      | —                                                                                                                | Allow the dialog to be opened via URL parameter (`?dialogId=<id>`).                                  |
| `dialogSize`                | `string`  | `"medium"`   | `small`, `medium`, `large`                                                                                       | Size preset for the dialog. Applies to the default variant; bottom sheet is always full width.       |
| `dialogPosition`            | `string`  | `"center"`   | `center`, `top`, `bottom`, `center left`, `center right`, `top left`, `top right`, `bottom left`, `bottom right` | Position of the dialog on screen (default variant only).                                             |
| `scrollDepthPercentage`     | `number`  | `-1`         | —                                                                                                                | Auto-open after scroll depth (0–100). `-1` disables the trigger.                                     |
| `dismissalPersistenceScope` | `string`  | `"pageload"` | `pageload`, `session`, `device`                                                                                  | How long to suppress auto-opening after the reader dismisses the dialog. Click triggers ignore this. |
| `dialogVariant`             | `string`  | `"default"`  | `default`, `bottom-sheet`                                                                                        | Layout variant. Bottom sheet is a full-width panel anchored to the viewport bottom.                  |

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
    - **Size**: Small, Medium, or Large (default variant only).
    - **Position**: Use the alignment matrix control in the toolbar (default variant only).
    - **Animation**: Choose from fade, pop, bounce, slide variants, or zoom. Selecting **Bottom Sheet** auto-switches to **Slide Up**.
    - **Animation Duration**: Set in milliseconds.
    - **Deep Linking**: Enable to allow opening via `?dialogId=<id>` URL parameter.
    - **Auto Activation Timer**: Enable and set a delay (ms) for auto-opening.
    - **Scroll Depth Trigger**: Enable and set a percentage (0–100) to auto-open after the reader scrolls that far down the page.
    - **Dismissal Persistence**: Choose how long auto-open triggers stay suppressed after the reader closes the dialog (`pageload`, `session`, or `device`).
    - **Dialog Variant**: **Default** (centered modal) or **Bottom Sheet** (full-width panel anchored to the viewport bottom).
    - **Backdrop Color**: Set via the color panel.
5. Press **Escape** or click **"Close Dialog"** to close the editing view.

### Bottom sheet variant

When **Dialog Variant** is **Bottom Sheet**:

- The dialog renders as a full-width panel fixed to the bottom of the viewport with rounded top corners (`is-variant-bottom-sheet`).
- Pair with the **Slide Up** animation (selected automatically when switching variants).
- Size and alignment-matrix position controls do not apply; width is always 100%.
- In the block editor, `editor.scss` overrides native `dialog:modal` centering so the open preview matches the frontend bottom-anchored layout.

### Scroll depth and dismissal persistence

**Scroll depth** (`scrollDepthPercentage`):

- When enabled (0–100), the dialog auto-opens once after the reader scrolls past that percentage of the page.
- Uses document scroll height (`scrollY / (scrollHeight - clientHeight)`).
- Fires at most once per page load (`hasTriggeredScrollOpen` in interactivity state).
- Closes any other open dialogs before opening.
- Respects dismissal persistence (see below).
- PHP adds `data-wp-on-document--scroll="callbacks.onScroll"` only when scroll depth is enabled.

**Dismissal persistence** (`dismissalPersistenceScope`):

- Suppresses **auto-activation** triggers (scroll depth, auto-activation timer) after the reader dismisses the dialog.
- **Click triggers always open the dialog** — dismissal persistence does not apply to `dialog-trigger` clicks.
- Dismissal is recorded when the reader closes via the close button, Escape, or backdrop click.
- Storage by scope:
    - `pageload` — in-memory for the current page load only.
    - `session` — `sessionStorage` key `prc-dialog-dismissed-{dialogId}`.
    - `device` — `localStorage` key `prc-dialog-dismissed-{dialogId}`.
- Implemented in `dismissal-storage.js` with graceful degradation when storage is unavailable.

## Block Editor

The editor uses the same `<dialog>` element and `showModal()` as the frontend, driven by parent context (`dialog/isOpen` from `editorIsDialogOpen` on the parent Dialog block).

- Selecting the dialog element or its inner blocks auto-opens the dialog for editing.
- **Escape** or **Close Dialog** runs the closing animation (when motion is allowed), then closes the modal and re-selects the parent Dialog block.
- Bottom sheet variant: `editor.scss` forces full-width, bottom-anchored layout in the editor preview (overrides native `dialog:modal` centering).

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

Bottom sheet example:

```html
<!-- wp:prc-block/dialog-element {"dialogVariant":"bottom-sheet","animation":"slide-up","scrollDepthPercentage":60} -->
<!-- wp:heading {"level":2} -->
<h2>Newsletter signup</h2>
<!-- /wp:heading -->
<!-- /wp:prc-block/dialog-element -->
```

## PHP Rendering

The `Dialog_Element` PHP class provides a comprehensive server-side render callback:

1. Reads the dialog ID from parent block context (`dialog/id`). Returns empty if missing.
2. Checks the `dialogId` query variable to determine if the dialog should be open on page load.
3. Registers interactivity state via `wp_interactivity_state('prc-block/dialog', ...)` with dialog configuration including activation timer, animation duration, open state, deep link setting, scroll depth, dismissal persistence, and closing state.
4. Generates inline CSS for animation duration, backdrop color, and position.
5. Adds `is-variant-bottom-sheet` to the dialog class list when `dialogVariant` is `bottom-sheet`.
6. Adds accessible `aria-labelledby` pointing to the first heading in content (or creates a hidden `<h2>` fallback).
7. Renders as a native `<dialog>` element with extensive Interactivity API directives. Adds `data-wp-on-document--scroll` when scroll depth is enabled.
8. Includes a close button with a filterable icon (`prc_dialog_block_close_icon` filter).
9. Registers a block bindings source (`prc-block/dialog-element-label`) that reads the `dialog/label` context for heading bindings.

Rendered output (default variant):

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

Bottom sheet with scroll depth adds `is-variant-bottom-sheet`, `is-animation-slide-up`, and `data-wp-on-document--scroll="callbacks.onScroll"`.

## Frontend Interactivity

Uses the WordPress Interactivity API with store namespace `prc-block/dialog`.

**State (derived):**

- `state.id` — The dialog ID from context.
- `state.dialog` — The dialog configuration object from `state.dialogs[id]`.
- `state.dialogElement` — The DOM element reference via `document.getElementById(id)`.

**Actions:**

- `closeAll()` — Closes all open dialogs.
- `onClickOpen(event)` — Opens the dialog when the trigger is clicked. Bypasses dismissal persistence. Prevents default event behavior.
- `onClickClose(event)` — Closes the dialog when the close button is clicked. Records dismissal for auto-activation suppression.
- `recordDismissal(id?)` — Records dismissal without closing. For external integrations (e.g. form submit success): `store('prc-block/dialog').actions.recordDismissal('dialog-id')`.
- `open(id)` — Programmatically open a dialog by ID. Can be called from other stores: `store('prc-block/dialog').actions.open('dialog-id')`.
- `close(id)` — Programmatically close a dialog by ID.

**Callbacks:**

- `onESCKey(event)` — Closes the dialog on Escape key press. Records dismissal for auto-activation suppression.
- `onOpen()` — Watcher that calls `dialogElement.showModal()` when `isOpen` becomes true. Updates URL if deep linking is enabled.
- `onClose()` — Watcher that runs closing animation, then calls `dialogElement.close()`, removes URL parameter, and resets state. Respects animation duration.
- `onBackdropClick(event)` — Closes the dialog when clicking outside the dialog bounds (on the backdrop). Records dismissal for auto-activation suppression.
- `onInit()` — Handles auto-activation timer. If set, opens the dialog after the configured delay when no other dialog is open and dismissal persistence does not suppress it.
- `onScroll()` — When `scrollDepthPercentage` is enabled, opens the dialog once the reader scrolls past the configured percentage (once per page load; respects dismissal persistence).

## Related Blocks

- [`prc-block/dialog`](./dialog.md) — Parent container block (required).
- [`prc-block/dialog-trigger`](./dialog-trigger.md) — Sibling trigger block that opens this dialog.

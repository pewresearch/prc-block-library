# Form Message

## Block Name & Description

**Title:** Form Message
**Description:** Display a message to the user upon successful form submission.

## Block Namespace

`prc-block/form-message`

## Inserter preview

`block.json` includes an `example` with a single `core/paragraph` (“Thank you for your submission!”), matching the default inner-blocks template and driving the block inserter preview.

## Category

`forms`

## Supports

| Feature       | Enabled | Details                                                        |
| ------------- | ------- | -------------------------------------------------------------- |
| Anchor        | No      |                                                                |
| HTML editing  | No      |                                                                |
| Reusable      | Yes     |                                                                |
| Interactivity | Yes     |                                                                |
| Spacing       | Yes     | `blockGap`, `margin` (top/bottom), `padding` (default control) |
| Color         | Yes     | Background, text, link, button                                 |
| Typography    | Yes     | Font size, font family (both default controls)                 |

## Attributes

This block has **no custom attributes**. Content is managed entirely through inner blocks.

## Available Styles

No registered style variations in `block.json`. The stylesheet does support an `is-style-overlay` class which renders the message as a fixed full-screen overlay.

## Inner Blocks

Yes. This is a container block. The default template includes:

```
core/paragraph ("Thank you for your submission!")
```

Any blocks can be placed inside to compose the success/error message content.

## Parent / Ancestor Requirements

None explicitly declared, but designed to be used inside `prc-block/form` or `prc-block/mailchimp-form`.

## Usage Instructions

1. Add the block inside a form structure.
2. Compose the message content using inner blocks (paragraphs, headings, buttons, etc.).
3. Use the template token `{{message}}` (or `{{form message}}`, `{{form-message}}`, `{{form_message}}`) in any inner block's text content. At render time, these tokens are replaced with a dynamic `<span>` bound to the form's interactivity state message.
4. The block is hidden by default and only becomes visible when `state.formMessage` is truthy (i.e., after form submission).

## Block Markup Example

```html
<div
	class="wp-block-prc-block-form-message"
	data-wp-interactive="prc-block/form"
	data-wp-class--is-displaying-form-message="state.formMessage"
>
	<p>Thank you for your submission!</p>
</div>
```

With dynamic message token:

```html
<div
	class="wp-block-prc-block-form-message"
	data-wp-interactive="prc-block/form"
	data-wp-class--is-displaying-form-message="state.formMessage"
>
	<p><span data-wp-text="state.formMessage"></span></p>
</div>
```

## PHP Rendering

Server-side rendered via `render_block_callback` in `Form_Message`. The PHP:

1. Wraps the inner block content in a `<div>` with the block wrapper attributes.
2. Adds `data-wp-interactive="prc-block/form"` to bind to the form's interactivity store.
3. Adds `data-wp-class--is-displaying-form-message="state.formMessage"` to toggle visibility.
4. Replaces template tokens (`{{message}}`, `{{form message}}`, `{{form-message}}`, `{{form_message}}`) with `<span data-wp-text="state.formMessage"></span>` for dynamic message rendering.

## Frontend Interactivity

No standalone `view.js`. The block relies on the parent form's interactivity store (`prc-block/form`) to populate `state.formMessage` after form submission. The `is-displaying-form-message` class is toggled based on whether a message exists.

## Related Blocks

-   `prc-block/form` -- Parent form container that manages submission state
-   `prc-block/form-submit` -- Triggers the form submission that populates the message
-   `prc-block/mailchimp-form` -- Newsletter form that uses this block for confirmation messages
-   `prc-block/form-input-text` -- Form input fields
-   `prc-block/form-input-textarea` -- Textarea form input fields

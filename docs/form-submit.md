# Form Submit

## Block Name & Description

**Title:** Form Submit Actions
**Description:** Submission actions for forms. Includes submit button, captcha, and optional response message.

## Block Namespace

`prc-block/form-submit`

## Inserter preview

`block.json` defines an `example` with the same locked structure as the editor: `core/button` (submit) plus `prc-block/form-captcha`, which powers the inserter preview when this block is shown in context.

## Category

`design`

## Supports

| Feature | Enabled | Details                                            |
| ------- | ------- | -------------------------------------------------- |
| Anchor  | Yes     |                                                    |
| Spacing | Yes     | `margin` (top/bottom), `padding` (default control) |

## Attributes

This block has **no custom attributes**. The inner blocks (button, captcha) manage their own attributes.

## Available Styles

None.

## Inner Blocks

Yes. This is a container block with a **locked template** (`templateLock: "all"`):

| Block                    | Purpose                                        |
| ------------------------ | ---------------------------------------------- |
| `core/button`            | Submit button (type: `submit`, text: "Submit") |
| `prc-block/form-captcha` | CAPTCHA verification widget                    |

**Allowed blocks:** `core/button`, `prc-block/form-captcha`

The template is fully locked -- users cannot add, remove, or reorder the inner blocks.

## Parent / Ancestor Requirements

**Ancestor:** `prc-block/form`

This block can only be inserted inside a `prc-block/form` block.

## Context

**Uses context:** `form/displayMessage` -- Whether the parent form is configured to display a message after submission.

## Usage Instructions

1. Add this block inside a `prc-block/form` block (usually as the last child, or at the end of the final `prc-block/form-page`).
2. The block automatically includes a submit button and CAPTCHA.
3. Customize the button text by editing the `core/button` inner block.
4. The CAPTCHA is shown by default and hides the submit button until verification is complete. Once verified, the CAPTCHA hides and the button appears.

## Block Markup Example

```html
<div
	class="wp-block-prc-block-form-submit"
	data-wp-class--captcha-hidden="prc-block/form::context.captchaHidden"
	data-wp-context='{"submitButtonText":"Submit"}'
>
	<div class="wp-block-button">
		<button
			class="wp-block-button__link"
			type="submit"
			data-wp-bind--disabled="prc-block/form::state.submissionDisabled"
			data-wp-text="prc-block/form::state.submitButtonText"
		>
			Submit
		</button>
	</div>
	<div class="wp-block-prc-block-form-submit__captcha">
		<!-- Captcha widget -->
	</div>
</div>
```

## PHP Rendering

Server-side rendered via `render_block_callback` in `Form_Submit`. The PHP:

1. Finds `<button type="submit">` elements in the inner block content.
2. Adds `data-wp-bind--disabled="prc-block/form::state.submissionDisabled"` to disable the button during submission.
3. Extracts the button text and adds `data-wp-text="prc-block/form::state.submitButtonText"` for dynamic button text updates (e.g., changing to "Submitting..." during processing).
4. Wraps all content in a `<div>` with `data-wp-class--captcha-hidden` to toggle captcha visibility.
5. Stores the original button text in the block context via `data-wp-context`.

## Frontend Interactivity

No standalone `view.js`. Interactivity is driven by the parent `prc-block/form` store:

-   **Captcha flow:** The captcha is visible by default (`captcha-hidden` class absent). When visible, the submit button and mark elements are hidden via CSS. After captcha verification, `captchaHidden` becomes true, hiding the captcha and revealing the button.
-   **Submission state:** The button is disabled when `submissionDisabled` is true. The button text dynamically updates via `submitButtonText` state.

## Related Blocks

-   `prc-block/form` -- Required ancestor; manages submission state
-   `prc-block/form-captcha` -- CAPTCHA verification (auto-included in template)
-   `core/button` -- Submit button (auto-included in template)
-   `prc-block/form-message` -- Displays result after submission
-   `prc-block/form-page` -- Form pages that contain fields before submission

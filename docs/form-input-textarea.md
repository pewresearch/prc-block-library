# Form Input Textarea

## Block Name & Description

**Title:** Input Textarea Field
**Description:** A primitive `<textarea>` element.

## Block Namespace

`prc-block/form-input-textarea`

## Category

`forms`

## Supports

| Feature | Enabled | Details |
|---------|---------|---------|
| Anchor | Yes | |
| HTML editing | No | |
| Reusable | No | |
| Interactivity | Yes | |
| Layout | Yes | Flex layout with vertical orientation; supports orientation, justification, vertical alignment, and sizing on children |
| Spacing | Yes | `blockGap`, `padding`, `margin` |
| Border | Yes | Color, width, radius (skip serialization) |
| Color | Yes | Background, text, contrast checker (skip serialization) |
| Typography | Yes | Font size, line height, font family, font weight, font style, text transform, text decoration, letter spacing |
| Custom selectors | Yes | Root: `.wp-block-prc-block-form-input-textarea`; color/border target `> textarea` |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `displayLabel` | `boolean` | `true` | Whether to show the label above the textarea |
| `label` | `string` | — | Label text (sourced from the `<label>` HTML element) |
| `placeholder` | `string` | `"A hint or example..."` | Placeholder text shown when the textarea is empty |
| `value` | `string` | — | The current value of the textarea |
| `required` | `boolean` | `false` | Whether the field is required for form submission |
| `maxLength` | `number` | `1000` | Maximum number of characters allowed |
| `minLength` | `number` | `10` | Minimum number of characters required |
| `rows` | `number` | `4` | Number of visible text lines |
| `cols` | `number` | `20` | Number of visible characters per line |
| `wrap` | `string` | — | Text wrapping behavior: `"hard"`, `"soft"`, or `"off"` |

The block also uses `metadata.name` (from the block bindings metadata) as the input's `name` attribute for form submission data.

## Available Styles

| Style | Label | Default |
|-------|-------|---------|
| `default` | Default | Yes |
| `inline-label` | Inline Label | No |

The **Inline Label** style displays the label and textarea side-by-side in a horizontal flex layout with shared border styling on the wrapper instead of the textarea.

## Inner Blocks

None. This is a leaf block.

## Parent / Ancestor Requirements

None. Can be placed anywhere, but typically used inside a `prc-block/form` or `prc-block/form-page`.

## Usage Instructions

1. Add the block to your form layout.
2. Enter a label using the inline RichText editor (the label auto-generates a camelCase `name` for form data).
3. Configure field settings in the Inspector Panel:
   - **Input Name** -- Override the auto-generated camelCase name for the field in form submissions.
   - **Input Placeholder** -- Customize the hint text.
   - **Required** -- Toggle whether this field must be filled before submission.
   - **Max/Min Length** -- Set character limits.
   - **Rows/Cols** -- Control the visible textarea size.
   - **Wrap** -- Choose hard, soft, or off wrapping behavior.
4. Use the "Inline Label" style variation for a compact, horizontal label+textarea layout.

## Block Markup Example

```html
<div class="wp-block-prc-block-form-input-textarea">
  <label>Message</label>
  <textarea
    name="message"
    placeholder="Enter your message"
    required
    maxlength="1000"
    minlength="10"
    rows="4"
    cols="20"
  ></textarea>
</div>
```

## PHP Rendering

Server-side rendered via `render_block_callback` in `Form_Input_Textarea`. The PHP:

1. Assigns a unique `id` to the textarea (e.g., `prc-block-form-input-textarea-1`).
2. Binds the label's `for` attribute to the textarea's `id`.
3. Adds WordPress Interactivity API directives to the textarea:
   - Event handlers: `mouseenter`, `mouseleave`, `keyup`, `focus`, `blur`
   - Property bindings: `required`, `value`, `placeholder`, `hidden`, `readonly`, `disabled`
   - State classes: `is-disabled`, `is-error`, `is-success`, `is-processing`
4. Registers the field into the parent form's `formFields` interactivity state array with its `id`, `name`, `label`, `type` (textarea), `value`, `required`, and `placeholder`.
5. Supports a configurable interactive namespace (defaults to `prc-block/form`) and optional subsumption mode.

## Frontend Interactivity

No standalone `view.js`. Interactivity is handled by the parent form's interactivity store (`prc-block/form`), which manages field state, validation, and submission through the directives added in PHP.

## Related Blocks

- `prc-block/form` -- Parent form container
- `prc-block/form-input-text` -- Text input field (single-line counterpart)
- `prc-block/form-page` -- Multi-page form pagination
- `prc-block/form-submit` -- Form submission actions
- `prc-block/form-message` -- Post-submission message display

# Form Input Text

A general-purpose text input block supporting 11 input types: text, email, password, textarea, number, date, URL, tel, time, search, and datetime-local. Renders a labeled input element with configurable placeholder, required state, and automatic field registration with the parent form's interactivity store.

## Namespace

`prc-block/form-input-text`

## Category

`forms`

## Supports

| Feature | Value |
|---------|-------|
| Anchor | `true` |
| Interactivity | `true` |
| Layout (type) | `flex` |
| Spacing (margin) | `true` |
| Spacing (padding) | `true` |
| Spacing (blockGap) | `true` |
| Border | `true` (custom selectors) |
| Color (text) | `true` (custom selectors) |
| Color (background) | `true` (custom selectors) |
| Typography (fontSize) | `true` (custom selectors) |
| Typography (lineHeight) | `true` (custom selectors) |
| HTML | `false` |

### Custom Selectors

```json
{
  "root": ".wp-block-prc-block-form-input-text",
  "border": ".wp-block-prc-block-form-input-text input, .wp-block-prc-block-form-input-text textarea",
  "typography": ".wp-block-prc-block-form-input-text input, .wp-block-prc-block-form-input-text textarea",
  "color": {
    "text": ".wp-block-prc-block-form-input-text input, .wp-block-prc-block-form-input-text textarea",
    "background": ".wp-block-prc-block-form-input-text input, .wp-block-prc-block-form-input-text textarea"
  }
}
```

## Attributes

| Attribute | Type | Default | Source | Description |
|-----------|------|---------|--------|-------------|
| `displayLabel` | `boolean` | `true` | -- | Show/hide the label above the input. |
| `label` | `string` | `""` | `html` (selector: `label`) | Label text, editable via RichText. |
| `placeholder` | `string` | `""` | -- | Placeholder text displayed in the empty input. |
| `type` | `string` | `"text"` | -- | HTML input type. One of: `email`, `password`, `text`, `textarea`, `number`, `date`, `url`, `tel`, `time`, `search`, `datetime-local`. |
| `value` | `string` | `""` | -- | Current/default input value. |
| `required` | `boolean` | `false` | -- | Whether the field must have a value before form submission. |
| `metadata` | `object` | `undefined` | -- | Contains `name` (field identifier for form data). Auto-generated from label as camelCase. |

## Available Styles

| Style | Slug | Description |
|-------|------|-------------|
| Default | `default` | Label above, input below. Color/border applied to the input element. |
| Inline Label | `inline-label` | Label and input on the same line. Color/border applied to the outer wrapper. |

## Inner Blocks

None. This is a leaf block.

## Parent / Ancestor Requirements

No explicit parent constraint. Commonly used inside:
- `prc-block/form` -- as a direct form field
- `prc-block/form-input-password` -- as a password or confirmation input

## Usage Instructions

### Basic Text Input

1. Insert the **Text Input** block.
2. Type a label (e.g., "Full Name"). The input name is auto-generated as camelCase (e.g., `fullName`).
3. Set the **Input Type** in the inspector (text, email, number, etc.).
4. Optionally set a **Placeholder** and toggle **Required**.

### Input Types

| Type | HTML Element | Event | Use Case |
|------|-------------|-------|----------|
| `text` | `<input type="text">` | `keyup` | General text |
| `email` | `<input type="email">` | `keyup` | Email addresses (with browser validation) |
| `password` | `<input type="password">` | `keyup` | Password fields (masked) |
| `textarea` | `<textarea>` | `keyup` | Multi-line text |
| `number` | `<input type="number">` | `keyup` | Numeric values |
| `date` | `<input type="date">` | `change` | Date picker |
| `url` | `<input type="url">` | `keyup` | URLs |
| `tel` | `<input type="tel">` | `keyup` | Phone numbers |
| `time` | `<input type="time">` | `change` | Time picker |
| `search` | `<input type="search">` | `keyup` | Search fields |
| `datetime-local` | `<input type="datetime-local">` | `change` | Date and time picker |

Note: `date`, `time`, and `datetime-local` types use the `change` event instead of `keyup` because these inputs use native browser pickers that do not fire keyup events.

### Inline Label Style

Apply the **Inline Label** block style to render the label and input on the same horizontal line. In this mode, color and border props are applied to the outer wrapper instead of the input element directly.

## Block Markup Example

```html
<!-- wp:prc-block/form-input-text {"type":"email","placeholder":"you@example.com","required":true,"metadata":{"name":"emailAddress"}} -->
<div class="wp-block-prc-block-form-input-text">
  <label>Email Address</label>
  <input type="email" placeholder="you@example.com" required />
</div>
<!-- /wp:prc-block/form-input-text -->
```

### Textarea Example

```html
<!-- wp:prc-block/form-input-text {"type":"textarea","metadata":{"name":"message"}} -->
<div class="wp-block-prc-block-form-input-text">
  <label>Message</label>
  <textarea></textarea>
</div>
<!-- /wp:prc-block/form-input-text -->
```

## PHP Rendering

The block uses server-side rendering via `render_callback` in `class-form-input-text.php`.

### Render Pipeline

1. **Interactivity Setup**: Adds `data-wp-interactive` with the target namespace (defaults to `prc-block/form`, overridden when inside `prc-block/form-input-password`).
2. **Event Binding**: Adds the appropriate event handler to the input element:
   - For `date`, `time`, `datetime-local`: `data-wp-on-async--change="actions.onInputChange"`
   - For all other types: `data-wp-on-async--keyup="actions.onInputChange"`
3. **Field Registration**: Registers the field in the target form's `formFields` state via `wp_interactivity_state()` with the field name and initial value.

## Frontend Interactivity

This block does not define its own interactivity store. It delegates all event handling to whichever namespace is set as its `interactiveNamespace`:

- **Default**: `prc-block/form` -- the form's `onInputChange` action handles value updates.
- **Inside password block**: `prc-block/form-input-password` -- the password block's store handles value propagation and strength analysis.

### Form Action Used

| Action | Description |
|--------|-------------|
| `onInputChange` | Defined on the target namespace. Reads the input's current value from the DOM event and updates the corresponding field in `formFields`. Also triggers form persistence (localStorage save). |

## Related Blocks

| Block | Relationship |
|-------|-------------|
| `prc-block/form` | Parent form container. Provides the `onInputChange` action and receives the field value in `formFields`. |
| `prc-block/form-input-password` | Optional parent that wraps text inputs configured as password fields, adding strength analysis. |

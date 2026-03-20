# Form Input Checkbox

A versatile input block that renders as a checkbox, radio button, or toggle switch. Supports inline label editing, custom color/border styling applied separately to the input and label, and automatic field registration with the parent form's interactivity store.

## Namespace

`prc-block/form-input-checkbox`

## Category

`forms`

## Supports

| Feature | Value |
|---------|-------|
| Anchor | `true` |
| Color (text) | `true` (skip serialization) |
| Color (background) | `true` (skip serialization) |
| Color (link) | `false` |
| Spacing (margin) | `true` |
| Spacing (padding) | `true` |
| Border | `true` (skip serialization) |
| Typography (fontSize) | `true` |
| Typography (lineHeight) | `true` |
| HTML | `false` |

Color and border support use `__experimentalSkipSerialization: true`, meaning the block manually applies these styles to specific sub-elements (input vs label) rather than the wrapper.

### Custom Selectors

```json
{
  "root": ".wp-block-prc-block-form-input-checkbox"
}
```

## Attributes

| Attribute | Type | Default | Source | Description |
|-----------|------|---------|--------|-------------|
| `type` | `string` | `"checkbox"` | -- | Input type: `"checkbox"`, `"radio"`, or `"toggle"`. |
| `label` | `string` | `""` | `html` (selector: `label`) | The visible label text, editable via RichText. |
| `value` | `string` | `""` | -- | The value submitted when the input is checked. |
| `required` | `boolean` | `false` | -- | Whether the field must be checked before form submission. |
| `defaultChecked` | `boolean` | `false` | -- | Whether the input is checked by default on page load. |
| `metadata` | `object` | `undefined` | -- | Contains `name` (the field identifier used in form data). Auto-generated from label as camelCase. |

## Available Styles

| Style | Slug | Description |
|-------|------|-------------|
| Default | `default` | Standard checkbox/radio/toggle with label beside it. |
| Label Only | `label-only` | Hides the input element and displays only the label, styled as a selectable chip/tag. |

## Inner Blocks

None. This is a leaf block.

## Parent / Ancestor Requirements

No explicit parent constraint. Can be used standalone or inside:
- `prc-block/form` -- as a direct form field
- `prc-block/form-input-radio-group` -- as a radio button within a group (type is overridden to `"radio"`)

## Usage Instructions

### As a Checkbox

Insert the block and type a label. The input name is auto-generated from the label in camelCase. Set a `value` in the inspector to control what gets submitted when checked.

### As a Radio Button

Use the **Radio** variation when inserting, or set `type` to `"radio"` in the inspector. For proper mutual exclusion behavior, place radio checkboxes inside a `prc-block/form-input-radio-group` block.

### As a Toggle Switch

Set `type` to `"toggle"` in the inspector. The block renders a custom visual switch element instead of a native checkbox.

### Label-Only Style

Apply the **Label Only** block style to hide the input and present the label as a clickable chip. Useful for tag-style selection interfaces.

### Color Application

Color and border styles are split between the input and the label:
- **Background color** applies to the input element.
- **Text color** applies to the label text.
- **Border** applies to the input element (or the wrapper in inline-label style).

## Block Markup Example

```html
<!-- wp:prc-block/form-input-checkbox {"type":"checkbox","value":"yes","metadata":{"name":"agreeToTerms"}} -->
<div class="wp-block-prc-block-form-input-checkbox">
  <input type="checkbox" value="yes" />
  <label>I agree to the terms</label>
</div>
<!-- /wp:prc-block/form-input-checkbox -->
```

## PHP Rendering

The block uses server-side rendering via `render_callback` in `class-form-input-checkbox.php`.

### Render Pipeline

1. **Interactive Directives**: Adds `data-wp-interactive` to the block wrapper with the target namespace (defaults to `prc-block/form`, or overridden by parent like `prc-block/form-input-radio-group`).
2. **Event Bindings**: Adds `data-wp-on-async--mousedown`, `data-wp-on-async--click="actions.onInputCheckboxClick"`, `data-wp-on-async--focus`, and `data-wp-on-async--blur` to the input element.
3. **ID Transfer**: Moves the block's `id` attribute from the wrapper `<div>` to the `<input>` element for proper label association.
4. **Field Registration**: Registers the field in the target namespace's `formFields` state via `wp_interactivity_state()` with the field name, value, and checked state.

### Interactive Subsumption Pattern

When placed inside a `prc-block/form-input-radio-group`, the PHP render modifies the checkbox to:
- Override `type` to `"radio"`
- Set `interactiveNamespace` to `prc-block/form-input-radio-group`

This causes the checkbox's click events to be handled by the radio group's store instead of the form's store directly.

## Frontend Interactivity

This block does not define its own interactivity store. Instead, it delegates all event handling to whichever namespace is set as its `interactiveNamespace`:

- **Default**: `prc-block/form` -- the form's `onInputCheckboxClick` action handles check/uncheck.
- **In radio group**: `prc-block/form-input-radio-group` -- the radio group's store handles mutual exclusion and value hoisting.

### Event Flow

1. User clicks the checkbox/radio/toggle.
2. The `onInputCheckboxClick` action on the target namespace fires.
3. The handler reads the input's checked state and value.
4. The field value is updated in the form's `formFields` state.

## Related Blocks

| Block | Relationship |
|-------|-------------|
| `prc-block/form` | Parent form container. Provides the `onInputCheckboxClick` action and `formFields` state. |
| `prc-block/form-input-radio-group` | Optional parent for radio behavior. Overrides namespace and input type. |

### Variations

| Variation | Name | Description |
|-----------|------|-------------|
| Checkbox | `checkbox` | Default. Renders a standard checkbox input. |
| Radio | `radio` | Renders a radio button input. Sets `type` to `"radio"`. |

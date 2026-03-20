# Form Input Range

A slider input block that renders an `<input type="range">` with configurable min, max, step, orientation, and output formatting. Displays the current value as a number, currency, or percentage. Supports optional label and min/max value labels.

## Namespace

`prc-block/form-input-range`

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
| Border | `true` (custom selector: `.range-container`) |
| Color (text) | `true` (custom selector: `.range-container`) |
| Color (background) | `true` (custom selector: `.range-container`) |
| Typography (fontSize) | `true` (custom selector: `.range-container`) |
| Typography (lineHeight) | `true` (custom selector: `.range-container`) |
| HTML | `false` |

### Custom Selectors

```json
{
  "root": ".wp-block-prc-block-form-input-range",
  "border": ".wp-block-prc-block-form-input-range .range-container",
  "typography": ".wp-block-prc-block-form-input-range .range-container",
  "color": ".wp-block-prc-block-form-input-range .range-container"
}
```

## Attributes

| Attribute | Type | Default | Source | Description |
|-----------|------|---------|--------|-------------|
| `displayLabel` | `boolean` | `true` | -- | Show/hide the label above the slider. |
| `label` | `string` | `""` | `html` (selector: `label`) | Label text, editable via RichText. |
| `min` | `number` | `0` | `attribute` (selector: `input`, attribute: `min`) | Minimum slider value. |
| `max` | `number` | `100` | -- | Maximum slider value. |
| `step` | `number` | `1` | -- | Step increment between values. |
| `value` | `number` | `50` | -- | Current/default slider value. |
| `displayValue` | `boolean` | `true` | -- | Show the formatted current value next to the slider. |
| `displayMinMax` | `boolean` | `false` | -- | Show min and max labels at the ends of the slider. |
| `outputFormat` | `string` | `"number"` | -- | Format for the displayed value: `"number"`, `"currency"`, or `"percentage"`. |
| `orientation` | `string` | `"horizontal"` | -- | Slider orientation: `"horizontal"` or `"vertical"`. |
| `required` | `boolean` | `false` | -- | Whether a value must be set before form submission. |
| `metadata` | `object` | `undefined` | -- | Contains `name` (field identifier for form data). |

## Available Styles

None defined.

## Inner Blocks

None. This is a leaf block.

## Parent / Ancestor Requirements

No explicit parent constraint, but designed to function inside a `prc-block/form` container.

## Usage Instructions

### Basic Slider

1. Insert the **Range** block.
2. Type a label (e.g., "Budget").
3. Set **Min**, **Max**, and **Step** in the inspector.
4. Choose an **Output Format** (number, currency, or percentage).

### Output Formats

| Format | Example (value: 50) |
|--------|---------------------|
| `number` | `50` |
| `currency` | `$50` |
| `percentage` | `50%` |

### Orientation

Set to `"vertical"` for a vertically-oriented slider. Default is `"horizontal"`.

### Min/Max Labels

Toggle **Display Min/Max Labels** to show the minimum and maximum values at each end of the slider.

## Block Markup Example

```html
<!-- wp:prc-block/form-input-range {"min":0,"max":1000,"step":10,"value":500,"outputFormat":"currency","metadata":{"name":"budgetRange"}} -->
<div class="wp-block-prc-block-form-input-range">
  <label>Budget</label>
  <div class="range-container">
    <input type="range" min="0" max="1000" step="10" value="500" />
    <output>$500</output>
  </div>
</div>
<!-- /wp:prc-block/form-input-range -->
```

## PHP Rendering

The block uses server-side rendering via `render_callback` in `class-form-input-range.php`.

### Render Pipeline

1. **Interactivity Setup**: Adds `data-wp-interactive` with the target namespace (defaults to `prc-block/form`).
2. **Input Directives**: Adds `data-wp-on--input="actions.onInputRangeChange"` to the `<input>` element for live value updates as the slider moves.
3. **Output Binding**: Adds `data-wp-text` to the `<output>` element, binding it to a state getter that returns the formatted value (number/currency/percentage).
4. **Field Registration**: Registers the field in the target form's `formFields` state via `wp_interactivity_state()` with the field name, current value, and `outputFormat`.

## Frontend Interactivity

This block does not define its own interactivity store. It delegates to the parent form's `prc-block/form` namespace.

### Form Actions Used

| Action | Description |
|--------|-------------|
| `onInputRangeChange` | Defined in `prc-block/form` view module. Fires on every `input` event (live as slider moves). Reads the input's current value and updates the field in `formFields`. Also updates the `<output>` element text with the formatted value. |

### Value Formatting

The `outputFormat` attribute determines how the value is displayed:
- `"number"`: Raw numeric value
- `"currency"`: Prefixed with `$` and formatted with `toLocaleString()`
- `"percentage"`: Suffixed with `%`

This formatting is applied both in the `<output>` element binding and when the value is stored in the form state.

## Related Blocks

| Block | Relationship |
|-------|-------------|
| `prc-block/form` | Parent form container. Provides the `onInputRangeChange` action and receives the slider value in `formFields`. |

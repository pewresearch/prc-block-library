# Form Input Select Range

A container block that pairs two `form-input-select` dropdown blocks to capture a min/max range selection. Generates options based on type (years, custom numbers) and validates that the minimum value does not exceed the maximum. Provides generated options to child select blocks via block context.

## Namespace

`prc-block/form-input-select-range`

## Category

`forms`

## Supports

| Feature | Value |
|---------|-------|
| Anchor | `true` |
| Interactivity | `true` |
| Spacing (margin) | `true` |
| Spacing (padding) | `true` |
| Spacing (blockGap) | `true` |
| Layout (type) | `flex` (orientation: horizontal) |
| HTML | `false` |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | `string` | `"custom"` | Option generation strategy: `"custom"`, `"years"`, or `"numbers"`. |
| `rangeStart` | `number` | `0` | Start of the numeric range (for `"numbers"` type). |
| `rangeEnd` | `number` | `100` | End of the numeric range (for `"numbers"` type). |
| `rangeStep` | `number` | `1` | Step increment between options (for `"numbers"` type). |
| `metadata` | `object` | `undefined` | Contains `name` (field identifier for form data). |

## Available Styles

None defined.

## Inner Blocks

| Block | Description |
|-------|-------------|
| `prc-block/form-input-select` | Two instances: one for minimum value, one for maximum value. |
| `core/group` | Optional layout wrapper. |

Only `prc-block/form-input-select` and `core/group` are allowed as direct children.

### Default Template

Two `prc-block/form-input-select` blocks:
- First: placeholder "Min", metadata name "{parentName}Min"
- Second: placeholder "Max", metadata name "{parentName}Max"

## Parent / Ancestor Requirements

No explicit parent constraint, but designed to function inside a `prc-block/form` container.

**Provides Context:**

| Context Key | Description |
|-------------|-------------|
| `form-input-select/options` | The generated options array, consumed by child `form-input-select` blocks via `usesContext`. |

## Usage Instructions

### Year Range

1. Insert the **Select Range** block.
2. Set `type` to `"years"`.
3. The block auto-generates year options from the current year back 100 years.
4. The two child selects act as "start year" and "end year" pickers.

### Numeric Range

1. Set `type` to `"numbers"`.
2. Configure `rangeStart`, `rangeEnd`, and `rangeStep`.
3. Options are generated from start to end by step increment.

### Custom Range

Set `type` to `"custom"` and configure options directly on each child `form-input-select` block.

### Validation

The block validates that the minimum selection does not exceed the maximum. If the user selects a min value greater than the max, the block considers the range incomplete/invalid and does not submit the values.

## Block Markup Example

```html
<!-- wp:prc-block/form-input-select-range {"type":"years","metadata":{"name":"yearRange"}} -->
<div class="wp-block-prc-block-form-input-select-range">
  <!-- wp:prc-block/form-input-select {"placeholder":"Start Year","metadata":{"name":"yearRangeMin"}} /-->
  <!-- wp:prc-block/form-input-select {"placeholder":"End Year","metadata":{"name":"yearRangeMax"}} /-->
</div>
<!-- /wp:prc-block/form-input-select-range -->
```

## PHP Rendering

The block uses server-side rendering via `render_callback` in `class-form-input-select-range.php`.

### Render Pipeline

1. **Option Generation**: Based on `type`:
   - `"years"`: Generates options from the current year descending 100 years
   - `"numbers"`: Generates options from `rangeStart` to `rangeEnd` by `rangeStep`
   - `"custom"`: No generation; relies on child block configuration

2. **Context Provision**: Sets `form-input-select/options` in the block context so child `form-input-select` blocks receive the generated options.

3. **Interactivity Setup**: Wraps with `data-wp-interactive="prc-block/form-input-select-range"` and context containing:
   - `targetNamespace` (parent form namespace)
   - `minValue`, `maxValue` (null initially)
   - `isComplete` (false), `isValid` (false)

4. **Field Registration**: Registers the range as a single compound field in the parent form's `formFields` state.

## Frontend Interactivity

**Store Namespace:** `prc-block/form-input-select-range`

### State / Context

| Key | Type | Description |
|-----|------|-------------|
| `minValue` | `string|null` | Currently selected minimum value. |
| `maxValue` | `string|null` | Currently selected maximum value. |
| `isComplete` | `boolean` | True when both min and max have been selected. |
| `isValid` | `boolean` | True when min <= max. |

### Callbacks

| Callback | Description |
|----------|-------------|
| `onValueChange` | Generator callback. Watches for changes to child select values. When both min and max are selected, validates that min <= max. If valid and complete, hoists both values (as a compound `{min, max}` object) to the parent form's `formFields` state via the target namespace. |

### Interaction Flow

1. User selects a value in the "min" dropdown.
2. The child `form-input-select` fires its own selection logic and hoists to the `prc-block/form-input-select-range` namespace.
3. The range block's `onValueChange` checks if both values are present.
4. When both are set, validates min <= max.
5. If valid, propagates `{min: "...", max: "..."}` to the parent form's `formFields`.

## Related Blocks

| Block | Relationship |
|-------|-------------|
| `prc-block/form` | Parent form container. Receives the range value pair in `formFields`. |
| `prc-block/form-input-select` | Required child block (two instances). Provides the min and max dropdown selectors. Receives generated options via context. |

# Form Input Select Range

A container block that pairs two `form-input-select` dropdown blocks to capture a min/max range selection. Generates options for `"years"` or `"numbers"` ranges, validates that the minimum does not exceed the maximum, and publishes the selected range to a parent Interactivity API store. Child selects receive generated options and clear-icon behavior via block context.

## Block inserter example

`block.json` defines an `example` with `type` years (2000–2025) and two inner `form-input-select` blocks (Minimum / Maximum labels) — inserter preview.

## Namespace

`prc-block/form-input-select-range`

## Category

`forms`

## Supports

| Feature            | Value                            |
| ------------------ | -------------------------------- |
| Anchor             | `true`                           |
| Interactivity      | `true`                           |
| Spacing (margin)   | `true`                           |
| Spacing (padding)  | `true`                           |
| Spacing (blockGap) | `true`                           |
| Layout (type)      | `flex` (orientation: horizontal) |
| HTML               | `false`                          |

## Attributes

| Attribute          | Type      | Default     | Description                                                                 |
| ------------------ | --------- | ----------- | --------------------------------------------------------------------------- |
| `type`             | `string`  | `"numbers"` | Option generation strategy: `"years"` or `"numbers"`.                       |
| `rangeStart`       | `number`  | `0`         | Minimum value in the generated option list.                                 |
| `rangeEnd`         | `number`  | `100`       | Maximum value when `currentYear` is off (or for `"numbers"` type).          |
| `currentYear`      | `boolean` | `true`      | When `type` is `"years"`, use the current calendar year as the maximum.     |
| `rangeStep`        | `number`  | `1`         | Step increment between generated options.                                   |
| `enableClearIcons` | `boolean` | `true`      | When true, child `form-input-select` blocks show clear icons. This is the only editor control for clear icons on nested child selects — per-child **Clear Icon Enabled** is hidden via `LimitControls`. |

Also supports platform-injected `interactiveNamespace` and `interactiveSubsumption` attributes (see [Interactivity API](../../README.md#interactivity-api)).

## Available Styles

None defined.

## Inner Blocks

| Block                         | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `prc-block/form-input-select` | Two instances: minimum and maximum selectors.                |
| `core/group`                  | Optional layout wrapper.                                     |
| `core/paragraph`              | Default error message (`error-state-message`), hidden until invalid. |

Only `prc-block/form-input-select` and `core/group` are allowed as direct children.

### Default Template

The editor inserts:

1. **Minimum** `form-input-select` — metadata name `rangeMin`, `required: false`, `interactiveNamespace` set to the range block's namespace (or parent namespace when subsumed).
2. **Maximum** `form-input-select` — metadata name `rangeMax`, same settings.
3. **Error paragraph** — "Please select a valid range." with class `error-state-message`.

Child selects are locked from move/remove and are **not required** by default. Set each child's HTML anchor (`id`) when the parent consumer needs stable input ids (for example, year filters in `prc-roper/context-provider`).

## Parent / Ancestor Requirements

No explicit parent constraint. Common parents:

- `prc-block/form` — default `interactiveNamespace`; receives `selectRange` entries.
- `prc-roper/context-provider` — year-range filters via `interactiveNamespace: "prc-roper/context-provider"`.
- `prc-platform/facet-template` — inspector settings are hidden via `LimitControls` when nested here.

**Provides Context:**

| Context Key                       | Source attribute   | Description                                                              |
| --------------------------------- | ------------------ | ------------------------------------------------------------------------ |
| `form-input-select/options`       | Generated at render | Option list for child selects (`render_block_context` when not preset). |
| `form-input-select/has-clear-icon` | `enableClearIcons` | Whether child selects should render clear icons.                         |

**Uses Context:**

| Context Key                    | Description                    |
| ------------------------------ | ------------------------------ |
| `form-input-select/options`    | Optional upstream options.     |
| `form-input-select-range/key`  | Reserved for range keying.     |

## Usage Instructions

### Editor Settings

Open **Select Range Field Settings** in the block sidebar:

| Control              | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| Clear Icons Enabled  | Toggles `enableClearIcons` for both child selects. Child **Clear Icon Enabled** controls are not shown in the inspector when nested inside this block. |
| Select range type    | `"years"` or `"numbers"`. Switching resets start/end to sensible defaults. |
| Minimum Value        | `rangeStart` for generated options.                                         |
| Maximum Value        | `rangeEnd` when not using current year (hidden for years + current year).   |
| Current Year         | Years only. When on, maximum is always the current calendar year.           |

An **Invalid Range** notice appears when `rangeStart` exceeds `rangeEnd`.

### Year Range

1. Insert the **Select Range** block.
2. Set `type` to `"years"`.
3. Set **Minimum Value** (default `1985` when switching types in the editor).
4. Enable **Current Year** to cap the maximum at the current year, or set **Maximum Value** manually.
5. Options are generated ascending from `rangeStart` through the effective maximum.

### Numeric Range

1. Set `type` to `"numbers"`.
2. Configure `rangeStart`, `rangeEnd`, and `rangeStep`.
3. Options are generated from start to end by step increment.

### Validation

The block validates that the minimum selection does not exceed the maximum. When the range is valid, the `limitSelections` callback dynamically marks options on each child select as disabled so users cannot pick an invalid min/max pair:

- **Min select:** options with values greater than the current max are disabled.
- **Max select:** options with values less than the current min are disabled.

If min exceeds max, the wrapper receives the `is-error` class via `state.isRangeError`, child inputs show error border color, and the `error-state-message` paragraph is displayed. The range is not published to the parent namespace while invalid.

### Styling

Frontend styles in `style.scss`:

- **Error state:** `.is-error` applies error border color to child select inputs and reveals the `error-state-message` paragraph.
- **Child layout:** Inner `form-input-select` blocks use `flex-grow: 1` / `flex-shrink: 1` (horizontal layout comes from the block's flex layout support).
- **Dropdown arrow:** When a child select has a value (`.has-selection`), the dropdown chevron stays visible inside the range wrapper so users can reopen the list after clearing is optional.

## Block Markup Example

```html
<!-- wp:prc-block/form-input-select-range {"type":"years","rangeStart":1987,"rangeEnd":2026,"enableClearIcons":true,"interactiveNamespace":"prc-roper/context-provider"} -->
<div class="wp-block-prc-block-form-input-select-range">
	<!-- wp:prc-block/form-input-select {"anchor":"qs_filter_start_date","metadata":{"name":"rangeMin"},"interactiveNamespace":"prc-block/form-input-select-range"} /-->
	<!-- wp:prc-block/form-input-select {"anchor":"qs_filter_end_date","metadata":{"name":"rangeMax"},"interactiveNamespace":"prc-block/form-input-select-range"} /-->
	<!-- wp:paragraph {"className":"error-state-message"} -->
	<p class="error-state-message">Please select a valid range.</p>
	<!-- /wp:paragraph -->
</div>
<!-- /wp:prc-block/form-input-select-range -->
```

## PHP Rendering

The block uses server-side rendering via `render_callback` in `class-form-input-select-range.php`.

### Render Pipeline

1. **Option Generation** (`generate_options`): Builds an ascending list from `rangeStart` to the effective maximum:

    - `"years"` with `currentYear: true`: maximum is `(int) gmdate( 'Y' )`
    - Otherwise: maximum is `rangeEnd` (or `rangeStart + 100` fallback)

2. **Context Provision** (`render_block_context` filter): When `form-input-select/options` is not already set, injects the generated options array for child blocks.

3. **Interactivity Setup** (skipped when `interactiveSubsumption` is true):

    - `data-wp-interactive="prc-block/form-input-select-range"`
    - `data-wp-context` with `targetNamespace` and block `id`
    - `data-wp-watch--validate-range="callbacks.limitSelections"`
    - `data-wp-watch--publish-range="callbacks.publishRange"`
    - `data-wp-class--is-error="state.isRangeError"`

4. **Child Input Discovery**: Reads the first two `<input>` ids in rendered content as `minInputId` and `maxInputId`.

5. **Server State**: Seeds per-instance state (`initMinValue`, `initMaxValue`, input ids) under the block's `id` key.

## Frontend Interactivity

**Store Namespace:** `prc-block/form-input-select-range`

### State / Context

| Key             | Type           | Description                                                                 |
| --------------- | -------------- | --------------------------------------------------------------------------- |
| `minValue`      | `number`       | Current minimum, coerced from the child min select or `initMinValue`.       |
| `maxValue`      | `number`       | Current maximum, coerced from the child max select or `initMaxValue`.       |
| `defaultRange`  | `{ min, max }` | Initial range from server state (`initMinValue` / `initMaxValue`).          |
| `isValidRange`  | `boolean`      | True when `minValue <= maxValue`.                                           |
| `isRangeError`  | `boolean`      | True when the range is invalid (`!isValidRange`).                           |
| `minInputId`    | `string`       | DOM id of the minimum child select input.                                   |
| `maxInputId`    | `string`       | DOM id of the maximum child select input.                                   |

Min/max values are read from the `prc-block/form-input-select` store using the discovered child input ids.

### Actions

| Action                    | Description                                                                                                                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hoistValueToTargetState` | Writes the range to `targetState.selectRange[id]` when valid. Accepts `(minValue, maxValue, defaultRange)` and stores `{ range: { min, max }, isDefault, isDefaultMin, isDefaultMax }`. Default flags compare against `defaultRange`. |

### Callbacks

| Callback          | Description                                                                                                                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limitSelections` | When the range is valid, sets `option.disabled` on each child select's options so min cannot exceed max and max cannot fall below min. No-ops when the child select store is unavailable.          |
| `publishRange`    | When `isValidRange` is true, calls `hoistValueToTargetState` with numeric min/max and the `defaultRange` object.                                                                                   |

### Value Hoisting

Valid ranges are published to the target namespace (e.g. `prc-block/form` or `prc-roper/context-provider`) under `selectRange`:

```js
targetState.selectRange[blockId] = {
  range: { min: 2000, max: 2024 },
  isDefault: false,
  isDefaultMin: false,
  isDefaultMax: false,
};
```

- `isDefault` is true when both min and max match their initial values.
- `isDefaultMin` / `isDefaultMax` track whether each endpoint is still at its initial value.
- Parent consumers can skip filter application when `isDefault` is true, or omit individual endpoints when only one side changed.

### Interaction Flow

1. User selects a value in the min or max dropdown.
2. The child `form-input-select` updates its own store state.
3. `limitSelections` runs and disables out-of-range options on both child selects.
4. `publishRange` checks `isValidRange`.
5. When valid, writes the structured range entry to `targetState.selectRange[id]`.

## Related Blocks

| Block                         | Relationship                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prc-block/form`              | Default target namespace. Receives range entries in `selectRange`.                                                                                            |
| `prc-block/form-input-select` | Required child block (two instances). Receives options and clear-icon context from the range block; clear icons are configured only via this block's `enableClearIcons`. Options may be disabled at runtime. |
| `prc-roper/context-provider`  | Common consumer for year-range search filters via `selectRange` and `interactiveNamespace`.                                                                   |

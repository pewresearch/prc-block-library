# Form Input Select

A searchable dropdown select input with support for custom options, preset option lists (countries, US states, industries), single or multi-select, keyboard navigation, and contextual options provided by parent blocks. Renders a combobox-style input with a filterable dropdown list.

## Block inserter example

`block.json` defines an `example` with `viewportWidth` 320 and a “Country” select (`type` custom) with sample US/UK/CA options — inserter preview.

## Namespace

`prc-block/form-input-select`

## Category

`forms`

## Supports

| Feature                 | Value                     |
| ----------------------- | ------------------------- |
| Anchor                  | `true`                    |
| Interactivity           | `true`                    |
| Layout (type)           | `flex`                    |
| Spacing (margin)        | `true`                    |
| Spacing (padding)       | `true`                    |
| Spacing (blockGap)      | `true`                    |
| Border                  | `true` (custom selectors) |
| Color (text)            | `true` (custom selectors) |
| Color (background)      | `true` (custom selectors) |
| Typography (fontSize)   | `true` (custom selectors) |
| Typography (lineHeight) | `true` (custom selectors) |
| HTML                    | `false`                   |

### Custom Selectors

```json
{
	"root": ".wp-block-prc-block-form-input-select",
	"border": ".wp-block-prc-block-form-input-select .wp-block-prc-block-form-input-select__input",
	"typography": ".wp-block-prc-block-form-input-select .wp-block-prc-block-form-input-select__input",
	"color": {
		"text": ".wp-block-prc-block-form-input-select .wp-block-prc-block-form-input-select__input",
		"background": ".wp-block-prc-block-form-input-select .wp-block-prc-block-form-input-select__input"
	}
}
```

## Attributes

| Attribute       | Type      | Default     | Description                                                                                                     |
| --------------- | --------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| `type`          | `string`  | `"custom"`  | Option source: `"custom"`, `"countries"`, `"countries-and-regions"`, `"us-states"`, or `"industries"`.          |
| `rawOptions`    | `array`   | `[]`        | Raw options array before processing.                                                                            |
| `options`       | `array`   | `[]`        | Processed options array. Each item has `label` (string), `value` (string), and optionally `disabled` (boolean). |
| `hasClearIcon`  | `boolean` | `false`     | Show a clear/reset button inside the input.                                                                     |
| `displayLabel`  | `boolean` | `true`      | Show/hide the label above the select.                                                                           |
| `label`         | `string`  | `""`        | Label text, editable via RichText (source: `html`, selector: `label`).                                          |
| `placeholder`   | `string`  | `""`        | Placeholder text shown when no value is selected.                                                               |
| `required`      | `boolean` | `false`     | Whether a selection is required before form submission.                                                         |
| `disabled`      | `boolean` | `false`     | Whether the input is disabled/non-interactive.                                                                  |
| `value`         | `string`  | `""`        | Currently selected value.                                                                                       |
| `allowMultiple` | `boolean` | `false`     | Allow selecting multiple values (renders as token field).                                                       |
| `allowSearch`   | `boolean` | `true`      | Allow typing to filter/search through options.                                                                  |
| `metadata`      | `object`  | `undefined` | Contains `name` (field identifier for form data).                                                               |

## Available Styles

| Style        | Slug           | Description                                                                           |
| ------------ | -------------- | ------------------------------------------------------------------------------------- |
| Default      | `default`      | Standard dropdown with border and color applied to the input wrapper.                 |
| Inline Label | `inline-label` | Label and input rendered on the same line. Color/border applied to the outer wrapper. |

## Inner Blocks

None. This is a leaf block.

## Parent / Ancestor Requirements

No explicit parent constraint. Can be used:

-   Inside `prc-block/form` as a direct form field
-   Inside `prc-block/form-input-select-range` as a min or max selector

**Uses Context:**

| Context Key                       | Description                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `form-input-select/options`       | Options array provided by a parent block (e.g., `form-input-select-range`). Merged with the block's own `options`. |
| `form-input-select/has-clear-icon` | When true, enables the clear icon even if the block's own `hasClearIcon` attribute is false. Set by `form-input-select-range` via `enableClearIcons`. |

## Usage Instructions

### Custom Options

1. Insert the **Select** block.
2. Set `type` to `"custom"` (default).
3. In the **Form Input Field Options** panel, use the **Sorter** component to add, remove, reorder, and set active/inactive options.

### Preset Options

Set `type` in the inspector to use built-in option lists:

| Type                    | Description                        |
| ----------------------- | ---------------------------------- |
| `countries`             | ISO country list                   |
| `countries-and-regions` | Countries plus regions/territories |
| `us-states`             | US state list                      |
| `industries`            | Industry categories                |

When using a preset, custom options are ignored. The options are generated server-side during PHP rendering.

### Multi-Select

Set `allowMultiple` to `true`. Selected values render as removable tokens above the input. The input field remains active for searching and selecting additional options.

### Clear Icon

Toggle **Clear Icon Enabled** (`hasClearIcon`) to show a reset button (X) inside the input that clears the current selection. This inspector control is only available when the block is **not** nested inside `form-input-select-range`.

When nested inside `form-input-select-range`, the child **Clear Icon Enabled** toggle is hidden via `LimitControls` (same as Disabled, Required, and Allow Search). Configure clear icons on the parent range block's **Clear Icons Enabled** setting (`enableClearIcons`), which passes `form-input-select/has-clear-icon` block context to both child selects.

At render time, the clear icon is shown when either `hasClearIcon` is true on the block **or** the parent context `form-input-select/has-clear-icon` is true.

### Search/Filter

`allowSearch` is `true` by default. Users can type to filter the dropdown list. Set to `false` for a traditional dropdown without search.

### Nested Inside Select Range

When a `form-input-select` is a direct child of `form-input-select-range`, several inspector controls are hidden via `LimitControls` because the parent manages options and range behavior:

- Input Name
- Disabled / Required
- Clear Icon Enabled
- Allow Search
- Form Input Field Options panel (preset types and custom option sorter)

Placeholder and display label remain editable on child selects. Clear icons, search, and option configuration are managed by the parent range block.

### Disabled Options

Individual options may include `disabled: true`. Parent blocks (notably `form-input-select-range`) can set this at runtime to constrain valid choices.

- Disabled options render with reduced opacity and `cursor: not-allowed`.
- Click and Enter-key selection are ignored when the targeted option is disabled (`onInputOptionClick`, Enter handling in `onInputKeyDown`).
- Keyboard navigation may still highlight disabled options; selection is blocked at commit time.

## Block Markup Example

```html
<!-- wp:prc-block/form-input-select {"type":"us-states","placeholder":"Select a state...","metadata":{"name":"state"}} -->
<div class="wp-block-prc-block-form-input-select">
	<label>State</label>
	<div class="wp-block-prc-block-form-input-select__input">
		<input type="text" role="combobox" placeholder="Select a state..." />
		<div class="wp-block-prc-block-form-input-select__list"></div>
	</div>
</div>
<!-- /wp:prc-block/form-input-select -->
```

## PHP Rendering

The block uses server-side rendering via `render_callback` in `class-form-input-select.php`.

### Render Pipeline

1. **Option Construction** (`construct_options_list`): Builds the final options array based on `type`:

    - `"custom"`: Uses the `options` attribute directly
    - `"countries"`, `"countries-and-regions"`, `"us-states"`, `"industries"`: Generates options from built-in data sets
    - Merges contextual options from parent blocks (via `form-input-select/options` context)

2. **Clear Icon Resolution**: `has_clear_icon` is true when `hasClearIcon` is set on the block **or** `form-input-select/has-clear-icon` is provided by a parent (e.g. `form-input-select-range`).

3. **Interactivity Setup**: Wraps with `data-wp-interactive="prc-block/form-input-select"` (unless `interactiveSubsumption` is true) and context containing:

    - `targetNamespace` (parent interactive namespace)
    - `id`, `hasClearIcon`, `searchTerm`, `activeIndex`, `processing`
    - Per-instance server state keyed by `id` (value, label, options, etc.)

4. **Dropdown List**: Replaces the static list placeholder with a `<template data-wp-each="state.inputOptions">` that dynamically renders `<li role="option">` items with:

    - `data-wp-on--click="actions.onInputOptionClick"` for selection
    - `data-wp-text` bound to option label
    - `data-wp-bind--disabled="context.option.disabled"` for per-option disabled state
    - `data-wp-bind--data-ref-value="context.option.value"` for keyboard navigation scrolling

5. **Keyboard Navigation**: Adds `data-wp-on-async--keydown="actions.onInputKeyDown"` and `data-wp-on-async--keyup="actions.onInputKeyUp"` to the input for ArrowUp/Down/Enter/Escape handling and search filtering.

6. **Clear Button**: When `has_clear_icon` is true, binds `data-wp-class--has-selection="state.hasValue"` and adds a clear button with `data-wp-on--click="actions.onInputClearButtonClick"`.

7. **Dropdown Arrow**: Adds an arrow indicator with `data-wp-on--click="actions.onDropdownArrowClick"`. When a value is selected inside a range block, the parent range stylesheet keeps the dropdown arrow visible.

8. **Field Registration**: Registers the field in the target namespace store and hoists value changes via `hoistValueToTargetState`.

## Frontend Interactivity

**Store Namespace:** `prc-block/form-input-select`

### State / Context

| Key                | Type      | Description                                                          |
| ------------------ | --------- | -------------------------------------------------------------------- |
| `isOpen`           | `boolean` | Whether the dropdown is currently visible.                           |
| `searchValue`      | `string`  | Current text in the search input.                                    |
| `selectedValue`    | `string`  | Currently selected option value.                                     |
| `highlightedIndex` | `number`  | Index of the highlighted option for keyboard navigation (-1 = none). |
| `options`          | `array`   | Full options list.                                                   |
| `filteredOptions`  | `array`   | Options filtered by search value (derived).                          |

### Actions

| Action                     | Description                                                                                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onInputOptionClick`       | Handles clicking a dropdown option. No-ops when the option is disabled. Sets value/label, closes dropdown, and hoists value to the target namespace.                             |
| `onInputKeyDown`           | Keyboard handler for the input. Enter selects the highlighted option (skipped when disabled). Arrow keys are delegated to `onInputKeyUp`.                                        |
| `onInputKeyUp`             | Updates `searchTerm` when search is allowed. Handles ArrowDown/ArrowUp navigation and Escape to close.                                                                         |
| `onInputClearButtonClick`  | Clears the selected value and search input. Hoists empty value to the target namespace.                                                                                          |
| `onDropdownArrowClick`     | Toggles dropdown open/close state.                                                                                                                                               |
| `onInputFocus`             | Opens the dropdown when the input receives focus.                                                                                                                                |
| `onInputBlur`              | Closes the dropdown on blur (with a short delay to allow click events on options).                                                                                               |
| `moveThroughChoices`       | Moves keyboard highlight through `inputOptions`, scrolling the listbox to keep the active item visible.                                                                          |

### Value Hoisting

`hoistValueToTargetState` syncs the selected value to the parent form's `formFields` state using the target namespace from context. This is called after every selection change.

## Related Blocks

| Block                               | Relationship                                                                                             |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `prc-block/form`                    | Parent form container. Receives the selected value in `formFields`.                                      |
| `prc-block/form-input-select-range` | Optional parent that provides options, clear-icon context, and runtime option disabling for min/max range selection. |

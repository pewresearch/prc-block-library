# Form Input Select

A searchable dropdown select input with support for custom options, preset option lists (countries, US states, industries), single or multi-select, keyboard navigation, and contextual options provided by parent blocks. Renders a combobox-style input with a filterable dropdown list.

## Namespace

`prc-block/form-input-select`

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

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | `string` | `"custom"` | Option source: `"custom"`, `"countries"`, `"countries-and-regions"`, `"us-states"`, or `"industries"`. |
| `rawOptions` | `array` | `[]` | Raw options array before processing. |
| `options` | `array` | `[]` | Processed options array. Each item has `label` (string), `value` (string), and optionally `disabled` (boolean). |
| `hasClearIcon` | `boolean` | `false` | Show a clear/reset button inside the input. |
| `displayLabel` | `boolean` | `true` | Show/hide the label above the select. |
| `label` | `string` | `""` | Label text, editable via RichText (source: `html`, selector: `label`). |
| `placeholder` | `string` | `""` | Placeholder text shown when no value is selected. |
| `required` | `boolean` | `false` | Whether a selection is required before form submission. |
| `disabled` | `boolean` | `false` | Whether the input is disabled/non-interactive. |
| `value` | `string` | `""` | Currently selected value. |
| `allowMultiple` | `boolean` | `false` | Allow selecting multiple values (renders as token field). |
| `allowSearch` | `boolean` | `true` | Allow typing to filter/search through options. |
| `metadata` | `object` | `undefined` | Contains `name` (field identifier for form data). |

## Available Styles

| Style | Slug | Description |
|-------|------|-------------|
| Default | `default` | Standard dropdown with border and color applied to the input wrapper. |
| Inline Label | `inline-label` | Label and input rendered on the same line. Color/border applied to the outer wrapper. |

## Inner Blocks

None. This is a leaf block.

## Parent / Ancestor Requirements

No explicit parent constraint. Can be used:
- Inside `prc-block/form` as a direct form field
- Inside `prc-block/form-input-select-range` as a min or max selector

**Uses Context:**

| Context Key | Description |
|-------------|-------------|
| `form-input-select/options` | Options array provided by a parent block (e.g., `form-input-select-range`). Merged with the block's own `options`. |

## Usage Instructions

### Custom Options

1. Insert the **Select** block.
2. Set `type` to `"custom"` (default).
3. In the **Form Input Field Options** panel, use the **Sorter** component to add, remove, reorder, and set active/inactive options.

### Preset Options

Set `type` in the inspector to use built-in option lists:

| Type | Description |
|------|-------------|
| `countries` | ISO country list |
| `countries-and-regions` | Countries plus regions/territories |
| `us-states` | US state list |
| `industries` | Industry categories |

When using a preset, custom options are ignored. The options are generated server-side during PHP rendering.

### Multi-Select

Set `allowMultiple` to `true`. Selected values render as removable tokens above the input. The input field remains active for searching and selecting additional options.

### Clear Icon

Toggle `hasClearIcon` to show a reset button (X) inside the input that clears the current selection.

### Search/Filter

`allowSearch` is `true` by default. Users can type to filter the dropdown list. Set to `false` for a traditional dropdown without search.

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

2. **Interactivity Setup**: Wraps with `data-wp-interactive="prc-block/form-input-select"` and context containing:
   - `targetNamespace` (parent form namespace)
   - `isOpen` (false), `searchValue` ("")
   - `selectedValue`, `highlightedIndex` (-1)
   - `options` (the constructed options array)

3. **Dropdown List**: Replaces the static list placeholder with a `<template data-wp-each="context.filteredOptions">` that dynamically renders `<li>` items with:
   - `data-wp-on--click="actions.onOptionClick"` for selection
   - `data-wp-text` bound to option label
   - `data-wp-bind--class` for highlight state

4. **Keyboard Navigation**: Adds `data-wp-on--keydown="actions.onKeyDown"` to the input for ArrowUp/Down/Enter/Escape handling.

5. **Clear Button**: When `hasClearIcon` is true, adds a clear button with `data-wp-on--click="actions.onClear"`.

6. **Dropdown Arrow**: Adds an arrow indicator with `data-wp-on--click="actions.onDropdownArrowClick"`.

7. **Field Registration**: Registers the field in the target form's `formFields` state.

## Frontend Interactivity

**Store Namespace:** `prc-block/form-input-select`

### State / Context

| Key | Type | Description |
|-----|------|-------------|
| `isOpen` | `boolean` | Whether the dropdown is currently visible. |
| `searchValue` | `string` | Current text in the search input. |
| `selectedValue` | `string` | Currently selected option value. |
| `highlightedIndex` | `number` | Index of the highlighted option for keyboard navigation (-1 = none). |
| `options` | `array` | Full options list. |
| `filteredOptions` | `array` | Options filtered by search value (derived). |

### Actions

| Action | Description |
|--------|-------------|
| `onOptionClick` | Handles clicking a dropdown option. Sets `selectedValue`, clears search, closes dropdown, and hoists value to parent form. |
| `onKeyDown` | Keyboard handler for the input. Supports ArrowDown (next option), ArrowUp (previous option), Enter (select highlighted), Escape (close dropdown). |
| `onClear` | Clears the selected value and search input. Hoists empty value to parent form. |
| `onDropdownArrowClick` | Toggles dropdown open/close state. |
| `onSearchInput` | Updates `searchValue` as user types, which triggers re-filtering of options. |
| `onInputFocus` | Opens the dropdown when the input receives focus. |
| `onInputBlur` | Closes the dropdown on blur (with a short delay to allow click events on options). |

### Value Hoisting

`hoistValueToTargetState` syncs the selected value to the parent form's `formFields` state using the target namespace from context. This is called after every selection change.

## Related Blocks

| Block | Relationship |
|-------|-------------|
| `prc-block/form` | Parent form container. Receives the selected value in `formFields`. |
| `prc-block/form-input-select-range` | Optional parent that provides contextual options and uses two select blocks for min/max range selection. |

# Form Input Select Range Block

## Overview

The **Form Input Select Range** block provides a user-friendly way to select a range with minimum and maximum values using two dropdown select fields. This block follows the same architectural pattern as the `form-input-password` block, utilizing its own Interactivity API store to manage state and hoist values to a parent form component.

## Features

- **Dual Select Inputs**: Two synchronized dropdown selects for minimum and maximum values
- **Predefined Range Types**:
    - `years`: Generates year options from current year backwards (default: 100 years)
    - `numbers`: Generates numeric range based on start, end, and step values
    - `custom`: Allows custom options to be provided
- **Range Validation**: Automatically validates that minimum <= maximum
- **State Management**: Uses WordPress Interactivity API to manage block state
- **Form Integration**: Hoists selected values to parent form component
- **Flexible Layout**: Supports horizontal/vertical orientation with customizable spacing

## Block Attributes

### `type` (string)

- **Options**: `custom`, `years`, `numbers`
- **Default**: `custom`
- Determines what type of options are generated

### `rangeStart` (number)

- **Default**: `0`
- Starting value for `numbers` type

### `rangeEnd` (number)

- **Default**: `100`
- Ending value for `numbers` type

### `rangeStep` (number)

- **Default**: `1`
- Step increment for `numbers` type

## File Structure

```
form-input-select-range/
├── block.json                           # Block metadata and configuration
├── class-form-input-select-range.php    # PHP render callback
├── edit.jsx                             # Editor component
├── save.jsx                             # Save component (uses InnerBlocks)
├── icon.jsx                             # Block icon
├── index.js                             # Block registration
├── style.scss                           # Frontend and editor styles
├── utils.js                             # Utility functions for options generation
└── view.js                              # Interactivity API store (frontend)
```

## How It Works

### Editor (edit.jsx)

- Creates two `form-input-select` blocks as inner blocks
- Uses templates defined in `utils.js` to configure each select
- Both selects use `interactiveSubsumption: true` to inherit state management from parent

### Frontend (view.js)

The Interactivity API store manages:

- **State**:
    - `minValue` / `maxValue`: Current selected values
    - `minInputId` / `maxInputId`: DOM IDs of the select inputs
    - `isValidRange`: Validation that min <= max
    - `hasCompleteRange`: Both values are selected

- **Actions**:
    - `onInputChange`: Handles changes to either select field

- **Callbacks**:
    - `onInit`: Initializes block state
    - `onRangeValidation`: Validates range on value changes
    - `onValueChange`: Hoists values to parent form when valid and complete

### PHP Render (class-form-input-select-range.php)

- Generates options based on block type
- Provides options to inner blocks via block context
- Adds Interactivity API directives to wrapper
- Manages unique block IDs

## Usage Example

### Year Range Selector

```jsx
// In block editor, add the block and configure:
{
  "type": "years"
}
// This will generate year options from current year backwards
```

### Custom Number Range

```jsx
{
  "type": "numbers",
  "rangeStart": 1,
  "rangeEnd": 100,
  "rangeStep": 5
}
// Generates: 1, 6, 11, 16, 21... 96
```

### Custom Options

```jsx
{
  "type": "custom",
  // Provide options via block context
}
```

## Integration with Forms

The block automatically integrates with the parent `prc-block/form` component:

1. Values are validated locally (min <= max)
2. When both values are selected and valid, they're hoisted to the form
3. Form receives two separate values:
    - `rangeMin`: The minimum value
    - `rangeMax`: The maximum value

## CSS Classes

The block wrapper includes dynamic classes:

- `.is-valid`: Applied when range validation passes
- `.has-complete-range`: Applied when both values are selected

## Development Notes

### Following the Password Block Pattern

This block mirrors the architecture of `form-input-password`:

1. **Container block** with own Interactivity API store
2. **Inner blocks** (form-input-select) with `interactiveSubsumption`
3. **State hoisting** to parent form component
4. **Validation logic** within the container's store

### Key Differences from Password Block

- Uses `form-input-select` instead of `form-input-text`
- Simpler validation (numeric comparison vs. regex patterns)
- No "confirmation" toggle - always uses two inputs
- Options are generated dynamically based on type

## Future Enhancements

Potential improvements:

- Add custom option input in editor
- Support for date ranges
- Add visual range slider alongside selects
- Internationalization of year labels
- More granular validation messages
- Support for disabled/readonly states on individual selects

## Testing

To test the block:

1. Build the block:

    ```bash
    npm run build -w @prc/block-library form-input-select-range
    ```

2. Start playground:

    ```bash
    npm run playground:start
    ```

3. Add block to a form and test:
    - Select minimum value
    - Select maximum value
    - Verify validation (try max < min)
    - Submit form and check values

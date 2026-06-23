# Grid Controller Style Engine Implementation

## Summary

Updated the grid-controller block to use a style engine pattern (similar to the tabs block) for managing CSS custom properties (`--grid-gutter` and `--divider-color`) using design tokens.

## Changes Made

### 1. Created `style-engine.js`

A new JavaScript module that manages CSS custom properties in the editor:

**Features:**

- `getGutterStyles()` - Converts blockGap spacing to `--grid-gutter` CSS variable
- `getDividerColorStyles()` - Converts dividerColor to `--divider-color` CSS variable
- Uses `useStyleOverride()` to inject scoped CSS (`#block-{clientId}`)
- Handles preset spacing tokens (e.g., `var:preset|spacing|50`)
- Normalizes color values from slugs to CSS variables

**Benefits:**

- CSS variables participate in the style engine cascade
- Replaces inline style attributes with proper scoped CSS
- Consistent with WordPress block editor standards

### 2. Updated `edit.jsx`

**Removed:**

- Direct inline style attribute for `--grid-gutter`
- Import of `getBlockGapSupportValue` from block-utils

**Added:**

- Import of `StyleEngine` component
- `<StyleEngine attributes={attributes} clientId={clientId} />` inside the block wrapper
- CSS variables now injected via style engine instead of inline styles

### 3. Updated `class-grid-controller.php`

**Added two new private methods:**

#### `generate_gutter_styles( array $attributes ): string`

- Extracts blockGap from attributes
- Uses horizontal gap (left) for grid gutter
- Converts preset spacing tokens (e.g., `var:preset|spacing|50`) to CSS variables
- Returns formatted CSS: `--grid-gutter: <value>;`

#### `generate_divider_color_styles( array $attributes ): string`

- Extracts dividerColor from attributes
- Converts color slugs to CSS variables
- Returns formatted CSS: `--divider-color: var(--wp--preset--color--<slug>);`

**Updated `render_block_callback()`:**

- Calls both helper methods to generate CSS custom properties
- Combines styles into `$inline_styles`
- Applies to block wrapper via `style` attribute

## Technical Details

### Design Token Support

**Grid Gutter (Spacing):**

```javascript
// Before: Direct value
style: { '--grid-gutter': '24px' }

// After: Design token
style: { spacing: { blockGap: { left: 'var:preset|spacing|50' } } }
// Becomes: --grid-gutter: var(--wp--preset--spacing--50);
```

**Divider Color:**

```javascript
// Before: Direct value
'--divider-color': 'var(--wp--preset--color--ui-gray-light)'

// After: Design token
dividerColor: 'ui-gray-light'
// Becomes: --divider-color: var(--wp--preset--color--ui-gray-light);
```

### Editor vs Frontend

**Editor (JS):**

- `StyleEngine` component uses `useStyleOverride()`
- Injects scoped CSS: `#block-{clientId} { --grid-gutter: ...; }`
- Updates dynamically when attributes change

**Frontend (PHP):**

- `generate_gutter_styles()` and `generate_divider_color_styles()`
- Applied to block wrapper's `style` attribute
- Server-side rendering for performance

## Benefits

1. **Design System Integration**: Uses WordPress preset spacing and color tokens
2. **Consistent Pattern**: Mirrors the tabs block implementation
3. **Better Performance**: Scoped CSS instead of inline styles
4. **Maintainability**: Centralized style generation logic
5. **Flexibility**: Easy to add more CSS custom properties in the future
6. **Standards Compliance**: Follows WordPress block editor best practices

## Backward Compatibility

The changes maintain backward compatibility:

- Existing blocks will continue to work
- CSS variable names remain the same (`--grid-gutter`, `--divider-color`)
- Visual appearance unchanged
- Only the method of applying styles has changed

## Testing Considerations

When testing, verify:

1. Grid gutter spacing responds to blockGap changes in the editor
2. Divider color updates when changed in the color picker
3. Preset spacing tokens are correctly converted to CSS variables
4. Frontend rendering matches editor appearance
5. No console errors in the editor
6. Existing grid-controller blocks render correctly after update

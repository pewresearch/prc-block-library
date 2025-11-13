# Navigation Mega Menu - Design Tokens & Style Engine Refactor

## Overview

Converted the navigation-mega-menu block to use design tokens and the style engine pattern from the tabs block, replacing the old PHP-generated color class system.

## Changes Made

### 1. New Files

- **`style-engine.js`**: Implements the style engine pattern to inject CSS custom properties scoped to the block instance
    - Converts color attributes to CSS variables (e.g., `--custom-menu-item-background-color`)
    - Uses `useStyleOverride` hook to inject scoped CSS
    - Handles both preset colors (slug-based) and custom color values

### 2. Updated Files

#### `block.json`

- Added `custom*` attributes for each color option:
    - `customMenuItemBackgroundColor`
    - `customMenuItemTextColor`
    - `customMenuItemActiveBackgroundColor`
    - `customMenuItemActiveTextColor`
    - `customMenuOverlayBackgroundColor`
    - `customMenuOverlayTextColor`
    - `customMenuActiveBorderColor`
- These mirror the existing preset-based attributes

#### `control-colors.jsx`

- Refactored to follow tabs block pattern
- Now accepts individual color props instead of a `colors` object
- Each color control now updates both the preset attribute and the custom attribute
- Uses `useMemo` for performance optimization
- Changed `disableCustomColors` to `false` to allow custom colors

#### `controls.jsx`

- Updated to pass individual color props to `ColorControls` component
- Removed the `colors` object aggregation

#### `edit.jsx`

- Added `StyleEngine` component integration
- Simplified class name generation - removed dynamic color class names
- Updated to pass individual color props to `Controls` component
- Removed unused imports (`getColorClassName`, `useMemo`)

#### `style.scss`

- Added design token definitions at the block root:
    ```scss
    --menu-item-bg: var(--custom-menu-item-background-color, transparent);
    --menu-item-text: var(--custom-menu-item-text-color, inherit);
    --menu-item-active-bg: var(
    	--custom-menu-item-active-background-color,
    	transparent
    );
    --menu-item-active-text: var(--custom-menu-item-active-text-color, inherit);
    --menu-overlay-bg: var(--custom-menu-overlay-background-color, #fff);
    --menu-overlay-text: var(--custom-menu-overlay-text-color, inherit);
    --menu-active-border: var(--custom-menu-active-border-color, transparent);
    ```
- Updated all color references to use these design tokens instead of the old `--active-border-color`, `--overlay-background-color`, etc.
- Applied colors directly in CSS instead of relying on class-based color application

#### `class-navigation-mega-menu.php`

- **Added** `generate_color_styles()` method - mirrors tabs block pattern
    - Generates inline CSS custom properties from `custom*` color attributes
    - Returns a CSS string for inline styles (e.g., `--custom-menu-item-background-color: #fff;`)
    - Uses array_map and array_filter for clean, efficient code
- **Removed** old `generate_mega_menu_styles()` method - no longer needed
- **Removed** `enqueue_custom_mega_menu_styles()` method - no longer needed
- Removed hook registration for `enqueue_block_assets` in `init()`
- Updated `block_render_callback()`:
    - Added proper PHPDoc documentation
    - Calls `generate_color_styles()` to get inline CSS
    - Adds `style` attribute to wrapper with generated color CSS variables
    - Removed `$colors` array generation
    - Removed dynamic color class names from `$overlay_classnames`
    - Removed dynamic color class names from `$wrapper_attributes`
    - Now only generates structural class names (`has-label`, `has-box-shadow`, `is-mobile`)

## Benefits

1. **Consistency**: Now matches the tabs block pattern for color handling
2. **Client-side Only**: Colors are handled entirely in JavaScript/CSS, not PHP
3. **Design Tokens**: Uses a proper CSS custom property cascade
4. **Performance**: Eliminates server-side CSS generation and inline styles
5. **Maintainability**: Single source of truth for color values (style engine)
6. **Flexibility**: Supports both theme preset colors and custom colors
7. **Scoping**: CSS variables are scoped per block instance using `#block-{clientId}`

## How It Works

1. **Color Selection**: User selects colors in the editor using `ColorControls`
2. **Attribute Storage**: Colors stored in both preset (`menuItemBackgroundColor`) and custom (`customMenuItemBackgroundColor`) attributes
3. **Style Injection (Editor)**: `StyleEngine` component reads attributes and injects scoped CSS variables via `useStyleOverride`
4. **Style Injection (Frontend)**: PHP `generate_color_styles()` method generates inline CSS custom properties from attributes
5. **CSS Application**: `style.scss` defines design tokens that reference the injected CSS variables
6. **Rendering**: Both editor and frontend apply the same design token system for consistent styling

## Testing Checklist

- [ ] Test with theme preset colors
- [ ] Test with custom colors
- [ ] Test color changes in editor
- [ ] Verify colors persist after save/reload
- [ ] Check frontend rendering matches editor
- [ ] Test active/inactive states
- [ ] Test overlay colors
- [ ] Test border colors
- [ ] Verify backward compatibility with existing blocks
- [ ] Check responsive behavior
- [ ] Test in different theme contexts

## Migration Notes

- Existing blocks should continue to work (backward compatible)
- Old color class names are no longer generated but won't break existing content
- Custom CSS relying on the old generated classes (e.g., `.has-blue-overlay-background`) may need updates

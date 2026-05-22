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

---

## Dialog Refactor (May 2026)

The mega-menu **frontend** overlay uses a native `<dialog>` element opened with
`showModal()`. That removes custom viewport `left`/`width` positioning math, a
window-click outside-close handler, and a document keydown ESC handler. Vertical
placement under the `core/navigation` bar uses `--prc-mega-menu-anchor-top`,
updated from `ResizeObserver` + window resize (**`view.js` only**).

The **block editor** does **not** use `<dialog>`: **`edit.jsx`** renders an
in-flow preview panel under the nav item (`__editor-panel` in **`edit.scss`**)
so authors can edit the navigation without a top-layer modal. ESC and the
close button still collapse the preview; the template-part editor still mounts
lazily on first open and stays mounted.

### What changed (frontend)

- **Markup.** The overlay is a `<dialog>` instead of a `<div>`. The legacy class
  `wp-block-prc-block-navigation-mega-menu__container` is preserved on the
  dialog alongside a new `__dialog` class so existing site CSS keeps applying.
  Dual-class period is one release; `__container` is deprecated.
- **Positioning.** `showModal()` puts the dialog in the top layer, so CSS Anchor
  Positioning from the in-tree wrapper does not resolve reliably. Instead,
  `view.js` sets `--prc-mega-menu-anchor-top` on the host `document.documentElement`
  to the `getBoundingClientRect().bottom` of the parent `.wp-block-navigation`,
  refreshed on `ResizeObserver(nav)`, window resize, and immediately before
  `showModal()`. `style.scss` uses `top: var(--prc-mega-menu-anchor-top, 0px)`.
- **Interactivity.** The store keeps its own namespace
  (`prc-block/navigation-mega-menu`) and uses a `data-wp-watch` callback
  (`syncDialogState`) on the wrapper to call `dialogEl.showModal()` /
  `dialogEl.close()` when `state[id].isActive` flips. ESC, focus trap,
  stacking-context escape, and `::backdrop` outside-click are delegated to the
  dialog element. A native `close` event handler syncs state back so IxN
  remains the source of truth.
- **Single-open invariant.** `actions.toggleMenuOnClick` calls `closeAll()`
  before opening, so opening menu B closes menu A even when both live in the
  same nav block.
- **Animations.** The `animation` attribute (`fade | slide`) is wired via
  `@starting-style` and `transition-behavior: allow-discrete` on the dialog and
  its `::backdrop`. `fade` is the default.
- **Modal with transparent backdrop.** `showModal()` uses a transparent
  backdrop so there is no visible scrim, but it still receives clicks for
  outside-close on the frontend.

### What changed (editor)

- **In-flow panel.** `edit.jsx` renders a `<div>` panel (`__editor-panel`, plus
  legacy `__container`), not `<dialog>` / `showModal()`. Panel layout and
  close-button styling live in `edit.scss`; shared design tokens still come
  from `style.scss` on the block root.

### Files removed

- `use-ref-resizer.js` — `getValues()` and the `useRefResizer` hook had no
  remaining callers after the dialog took over positioning on the frontend.

### Removed runtime concerns

The following all disappeared from `view.js`:

- `setMenuPositions` action and the `width`/`left`/`top` context fields
- `onResize` callback (window resize listener)
- `onWindowClickCloseMegaMenu` callback (manual outside-click resolver)
- `onESCKey` callback (manual document keydown listener)
- `getToggleClassname` callback (was unreferenced)

### Backwards compatibility

- Block attribute schema is unchanged — no migrations or deprecations needed.
- Serialized blocks render unchanged in shape (toggle button + overlay), only
  the overlay element type and runtime semantics change on the frontend.
- The legacy `__container` class is preserved on the dialog; existing site CSS
  targeting that class still applies.

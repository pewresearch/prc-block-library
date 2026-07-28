# `core/group` Block Modifications

This directory contains customizations and enhancements for the WordPress `core/group` block, as used in the PRC Platform.

## Overview

The `core/group` block is extended here to provide advanced layout, style, and responsive features, as well as several custom block variations. These enhancements are available both in the block editor and on the frontend, and are optimized for dynamic, server-side rendering.

## Key Additions & Modifications

### 1. **Custom Block Styles**

Several new styles are registered for `core/group`, including:

- **Fluid**: Full-width, max-width 100%.
- **200/250/300/320/420/640-wide**: Constrained max-widths for various use cases.
- **Dynamic Wide Template**: Uses a CSS variable for dynamic width.
- **Collapse Row on Mobile**: Stacks children vertically on mobile.

These styles can be selected in the block editor and are registered via PHP for both editor and frontend.

### 2. **Responsive Controls**

The block supports device-specific visibility:

- **Hide on Desktop/Tablet/Mobile**: Toggle block visibility per device.
- **Responsive container queries**: Data attributes and CSS variables are used for fine-grained control.

For new width constraints, use Gutenberg content width / layout settings (or custom CSS for one-off cases). Legacy per-device `maxWidth` values already saved on blocks continue to apply; the Max Width editor control is no longer available.

### 3. **Color & Divider Controls**

- **Interior Divider**: Adds a divider between inner blocks, with customizable color.
- **Sticky Background/Text Colors**: Set background and text colors for sticky states.

### 3a. **Grid layout: responsive order + grid-aware dividers**

This is the recommended replacement for the deprecated `prc-block/grid-controller` / `grid-column` blocks. When a `core/group` uses the native **Grid** layout (`layout.type === 'grid'`), PRC layers two capabilities on top of Gutenberg's native responsive grid (per-viewport column count, spacing, and column/row span shipped in Gutenberg 23.3):

- **Responsive column order** — each grid child gains a **Column order** control in the Dimensions panel tied to the editor **device preview** toolbar (`core/editor` `getDeviceType()`). One field reads/writes the active preview bucket (`style.layout.prcOrder` on desktop, `style.tablet.layout.prcOrder`, etc.) via [`utils/style-state.js`](utils/style-state.js). Desktop preview shows a notice that order follows canvas position; tablet/mobile preview allow editing. Tablet/mobile values fall back to desktop when blank. In the editor, canvas order uses inline `order` from the active preview device; on the frontend, `@media` rules at 480px/782px apply.
- **Grid-aware dividers** — setting an **Interior Divider** color on a grid group, plus optional **Divider Style** (solid/dashed/dotted/none) and **Divider Inset** in the Border panel, draws dividers between grid children. Placement is computed in the editor ([`utils/divider-placement.js`](utils/divider-placement.js)) from native spans + column count: side-by-side children get a vertical divider; full-width children get a horizontal divider; the first item in each row gets none. Flags persist per child under `style.prcGridDivider` and render server-side without any parent lookup. In the editor, divider visibility follows the device preview toolbar (`.is-*-preview` rules in `style.scss`); on the frontend, `@media` breakpoints apply.

**Breakpoints** on the frontend mirror `WP_Theme_JSON::RESPONSIVE_BREAKPOINTS` (mobile `width <= 480px`, tablet `480px < width <= 782px`). The `tablet`/`mobile` style keys are normalized in one place to tolerate core's in-progress move to `@tablet`/`@mobile`.

### 4. **Custom Block Variations**

Several pre-configured variations are available:

- **Callout**: Oatmeal background, heading, and paragraph.
- **Baseball Card**: Card-style layout with heading, image, and text.
- **Post Infographics Card**: Card with heading and attached images.
- **Social Group**: For sharing/social meta override.

Each variation provides a unique layout and style, with example inner blocks and default attributes.

### 5. **Editor Enhancements**

- **Custom Controls**: Additional controls for color and responsive settings are injected into the block sidebar (Max Width Dimensions control removed).
- **Block Filters**: Filters are used to add attributes, wrapper props, and support for left/right alignment.
- **Transforms**: Supports transforms from other custom blocks (e.g., `prc-block/callout`).

### 6. **Custom Styles**

The included `style.scss` provides:

- Styles for all custom block styles and variations.
- Responsive CSS for device-specific visibility.
- Visual enhancements for divider, callout, card, and social group styles.

### 7. **Server-Side Enhancements**

- **Dynamic Inline Styles**: PHP generates and injects inline styles for divider colors and sticky backgrounds based on global theme palette.
- **Block Rendering**: The block's render callback ensures all enhancements are reflected on the frontend.

---

## Usage

Add a `core/group` block in the editor. Use the block sidebar to:

- Select a custom style (e.g., "Baseball Card", "Callout").
- Set device-specific visibility.
- Choose divider and sticky colors.

Choose a variation from the inserter for pre-configured layouts.

---

## Developer Notes

- All enhancements are registered via PHP and JavaScript for full compatibility with the block editor and server-side rendering.
- Styles and scripts are enqueued using block.json and PHP registration functions.
- The block is optimized for WordPress VIP and follows WordPress coding standards.

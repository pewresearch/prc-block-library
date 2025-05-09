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

The block supports device-specific visibility and max-width constraints:

- **Hide on Desktop/Tablet/Mobile**: Toggle block visibility per device.
- **Max Width per Device**: Set different max-widths for desktop, tablet, and mobile.
- **Responsive container queries**: Data attributes and CSS variables are used for fine-grained control.

### 3. **Color & Divider Controls**

- **Interior Divider**: Adds a divider between inner blocks, with customizable color.
- **Sticky Background/Text Colors**: Set background and text colors for sticky states.

### 4. **Custom Block Variations**

Several pre-configured variations are available:

- **Callout**: Oatmeal background, heading, and paragraph.
- **Baseball Card**: Card-style layout with heading, image, and text.
- **Post Infographics Card**: Card with heading and attached images.
- **Social Group**: For sharing/social meta override.

Each variation provides a unique layout and style, with example inner blocks and default attributes.

### 5. **Editor Enhancements**

- **Custom Controls**: Additional controls for color, responsive settings, and max width are injected into the block sidebar.
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
- Set device-specific visibility and max-width.
- Choose divider and sticky colors.

Choose a variation from the inserter for pre-configured layouts.

---

## Developer Notes

- All enhancements are registered via PHP and JavaScript for full compatibility with the block editor and server-side rendering.
- Styles and scripts are enqueued using block.json and PHP registration functions.
- The block is optimized for WordPress VIP and follows WordPress coding standards.

# Collapsible (Core Details Block Extension)

Contributors: Pew Research Center
Tags: block, collapsible, details, interactivity
Tested up to: 6.7
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

## Description

This extension enhances the core `core/details` block with additional functionality, including automatic closing when clicking outside the element and pre-configured variations for common use cases.

### Features

- **Close When Focus Lost**: Automatically close the details element when users click outside of it
- **Block Variations**: Pre-configured styles for "How we did this" sections and Pew Knight Initiative content
- **Transforms**: Easy migration from legacy `prc-block/collapsible` blocks

## Instructions

### Using Close When Focus Lost

1. Add a Details block to your content
2. In the block settings sidebar, find the "Details Settings" panel
3. Toggle "Close when focus lost" on
4. The details element will now automatically close when users click anywhere outside of it

This feature is useful for:

- Creating dismissible information panels
- Improving user experience by auto-closing expanded sections
- Implementing modal-like behavior without actual modals

### Block Variations

#### Collapsible (Default)

Pre-configured for "How we did this" sections with:

- Plus/minus icon style
- Beige background (`ui-beige-very-light`)
- Light gray border
- Default summary text: "How we did this"

#### Pew Knight Co-Branded

Designed for Pew Knight Initiative pages with:

- Custom logo header
- Plus/minus icon
- Top and bottom borders only
- Pre-populated content structure

## Technical Implementation

### Frontend Interactivity

- Uses WordPress Interactivity API for reactive behavior
- Event listener only attached when feature is enabled
- Proper cleanup to prevent memory leaks

### Attributes

- `closeWhenFocusLost` (boolean, default: `false`)

### Files

- `index.js` - Editor integration, variations, and transforms
- `controls.jsx` - Inspector controls for block settings
- `view.js` - Frontend Interactivity API logic
- `class-core-details.php` - Server-side rendering and attribute registration
- `editor.scss` - Editor-only styles
- `block.json` - Block metadata with Interactivity API support

## Changelog

= 1.0.0 =

- Added "Close when focus lost" feature with Interactivity API
- Added block variations for common use cases
- Added transforms from legacy collapsible block
- Improved editor experience with custom controls

## Developer Notes

### Building

```bash
# Build this block
npm run build -w @prc/block-library core-details

# Watch mode for development
npm run start -w @prc/block-library
```

### Interactivity API Integration

The block uses WordPress Interactivity API for the "close when focus lost" feature. The implementation:

1. Registers a custom attribute via `block_type_metadata` filter
2. Uses `WP_HTML_Tag_Processor` to inject IAPI directives in `render_block` filter
3. Implements event handling in `view.js` with proper cleanup

See `class-core-details.php` for the server-side implementation and `view.js` for the client-side logic.

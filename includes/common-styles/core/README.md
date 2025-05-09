# Common Styles: Responsive Content Justification

This directory contains shared styles for core block layouts in the PRC Block Library. The `style.scss` file provides utility classes for responsive content justification, specifically for use with Gutenberg blocks in WordPress.

## File: `src/style.scss`

### Purpose

The SCSS file defines utility classes that adjust the horizontal alignment (`justify-content`) of block content responsively, targeting mobile devices (screen widths up to 768px). These classes are intended to be used in conjunction with blocks that use flexbox layouts, allowing for dynamic adjustment of content alignment based on device size.

### Utility Classes

- **`.is-content-justification-space-between__on-mobile__right`**
  - On mobile (`max-width: 768px`), sets `justify-content: flex-end;` (aligns content to the right), when already set to `space-between` on desktop.

- **`.is-content-justification-space-between__on-mobile__left`**
  - On mobile, sets `justify-content: flex-start;` (aligns content to the left), when already set to `space-between` on desktop.

- **`.is-content-justification-right__on-mobile__space-between`**
  - On mobile, sets `justify-content: space-between;` (evenly distributes content with space between each item), when already set to `right` on desktop.

- **`.is-content-justification-left__on-mobile__space-between`**
  - On mobile, sets `justify-content: space-between;` (evenly distributes content with space between each item), when already set to `left` on desktop.

### Usage

Apply these classes to block elements (or their wrappers) to control content alignment responsively in the block editor and on the front end. These are especially useful for layouts that need to adapt to different screen sizes while maintaining editorial control in the Gutenberg editor.

#### Example:

```html
<div class="wp-block-group is-content-justification-space-between__on-mobile__right is-content-justification-space-between">
  <!-- Block content here will be right-aligned on mobile -->
</div>
```

### Notes
- These classes are intended for use with blocks that utilize flexbox for layout.
- The styles are automatically scoped to elements with a class containing `wp-block-` to ensure they only affect block elements.
- You can combine these classes with other block editor alignment utilities for more granular control.

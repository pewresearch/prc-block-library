# Customizations: `core/heading` Block & Table of Contents Integration

## Overview

The `core/heading` block in this platform is extended to support dynamic Table of Contents (TOC) generation and enhanced editorial workflows. These customizations ensure that headings can be programmatically identified as chapter/section headings, support alternate TOC labels, and interact seamlessly with the `prc-block/table-of-contents` block using WordPress Interactivity API global state.

---

## Key Additions & Features

### 1. New Block Attributes

- **`isChapter`** (`boolean`, default: `false`)
  - Marks a heading as a chapter/section for TOC purposes.
  - Automatically set for legacy content (see below).
- **`altTocText`** (`string`, default: `""`)
  - Allows editors to specify alternate text for the TOC entry, overriding the heading's visible text.

### 2. Legacy Content Detection

- For posts published before 2022, any `<h3>` heading is automatically treated as a chapter heading (`isChapter: true`), unless explicitly overridden.
- This is determined once per post using the post's date and stored in block context as `prcLegacyChapter`.

### 3. Heading ID Normalization

- Heading IDs are normalized for consistency and readability:
  - IDs starting with `h-` have the prefix removed.
  - IDs like `h-1-title` become `one-title` (number converted to word).
  - If no ID is present, a reproducible hash is generated from the heading content.

### 4. Interactivity API State for TOC

- When a heading is marked as a chapter (`isChapter: true`), its ID and label (from `altTocText` or heading text) are injected into the Interactivity API state under the namespace `prc-block/table-of-contents`.
- This state is used by the `prc-block/table-of-contents` block to dynamically build the TOC in the editor and on the frontend.

### 5. Data Attributes for Dynamic Behavior

- Chapter headings receive:
  - `data-is-section="true"`
  - `data-wp-interactive` and `data-wp-context` for Interactivity API
  - `data-wp-on-document--scroll="callbacks.watchForSectionScroll"` for scroll tracking

---

## How It Works with `prc-block/table-of-contents`

1. **Marking Sections:**  
   Editors can mark any heading as a chapter/section via the block controls (`isChapter`). For legacy posts, this is automatic for `<h3>`.

2. **TOC Label Customization:**  
   Editors can provide an alternate label for the TOC via `altTocText`.

3. **TOC Global State Population:**  
   On render, each chapter heading updates the Interactivity API state with its ID and label. The `prc-block/table-of-contents` block reads this state to build the TOC.

4. **Dynamic Updates:**  
   Changes to headings or their attributes are reflected in the TOC in real time, both in the editor and on the frontend.

---

## Example: Block Markup

A chapter heading might render as:

```html
<h3
  id="one-introduction"
  data-is-section="true"
  data-wp-interactive='{"namespace":"prc-block/table-of-contents"}'
  data-wp-context='{"id":"one-introduction"}'
  data-wp-on-document--scroll="callbacks.watchForSectionScroll"
>
  Introduction
</h3>
```

---

## Editorial Workflow

- **To add a section to the TOC:**  
  Use the heading block, enable "Chapter/Section" in block controls, and (optionally) set an alternate TOC label.
- **For legacy content:**  
  `<h3>` headings in posts before 2022 are auto-included in the TOC.
- **TOC Block:**  
  Insert the `prc-block/table-of-contents` block anywhere in the post. It will auto-populate based on the headings marked as chapters/sections.

---

## Technical Notes

- All customizations follow WordPress and VIP coding standards.
- Server-side rendering ensures dynamic, up-to-date TOC generation.
- The system is optimized for cache coherence and performance on VIP infrastructure.

---

For further details, see the implementation in `class-core-heading.php` and the TOC block in `src/table-of-contents/`.

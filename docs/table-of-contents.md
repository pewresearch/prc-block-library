# Table of Contents

Renders a navigable table of contents for multi-section reports. Supports hierarchical structures with parts, chapters, and in-page sections. Highlights the current section on scroll and provides smooth-scroll navigation.

## Namespace

`prc-block/table-of-contents`

## Category

`theme`

## Supports

| Feature | Detail |
|---|---|
| Anchor | Yes |
| HTML | No |
| Align | `left`, `right` |
| Color | Background, text, link |
| Interactivity | Yes |
| Spacing | `margin`, `padding`, `blockGap` |
| Typography | `fontFamily`, `fontSize`, `lineHeight` |

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `showCurrentChapter` | `boolean` | `false` | Highlight the current in-page section while scrolling |
| `backgroundColor` | `string` | -- | Named background color slug |
| `textColor` | `string` | -- | Named text color slug |
| `linkColor` | `string` | -- | Named link color slug |
| `activeBackgroundColor` | `string` | -- | Named color for the active item background |
| `activeTextColor` | `string` | -- | Named color for the active item text |
| `customActiveBackgroundColor` | `string` | -- | Custom hex for active background |
| `customActiveTextColor` | `string` | -- | Custom hex for active text |
| `hoverBackgroundColor` | `string` | -- | Named color for hovered items |
| `hoverTextColor` | `string` | -- | Named color for hovered item text |
| `customHoverBackgroundColor` | `string` | -- | Custom hex for hover background |
| `customHoverTextColor` | `string` | -- | Custom hex for hover text |

## Available Styles

| Style | Description |
|---|---|
| (default) | Ordered list with nested chapters and sections |
| `rls-accordion` | Accordion layout using `<details>` elements, with custom FontAwesome icons per part slug (Religion Landscape Study specific) |

## Inner Blocks

None. Content is generated server-side from post meta (`multiSectionReport`, `package_parts`).

## Parent / Ancestor Requirements

None. Typically placed in a sidebar or template part alongside report content.

## Context

| Direction | Key | Maps to |
|---|---|---|
| Uses | `postId` | Current post ID |
| Uses | `postType` | Current post type |

## Usage

The TOC block reads report structure from post metadata to build a hierarchical navigation:

- **Simple reports** (no package parts): flat list of chapters from `multiSectionReport` meta.
- **Multi-part reports** (with `package_parts`): grouped hierarchy of parts containing chapters, plus "unattached" chapters that fall outside any part.

In the editor, the `useTOC` hook fetches chapter data from the entity record's `table_of_contents` field and merges in heading blocks marked with `isChapter: true` from the current post. The `withColors` HOC provides active/hover color management.

Inspector controls:
- **Highlight Current Chapter** -- enables scroll-spy to visually mark the current in-page heading.
- **Color Controls** -- active background/text and hover background/text color pickers via `ColorControls`.

## Block Markup (save)

The block has no save output. All markup is generated server-side.

## PHP Rendering

`class-table-of-contents.php` (`PRC\Platform\Blocks\Table_Of_Contents`)

**Initialization:**
- Disables `core/table-of-contents` and `yoast-seo/table-of-contents` via `allowed_block_types_all` filter.
- Registers the `rls-accordion` block style with inline icon CSS.

**Data assembly (`parse_toc_items`):**
1. Checks `wp_cache_get` for cached TOC items (1-hour TTL, bypassed for logged-in users).
2. Reads `package_parts` and `multiSectionReport` from parent post meta.
3. For simple reports: maps chapters to `{ label, slug, url, is_active, sections }`.
4. For multi-part reports: nests chapters into parts, marks active states, collects unattached chapters.
5. Always prepends the package root as an unattached entry.

**Render callback:**
1. Calls `parse_toc_items` with parent and current post IDs.
2. Sets `wp_interactivity_state` with `postId`, `parentId`, `partsEnabled`, scroll watchers.
3. Selects list or accordion template based on className.
4. Outputs `<ol>` wrapper with Interactivity API directives: `data-wp-init` for section mapping and scroll watcher, `data-wp-on-document--scroll` for scroll tracking.
5. List template uses `<template data-wp-each>` for parts, chapters, and sections.
6. Appends color CSS custom properties via `WP_HTML_Tag_Processor`.

## Frontend Interactivity

`view.js` registers the `prc-block/table-of-contents` store.

**State:**
- `isActive` -- computed getter checking `part.is_active`, `chapter.is_active`, or `section.is_active` based on context depth.

**Actions:**
- `getInternalChaptersList` -- locates the inner chapters `<ul>` within the block DOM.
- `initSmoothScrollClickHandler` -- attaches click listeners for hash-link smooth scrolling on internal chapter links.
- `getContextClue` -- determines context level (part/chapter/section) from available context properties.

**Callbacks:**
- `mapFoundSectionsToChapters` -- maps `sectionsFound` (from `core/heading` blocks) into their respective part/chapter `sections` arrays.
- `hasListItems` -- returns whether the current part or chapter has sections to display.
- `isActive` -- mirrors `state.isActive` for use in templates.
- `scrollSmoothly` -- `preventDefault` + smooth scroll to target heading using `scrollToElementWithOffset`, which accounts for WP admin bar (32px) and mobile offsets.
- `initWatchForSectionScroll` -- enables scroll watching if `highlightCurrentSection` is true.
- `watchForCurrentSection` -- compares each section's key against `state.currentSection` to toggle `is_active`.
- `watchForSectionScroll` -- on `document:scroll`, iterates heading elements by `offsetTop` to determine which section is currently in view (50px threshold).

**Smooth scroll offsets:**
- Mobile breakpoint: 782px
- Mobile scroll offset: 32px
- Admin bar heights: 32px (both mobile and desktop)

## Related Blocks

| Block | Relationship |
|---|---|
| `core/table-of-contents` | Disabled in favor of this block |
| `yoast-seo/table-of-contents` | Disabled in favor of this block |
| `core/heading` | Source of in-page section data (`isChapter` attribute, section IDs) |

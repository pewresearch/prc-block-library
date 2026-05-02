# Core Heading

PRC's override/extension of the WordPress `core/heading` block.

## Block Namespace

`prc-block/core-heading`

**Target Block:** `core/heading`

## What PRC Customizes

-   Changes the default heading level from H2 to H4
-   Adds "chapter/section" functionality for table of contents integration
-   Adds an alternate TOC text attribute for overriding what appears in the table of contents
-   Registers "Heading" (default, H4), "Section" (chapter heading), and "Layout Heading" variations
-   Registers "Layout Heading" and "Hidden" block styles
-   Cleans up auto-generated heading IDs (removes `h-` prefix, converts leading numbers to words)
-   Generates reproducible IDs for headings without anchors
-   Integrates chapter headings with `prc-block/table-of-contents` Interactivity API state
-   Handles legacy chapter detection for posts published before March 2023
-   Provides transforms from legacy `[chapter]` shortcode and `prc-block/chapter` block

## Supports Modifications

None directly via supports. However, the default heading level is changed to 4 via `block_type_metadata_settings`.

## Additional Attributes

| Attribute    | Type      | Default | Description                                                                       |
| ------------ | --------- | ------- | --------------------------------------------------------------------------------- |
| `isChapter`  | `boolean` | `false` | Marks the heading as a section/chapter heading for TOC inclusion                  |
| `altTocText` | `string`  | `''`    | Alternate text to display in the table of contents instead of the heading content |

Registered both server-side (`block_type_metadata`) and client-side (`blocks.registerBlockType`).

**Additional context consumed:**

| Context Key        | Description                               |
| ------------------ | ----------------------------------------- |
| `postId`           | Used for legacy chapter heading detection |
| `prcLegacyChapter` | Set to `true` for posts before March 2023 |

## Available Styles

| Style Name       | Label          | Description                                                                        |
| ---------------- | -------------- | ---------------------------------------------------------------------------------- |
| `layout-heading` | Layout Heading | Black bottom border with 4px padding and 24px margin                               |
| `hidden`         | Hidden         | Visually hidden (0px font, 0 opacity, 0 height) on frontend; 50% opacity in editor |

## Style Overrides

From `style.scss`:

**Hidden style:** On the frontend, headings with `is-style-hidden` (excluding editor context) get zero font size, zero opacity, zero height. In the editor, they display at 50% opacity.

**Layout heading:** `is-style-layout-heading` gets a 1px solid black bottom border, 4px bottom padding, 24px bottom margin.

**Legacy section-header:** Same visual treatment as layout-heading (backward compatibility).

**Sub-header alt:** Black background with white text, display block.

## Editor Enhancements

From `index.js` and `controls.jsx`:

-   Wraps block edit with custom controls via `createHigherOrderComponent`
-   **Toolbar:** Adds a **book-alt** icon toggle with labels **Make Chapter** / **Remove Chapter** to set `isChapter`. When turning a heading into a chapter, if `getAnchorFromContent(content)` yields a slug, the block **also sets the `anchor` attribute** so the fragment ID matches the heading text.
-   **Inspector Advanced Controls:** When `isChapter` is true, shows an **Alternate TOC Text** text field (placeholder shows current heading `content`).
-   **Anchor sync (H3 and H4):** For heading levels **3 and 4**, a `useEffect` keeps the **`anchor` attribute** aligned with **`getAnchorFromContent(content)`** when the heading text changes or when the level switches into H3/H4 (same slug rules as below). Other levels do not receive automatic anchor updates from content.
-   **`getAnchorFromContent`** (`src/core-heading/utils.js`): derives a URL slug from the raw RichText `content` — decode HTML entities, strip tags (inserting a space at tag boundaries so words do not run together), collapse whitespace, then `cleanForSlug`. Covered by `src/core-heading/test/utils.test.js`.
-   Registers transforms from legacy blocks
-   Registers three block variations

## Frontend Interactivity

No dedicated `view.js`. Interactivity is handled server-side by injecting attributes on chapter headings that integrate with the `prc-block/table-of-contents` store.

## PHP Rendering

**Class:** `Core_Heading`

Key behaviors:

1. **ID cleanup:** Removes `h-` prefix from auto-generated IDs. Converts leading numbers to words (e.g., `h-5-things` becomes `five-things`). Falls back to an MD5 hash of block content for reproducible IDs.

2. **Legacy chapter detection:** For the first heading in `core/post-content`, checks if the post date is before March 2023. If so, sets `prcLegacyChapter` context to `true`, which auto-marks H3 headings as chapters.

3. **Table of contents integration:** When `isChapter` is true:

    - Registers the heading in `wp_interactivity_state('prc-block/table-of-contents')` under `sectionsFound`
    - Uses `altTocText` as the TOC label if provided, otherwise strips tags from heading content
    - Adds `data-is-section="true"` attribute
    - Adds `data-wp-interactive` and `data-wp-context` for TOC interactivity

4. **Context filter:** `check_if_legacy_chapter_heading` runs once per post to determine legacy status, avoiding repeated database lookups.

## Block Markup Example

```html
<!-- Standard heading (H4 default) -->
<h4 class="wp-block-heading" id="survey-methodology">Survey Methodology</h4>

<!-- Chapter/section heading with TOC integration -->
<h3
	class="wp-block-heading"
	id="key-findings"
	data-is-section="true"
	data-wp-interactive='{"namespace":"prc-block/table-of-contents"}'
	data-wp-context='{"id":"key-findings"}'
>
	Key Findings
</h3>

<!-- Layout heading -->
<h3 class="wp-block-heading is-style-layout-heading">Related Reports</h3>

<!-- Hidden heading (accessibility only) -->
<h4 class="wp-block-heading is-style-hidden">Screen reader only text</h4>
```

## Variations

| Variation Name   | Title          | Description                             | Default Level |
| ---------------- | -------------- | --------------------------------------- | ------------- |
| `heading`        | Heading        | Default heading variation               | H4            |
| `section`        | Section        | Chapter/section heading included in TOC | H3            |
| `layout-heading` | Layout Heading | Heading with bottom border styling      | H3            |

## Transforms

| Source                                  | Type      | Description                                                     |
| --------------------------------------- | --------- | --------------------------------------------------------------- |
| `[chapter]` shortcode                   | Shortcode | Converts `[chapter title="..."]` to H2 chapter heading          |
| `prc-block/chapter`                     | Block     | Converts legacy chapter block to heading with `isChapter: true` |
| `core/shortcode` containing `[chapter]` | Block     | Extracts title and creates H2 chapter heading                   |

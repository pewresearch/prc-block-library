# Sub-Title

## Block Overview

| Property    | Value                                                                              |
| ----------- | ---------------------------------------------------------------------------------- |
| Name        | `core/heading` (variation: `sub-title`)                                            |
| Title       | Sub-title                                                                          |
| Category    | Core heading variation                                                             |
| Description | Displays and edits the post sub-title via block bindings to `sub_title` post meta. |

The legacy `prc-block/subtitle` block remains registered in the deprecated folder for backward compatibility with existing content, but it is no longer insertable.

## Registration and assets

- **Client** ([`block-bindings.js`](../src/core-heading/block-bindings.js)): registers a `core/heading` variation named `sub-title` with `metadata.bindings.content` pointing at `core/post-meta` (`key: sub_title`) and `className: is-style-sub-title`.
- **Styles** ([`style.scss`](../src/core-heading/style.scss)): the `is-style-sub-title` block style applies serif italic typography, fluid font sizing, and sub-title spacing on the frontend and in the editor.
- **Server** ([`class-core-heading.php`](../src/core-heading/class-core-heading.php)):
    - Registers `sub_title` and legacy `sub_headline` post meta with `show_in_rest: true`.
    - Strips duplicate bound sub-title headings rendered inside `core/post-content`.
    - Suppresses empty bound sub-title headings on the frontend.
- **Legacy block** ([`deprecated/src/sub-title/`](../deprecated/src/sub-title/)): `prc-block/subtitle` remains registered with `"inserter": false`. Its render callback returns empty output on the frontend; the editor UI remains available for unmigrated in-content instances.

## Data flow and post meta

| Layer              | Meta key(s) | Behavior                                                                                                                               |
| ------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Editor**         | `sub_title` | Edited directly in the canvas through core's post-meta block binding on the `core/heading` sub-title variation.                        |
| **Frontend (PHP)** | `sub_title` | Core's binding processor fills the heading content from post meta. `Core_Heading::render_sub_title_heading()` suppresses empty output. |
| **Legacy editor**  | `sub_title` | Unmigrated `prc-block/subtitle` instances still read/write `sub_title` via `useEntityProp`.                                            |

## Usage Instructions

1. Insert the **Sub-title** variation from the heading block inserter.
2. Type the sub-title in the canvas. Core binds the heading content to `sub_title` post meta.
3. Use heading block controls for alignment and other overrides. Typography and spacing come from the **Sub-title** block style (`is-style-sub-title`).
4. Place a bound sub-title heading in post content for editing and in the theme template for display.
5. Duplicate in-content sub-titles are stripped on the frontend when the template already renders one.

## Block Markup Example

```html
<!-- wp:heading {"level":2,"className":"is-style-sub-title","metadata":{"bindings":{"content":{"source":"core/post-meta","args":{"key":"sub_title"}}}}} -->
<h2 class="wp-block-heading is-style-sub-title">
	This is the sub-title text for the article
</h2>
<!-- /wp:heading -->
```

## Migration

Two WP-CLI commands are available under `wp prc block-library`:

| Command                  | Purpose                                                                  |
| ------------------------ | ------------------------------------------------------------------------ |
| `migrate-sub-headline`   | Copies legacy `sub_headline` meta to `sub_title`.                        |
| `migrate-subtitle-block` | Converts in-content `prc-block/subtitle` blocks to bound `core/heading`. |

Both default to dry-run mode. Pass `--dry-run=false` to write changes.

## Related Blocks

- **`core/post-title`** — The main post title block. Sub-title is typically placed immediately after it.
- **`core/post-content`** — In-content bound sub-title headings are stripped when they would duplicate the template display.

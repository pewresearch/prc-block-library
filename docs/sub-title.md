# Sub-Title

## Block Overview

| Property    | Value                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------- |
| Name        | `prc-block/subtitle`                                                                          |
| Title       | Sub-title                                                                                     |
| Category    | `layout`                                                                                      |
| Version     | 0.1.0                                                                                         |
| Text domain | `post-sub-title`                                                                              |
| Description | Displays the sub-title of a post.                                                             |
| Keywords    | `subtitle`, `sub-title`, `subtitle` (three entries in `block.json`; `subtitle` appears twice) |

`block.json` includes an **example** with `textAlign: "left"` for the block inserter preview.

## Registration and assets

-   **Client** ([`index.js`](../src/sub-title/index.js)): `registerBlockType` merges `block.json` with an `edit` component and the block **icon** (`title` from `@wordpress/icons`). There is **no `save`** implementation — this is a **dynamic block**; frontend markup comes only from `Sub_Title::render_callback()`.
-   **Server** ([`class-sub-title.php`](../src/sub-title/class-sub-title.php)): `register_block_type_from_metadata()` points at [`build/sub-title`](../build/sub-title) (compiled assets and copied `block.json`).
-   **Assets in `block.json`**: `editorScript` → built `index.js`, `editorStyle` → built `index.css` (from [`editor.scss`](../src/sub-title/editor.scss)). There is **no** `style` or `viewScript` — no block-level frontend bundle; appearance on the site comes from **theme.json** (and supports) as described below.

## Supports

| Feature      | Enabled                                                                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTML editing | No                                                                                                                                                                                              |
| Anchor       | Yes                                                                                                                                                                                             |
| Multiple     | No (only one instance per post)                                                                                                                                                                 |
| Color        | text, background                                                                                                                                                                                |
| Spacing      | margin (top/bottom), padding                                                                                                                                                                    |
| Typography   | fontSize, lineHeight, fontFamily, fontWeight, fontStyle, textTransform, textDecoration, letterSpacing; default controls enabled for font size, font appearance, text transform, and line height |

## Attributes

| Attribute   | Type     | Default  | Description                                                  |
| ----------- | -------- | -------- | ------------------------------------------------------------ |
| `textAlign` | `string` | _(none)_ | Text alignment: `left`, `center`, `right` (toolbar control). |

Block typography and colors come from **supports** (global styles / theme.json), not from custom `fontSize` or `style` attributes on the block.

## Uses Context

| Context Key | Description        |
| ----------- | ------------------ |
| `postType`  | Current post type. |
| `postId`    | Current post ID.   |

## Editor vs frontend markup

-   **Editor**: The editable field is a `RichText` with `tagName="div"`, **no inline formats** (`allowedFormats={[]}`), **no line breaks** (`disableLineBreaks`), and `keepPlaceholderOnFocus` so the placeholder stays visible when the field is focused until the user types. Splitting at the end of the field inserts the default paragraph block (`__unstableOnSplitAtEnd`). Alignment uses **BlockControls** (`AlignmentControl`).
-   **Frontend**: The dynamic render outputs an `<h2>` with `aria-level="2"` and alignment classes (see below).

## Editor-only styles

[`editor.scss`](../src/sub-title/editor.scss) applies a fluid `font-size` clamp to `.wp-block-prc-block-subtitle` in the editor so the control matches approximate title scale.

### Theme defaults (prc-design-system)

On sites using the **prc-design-system** theme, [`theme.json`](../../../themes/prc-design-system/theme.json) defines block styles under `styles.blocks['prc-block/subtitle']`: serif font family, `font-size` from preset `h-two` (with a custom fluid clamp via `css`), italic, weight `400`, and `lineHeight` `1.25`. Frontend appearance follows these theme defaults plus block **supports** (editors can still override color/spacing/typography where the theme allows).

## Available Styles

None defined in `block.json`.

## Inner Blocks

This block does not accept inner blocks.

## Parent / Ancestor Requirements

None. Typically placed in post templates directly below the post title.

## Data flow and post meta

| Layer              | Meta key(s)                      | Behavior                                                                                                                                                                                                                                                                |
| ------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Editor**         | `sub_headline`                   | Read/write via `useEntityProp` (`postType` / `postId` / `meta`). Updates only run when `postId` is defined. If `sub_headline` is empty, the field shows a **default Lorem ipsum** string until the user edits (placeholder copy is also defined for empty focus state). |
| **Frontend (PHP)** | `sub_title`, then `sub_headline` | `render_callback` prefers `sub_title`, then falls back to legacy `sub_headline`. If neither has a value, output is empty.                                                                                                                                               |

Until the block is switched to read/write `sub_title` in the editor (see TODO in [`class-sub-title.php`](../src/sub-title/class-sub-title.php)), content saved only in `sub_title` will **render on the frontend** but **will not appear** in the RichText field in the editor.

## Usage Instructions

1. Insert the **Sub-title** block, typically below the post title in a template or post content.
2. Type the sub-title in the block using the inline RichText control (**plain text only**; no bold/italic or line breaks).
3. Use the **alignment** toolbar control to set text alignment (left, center, right).
4. Sub-title text for editing is stored in post meta **`sub_headline`** (see data flow above for `sub_title` vs `sub_headline`).
5. Only one Sub-title block is allowed per post (`"multiple": false`).
6. If no sub-title meta exists for the post, the **frontend** renders nothing. The **editor** may still show the default filler text in the field when `sub_headline` is empty.
7. Child posts (posts with a parent) do not render the sub-title on the **frontend**.

## Block Markup Example (frontend)

```html
<h2 class="wp-block-prc-block-subtitle has-text-align-left" aria-level="2">
	This is the sub-title text for the article
</h2>
```

## PHP Rendering

The block is server-side rendered via `Sub_Title::render_callback()`:

-   Reads the post ID from block context (`postId`).
-   Returns empty string if no `postId` is available or if the post is a child (has a parent).
-   Looks up the sub-title from post meta: **`sub_title` first**, then **`sub_headline`** (legacy).
-   Returns empty string if no sub-title value exists.
-   Renders as an `<h2>` tag with `aria-level="2"` and the configured text alignment class.

### Additional PHP Behavior

-   **Duplicate removal**: Increments a counter on each `render_block_prc-block/subtitle` pass. On singular `post` views, when that counter is **two or more** (subtitle already rendered earlier in the request, e.g. in the template), `render_block_core/post-content` strips a duplicate by replacing the matching `<h2 class="...wp-block-prc-block-subtitle...">` with an HTML comment placeholder. In `local` environment, the count is emitted for Query Monitor via `do_action( 'qm/debug', ... )`.
-   **Post meta registration**: Registers both `sub_headline` (legacy) and `sub_title` (new) post meta fields, both as strings with `show_in_rest: true`.

## Frontend Interactivity

No `viewScript` or Interactivity API store. Output is **server-rendered** on each request (`render_callback`); there is no client-side hydration script for this block.

## Related Blocks

-   **`core/post-title`** -- The main post title block. Sub-title is typically placed immediately after it.
-   **`core/post-content`** -- The sub-title block inside post content is removed when it would duplicate a subtitle already rendered from the template.

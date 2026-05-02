# Taxonomy Index A-Z Controller

Container block that renders an alphabetical (A–Z) index of taxonomy terms. On desktop, displays a letter navigation bar alongside a grid of term lists. On mobile, automatically converts to an accordion layout using `prc-block/accordion-controller`.

## Namespace

`prc-block/taxonomy-index-az-controller`

## Category

`theme`

## Description

Per `block.json`: provides a grid of A–Z index blocks that transform to an accordion on mobile.

## Inserter preview

`block.json` includes an `example` that matches the default inner template: a `grid-controller` with three `grid-column` blocks (spans and per-column `allowedBlocks` for `taxonomy-index-az-list`). This drives the block inserter preview.

## Supports

| Feature    | Detail                                        |
| ---------- | --------------------------------------------- |
| Anchor     | Yes                                           |
| HTML       | No                                            |
| Spacing    | `blockGap`, `margin` (top, bottom), `padding` |
| Typography | `fontSize`, `fontFamily`                      |

## Attributes

| Attribute       | Type     | Default      | Description                                                                                                                                        |
| --------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowedBlocks` | `array`  | —            | If set, restricts which block types can be inserted as inner blocks; otherwise the editor falls back to the default allowed list (see `edit.jsx`). |
| `orientation`   | `string` | `"vertical"` | Passed to `useInnerBlocksProps` for inner block list orientation.                                                                                  |

## Available Styles

None declared in `block.json`.

## Inner blocks

Accepts inner blocks. The default template inserts one `prc-block/grid-controller` containing **three** `prc-block/grid-column` blocks:

| Column | Desktop span | Tablet span | `allowedBlocks` on column               |
| ------ | ------------ | ----------- | --------------------------------------- |
| 1      | 4            | 2           | `prc-block/taxonomy-index-az-list` only |
| 2      | 4            | 4           | same                                    |
| 3      | 4            | 2           | same                                    |

The default `ALLOWED_BLOCKS` in `edit.jsx` also permits `core/group`, `core/paragraph`, `prc-block/grid-controller`, and `prc-block/taxonomy-index-az-list` when `allowedBlocks` is not overridden on the controller.

## Parent / ancestor requirements

None.

## Context

None declared.

## Editor UI

The edit view renders a static **Letters** preview: a `<ul class="wp-block-prc-block-taxonomy-index-az-controller--list">` with A–Z as `<span>` elements (not live links). Inner blocks (grid + lists) render below. The server-rendered frontend letter bar uses real anchor links and `disabled` state — see PHP rendering.

## Usage

Insert the A–Z Controller block to create an alphabetical taxonomy index. The editor shows the letter strip plus the grid template for term lists.

The block adapts by device:

-   **Desktop / non-mobile:** Renders the A–Z letter navigation as a `<ul>` of anchors (`href="#A"` … `href="#Z"`) ahead of the saved inner block content. Letters without a matching `taxonomy-index-az-list` block for that letter get a `disabled` class on the anchor.
-   **Mobile (`jetpack_is_mobile()`):** Replaces the output with a synthesized `prc-block/accordion-controller` (default `borderColor`: `ui-white`) wrapping one `prc-block/accordion` per letter that has a list block; each accordion contains a `taxonomy-index-az-list` with `disableHeading: true` and copied `letter`, `exclude`, and `taxonomy` attributes.

## Block markup (save)

`<InnerBlocks.Content />` only — structure comes from the editor template and user edits. The PHP render callback prepends the letter nav (desktop) or replaces with accordion markup (mobile).

## PHP rendering

`class-taxonomy-index-az-controller.php` (`PRC\Platform\Blocks\Taxonomy_Index_AZ_Controller`)

**`render_block_callback()`**

-   Returns early with no output when `is_admin()` is true (see class — frontend-style block rendering should run outside that path).
-   If `jetpack_is_mobile()` is true, output is delegated to `render_as_accordion_block()`.
-   Otherwise prepends `render_az_list()` to the saved `$content` and wraps both in a `<div>` with `get_block_wrapper_attributes()`.

**`render_az_list($block)`**

-   Walks nested inner blocks: `grid-controller` → columns → `taxonomy-index-az-list` blocks, collecting `letter` attributes (uppercased).
-   Builds `<ul class="wp-block-prc-block-taxonomy-index-az-controller--list">` with one `<li><a href="#LETTER" class="…">` per A–Z letter; adds a `disabled` class when that letter has no list block.

**`render_as_accordion_block($block)`**

-   Builds serialized block comments for `prc-block/accordion` + inner `prc-block/taxonomy-index-az-list` per letter found, then wraps in `prc-block/accordion-controller`, parses with `parse_blocks()` / `render_block()`.

## Frontend styles (`style.scss`)

-   **Letter bar** (`.wp-block-prc-block-taxonomy-index-az-controller--list`): horizontal flex row, no list bullets, sans-serif font, vertical margins (`margin-block-start` / `margin-block-end`). Each letter cell grows equally (`flex-grow: 1`); links/spans are centered, bold 18px, black; `.disabled` uses `opacity: 0.2`; hover adds gray background and underline.
-   **Lists inside the controller**: each `.wp-block-prc-block-taxonomy-index-az-list` gets bottom spacing, padding, and a light gray bottom border; the last list inside a grid column drops the bottom border.
-   **Dark mode** (`prefers-color-scheme: dark`, `body.logged-in`): letter links use `var(--wp--preset--color--ui-text-color)`.

## Frontend interactivity

No Interactivity API store is registered for this block. Desktop navigation uses in-page anchors. Mobile accordion behavior comes from `prc-block/accordion-controller`.

## Related blocks

| Block                              | Relationship                                                           |
| ---------------------------------- | ---------------------------------------------------------------------- |
| `prc-block/taxonomy-index-az-list` | Child block listing terms per letter                                   |
| `prc-block/accordion-controller`   | Wraps mobile accordion layout (`borderColor` `ui-white` in PHP output) |
| `prc-block/accordion`              | One panel per letter on mobile                                         |
| `prc-block/grid-controller`        | Desktop grid wrapper                                                   |
| `prc-block/grid-column`            | Columns in the default three-column layout                             |

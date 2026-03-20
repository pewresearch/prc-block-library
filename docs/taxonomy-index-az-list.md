# Taxonomy Index A-Z List

Displays a list of taxonomy terms starting with a specific letter. Designed as a child block within `prc-block/taxonomy-index-az-controller` to power alphabetical taxonomy indexes. Fetches terms server-side and exposes a REST endpoint for dynamic retrieval.

## Namespace

`prc-block/taxonomy-index-az-list`

## Category

`theme`

## Supports

| Feature | Detail |
|---|---|
| Anchor | Yes |
| HTML | No |
| Spacing | `blockGap`, `margin`, `padding` |
| Typography | `fontSize`, `fontFamily` |

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `letter` | `string` | -- | The alphabet letter this list displays terms for |
| `exclude` | `array` | `[]` | Term IDs to exclude from the list |
| `taxonomy` | `array` | `["category"]` | Taxonomy slugs to query terms from |
| `disableHeading` | `boolean` | `false` | When true, suppresses the `<h2>` letter heading above the term list |

## Available Styles

None declared in `block.json`.

## Inner Blocks

None. Content is generated entirely server-side from taxonomy term queries.

## Parent / Ancestor Requirements

None declared, but functionally used inside `prc-block/taxonomy-index-az-controller`.

## Context

None declared.

## Usage

Each A-Z List block represents a single letter in the alphabetical index. Configure the `letter` attribute (e.g., "A") and one or more taxonomies to query. The block fetches all terms whose names start with that letter and renders them as a linked list.

The `exclude` attribute accepts an array of term IDs to omit from results. The `disableHeading` attribute hides the letter heading when the parent controller already provides letter labels (e.g., in accordion mode).

## Block Markup (save)

No save output. All markup is generated server-side.

## PHP Rendering

`class-taxonomy-index-az-list.php` (`PRC\Platform\Blocks\Taxonomy_Index_AZ_List`)

**REST endpoint:**

- Route: `prc-api/v3/blocks/taxonomy-index-az-list` (GET)
- Permission: requires `read` capability
- Parameters: taxonomy, letter, excludes

**Key methods:**

- `get_terms_by_letter($taxonomy, $letter, $excludes)` -- Queries terms via `get_terms()` using `name__like` parameter, then filters results to only those whose name actually starts with the specified letter (since `name__like` matches anywhere in the name). Results are cached.
- `render_block_callback()` -- Outputs a `<div>` containing an optional `<h2>` heading with the letter (unless `disableHeading` is true) followed by a `<ul>` of term links. Each `<li>` contains an `<a>` linking to the term archive URL.

## Frontend Interactivity

No Interactivity API store is registered. The block renders static HTML with standard anchor links to term archive pages.

## Related Blocks

| Block | Relationship |
|---|---|
| `prc-block/taxonomy-index-az-controller` | Parent container that manages the A-Z navigation |

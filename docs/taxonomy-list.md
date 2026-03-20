# Taxonomy List

Navigation container block that holds `prc-block/taxonomy-list-link` and `prc-block/taxonomy-search` blocks to build structured taxonomy menus. Provides the taxonomy context to its children and renders as a `<nav>` element.

## Namespace

`prc-block/taxonomy-list`

## Category

`theme`

## Supports

| Feature | Detail |
|---|---|
| Anchor | Yes |
| HTML | No |
| Color | Text, link, background |
| Layout | Flex (vertical default), orientation, justification, sizing on children |
| Spacing | `margin`, `padding`, `blockGap` (default: `0.3em`) |
| Typography | `fontSize`, `fontFamily`, `fontWeight`, `fontStyle`, `textTransform`, `textDecoration` (skip serialization for `textDecoration`), `letterSpacing`, `lineHeight` |

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `templateLock` | `string` or `boolean` | -- | Controls inner block template locking |
| `taxonomy` | `string` | `"category"` | The taxonomy slug this list displays terms for |
| `style` | `object` | `{ spacing: { blockGap: "0.3em" } }` | Default style object with block gap |

## Available Styles

None declared in `block.json`. Styling is controlled through block supports and child block variations.

## Inner Blocks

Allowed blocks:
- `prc-block/taxonomy-list-link` -- individual term links
- `prc-block/taxonomy-search` -- search input for filtering terms

## Parent / Ancestor Requirements

None.

## Context

| Direction | Key | Maps to |
|---|---|---|
| Provides | `taxonomy` | `taxonomy` attribute |

## Usage

Insert a Taxonomy List block and set the `taxonomy` attribute to the desired taxonomy slug (e.g., `"category"`, `"post_tag"`, `"research-teams"`). Add `prc-block/taxonomy-list-link` blocks for each term and optionally include a `prc-block/taxonomy-search` block for filtering.

The taxonomy context flows down to all child blocks, so `taxonomy-list-link` and `taxonomy-search` blocks automatically know which taxonomy they belong to.

## Block Markup (save)

```html
<nav class="wp-block-prc-block-taxonomy-list">
  <!-- inner blocks (taxonomy-list-link, taxonomy-search) -->
</nav>
```

## PHP Rendering

`class-taxonomy-list.php` (`PRC\Platform\Blocks\Taxonomy_List`)

Minimal server-side logic. Registers the block via metadata.

**Fallback render wrapper:**
- Hooks into `render_block_prc-block/taxonomy-list` filter to ensure older saved content that lacks a `<nav>` wrapper gets one added at render time. This handles backward compatibility for blocks saved before the `<nav>` element was part of the save output.

## Frontend Interactivity

No Interactivity API store is registered. The block is a static container. Interactive behavior is provided by child blocks (`prc-block/taxonomy-list-link` and `prc-block/taxonomy-search`).

## Related Blocks

| Block | Relationship |
|---|---|
| `prc-block/taxonomy-list-link` | Primary child block for individual term links |
| `prc-block/taxonomy-search` | Optional child block for term search |
| `prc-block/taxonomy-index-list-controller` | Parent controller that manages desktop/mobile rendering |

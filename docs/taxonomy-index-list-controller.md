# Taxonomy Index List Controller

Container block that renders taxonomy navigation lists. On desktop, displays taxonomy lists in a grid layout. On mobile, automatically converts the structure into an accordion using `prc-block/accordion-controller`. Handles reusable block references and extracts sub-heading labels for accordion titles.

## Namespace

`prc-block/taxonomy-index-list-controller`

## Category

`theme`

## Supports

| Feature | Detail |
|---|---|
| Anchor | Yes |
| HTML | No |
| Spacing | `blockGap`, `margin` (top/bottom only), `padding` |
| Typography | `fontSize`, `fontFamily` |

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `allowedBlocks` | `array` | -- | Restricts which block types can be inserted as inner blocks |
| `orientation` | `string` | `"vertical"` | Layout orientation of the taxonomy index |

## Available Styles

None declared in `block.json`.

## Inner Blocks

Accepts inner blocks. Typically contains `prc-block/grid-controller` with `prc-block/grid-column` children holding `prc-block/taxonomy-list` blocks or reusable block references (`core/block`).

## Parent / Ancestor Requirements

None.

## Context

None declared.

## Usage

Insert the Taxonomy Index List Controller to create a structured taxonomy navigation. The block wraps taxonomy list blocks in a grid layout for desktop and converts them to an accordion on mobile.

The block handles two content patterns:
- **Direct taxonomy lists**: `prc-block/taxonomy-list` blocks placed in grid columns.
- **Reusable block references**: `core/block` (wp_block post type) references that contain taxonomy lists, resolved at render time.

On mobile, sub-heading labels (from `prc-block/taxonomy-list-link` blocks with `is-style-sub-heading` variation) are extracted to become accordion section titles, and a "Main {label} page" link is prepended to each accordion section.

## Block Markup (save)

Standard inner blocks save. The server-side render callback replaces the output on mobile.

## PHP Rendering

`class-taxonomy-index-list-controller.php` (`PRC\Platform\Blocks\Taxonomy_Index_List_Controller`)

**Key methods:**

- `render_reusable_block($attributes)` -- Resolves `core/block` (wp_block) references. Detects when a reusable block contains a single `prc-block/taxonomy-list` and routes it through accordion conversion for mobile.
- `parse_taxonomy_list_as_accordion($taxonomy_list_block)` -- Extracts the `is-style-sub-heading` inner block's label as the accordion title. Removes the sub-heading block from the content, prepends a "Main {label} page" link to the remaining items, and wraps everything in a `prc-block/accordion` block.
- `render_as_accordion_block($block)` -- Iterates through the grid > column > inner block hierarchy, converting each taxonomy list into an accordion item. Wraps all items in a `prc-block/accordion-controller`. Uses `parse_blocks()` and `render_block()` for output.
- `render_block_callback()` -- Entry point. Uses `PRC\Platform\get_current_device()` for mobile detection. On desktop, renders inner blocks normally. On mobile, delegates to `render_as_accordion_block()`.

## Frontend Interactivity

No Interactivity API store is registered. Desktop rendering uses standard HTML links. Mobile accordion behavior is provided by `prc-block/accordion-controller`.

## Related Blocks

| Block | Relationship |
|---|---|
| `prc-block/taxonomy-list` | Primary child block containing taxonomy term links |
| `prc-block/taxonomy-list-link` | Individual term link within taxonomy lists |
| `prc-block/accordion-controller` | Used for mobile rendering |
| `prc-block/accordion` | Individual accordion items on mobile |
| `prc-block/grid-controller` | Grid layout container for desktop |
| `prc-block/grid-column` | Grid column children in desktop layout |
| `core/block` | Reusable block references resolved at render time |

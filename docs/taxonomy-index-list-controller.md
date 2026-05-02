# Taxonomy Index List Controller

Container block that renders taxonomy navigation lists. On desktop, displays taxonomy lists in a grid layout. On mobile, automatically converts the structure into **WordPress core** accordions (`core/accordion` with `core/accordion-item` / `core/accordion-heading` / `core/accordion-panel`). Handles reusable block references and extracts sub-heading labels for accordion titles.

## Namespace

`prc-block/taxonomy-index-list-controller`

## Category

`theme`

## Inserter preview

`block.json` includes an `example` that mirrors the default grid template: `grid-controller` with three `grid-column` blocks (`gridLayout` including `mobileSpan`, `allowedBlocks` for `taxonomy-list` and `core/block`). This drives the inserter preview.

## Supports

| Feature    | Detail                                            |
| ---------- | ------------------------------------------------- |
| Anchor     | Yes                                               |
| HTML       | No                                                |
| Spacing    | `blockGap`, `margin` (top/bottom only), `padding` |
| Typography | `fontSize`, `fontFamily`                          |

## Attributes

| Attribute       | Type     | Default      | Description                                                 |
| --------------- | -------- | ------------ | ----------------------------------------------------------- |
| `allowedBlocks` | `array`  | --           | Restricts which block types can be inserted as inner blocks |
| `orientation`   | `string` | `"vertical"` | Layout orientation of the taxonomy index                    |

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

-   **Direct taxonomy lists**: `prc-block/taxonomy-list` blocks placed in grid columns.
-   **Reusable block references**: `core/block` (wp_block post type) references that contain taxonomy lists, resolved at render time.

On mobile, sub-heading labels (from `prc-block/taxonomy-list-link` blocks with `is-style-sub-heading` variation) are extracted to become accordion section titles, and a "Main {label} page" link is prepended to each accordion section.

**Requirement:** The host WordPress version must register `core/accordion` and related blocks (same serialized markup as core’s block library fixtures: `<!-- wp:accordion -->`, `<!-- wp:accordion-item -->`, etc.).

## Block Markup (save)

Standard inner blocks save. On mobile, the server render callback does not use the saved grid markup as-is: it rebuilds serialized `core/accordion` markup (see **Mobile: core accordion serialized markup** below).

## PHP Rendering

`class-taxonomy-index-list-controller.php` (`PRC\Platform\Blocks\Taxonomy_Index_List_Controller`)

**Key methods:**

-   `render_reusable_block($attributes)` -- Resolves `core/block` (wp_block) references. Detects when a reusable block contains a single `prc-block/taxonomy-list` and routes it through accordion conversion for mobile, wrapping the result in `core/accordion`.
-   `parse_taxonomy_list_as_accordion($taxonomy_list_block)` -- Extracts the `is-style-sub-heading` inner block's label as the accordion title. Removes the sub-heading block from the content, prepends a "Main {label} page" link to the remaining items when a URL exists, and returns serialized `core/accordion-item` markup (heading + panel + inner blocks).
-   `render_as_accordion_block($block)` -- Iterates through the grid > column > inner block hierarchy, converting each taxonomy list into an accordion item. Wraps all items in `core/accordion`. Uses `parse_blocks()` and `render_block()` for output.
-   `render_block_callback()` -- Entry point. Uses `PRC\Platform\get_current_device()` for mobile detection. On desktop, renders inner blocks normally. On mobile, delegates to `render_as_accordion_block()`.

### Mobile: core accordion serialized markup

PHP builds strings that match the shape of **core** serialized block HTML (see WordPress `core__accordion*.serialized.html` fixtures in Gutenberg): short block names in comments (`accordion`, `accordion-item`, `accordion-heading`, `accordion-panel`).

For each taxonomy list:

1. **`core/accordion-item`** -- Contains a `core/accordion-heading` block (title in the toggle markup) and a `core/accordion-panel` whose inner content is `serialize_blocks()` output for the taxonomy list links (including the optional "Main {label} page" link block).

2. **`core/accordion`** -- Wraps one or more accordion items in `<div role="group" class="wp-block-accordion">…</div>`. The wrapper block is serialized with `style.typography.fontFamily` set to the theme preset `var:preset|font-family|sans-serif` (Franklin Gothic stack in `prc-design-system` theme.json) so the accordion uses sans-serif typography.

Styling otherwise follows core/theme.json + global styles for `core/accordion`.

## Frontend Interactivity

No Interactivity API store is registered by this block. Desktop rendering uses standard HTML links. On mobile, behavior comes from **WordPress core** accordion block scripts (`viewScriptModule` on `core/accordion`).

## Related Blocks

| Block                          | Relationship                                       |
| ------------------------------ | -------------------------------------------------- |
| `prc-block/taxonomy-list`      | Primary child block containing taxonomy term links |
| `prc-block/taxonomy-list-link` | Individual term link within taxonomy lists         |
| `core/accordion`               | Mobile wrapper for converted taxonomy sections     |
| `core/accordion-item`          | One mobile section per taxonomy list               |
| `core/accordion-heading`       | Section title (from sub-heading label)             |
| `core/accordion-panel`         | Panel body containing link blocks                  |
| `prc-block/grid-controller`    | Grid layout container for desktop                  |
| `prc-block/grid-column`        | Grid column children in desktop layout             |
| `core/block`                   | Reusable block references resolved at render time  |

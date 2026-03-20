# Taxonomy Index A-Z Controller

Container block that renders an alphabetical (A-Z) index of taxonomy terms. On desktop, displays a letter navigation bar alongside a grid of term lists. On mobile, automatically converts to an accordion layout using `prc-block/accordion-controller`.

## Namespace

`prc-block/taxonomy-index-az-controller`

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
| `orientation` | `string` | `"vertical"` | Layout orientation of the A-Z index |

## Available Styles

None declared in `block.json`.

## Inner Blocks

Accepts inner blocks. The editor template inserts a grid layout with three `prc-block/grid-column` blocks (each spanning 4 columns on desktop). Allowed blocks include `prc-block/grid-controller` and `prc-block/taxonomy-index-az-list`.

## Parent / Ancestor Requirements

None.

## Context

None declared.

## Usage

Insert the A-Z Controller block to create an alphabetical taxonomy index. The editor renders a `Letters` component that displays the A-Z navigation UI, and the grid template provides the layout structure for term lists.

The block adapts its rendering based on device:
- **Desktop**: Renders the A-Z letter navigation as a `<ul>` alongside grid-based content containing `prc-block/taxonomy-index-az-list` blocks.
- **Mobile**: Converts the entire structure into a `prc-block/accordion-controller` wrapping individual `prc-block/accordion` blocks, one per letter.

## Block Markup (save)

Standard inner blocks save. The editor produces a grid layout that the server-side render callback replaces entirely.

## PHP Rendering

`class-taxonomy-index-az-controller.php` (`PRC\Platform\Blocks\Taxonomy_Index_AZ_Controller`)

**Key methods:**

- `render_az_list($block)` -- Builds the A-Z letter navigation as a `<ul>`. Scans inner blocks for their `letter` attributes and applies a `disabled` class to letters that have no matching term list block.
- `render_as_accordion_block($block)` -- Mobile path. Iterates inner blocks, wrapping each into a `prc-block/accordion` block, then wraps the set in a `prc-block/accordion-controller`. Uses `parse_blocks()` and `render_block()` to produce final markup.
- `render_block_callback()` -- Entry point. Uses `jetpack_is_mobile()` to detect device. On desktop, outputs the A-Z navigation list plus the grid content. On mobile, delegates to `render_as_accordion_block()`.

## Frontend Interactivity

No Interactivity API store is registered for this block. Navigation is handled via standard anchor links to letter sections. Mobile accordion behavior is provided by the `prc-block/accordion-controller` block.

## Related Blocks

| Block | Relationship |
|---|---|
| `prc-block/taxonomy-index-az-list` | Child block displaying terms for a specific letter |
| `prc-block/accordion-controller` | Used for mobile rendering |
| `prc-block/accordion` | Individual accordion items on mobile |
| `prc-block/grid-controller` | Grid layout container for desktop |
| `prc-block/grid-column` | Grid column children in desktop layout |

# Flip Card Side

Represents one side (front or back) of a Flip Card Controller. This block is a content container that can hold any inner blocks.

## Block Metadata

| Property    | Value                                                                           |
| ----------- | ------------------------------------------------------------------------------- |
| Namespace   | `prc-block/flip-card-side`                                                      |
| Category    | `media`                                                                         |
| Version     | `1.0.0`                                                                         |
| API Version | `3`                                                                             |
| Example     | Yes (inner `core/paragraph` — inserter preview; parent is flip-card-controller) |

## Supports

| Feature            | Value                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------- |
| HTML editing       | `false`                                                                                |
| Interactivity      | `true`                                                                                 |
| Layout             | Constrained (vertical, center-aligned, 420px content size default)                     |
| Switching layout   | `true`                                                                                 |
| Vertical alignment | `true`                                                                                 |
| Justification      | `true`                                                                                 |
| Orientation        | `true`                                                                                 |
| Sizing on children | `true`                                                                                 |
| Block gap          | `true`                                                                                 |
| Spacing padding    | `true`                                                                                 |
| Spacing margin     | `false`                                                                                |
| Border             | color, width, radius                                                                   |
| Color background   | `true`                                                                                 |
| Color text         | `true`                                                                                 |
| Contrast checker   | `true`                                                                                 |
| Typography         | Full (size, line-height, family, weight, style, transform, decoration, letter-spacing) |

## Attributes

None. This block has no custom attributes. The front/back designation is handled via the `className` attribute and block variations.

## Context

**Uses Context:**

| Context Key                     | Description                                          |
| ------------------------------- | ---------------------------------------------------- |
| `prc-block/flip-card-isFlipped` | Whether the card is currently flipped (from parent). |

## Block Variations

| Variation Name    | Title           | Identifying Class | Description                      |
| ----------------- | --------------- | ----------------- | -------------------------------- |
| `flip-card-front` | Flip Card Front | `is-style-front`  | The front face of the flip card. |
| `flip-card-back`  | Flip Card Back  | `is-style-back`   | The back face of the flip card.  |

Variations are distinguished by the `className` attribute (`is-style-front` or `is-style-back`). Each starts with a default `core/paragraph` placeholder.

## Inner Blocks

Any blocks can be placed inside. Template lock is `false`, allowing full content flexibility. The default template includes a single paragraph with a placeholder.

## Parent/Ancestor Requirements

| Parent                           | Required |
| -------------------------------- | -------- |
| `prc-block/flip-card-controller` | Yes      |

## Usage Instructions

1. This block is automatically created inside a **Flip Card Controller**. It cannot be inserted independently.
2. Two sides are always present: **Front** (`is-style-front`) and **Back** (`is-style-back`).
3. Add any content to each side — paragraphs, headings, images, buttons, etc.
4. Use the **flip toolbar button** (available on both the side and the parent controller) to toggle between front and back in the editor.
5. Each side independently supports color, typography, border, spacing, and layout customization.
6. On the frontend, clicking the card side triggers the flip animation (unless clicking a link or button).

## Block Markup Example

```html
<!-- wp:prc-block/flip-card-side {"className":"is-style-front"} -->
<!-- wp:paragraph -->
<p>Front side content</p>
<!-- /wp:paragraph -->
<!-- /wp:prc-block/flip-card-side -->
```

## PHP Rendering

The `Flip_Card_Side` PHP class provides a server-side render callback:

1. Wraps inner content in a `<div>` with block wrapper attributes.
2. Adds Interactivity API directives connecting to the parent's store:
    - `data-wp-interactive="prc-block/flip-card-controller"` (uses the parent's store namespace).
    - `data-wp-on--click="actions.toggleFlip"` — Clicking the side triggers the flip.
    - `data-wp-init="callbacks.onCardSideInit"` — On init, measures the side's height and reports it to the parent controller for smart height calculation.
    - `data-wp-style--min-height="callbacks.minHeightStyle"` — Binds the dynamic minimum height.

Rendered output:

```html
<div
	class="wp-block-prc-block-flip-card-side is-style-front"
	data-wp-interactive="prc-block/flip-card-controller"
	data-wp-on--click="actions.toggleFlip"
	data-wp-init="callbacks.onCardSideInit"
	data-wp-style--min-height="callbacks.minHeightStyle"
>
	<p>Front side content</p>
</div>
```

## Frontend Interactivity

This block does not have its own view script. It connects to the `prc-block/flip-card-controller` Interactivity API store:

-   **Click handler** (`actions.toggleFlip`): Flips the card when clicked. Clicks on `<a>` or `<button>` elements are ignored so embedded links and buttons work normally.
-   **Init callback** (`callbacks.onCardSideInit`): Measures the element's `offsetHeight` on initialization and updates the parent controller's `minHeight` context to ensure the card is tall enough for both sides.
-   **Height binding** (`callbacks.minHeightStyle`): Applies the computed minimum height to keep both sides the same size.

## Related Blocks

-   [`prc-block/flip-card-controller`](./flip-card-controller.md) — Parent container block (required).

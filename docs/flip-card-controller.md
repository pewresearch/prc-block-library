# Flip Card Controller

An interactive card that flips to reveal additional content on the back side. Uses CSS 3D transforms and the Interactivity API for the flip animation.

## Block Metadata

| Property    | Value                                                                |
| ----------- | -------------------------------------------------------------------- |
| Namespace   | `prc-block/flip-card-controller`                                     |
| Category    | `media`                                                              |
| Version     | `1.0.0`                                                              |
| API Version | `3`                                                                  |
| Example     | Yes (two `flip-card-side` blocks with paragraphs — inserter preview) |

## Supports

| Feature            | Value                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------- |
| Anchor             | `true`                                                                                 |
| HTML editing       | `false`                                                                                |
| Interactivity      | `true`                                                                                 |
| Color background   | `true`                                                                                 |
| Color text         | `true`                                                                                 |
| Contrast checker   | `true`                                                                                 |
| Align              | `left`, `right`                                                                        |
| Layout             | Constrained (no switching, no inheriting)                                              |
| Vertical alignment | `true`                                                                                 |
| Justification      | `true`                                                                                 |
| Sizing on children | `true`                                                                                 |
| Block gap          | `true`                                                                                 |
| Spacing padding    | `true`                                                                                 |
| Spacing margin     | `true`                                                                                 |
| Typography         | Full (size, line-height, family, weight, style, transform, decoration, letter-spacing) |

## Attributes

| Attribute     | Type      | Default | Role    | Description                                                                                                                        |
| ------------- | --------- | ------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `fixedHeight` | `number`  | —       | —       | Fixed pixel height for the card. When unset, `null`, or `-1`, "smart height" mode is used (auto-calculated from the tallest side). |
| `isFlipped`   | `boolean` | `false` | `local` | Editor-only state tracking which side is currently visible. Not saved to post content.                                             |

## Provided Context

| Context Key                     | Source Attribute |
| ------------------------------- | ---------------- |
| `prc-block/flip-card-isFlipped` | `isFlipped`      |

## Allowed Inner Blocks

-   `prc-block/flip-card-side`

## Inner Blocks Template

The block initializes with a locked (`insert`) template containing two Flip Card Side blocks:

1. **Front side** (`is-style-front`) — With a placeholder paragraph.
2. **Back side** (`is-style-back`) — With a placeholder paragraph.

## Parent/Ancestor Requirements

None. This is the top-level container for flip card functionality.

## Usage Instructions

1. Insert the **Flip Card Controller** block from the block inserter (under the Media category).
2. The block creates two sides automatically: **Front** and **Back**.
3. Add content to the front side (visible by default).
4. Click the **flip button** (rotate icon) in the toolbar to flip to the back side and add content there.
5. **Height modes** (toggle via toolbar button):
    - **Smart height** (default): Automatically calculates the minimum height based on the tallest side. Height can only grow, never shrink, to prevent layout jumps.
    - **Manual height**: Enables a resizable handle at the bottom to set a fixed pixel height.
6. On the frontend, clicking anywhere on the card (except links and buttons) flips it.

## Styles

**File:** `style.scss`

-   **3D flip** -- inner blocks use `transform-style: preserve-3d`; sides use `backface-visibility: hidden` with the back side rotated 180° on the Y axis.
-   **Active face only (frontend)** -- after initialization (`.is-initialized:not(.wp-block)`), sides are `position: absolute` and only the visible face stays in layout (`display: none` on the hidden face). Firefox and nested 3D contexts (e.g. flip cards inside carousel coverflow slides) can ignore `backface-visibility`, so hiding the inactive face prevents both sides from showing through.
-   **Pre-init** -- before the Interactivity API measures sides, the back face is hidden on the frontend only (`:not(.is-initialized):not(.wp-block)`); the editor (`.wp-block` wrapper) still shows both sides for editing.
-   **Smart height measuring** -- during the measurement pass (`.is-measuring`), side heights reset to `auto` so `minHeight` can be calculated from the tallest face.
-   **Carousel slides** -- when nested in `prc-block/carousel-slide`, the controller and inner blocks pin to `width: 100%` / `height: 100%` so absolutely positioned sides fill the slide instead of collapsing.

## Inserter preview

The `example` in `block.json` mirrors the locked insert template: front and back `prc-block/flip-card-side` blocks (`is-style-front` / `is-style-back`) each with a `core/paragraph` for the inserter thumbnail.

## Block Markup Example

```html
<!-- wp:prc-block/flip-card-controller -->
<!-- wp:prc-block/flip-card-side {"className":"is-style-front"} -->
<!-- wp:paragraph -->
<p>Front side content</p>
<!-- /wp:paragraph -->
<!-- /wp:prc-block/flip-card-side -->

<!-- wp:prc-block/flip-card-side {"className":"is-style-back"} -->
<!-- wp:paragraph -->
<p>Back side content</p>
<!-- /wp:paragraph -->
<!-- /wp:prc-block/flip-card-side -->
<!-- /wp:prc-block/flip-card-controller -->
```

## PHP Rendering

The `Flip_Card_Controller` PHP class provides a server-side render callback:

1. Generates a unique block ID via `wp_unique_id('prc-block-flip-card-controller-')`.
2. Reads the `fixedHeight` attribute to determine height mode.
3. Outputs a wrapper `<div>` with Interactivity API directives:
    - `data-wp-interactive="prc-block/flip-card-controller"`
    - `data-wp-context` with `id`, `flipped` (false), `minHeight` (null), `fixedHeight`, and `initialized` state.
    - `data-wp-class--is-initialized` and `data-wp-class--is-flipped` for CSS state classes.
    - `data-wp-style--min-height="callbacks.minHeightStyle"` for dynamic height.
4. Wraps inner content in a `.wp-block-prc-block-flip-card-controller__inner-blocks` div.

Rendered output:

```html
<div
	class="wp-block-prc-block-flip-card-controller"
	data-wp-interactive="prc-block/flip-card-controller"
	data-wp-context='{"id":"prc-block-flip-card-controller-1","flipped":false,"minHeight":null,"fixedHeight":null,"initialized":false}'
	data-wp-class--is-initialized="state.isInitialized"
	data-wp-class--is-flipped="state.isFlipped"
	data-wp-style--min-height="callbacks.minHeightStyle"
>
	<div class="wp-block-prc-block-flip-card-controller__inner-blocks">
		<!-- front and back sides -->
	</div>
</div>
```

## Frontend Interactivity

Uses the WordPress Interactivity API with store namespace `prc-block/flip-card-controller`.

**State (derived):**

-   `state.isInitialized` — Returns `context.initialized`, true once side heights have been measured.
-   `state.isFlipped` — Returns `context.flipped`, the current flip state.

**Actions:**

-   `toggleFlip(event)` — Flips the card. Ignores clicks on `<a>` and `<button>` elements to allow links and buttons within card content to function normally.

**Callbacks:**

-   `onCardSideInit()` — Called by each Flip Card Side on init. Measures the side's `offsetHeight` and updates `context.minHeight` to the maximum of all sides. Sets `context.initialized` to true.
-   `minHeightStyle()` — Returns the computed `min-height` CSS value: uses `fixedHeight` if set (manual mode), otherwise uses the measured `minHeight`, falling back to `100%`.

## Related Blocks

-   [`prc-block/flip-card-side`](./flip-card-side.md) — Child block representing one side of the card (required, exactly two).

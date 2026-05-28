# Carousel Controller

Organize content in a vertical or horizontal CSS carousel with navigation arrows and dots.

## Block Metadata

| Property   | Value                                                               |
| ---------- | ------------------------------------------------------------------- |
| Name       | `prc-block/carousel-controller`                                     |
| Title      | Carousel                                                            |
| Category   | `design`                                                            |
| Version    | `1.0.0`                                                             |
| API        | 3                                                                   |
| Textdomain | `carousel-controller`                                               |
| Keywords   | `scroll`, `carousel`, `slider`                                      |
| Example    | Yes (one `carousel-slide` with `core/paragraph` — inserter preview) |

## Allowed Inner Blocks

Only `prc-block/carousel-slide` blocks are allowed inside this controller.

## Attributes

| Attribute      | Type      | Default                             | Enum Values                | Description                                                                   |
| -------------- | --------- | ----------------------------------- | -------------------------- | ----------------------------------------------------------------------------- |
| `orientation`  | `string`  | `"horizontal"`                      | --                         | Scroll direction of the carousel. Set to `"vertical"` for vertical scrolling. |
| `enableDots`   | `boolean` | `true`                              | --                         | Show dot navigation indicators below (or beside) the carousel.                |
| `enableArrows` | `boolean` | `true`                              | --                         | Show previous/next arrow buttons.                                             |
| `enableRewind` | `boolean` | `true`                              | --                         | Allow the carousel to wrap around from last to first slide and vice versa.    |
| `arrowsSize`   | `string`  | `"medium"`                          | `small`, `medium`, `large` | Size of the navigation arrows.                                                |
| `dotsSize`     | `string`  | `"small"`                           | `small`, `medium`, `large` | Size of the dot indicators.                                                   |
| `dotColor`     | `string`  | `"var(--wp--preset--color--black)"` | --                         | Color for the dot indicators.                                                 |
| `arrowColor`   | `string`  | `"var(--wp--preset--color--black)"` | --                         | Color for the arrow buttons.                                                  |

## Supports

| Feature                             | Enabled               | Notes |
| ----------------------------------- | --------------------- | ----- |
| HTML editing                        | No                    |       |
| Align                               | Wide, Full            |       |
| Interactivity API                   | Yes                   |       |
| Spacing: margin                     | Yes (top, bottom)     |       |
| Spacing: padding                    | Yes                   |       |
| Typography: fontSize                | Yes (default control) |       |
| Typography: fontFamily              | Yes (default control) |       |
| Shadow                              | Yes                   |       |
| Color: background                   | Yes                   |       |
| Color: text                         | Yes                   |       |
| Color: button                       | Yes                   |       |
| Color: gradients                    | Yes                   |       |
| Color: heading                      | Yes                   |       |
| Color: link                         | Yes                   |       |
| Background: color, gradient, image  | Yes                   |       |
| Border: radius, color, width, style | Yes                   |       |

## Usage Instructions

1. Insert the **Carousel** block from the inserter.
2. The first slide is created automatically with a paragraph placeholder.
3. Add content to the slide (images, text, any blocks).
4. Click the **+** appender to add more slides. New slides inherit style attributes from existing ones.
5. Use the arrow buttons in the editor to navigate between slides.
6. In the sidebar, configure:
    - **Orientation**: Horizontal (default) or vertical scrolling.
    - **Enable Dots**: Toggle dot navigation.
    - **Enable Arrows**: Toggle arrow navigation.
    - **Arrows Size** / **Dots Size**: Small, medium, or large.
    - **Dot Color** / **Arrow Color**: Customize navigation element colors.

## Inserter preview

The `example` in `block.json` matches the default template shape: a single `prc-block/carousel-slide` containing a `core/paragraph` with sample slide text.

```html
<!-- wp:prc-block/carousel-controller -->
<!-- wp:prc-block/carousel-slide -->
<!-- wp:paragraph -->
<p>Carousel slide content.</p>
<!-- /wp:paragraph -->
<!-- /wp:prc-block/carousel-slide -->
<!-- /wp:prc-block/carousel-controller -->
```

## Block Markup Example

```html
<div
	class="wp-block-prc-block-carousel-controller has-arrows-medium has-dots-small"
	id="prc-block-carousel-controller-abc123"
	data-wp-interactive="prc-block/carousel-controller"
	data-wp-context='{"id":"...","enabled":false,"slideIndex":0,"count":3,"orientation":"horizontal","slides":[...]}'
	data-wp-init="callbacks.onInit"
	data-wp-class--is-enabled="context.enabled"
	data-wp-class--is-selected="context.isSelected"
	data-wp-on--mouseenter="callbacks.onMouseEnter"
	data-wp-on--mouseleave="callbacks.onMouseLeave"
	data-wp-on-document--scroll="callbacks.onCoverScroll"
	style="--prc-carousel-controller-dot-color: var(--wp--preset--color--black); --prc-carousel-controller-arrow-color: var(--wp--preset--color--black);"
>
	<div class="prc-block-carousel-controller__track">
		<div class="prc-block-carousel-controller__track__inner">
			<!-- Carousel slides rendered here -->
		</div>
	</div>
	<button
		class="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow__prev"
		data-wp-on--click="actions.goToPreviousSlide"
		aria-label="Previous slide"
	>
		<!-- chevron icon -->
	</button>
	<button
		class="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow__next"
		data-wp-on--click="actions.goToNextSlide"
		aria-label="Next slide"
	>
		<!-- chevron icon -->
	</button>
	<div class="prc-block-carousel-controller__dots">
		<template data-wp-each--dot="context.slides">
			<button
				class="prc-block-carousel-controller__dot"
				data-wp-on--click="actions.goToDot"
				data-wp-bind--data-slide-index="context.dot.index"
				data-wp-bind--aria-label="context.dot.label"
				data-wp-bind--data-active="callbacks.isDotActive"
			>
				<!-- circle icon -->
			</button>
		</template>
	</div>
</div>
```

## PHP Rendering

The `render_block_callback` in `class-carousel-controller.php`:

1. Reads block attributes and counts inner blocks (slides).
2. Generates a unique block ID.
3. Adds Interactivity API directives to the wrapper: `data-wp-interactive`, `data-wp-context`, `data-wp-init`, `data-wp-class--is-enabled`, `data-wp-class--is-selected`, mouse event handlers, and scroll handlers.
4. Iterates over each `.wp-block-prc-block-carousel-slide` to assign unique IDs, slide indexes, and `data-wp-class--is-active` directives.
5. Sets CSS custom properties for dot and arrow colors.
6. Injects arrow navigation if arrows are enabled, replacing the empty `.prc-block-carousel-controller__arrows` placeholder.
7. Injects dot navigation markup (using `<template data-wp-each>`) if dots are enabled, replacing the empty `.prc-block-carousel-controller__dots` placeholder.
8. Arrow icons change based on orientation: `chevron-left`/`chevron-right` for horizontal, `chevron-up`/`chevron-down` for vertical.

## Frontend Interactivity

The `view.js` file registers an Interactivity API store under `prc-block/carousel-controller`.

### State (Derived)

| Property           | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `isInsideCover`    | Whether the carousel is nested inside a `core/cover` block.       |
| `coverRef`         | Reference to the parent cover block element.                      |
| `isVertical`       | Whether orientation is vertical.                                  |
| `track`            | The `.prc-block-carousel-controller__track__inner` DOM element.   |
| `hasNextSlide`     | Whether there is a next slide available.                          |
| `hasPreviousSlide` | Whether there is a previous slide available.                      |
| `isActive`         | Whether the current slide element matches the active slide index. |

### Actions

| Action                   | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| `navigateToSlide(index)` | Scrolls the track to the specified slide index with smooth behavior.     |
| `goToDot()`              | Navigates to the slide corresponding to the clicked dot.                 |
| `goToNextSlide()`        | Advances to the next slide; wraps to the first slide if at the end.      |
| `goToPreviousSlide()`    | Goes to the previous slide; wraps to the last slide if at the beginning. |
| `resetCarousel()`        | Resets the carousel to the first slide.                                  |

### Callbacks

| Callback                        | Description                                                                                                                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `onInit`                        | Sets up a debounced scroll listener on the track to calculate the current slide index from scroll position. Enables the carousel immediately unless inside a cover block.                                    |
| `isDotActive`                   | Returns whether a dot's index matches the current slide index.                                                                                                                                               |
| `onMouseEnter` / `onMouseLeave` | Tracks hover state for `isSelected` context.                                                                                                                                                                 |
| `onCoverScroll`                 | Special behavior for carousels inside cover blocks: enables the carousel when the cover reaches the top of the viewport while scrolling down, temporarily locks body scroll, and resets when scrolling past. |
| `onCoverFinalSideDisable`       | Disables the carousel when it reaches the last slide inside a cover block.                                                                                                                                   |

### Cover Block Integration

When the carousel is placed inside a `core/cover` block, it has special scroll-triggered behavior:

-   The carousel starts disabled.
-   When the user scrolls the cover into view (top of viewport), the carousel enables and body scroll is temporarily locked (2 seconds).
-   After the last slide, the carousel disables to allow normal page scrolling to continue.
-   The carousel resets when scrolled completely out of view.

## Layout

The carousel uses CSS Grid for its layout:

**Horizontal layout:**

```
arrow-prev | track | arrow-next
   dots    | dots  |   dots
```

**Vertical layout:**

```
arrow-prev
track
arrow-next
dots
```

The track uses CSS scroll-snap (`scroll-snap-type: x mandatory` or `y mandatory`) for smooth, physics-based slide snapping. Scrollbars are hidden across all browsers.

## Styles

-   Minimum height: 200px.
-   Arrows use no background, with configurable icon color via `--prc-carousel-controller-arrow-color`.
-   Dots are opacity-based: 0.4 for inactive, 1.0 for active, with a 0.3s transition.
-   Three size variants for arrows (`has-arrows-small/medium/large`: 1rem/1.5rem/2rem icon size).
-   Three size variants for dots (`has-dots-small/medium/large`: 0.5rem/0.75rem/1rem icon size).
-   When not enabled (`.is-enabled` is absent), the carousel has `pointer-events: none`.

## Related Blocks

-   [Carousel Slide](./carousel-slide.md) -- required child block (individual slides)

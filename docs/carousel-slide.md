# Carousel Slide

A slide for use in the carousel block. Each slide is a container that holds any block content and is displayed one at a time within the carousel.

## Block Metadata

| Property   | Value                                                                      |
| ---------- | -------------------------------------------------------------------------- |
| Name       | `prc-block/carousel-slide`                                                 |
| Title      | Carousel Slide                                                             |
| Category   | `design`                                                                   |
| Version    | `1.0.0`                                                                    |
| API        | 3                                                                          |
| Textdomain | `carousel-slide`                                                           |
| Example    | Yes (`core/paragraph` — inserter preview; parent is `carousel-controller`) |

## Parent Block

This block **must** be used inside `prc-block/carousel-controller`. It cannot be inserted as a standalone block.

## Attributes

This block has no custom attributes. All configuration is handled through block supports.

## Supports

| Feature                             | Enabled                  | Notes                                                                                                                                                                                               |
| ----------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anchor                              | Yes                      |                                                                                                                                                                                                     |
| HTML editing                        | No                       |                                                                                                                                                                                                     |
| Background: image                   | Yes                      |                                                                                                                                                                                                     |
| Background: size                    | Yes                      |                                                                                                                                                                                                     |
| Color: background                   | Yes                      |                                                                                                                                                                                                     |
| Color: text                         | Yes                      |                                                                                                                                                                                                     |
| Color: link                         | Yes                      |                                                                                                                                                                                                     |
| Color: contrast checker             | Yes                      |                                                                                                                                                                                                     |
| Color: gradients                    | No                       |                                                                                                                                                                                                     |
| Layout                              | Flex vertical (centered) | Default: `flex`, `vertical`, `justifyContent: center`, `verticalAlignment: center`. No switching, no inheriting, no orientation change. Allows vertical alignment, justification, and child sizing. |
| Typography: fontSize                | Yes                      |                                                                                                                                                                                                     |
| Typography: lineHeight              | Yes                      |                                                                                                                                                                                                     |
| Typography: fontFamily              | Yes                      |                                                                                                                                                                                                     |
| Shadow                              | Yes                      |                                                                                                                                                                                                     |
| Spacing: padding                    | Yes                      |                                                                                                                                                                                                     |
| Border: radius, color, width, style | Yes                      |                                                                                                                                                                                                     |

## Inner Blocks

This is a container block that accepts any blocks as children. The default template includes a single `core/paragraph` with placeholder text. Template lock is disabled, allowing full editing freedom.

## Usage Instructions

1. Carousel slides are automatically created when you add the **Carousel** block.
2. Click inside a slide to add or edit content.
3. Use the carousel controller's **+** button to add new slides.
4. Each slide can have its own background color, background image, text color, padding, and borders.
5. The default layout is a vertically centered flex container -- content within a slide is centered both horizontally and vertically by default.
6. Adjust vertical alignment and justification using the layout controls in the toolbar.

## Inserter preview

`block.json` defines an `example` with one `core/paragraph` (“Slide content.”) so the inserter preview matches the default inner-blocks template. The slide block only appears inside [Carousel Controller](./carousel-controller.md), so the preview is shown in that context.

```html
<!-- wp:prc-block/carousel-slide -->
<!-- wp:paragraph -->
<p>Slide content.</p>
<!-- /wp:paragraph -->
<!-- /wp:prc-block/carousel-slide -->
```

## Block Markup Example

```html
<div
	class="wp-block-prc-block-carousel-slide is-layout-flex"
	id="wp-block-prc-block-carousel-slide-abc123"
	data-wp-class--is-active="state.isActive"
	data-wp-context='{"isActive":false,"id":"wp-block-prc-block-carousel-slide-abc123","index":0}'
>
	<p>Slide content goes here.</p>
</div>
```

## PHP Rendering

The `class-carousel-slide.php` registers the block using metadata only -- it does not define a custom render callback. The block uses the standard save function output.

The parent `carousel-controller` block's PHP render callback adds Interactivity API directives to each slide:

-   Unique `id` attribute.
-   `data-wp-class--is-active` directive bound to `state.isActive`.
-   `data-wp-context` with `isActive`, `id`, and `index` values.

## Frontend Interactivity

This block does not have its own view script. Slide visibility and active state are managed by the parent [Carousel Controller](./carousel-controller.md) block's Interactivity API store. The `is-active` CSS class is toggled based on whether the slide's index matches the controller's current `slideIndex`.

## Styles

```css
.wp-block-prc-block-carousel-slide {
	/* If a slide has a background, add padding */
	&.has-background {
		padding: var(--wp--preset--spacing--20);
	}
}
```

Within the carousel track, each slide is styled as:

-   `scroll-snap-align: start` / `scroll-snap-stop: always` for snapping behavior.
-   `flex-shrink: 0` and `width: 100%` to ensure each slide takes full track width.
-   `overflow: hidden` to contain content within the slide boundaries.

## Related Blocks

-   [Carousel Controller](./carousel-controller.md) -- required parent block that manages navigation and slide transitions

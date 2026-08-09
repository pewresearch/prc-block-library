# Responsive Container Controller

## Block Overview

| Property    | Value                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------ |
| Name        | `prc-block/responsive-container-controller`                                                |
| Title       | Responsive Container                                                                       |
| Category    | `design`                                                                                   |
| Version     | 0.1.0                                                                                      |
| Description | A set of blocks to display content at specific viewport widths.                            |
| Keywords    | ai2html, illustrator, responsive, container, Illustrator, AI2HTML                          |
| Example     | Yes (three `responsive-container-view` rows — desktop / tablet / mobile; inserter preview) |

## Supports

| Feature      | Enabled                                |
| ------------ | -------------------------------------- |
| HTML editing | No                                     |
| Anchor       | Yes                                    |
| Alignment    | left, right, wide, full                |
| Spacing      | blockGap, margin (top/bottom), padding |
| Typography   | fontSize, fontFamily                   |

## Attributes

This block has no custom attributes. It serves as a wrapper/controller for its inner `responsive-container-view` blocks.

## Available Styles

None defined.

## Inner Blocks

This block **only** allows `prc-block/responsive-container-view` as inner blocks.

The default template pre-populates three viewport views:

| View    | Device Type | Min (px) | Max (px) |
| ------- | ----------- | -------- | -------- |
| Desktop | `desktop`   | 980      | _(none)_ |
| Tablet  | `tablet`    | 480      | 979      |
| Mobile  | `mobile`    | _(none)_ | 479      |

## Parent / Ancestor Requirements

None. This is a top-level block.

## Usage Instructions

1. Insert the **Responsive Container** block.
2. It automatically creates three child **Responsive View** blocks for desktop, tablet, and mobile.
3. Place different content (e.g., ai2html exports, images, or any blocks) inside each viewport view.
4. On the frontend, only the view matching the current viewport width will be visible; the others are hidden via CSS media queries.
5. Additional views can be added using the block appender when the controller block is selected.

## Inserter preview

The `example` in `block.json` matches the default three-view template (device types and min/max breakpoints as in the editor), without duplicating full inner content — the inserter uses this shape for the thumbnail.

## Block Markup Example

```html
<div class="wp-block-prc-block-responsive-container-controller" id="abcdef1234">
	<div
		class="wp-block-prc-block-responsive-container-view"
		id="desktop01"
		style="display: none;"
	>
		<!-- Desktop content -->
	</div>
	<div
		class="wp-block-prc-block-responsive-container-view"
		id="tablet001"
		style="display: none;"
	>
		<!-- Tablet content -->
	</div>
	<div
		class="wp-block-prc-block-responsive-container-view"
		id="mobile01"
		style="display: none;"
	>
		<!-- Mobile content -->
	</div>
</div>
<style>
	@media screen and (min-width: 980px) {
		#desktop01.wp-block-prc-block-responsive-container-view {
			display: flex !important;
		}
	}
	@media screen and (max-width: 979px) and (min-width: 480px) {
		#tablet001.wp-block-prc-block-responsive-container-view {
			display: flex !important;
		}
	}
	@media screen and (max-width: 479px) {
		#mobile01.wp-block-prc-block-responsive-container-view {
			display: flex !important;
		}
	}
</style>
```

## PHP Rendering

The block is server-side rendered via `Responsive_Container_Controller::render_block_callback()`:

-   Assigns viewport DOM ids via `wp_unique_id('rcv-')` / `wp_unique_id('rcc-')` instead of hashing the full block tree; media queries are built from precomputed viewport specs.
-   Iterates over inner blocks, rendering each and assigning unique IDs.
-   Constructs CSS media queries based on each view's `min` and `max` attributes.
-   Outputs the views wrapped in the controller `<div>` followed by a `<style>` tag containing the generated media queries.
-   Adds `top`, `left`, `right`, and `bottom` to WordPress safe CSS styles via the `safe_style_css` filter.
-   All views start with `display: none` and are shown only when their media query matches.

## Frontend Interactivity

No view script. Responsive behavior is handled entirely via CSS media queries generated server-side.

## Related Blocks

-   **`prc-block/responsive-container-view`** -- The child block that holds content for each viewport range. Must be placed inside this controller.

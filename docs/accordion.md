# Accordion Item

> **Deprecated.** This block has been superseded by `core/accordion-item`. It remains registered for backward compatibility with existing content. Source files live in `deprecated/src/accordion/`.

An item inside an accordion that can be expanded or collapsed to show or hide content. Useful for any content you want to keep organized and compact. Click the title to expand or collapse the section.

## Block Metadata

| Property   | Value                 |
| ---------- | --------------------- |
| Name       | `prc-block/accordion` |
| Title      | Accordion Item        |
| Category   | `design`              |
| Version    | `1.0.0`               |
| API        | 3                     |
| Textdomain | `accordion`           |

## Parent Block

This block **must** be used inside `prc-block/accordion-controller`. It cannot be inserted as a standalone block.

## Attributes

| Attribute | Type     | Default | Source                                                         | Description                                                                                            |
| --------- | -------- | ------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `title`   | `string` | --      | `html` (selector: `.wp-block-prc-block-accordion__title-text`) | The clickable title text displayed in the accordion header. Marked as `__experimentalRole: "content"`. |

## Supports

| Feature                     | Enabled                    | Notes                                                                    |
| --------------------------- | -------------------------- | ------------------------------------------------------------------------ |
| Anchor                      | Yes                        |                                                                          |
| HTML editing                | No                         |                                                                          |
| Interactivity API           | Yes                        |                                                                          |
| Color: text                 | Yes                        | Applied to `.wp-block-prc-block-accordion__title` via skip serialization |
| Color: background           | Yes                        | Applied to `.wp-block-prc-block-accordion__title` via skip serialization |
| Typography: fontSize        | Yes (not default)          |                                                                          |
| Typography: fontFamily      | Yes (default control)      |                                                                          |
| Typography: lineHeight      | Yes                        |                                                                          |
| Typography: textAlign       | Yes                        |                                                                          |
| Spacing: padding            | Yes                        | Applied to `.wp-block-prc-block-accordion__title` via skip serialization |
| Spacing: blockGap           | Yes                        | Controls gap between inner content blocks                                |
| Layout                      | Yes                        |                                                                          |
| Border: color, style, width | Yes (all default controls) | Skip serialization; applied to title element                             |

### Experimental Selectors

Color and typography styles target `.wp-block-prc-block-accordion > .wp-block-prc-block-accordion__title` rather than the root element. Spacing padding also targets the title element.

## Inner Blocks

This is a container block. It accepts any blocks as inner content. The default template includes a single `core/paragraph` with placeholder text.

## Usage Instructions

1. Insert an **Accordion** block (which creates an `Accordion Controller` with one item inside).
2. Click on the title area and type the accordion item's heading.
3. Click the caret icon or select the block to expand the content area.
4. Add any blocks inside the content area (paragraphs, images, lists, etc.).
5. The content area is only visible in the editor when the accordion item or its children are selected.

## Block Markup Example

```html
<section
	class="wp-block-prc-block-accordion"
	id="accordion-xyz123"
	data-wp-interactive="prc-block/accordion-controller"
	data-wp-class--is-active="callbacks.isActiveAccordion"
>
	<h3
		class="wp-block-prc-block-accordion__title"
		data-wp-on--click="actions.onClick"
		data-wp-class--is-open="callbacks.isActiveAccordion"
	>
		<span class="wp-block-prc-block-accordion__icon">
			<!-- SVG caret-right icon injected by PHP -->
		</span>
		<span class="wp-block-prc-block-accordion__title-text"
			>Your Title Here</span
		>
	</h3>
	<div class="wp-block-prc-block-accordion__content">
		<p>Inner block content goes here.</p>
	</div>
</section>
```

## PHP Rendering

The `render_block_callback` in `class-accordion.php` modifies the saved HTML at render time:

-   Injects a caret-right SVG icon into the `.wp-block-prc-block-accordion__icon` span using `\PRC\Platform\Icons\render('solid', 'caret-right', 1)`.
-   Assigns a unique `id` attribute to the `<section>` element if one does not already exist (via anchor support).
-   Adds Interactivity API directives to the `<section>` (`data-wp-interactive`, `data-wp-class--is-active`).
-   Adds click handler and active class directives to the `<h3>` title element.

## Frontend Interactivity

The accordion's interactivity is managed by the parent `prc-block/accordion-controller` block's Interactivity API store. See the [accordion-controller documentation](./accordion-controller.md) for details on how expand/collapse behavior works.

Key behaviors on this block:

-   Clicking the title triggers `actions.onClick` in the controller store.
-   The `is-active` CSS class is toggled based on whether this accordion's `id` matches the controller's `activeId` context.
-   When active, the caret icon rotates 90 degrees and the content area becomes visible.

## Styles

The accordion icon rotates 90 degrees when active. Content is hidden by default (`display: none`) and shown with a transition when the `is-active` class is present. The title uses `cursor: pointer` and displays as a flex row with a gap between the icon and text.

## Related Blocks

-   [Accordion Controller](./accordion-controller.md) -- required parent block

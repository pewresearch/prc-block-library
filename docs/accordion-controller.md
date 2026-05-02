# Accordion Controller

> **Deprecated.** This block has been superseded by `core/accordion`. It remains registered for backward compatibility with existing content. Source files live in `deprecated/src/accordion-controller/`.

A collection of collapsible sections that can be expanded or collapsed to show or hide content. Useful for FAQs, lists, or any content you want to keep organized and compact. Click the title to expand or collapse the section.

## Block Metadata

| Property   | Value                            |
| ---------- | -------------------------------- |
| Name       | `prc-block/accordion-controller` |
| Title      | Accordion                        |
| Category   | `design`                         |
| Version    | `1.0.0`                          |
| API        | 3                                |
| Textdomain | `accordion-controller`           |

## Allowed Inner Blocks

Only `prc-block/accordion` blocks are allowed inside this controller.

## Attributes

| Attribute        | Type      | Default | Description                                                                                                                                          |
| ---------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `structuredData` | `boolean` | `false` | When enabled, outputs FAQPage schema.org structured data markup on the accordion. Useful for FAQ sections that should appear in Google rich results. |

## Supports

| Feature                     | Enabled                          | Notes                      |
| --------------------------- | -------------------------------- | -------------------------- |
| Anchor                      | Yes                              |                            |
| HTML editing                | No                               |                            |
| Interactivity API           | Yes                              |                            |
| Align                       | Yes (all)                        |                            |
| Color: link                 | Yes                              |                            |
| Color: text                 | No                               |                            |
| Color: background           | No                               |                            |
| Spacing: blockGap           | Yes (vertical only)              |                            |
| Spacing: margin             | Yes                              |                            |
| Spacing: padding            | Yes                              |                            |
| Layout                      | Flex vertical (editing disabled) | Fixed vertical flex layout |
| Typography: fontSize        | Yes (default control)            |                            |
| Typography: fontFamily      | Yes (default control)            |                            |
| Border: color, style, width | Yes (all default controls)       |                            |

## Block Transforms

### Tabs (`prc-block/tabs`)

-   **From Tabs**: Each tab becomes a `prc-block/accordion` item; the tab label becomes the accordion title; inner blocks from each tab are preserved.
-   **To Tabs**: Each `prc-block/accordion` becomes a tab; the accordion title becomes the tab label; inner blocks are preserved. The new tabs block receives a generated `tabsId` and `activeTabIndex: 0`.

### Core Accordion (`core/accordion`)

The controller registers a **to** transform only (no **from** transform here) that converts the PRC accordion into the core Accordion block tree:

| Source                             | Target                                         |
| ---------------------------------- | ---------------------------------------------- |
| `prc-block/accordion-controller`   | `core/accordion`                               |
| Each `prc-block/accordion`         | `core/accordion-item` (`openByDefault: false`) |
| Accordion title                    | `core/accordion-heading` (`title`, `level: 3`) |
| Inner blocks of each PRC accordion | `core/accordion-panel`                         |

Root `core/accordion` attributes set by the transform:

-   **`structuredData`**: Carried over from the controller (for FAQ schema and compatibility with extended registrations such as `prc-block/core-accordion`).
-   **`autoclose`**: Set to `true` so only one section is open at a time, consistent with typical PRC accordion behavior.

## Inspector Controls

-   **Accordion Settings** panel:
    -   **Include Structured Data** toggle: When enabled, outputs FAQ schema.org structured data (`FAQPage`, `Question`, `Answer`) on the rendered accordion markup.

## Usage Instructions

1. Insert the **Accordion** block from the inserter (this inserts the controller with one accordion item).
2. Type a title for the first accordion item.
3. Add content inside the accordion item.
4. Click the **+** appender button to add more accordion items.
5. New accordion items will inherit style attributes (className, backgroundColor, fontFamily, fontSize, style) from existing items.
6. Enable **Include Structured Data** in the sidebar if this is an FAQ section.

## Block Markup Example

```html
<div
	class="wp-block-prc-block-accordion-controller"
	data-wp-interactive="prc-block/accordion-controller"
	data-wp-context='{"activeId":null}'
	data-wp-init="callbacks.onInit"
>
	<!-- prc-block/accordion items rendered here -->
</div>
```

## PHP Rendering

The `render_block_callback` in `class-accordion-controller.php`:

1. If `structuredData` is `true`, injects schema.org microdata attributes (`itemscope`, `itemtype`, `itemprop`) onto the accordion elements for FAQPage structured data.
2. Adds Interactivity API directives to the wrapper: `data-wp-interactive`, `data-wp-context` (with `activeId: null`), and `data-wp-init`.

### Structured Data Output

When enabled, the markup is annotated with:

-   Root element: `itemscope itemtype="https://schema.org/FAQPage"`
-   Each accordion item: `itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"`
-   Title: `itemprop="name"`
-   Content wrapper: `itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"`
-   First paragraph: `itemprop="text"`

## Frontend Interactivity

The `view.js` file registers an Interactivity API store under `prc-block/accordion-controller` with the following:

### State / Context

-   `activeId`: Tracks which accordion section is currently open (by its DOM `id`). Only one accordion can be open at a time within a controller.

### Actions

-   `onClick`: Toggles the clicked accordion. If the clicked accordion is already active, it closes (`activeId = null`). Otherwise, it opens the new one. Also updates the URL hash and smooth-scrolls to the accordion. Includes support for toggling embedded entity iframes.

### Callbacks

-   `onInit`: On page load, reads the URL hash. If it matches one of the accordion section IDs, that accordion opens automatically.
-   `isActiveAccordion`: Returns `true` if the current element's `id` matches the `activeId` in context.

## Styles

```css
.wp-block-prc-block-accordion-controller {
	color: inherit;
	background: inherit;
	margin-block-end: 1.5em;
}
```

## Example (from block.json)

The block.json includes an example with two accordion items ("Accordion 1" and "Accordion 2"), each containing a paragraph, displayed at 640px viewport width.

## Related Blocks

-   [Accordion Item](./accordion.md) — child block (the individual collapsible sections)
-   Tabs (`prc-block/tabs`) — can be transformed to/from this block
-   Core Accordion (`core/accordion`) — optional **to** transform produces `core/accordion-item`, `core/accordion-heading`, and `core/accordion-panel` (see [Block Transforms](#block-transforms))

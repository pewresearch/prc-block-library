# Story Item

## Block Overview

| Property    | Value                                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name        | `prc-block/story-item`                                                                                                                                                                 |
| Title       | Story Item                                                                                                                                                                             |
| Category    | `content-curation`                                                                                                                                                                     |
| Version     | 5.0.0                                                                                                                                                                                  |
| Description | A story item is a visual display of a post, with a title, excerpt, and image. Pre-compiled variations such as pub-listing and list-item are available for each post. |
| Keywords    | prc, story, item, story item, stub                                                                                                                                                     |

## Supports

| Feature       | Enabled                      |
| ------------- | ---------------------------- |
| HTML editing  | No                           |
| Spacing       | margin (top/bottom), padding |
| Border        | color, width                 |
| Typography    | fontSize, fontFamily         |
| Interactivity | clientNavigation             |

## Attributes

| Attribute               | Type      | Default     | Description                                                                                                                                                                                                                                                |
| ----------------------- | --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                 | `string`  | _(none)_    | The story item headline.                                                                                                                                                                                                                                   |
| `excerpt`               | `string`  | _(none)_    | HTML excerpt content. Serialized from the `.description` container (`source: html` in `block.json`). In the editor, edited with `RichText` on a `div.description`; when the header is disabled, the excerpt also gets a `sans-serif` class for typography. |
| `url`                   | `string`  | `""`        | Link URL for the story item.                                                                                                                                                                                                                               |
| `label`                 | `string`  | _(none)_    | Meta label (e.g., "Report", "Fact Sheet").                                                                                                                                                                                                                 |
| `date`                  | `string`  | _(none)_    | Publication date string (formatted as "M j, Y").                                                                                                                                                                                                           |
| `image`                 | `string`  | _(none)_    | Image URL for the story item.                                                                                                                                                                                                                              |
| `imageSlot`             | `string`  | `"top"`     | Image position. Options: `top`, `left`, `right`, `bottom`, `disabled`.                                                                                                                                                                                     |
| `imageSize`             | `string`  | `"A1"`      | Image size preset (e.g., `A1`, `A2`, `A3`).                                                                                                                                                                                                                |
| `isChartArt`            | `boolean` | `false`     | Whether the image is chart art (affects rendering).                                                                                                                                                                                                        |
| `postId`                | `integer` | _(none)_    | The WordPress post ID to pull data from.                                                                                                                                                                                                                   |
| `postType`              | `string`  | _(none)_    | The WordPress post type.                                                                                                                                                                                                                                   |
| `headerSize`            | `integer` | `2`         | Heading level for the title (1-6).                                                                                                                                                                                                                         |
| `enableAltHeaderWeight` | `boolean` | `false`     | Use alternative (lighter) header font weight.                                                                                                                                                                                                              |
| `enableHeader`          | `boolean` | `true`      | Whether to show the title.                                                                                                                                                                                                                                 |
| `enableExcerpt`         | `boolean` | `true`      | Whether to show the excerpt.                                                                                                                                                                                                                               |
| `enableExtra`           | `boolean` | `false`     | Whether to show the extra content slot (inner blocks).                                                                                                                                                                                                     |
| `enableMeta`            | `boolean` | `true`      | Whether to show the meta section (label, date).                                                                                                                                                                                                            |
| `metaTaxonomy`          | `string`  | `"formats"` | Which taxonomy to use for the meta label.                                                                                                                                                                                                                  |
| `isPreview`             | `boolean` | `false`     | Whether the block is in preview/read-only mode.                                                                                                                                                                                                            |

## Uses Context

| Context Key                | Description                             |
| -------------------------- | --------------------------------------- |
| `postId`                   | Post ID from query loop context.        |
| `postType`                 | Post type from query loop context.      |
| `query`                    | Query parameters from query loop.       |
| `queryId`                  | Query loop ID.                          |
| `enhancedPagination`       | Whether enhanced pagination is enabled. |
| `displayLayout`            | Layout settings from query loop.        |
| `previewPostType`          | Post type for preview mode.             |
| `grid/column/desktop/span` | Grid column span for desktop.           |
| `grid/column/tablet/span`  | Grid column span for tablet.            |
| `grid/column/mobile/span`  | Grid column span for mobile.            |

## Grid columns and `--grid-column-gap`

When a story item sits inside **`prc-block/grid-column`**, the column block exposes **`--grid-column-gap`** on its wrapper (from the column’s block spacing **block gap**, vertical axis). Descendant story-item styles can use that variable so vertical padding and dividers between stacked items stay aligned with the column’s gap.

In `style.scss`, consecutive story items in several containers (including grid columns with layout flow, post template list items, and related selectors) use:

-   `padding: var(--grid-column-gap, 21px) 0` (with a **21px** fallback when the variable is absent), plus bottom border treatment between items and first/last/only-child exceptions.

So changing the column’s block gap in the editor updates spacing for those story-item stacks without duplicating values in theme CSS.

## Available Styles

None defined in `block.json`.

## Block Variations

| Variation                        | Title                          | Description                                                | Key Attributes                                          |
| -------------------------------- | ------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------- |
| `story-item-lede`                | Lede Story Item                | Default lede layout: top A1 image with header and excerpt. | `imageSlot: "top"`, `imageSize: "A1"`, `headerSize: 1`  |
| `story-item-publication-listing` | Publication Listing Story Item | Left A3 image (right on mobile).                           | `imageSlot: "left"`, `imageSize: "A3"`, `headerSize: 2` |
| `story-item-list-item`           | List Item                      | No excerpt, no image.                                      | `imageSlot: "disabled"`, `enableExcerpt: false`         |

All variations are available in the inserter, block settings, and transform scopes.

## Inner Blocks

When `enableExtra` is true, accepts inner blocks in the "extra" slot. Allowed blocks: `core/list`, `core/paragraph`, `core/html`.

## Parent / Ancestor Requirements

None. Can be placed anywhere, including inside query loops (`core/post-template`).

## Transforms

Supports transforming from raw pasted content:

-   If a `<p>` tag contains a URL matching the current site domain, it transforms into a `prc-block/story-item` block with that URL. This runs at priority 0 (before any other transforms).

## Usage Instructions

1. Insert the **Story Item** block.
2. If no `postId` is set, a **Placeholder** appears with a search field to find and select a post.
3. Once a post is selected, the block populates title, excerpt, image, date, and label from the post data.
4. Use the toolbar and inspector controls to configure:
    - **Image slot**: top, left, right, bottom, or disabled.
    - **Image size**: A1 (large), A2 (medium), A3 (small).
    - **Header size**: Heading level 1-6.
    - **Toggle sections**: Enable/disable header, excerpt, meta, and extra content.
    - **Meta taxonomy**: Choose which taxonomy provides the label.
5. When placed inside a **Query Loop** (`core/post-template`), the block automatically adapts to each post in the loop using query context.
6. Click the block to enter edit mode; deselect to see the preview.

## Block Markup Example

```html
<article
	class="wp-block-prc-block-story-item is-style-lede has-image-top has-image-size-a1"
>
	<div class="meta">
		<span class="label">Report</span>
		<span class="date">Jan 1, 2023</span>
	</div>
	<div class="image loaded">
		<a href="https://example.com/article">
			<img src="https://example.com/image.jpg" alt="Article title" />
		</a>
	</div>
	<h2 class="title">
		<a href="https://example.com/article">Article Title</a>
	</h2>
	<div class="description">
		<p>Lorem ipsum dolor sit amet...</p>
	</div>
</article>
```

## PHP Rendering

The block is server-side rendered via `Story_Item::render_story_item()`:

-   Instantiates a `Story_Item_API` object that handles all rendering logic.
-   Produces four markup sections: meta, image, title, and content (excerpt + extra).
-   Wraps everything in an `<article>` tag with block wrapper attributes.
-   Supports query context awareness via `handle_story_item_query_context_awareness()`:
    -   When inside a `core/post-template`, the block receives `queryId` and `query` context.
    -   Removes `postId` and `postType` from hoisted context so each iteration uses its own post data.
-   Uses caching with a 10-minute TTL for performance.
-   Date format: `M j, Y` (e.g., "Jan 1, 2023").

## Frontend Interactivity

The `view.js` script adds a `loaded` CSS class to all `.image` elements within story items after the window `load` event, enabling CSS transitions for image appearance.

## Related Blocks

-   **`prc-block/grid-column`** -- Parent can supply `--grid-column-gap` for stacked story items (see above).
-   **`core/post-template`** -- Can be placed inside query loops for dynamic post listing.
-   **`core/query`** -- Provides query context when story items are used in loops.

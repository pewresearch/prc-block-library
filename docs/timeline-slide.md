# Timeline Slide

**An individual slide within a Timeline block**

## Block Metadata

| Property  | Value                        |
| --------- | ---------------------------- |
| Name      | `prc-block/timeline-slide`   |
| Category  | `design`                     |
| API       | Version 3                    |
| Textdomain| `timeline-slide`             |

## Supports

| Feature         | Value                                          |
| --------------- | ---------------------------------------------- |
| Anchor          | `true`                                         |
| HTML editing    | `false`                                        |
| Reusable        | `false`                                        |
| Interactivity   | `true`                                         |
| Spacing         | `blockGap`, `margin` (top, bottom), `padding`  |
| Typography      | `fontSize`, `fontFamily`                       |

## Attributes

| Attribute  | Type     | Default                    | Description                                                                 |
| ---------- | -------- | -------------------------- | --------------------------------------------------------------------------- |
| `metadata` | `object` | `{ "name": "2020" }`       | Standard block metadata object. The `name` property is used as the tick label on the parent timeline. |

## Context

**Uses context from parent:**

| Context Key                      | Description                                    |
| -------------------------------- | ---------------------------------------------- |
| `timeline/currentActiveIndex`    | The index of the currently active slide in the parent timeline. |

## Inner Blocks

This is a container block. Any blocks can be placed inside a timeline slide. The default template provides a single `core/paragraph` with the placeholder "Timeline Slide Content".

## Parent / Ancestor Requirements

| Restriction | Value                  |
| ----------- | ---------------------- |
| `parent`    | `prc-block/timeline`   |

This block can only be inserted as a direct child of the `prc-block/timeline` block.

## Available Styles

No registered block styles.

## Usage Instructions

1. Timeline slides are automatically created when you insert a Timeline block or one of its variations.
2. To add a new slide, use the block appender within the timeline or duplicate an existing slide.
3. The slide's tick label is controlled by the block's `metadata.name` attribute, which is edited directly on the timeline bar in the parent block's tick UI -- not within the slide itself.
4. In the editor, only the currently selected/active slide is visible. Select a slide by clicking its tick on the timeline or using the range slider.
5. Add any content inside the slide -- paragraphs, images, groups, etc.

## PHP Rendering

The block is server-side rendered via `Timeline_Slide::render_callback()`. It:

1. Returns an empty string if `metadata.name` is not set.
2. Generates a block ID by hashing the `metadata.name` with `md5()`.
3. Outputs a `<section>` element with Interactivity API attributes:
   - `data-wp-interactive="prc-block/timeline"` -- Shares the same interactive store as the parent timeline.
   - `data-wp-context` -- Provides the slide's ID (md5 hash) for active state matching.
   - `data-wp-class--is-active="callbacks.isTimelineSlideActive"` -- Toggles the `is-active` class based on whether this slide matches the currently active tick.

## Frontend Interactivity

The timeline slide participates in the parent `prc-block/timeline` Interactivity API store. It does not define its own store.

- The `callbacks.isTimelineSlideActive` callback (defined in the timeline's `view.js`) compares the slide's context `id` against the parent's `activeTickId`.
- When active, the slide receives the `is-active` CSS class.
- When not active, the slide is hidden via CSS (`display: none`).

## Block Markup Example

```html
<section class="wp-block-prc-block-timeline-slide"
         data-wp-interactive="prc-block/timeline"
         data-wp-context='{"id":"abc123def456"}'
         data-wp-class--is-active="callbacks.isTimelineSlideActive">
  <p>Content for this timeline step.</p>
</section>
```

## Frontend Styles

```css
.wp-block-prc-block-timeline-slide:not(.is-active) {
    display: none;
}
```

Only the slide matching the active tick is visible at any time.

## Related Blocks

- **[`prc-block/timeline`](./timeline.md)** -- Required parent block. Provides the timeline navigation UI and manages active state.

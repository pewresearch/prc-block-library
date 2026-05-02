# Timeline Slide

**An individual slide within a Timeline block**

## Block Metadata

| Property   | Value                                                           |
| ---------- | --------------------------------------------------------------- |
| Name       | `prc-block/timeline-slide`                                      |
| Category   | `design`                                                        |
| API        | Version 3                                                       |
| Textdomain | `timeline-slide`                                                |
| Example    | Yes (`core/paragraph` — inserter preview; parent is `timeline`) |

## Supports

| Feature       | Value                                         |
| ------------- | --------------------------------------------- |
| Anchor        | `true`                                        |
| HTML editing  | `false`                                       |
| Reusable      | `false`                                       |
| Interactivity | `true`                                        |
| List view     | `true`                                        |
| Spacing       | `blockGap`, `margin` (top, bottom), `padding` |
| Typography    | `fontSize`, `fontFamily`                      |

## Attributes

| Attribute  | Type     | Default          | Description                                                                                                                                                                                   |
| ---------- | -------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metadata` | `object` | `{ "name": "" }` | Tick label is stored in `metadata.name`. Edited inline on the parent timeline bar (RichText on each tick), not in the slide inspector. Empty names fall back server-side — see PHP rendering. |

**Deprecation:** Posts that serialized the interim `label` string attribute are migrated to `metadata.name` when opened in the editor. PHP still accepts legacy `label` when `metadata.name` is empty.

## Context

**Uses context from parent:**

| Context Key                   | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `timeline/currentActiveIndex` | Zero-based index of the active slide in the parent timeline. |

## Inner Blocks

This is a container block. Any blocks can be placed inside a timeline slide. The default template provides a single `core/paragraph` with the placeholder "Timeline Slide Content".

## Parent / Ancestor Requirements

| Restriction | Value                |
| ----------- | -------------------- |
| `parent`    | `prc-block/timeline` |

This block can only be inserted as a direct child of the `prc-block/timeline` block.

## Available Styles

No registered block styles.

## Usage Instructions

1. Timeline slides are automatically created when you insert a Timeline block or one of its variations.
2. To add a new slide, use the block appender within the timeline or duplicate an existing slide.
3. The tick label is the slide’s `metadata.name`. It is edited on the parent timeline’s tick bar (RichText on each tick), not inside the slide block’s sidebar.
4. In the editor, only the currently selected/active slide content is shown. Select a slide by clicking its tick on the timeline or using the parent’s range slider (indices are zero-based, matching the frontend).
5. Add any content inside the slide — paragraphs, images, groups, etc.

## Inserter preview

The `example` in `block.json` uses one `core/paragraph` with sample timeline slide text, consistent with the default inner-blocks template.

## PHP Rendering

The block is server-side rendered via `Timeline_Slide::render_callback()`. It:

1. Resolves a **display label** with `resolve_slide_label()` so tick IDs stay aligned with the parent timeline:
    - Uses `metadata.name` when non-empty.
    - Otherwise uses legacy `label` if present (unmigrated content).
    - Otherwise uses a stable fallback `Slide {n}` where `n` is the 1-based slide index (derived from the slide’s position among the parent’s inner blocks when possible).
2. Generates a block ID with `md5( $resolved_label )` so the slide’s `id` matches the corresponding tick on the parent timeline.
3. Always outputs the `<section>` and inner block content (no longer returns an empty string when the label is blank).
4. Outputs a `<section>` with Interactivity API attributes:
    - `data-wp-interactive="prc-block/timeline"` — Shares the same interactive store as the parent timeline.
    - `data-wp-context` — Provides the slide’s ID (md5 hash of the resolved label) for active state matching.
    - `data-wp-class--is-active="callbacks.isTimelineSlideActive"` — Toggles the `is-active` class based on whether this slide matches the currently active tick.

## Frontend Interactivity

The timeline slide participates in the parent `prc-block/timeline` Interactivity API store. It does not define its own store.

-   The `callbacks.isTimelineSlideActive` callback (defined in the timeline’s `view.js`) compares the slide’s context `id` against the parent’s `activeTickId`.
-   When active, the slide receives the `is-active` CSS class.
-   When not active, the slide is hidden via CSS (`display: none`).

## Block Markup Example

```html
<section
	class="wp-block-prc-block-timeline-slide"
	data-wp-interactive="prc-block/timeline"
	data-wp-context='{"id":"abc123def456"}'
	data-wp-class--is-active="callbacks.isTimelineSlideActive"
>
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

-   **[`prc-block/timeline`](./timeline.md)** — Required parent block. Provides the timeline navigation UI and manages active state.

# Timeline

**Display a series of blocks in a timeline**

## Block Metadata

| Property  | Value                  |
| --------- | ---------------------- |
| Name      | `prc-block/timeline`   |
| Category  | `design`               |
| API       | Version 3              |
| Textdomain| `timeline`             |

## Supports

| Feature         | Value                                          |
| --------------- | ---------------------------------------------- |
| Anchor          | `true`                                         |
| HTML editing    | `false`                                        |
| Interactivity   | `true`                                         |
| Spacing         | `blockGap`, `margin` (top, bottom), `padding`  |
| Typography      | `fontSize`, `fontFamily`                       |

## Attributes

| Attribute            | Type      | Default     | Description                                                                 |
| -------------------- | --------- | ----------- | --------------------------------------------------------------------------- |
| `defaultLabel`       | `string`  | `"Timeline"`| Default label for the timeline.                                             |
| `currentActiveIndex` | `number`  | `0`         | Index of the currently active slide. Provided as context to child slides.   |
| `enableAutoPlay`     | `boolean` | `false`     | Whether the timeline auto-advances through slides.                          |
| `autoPlayInterval`   | `number`  | `3000`      | Interval in milliseconds between auto-play advances.                        |
| `tickMarkInterval`   | `number`  | `1`         | Show every Nth tick mark (e.g., 2 = every other tick, 5 = every 5th).      |
| `tickMarkHeight`     | `number`  | `8`         | Height of tick marks in pixels.                                             |
| `showAllTickMarks`   | `boolean` | `false`     | Force all tick marks visible regardless of density calculations.            |
| `hideLastTick`       | `boolean` | `false`     | Hide the last tick mark on the timeline.                                    |
| `tickLabelAngle`     | `number`  | `0`         | Rotation angle (in degrees) for tick labels.                                |
| `visibleTicks`       | `array`   | `[]`        | Array of specific tick indices to display. Overrides other visibility rules. |

## Context

The timeline **provides** the following context to its inner blocks:

| Context Key                      | Source Attribute       |
| -------------------------------- | ---------------------- |
| `timeline/currentActiveIndex`    | `currentActiveIndex`   |

## Inner Blocks

Only `prc-block/timeline-slide` blocks are allowed as children (`allowedBlocks`).

## Parent / Ancestor Requirements

None. This is a top-level block.

## Variations

Pre-built variations create year-based timelines with pre-populated `timeline-slide` inner blocks. Each slide's `metadata.name` is set to the year string.

| Variation Name     | Title              | Year Range  | Scope                    |
| ------------------ | ------------------ | ----------- | ------------------------ |
| `timeline-2000`    | Timeline: 2000     | 2000 - 2024 | `inserter`, `transform`  |
| `timeline-1990`    | Timeline: 1990     | 1990 - 2024 | `inserter`, `transform`  |
| `timeline-1980`    | Timeline: 1980     | 1980 - 2024 | `inserter`, `transform`  |
| `timeline-1970`    | Timeline: 1970     | 1970 - 2024 | `inserter`, `transform`  |

## Transforms

**From:**

| Source Block       | Behavior                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| `prc-block/tabs`   | Converts each tab into a timeline slide, using the tab label as the tick label. |

**To:**

| Target Block       | Behavior                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| `prc-block/tabs`   | Converts each slide into a tab, using `metadata.name` as the tab label.  |
| `core/group`       | Wraps each slide's inner blocks in a group, preserving metadata.         |
| `core/details`     | Converts each slide into a details/summary element using the tick label. |

## Inspector Controls

### Playback Controls

- **Auto Play** -- Toggle to enable automatic timeline advancement.
- **Interval (seconds)** -- Range slider (1s - 10s, step 0.5s). Stored internally in milliseconds.

### Tick Mark Controls

- **Show All Tick Marks** -- Toggle to force all ticks visible.
- **Tick Mark Interval** -- Range (1 - 10). Only visible when "Show All" is off. Controls which Nth ticks are displayed.
- **Hide Last Tick** -- Toggle to hide the final tick mark.
- **Tick Mark Height (px)** -- Range (4 - 20px).
- **Tick Label Angle** -- Angle picker to rotate labels for readability.

### Specific Tick Selection

An advanced panel listing every slide by its `metadata.name`. Each tick has a toggle to individually include/exclude it. When any specific ticks are selected, this overrides interval and "show all" settings. Includes "Clear Selection" and "Select All" buttons.

## Usage Instructions

1. Insert a **Timeline** block or choose one of the year-based variations from the inserter.
2. Each child `timeline-slide` block represents one step on the timeline. The slide's block name (`metadata.name`) is used as the tick label.
3. Edit tick labels directly on the timeline bar using inline rich text editing.
4. Use the range slider in the editor to navigate between slides. Clicking a tick also navigates to that slide.
5. Configure playback and tick display options in the block inspector sidebar.

## PHP Rendering

The block is server-side rendered via `Timeline::render_callback()`. It:

1. Iterates over `innerBlocks` to build a `$ticks` array with label, value, ID (md5 hash of label), position percentage, and visibility state.
2. Computes tick density (`sparse`, `medium`, `dense`, `very-dense`) based on tick count when automatic density mode is active.
3. Outputs the wrapper `<div>` with Interactivity API attributes (`data-wp-interactive`, `data-wp-context`, `data-wp-init`).
4. Renders a tick slider region with a `<ul>` of ticks using `<template data-wp-each>` for client-side iteration.
5. Includes a range `<input>` slider, play/pause button with Font Awesome icons, and the inner block content.
6. Sets CSS custom properties `--tick-height` and `--tick-label-angle` inline.

## Frontend Interactivity

Uses the WordPress Interactivity API store `prc-block/timeline`. Key behaviors:

- **`actions.togglePlay`** -- Toggles auto-play on/off. Updates `aria-pressed` on the play/pause button.
- **`actions.startAutoPlay`** -- Starts a `setInterval` loop that advances the active tick, cycling back to the beginning when reaching the end.
- **`actions.stopAutoPlay`** -- Clears the interval and resets play state.
- **`actions.activateTick`** -- Activated when a tick is clicked. Stops auto-play, updates the active tick ID, focuses the tick element for keyboard accessibility, and syncs the range slider.
- **`callbacks.onInit`** -- Initializes slider `input` and `change` event listeners for continuous sliding and snap-on-release behavior. Starts auto-play if enabled.
- **`callbacks.isTimelineSlideActive`** -- Returns whether the current slide's ID matches the active tick ID (used by `timeline-slide`).
- **`callbacks.getTickPosition`** -- Returns CSS `left` percentage for tick positioning.
- **`callbacks.isTickHidden`** -- Returns whether a tick should be hidden based on visibility settings.

## Block Markup Example

```html
<div class="wp-block-prc-block-timeline"
     data-wp-interactive="prc-block/timeline"
     data-tick-density="sparse"
     data-show-all-ticks="false"
     data-manual-control="false"
     data-wp-context='{"id":"timeline-1","activeTickId":"abc123","ticks":[...],"isPlaying":false,"interval":3000}'
     data-wp-init="callbacks.onInit"
     style="--tick-height: 8px; --tick-label-angle: 0deg;">
  <div class="tick-slider" role="region" aria-label="Timeline Navigation">
    <ul class="ticks" role="tablist">
      <template data-wp-each--tick="context.ticks">
        <li class="tick" role="tab"
            data-wp-bind--data-tick-id="context.tick.id"
            data-wp-on--click="actions.activateTick"
            data-wp-bind--style="callbacks.getTickPosition"
            data-wp-class--is-hidden="callbacks.isTickHidden">
          <span data-wp-text="context.tick.label"></span>
        </li>
      </template>
    </ul>
    <div class="timeline-controls">
      <input type="range" id="timeline-1" min="0" max="24" value="0" />
      <button class="play-pause-button"
              data-wp-on--click="actions.togglePlay"
              data-wp-bind--aria-label="callbacks.autoPlayButtonText"
              data-wp-class--is-playing="context.isPlaying">
        <!-- play/pause icons -->
      </button>
    </div>
  </div>
  <!-- timeline-slide inner blocks rendered here -->
</div>
```

## Related Blocks

- **[`prc-block/timeline-slide`](./timeline-slide.md)** -- Required child block representing each step in the timeline.
- **`prc-block/tabs`** -- Can be transformed to/from a timeline.

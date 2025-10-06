# Timeline Block - Tick Mark Controls

## Overview

The Timeline block now includes comprehensive controls for managing tick mark display and appearance. This addresses user feedback about inconsistent tick mark display and lack of control over which marks are shown.

## New Block Attributes

### `showAllTickMarks` (boolean, default: false)

When enabled, all tick marks are displayed regardless of other settings. When disabled, tick marks are filtered based on the interval setting.

### `tickMarkInterval` (number, default: 1, range: 1-10)

Controls which tick marks to display. For example:

- `1` = Show all tick marks
- `2` = Show every other tick mark
- `5` = Show every 5th tick mark
- `10` = Show every 10th tick mark

**Note:** The first and last tick marks are always displayed for timeline boundaries.

### `tickMarkHeight` (number, default: 8, range: 4-20)

Controls the height of tick marks in pixels. This ensures consistent styling across all timeline instances.

## Inspector Controls

### Playback Controls Panel

- **Auto Play** - Toggle automatic playback of timeline
- **Interval (seconds)** - Time between automatic transitions (1-10 seconds)

### Tick Mark Controls Panel

- **Show All Tick Marks** - Toggle to show all tick marks regardless of interval
- **Tick Mark Interval** - Dropdown to select interval (only shown when "Show All" is disabled)
- **Tick Mark Height (px)** - Slider to adjust tick mark height (4-20px)

## Usage Examples

### Example 1: Timeline with Many Years (1970-2025)

For a timeline spanning 55 years, you might want to show only major milestones:

- Set `showAllTickMarks` to `false`
- Set `tickMarkInterval` to `10` (shows 1970, 1980, 1990, 2000, 2010, 2020, 2025)
- Set `tickMarkHeight` to `12` for more prominent marks

### Example 2: Timeline with Few Years (2020-2025)

For a short timeline, you might want to show all marks:

- Set `showAllTickMarks` to `true`
- Set `tickMarkHeight` to `8` for standard marks

### Example 3: Custom Spacing

For custom spacing needs:

- Set `showAllTickMarks` to `false`
- Set `tickMarkInterval` to `3` (shows every 3rd year)
- Adjust `tickMarkHeight` as needed

## Technical Implementation

### Frontend (render.php)

- Reads attributes and filters ticks based on interval
- Always includes first and last ticks
- Passes `visible` property to JavaScript context
- Applies `--tick-height` CSS custom property

### Editor (edit.jsx)

- Applies same filtering logic as frontend
- Shows/hides ticks in real-time as settings change
- Applies CSS custom property for height

### Styling (style.scss)

- Uses `.is-hidden` class to hide filtered ticks
- Respects `--tick-height` CSS custom property
- Maintains existing density-based rules as fallback

### Interactivity (view.js)

- `isTickHidden` callback checks `visible` property
- Applies `.is-hidden` class dynamically
- Ensures proper tick positioning

## Backward Compatibility

All new attributes have sensible defaults:

- `showAllTickMarks`: `false` (preserves existing behavior)
- `tickMarkInterval`: `1` (shows all ticks by default)
- `tickMarkHeight`: `8` (matches existing default)

Existing timeline blocks will continue to work without changes, using the default values.

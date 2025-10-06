# Timeline

Contributors: Pew Research Center
Tags: block
Tested up to: 6.4
Stable tag: 0.1.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Display a series of blocks in a timeline

## Description

The Timeline block displays a series of timeline slides in an interactive, horizontal timeline format with a slider control. Users can navigate through slides manually or enable auto-play for automatic progression.

### Key Features

- **Interactive Slider** - Drag or click to navigate through timeline points
- **Auto Play** - Optional automatic progression with configurable intervals
- **Tick Mark Controls** - Full control over which tick marks are displayed and their appearance
- **Custom Tick Height** - Adjust the height of tick marks for better visibility
- **Responsive Design** - Works across all device sizes
- **Accessibility** - Full keyboard navigation and ARIA support

## Instructions

### Adding a Timeline Block

1. Insert the Timeline block into your post or page
2. Choose a variation (Timeline: 2000, 1990, 1980, or 1970) or start with the default
3. Each variation creates timeline slides for the specified year range

### Configuring Timeline Settings

#### Playback Controls

- **Auto Play** - Enable automatic progression through timeline slides
- **Interval (seconds)** - Set how long each slide displays (1-10 seconds)

#### Tick Mark Controls

- **Show All Tick Marks** - Toggle to display all tick marks regardless of interval
- **Tick Mark Interval** - Display every Nth tick mark (1-10)
    - Example: Setting to 5 shows every 5th year
    - First and last tick marks always display
- **Tick Mark Height** - Adjust tick mark height in pixels (4-20px)

### Editing Timeline Slides

1. Select any timeline slide to edit its content
2. Update the slide name by clicking the tick mark label
3. Add any WordPress blocks inside each slide (images, text, embeds, etc.)

## Frequently Asked Questions

### How do I control which tick marks are displayed?

Use the "Tick Mark Controls" panel in the block settings:

- Enable "Show All Tick Marks" to display every tick mark
- Disable it and adjust "Tick Mark Interval" to show specific intervals (e.g., every 5th or 10th tick)

### Why do some tick marks show even with interval filtering?

The first and last tick marks always display to clearly show the timeline's start and end points.

### How do I fix inconsistent tick mark heights?

Use the "Tick Mark Height" control in the block settings to set a consistent height across all tick marks.

### Can I customize the content within each timeline slide?

Yes! Each timeline slide can contain any WordPress blocks - images, paragraphs, lists, embeds, etc.

## Changelog

= 0.2.0 =

- Added tick mark control attributes (tickMarkInterval, tickMarkHeight, showAllTickMarks)
- Added "Tick Mark Controls" inspector panel
- Improved tick mark visibility logic with customizable filtering
- Added consistent tick mark height control
- Enhanced editor experience to match frontend behavior
- Fixed tick mark styling inconsistencies

= 0.1.0 =

- Initial release

## Developer Notes

### Block Attributes

- `defaultLabel` (string) - Default label for timeline
- `currentActiveIndex` (number) - Currently active slide index
- `enableAutoPlay` (boolean) - Whether auto-play is enabled
- `autoPlayInterval` (number) - Auto-play interval in milliseconds
- `tickMarkInterval` (number) - Interval for displaying tick marks
- `tickMarkHeight` (number) - Height of tick marks in pixels
- `showAllTickMarks` (boolean) - Whether to show all tick marks

### CSS Custom Properties

- `--tick-height` - Controls the height of tick marks (set via block attributes)
- `--height` - Slider track height (default: 4px)
- `--thumb-size` - Slider thumb size (default: 16px)

### Interactivity API

The block uses WordPress Interactivity API for frontend behavior:

- Store: `prc-block/timeline`
- Context includes: ticks array, activeTickId, isPlaying, interval
- Actions: togglePlay, startAutoPlay, stopAutoPlay, activateTick
- Callbacks: getTickPosition, isTickHidden, autoPlayButtonText

### Tick Visibility Logic

Tick marks are filtered based on:

1. `showAllTickMarks` attribute - if true, all ticks show
2. `tickMarkInterval` attribute - shows every Nth tick
3. First and last ticks always show regardless of settings

See `CONTROLS.md` for detailed documentation on tick mark controls.

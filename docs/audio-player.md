# Audio Player

Custom audio player with multiple display styles.

## Block Metadata

| Property   | Value                                                   |
| ---------- | ------------------------------------------------------- |
| Name       | `prc-block/audio-player`                                |
| Title      | Audio Player                                            |
| Category   | `media`                                                 |
| Version    | `0.1.0`                                                 |
| API        | 3                                                       |
| Textdomain | `audio-player`                                          |
| Example    | Yes (sample `title` / `description` — inserter preview) |

## Attributes

| Attribute             | Type      | Default                          | Description                                                                                                |
| --------------------- | --------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `title`               | `string`  | `""`                             | Display title for the audio player.                                                                        |
| `description`         | `string`  | `""`                             | Description text shown below the title (in default/player style).                                          |
| `source`              | `object`  | `{ title: "", description: "" }` | The audio source object. Contains `id` (attachment ID), `title`, and `description` from the media library. |
| `imageSource`         | `object`  | `{ id: "" }`                     | Cover image source object with `id` (attachment ID) and `url`.                                             |
| `enableEventTracking` | `boolean` | `false`                          | Enable analytics event tracking for play/pause actions.                                                    |

## Available Styles

| Style Name  | Label   | Default | Description                                                                          |
| ----------- | ------- | ------- | ------------------------------------------------------------------------------------ |
| `card`      | Card    | No      | Compact inline player with a progress bar, play icon, title, and timestamp.          |
| `minimal`   | Minimal | No      | Stripped-down player with just play button, seeker, and time display.                |
| _(default)_ | --      | Yes     | Full player with cover image, title, description, play button, seeker bar, and time. |

## Supports

| Feature                | Enabled                | Notes |
| ---------------------- | ---------------------- | ----- |
| Anchor                 | Yes                    |       |
| HTML editing           | No                     |       |
| Spacing: blockGap      | Yes                    |       |
| Spacing: margin        | Yes (top, bottom only) |       |
| Spacing: padding       | Yes (default control)  |       |
| Typography: fontSize   | Yes (default control)  |       |
| Typography: fontFamily | Yes (default control)  |       |

## Usage Instructions

1. Insert the **Audio Player** block.
2. Use the block's sidebar controls to:
    - Select an audio file from the media library (sets the `source` attribute).
    - Optionally select a cover image (sets the `imageSource` attribute).
    - Override the title and description if desired.
3. Choose a style variation from the block toolbar or Styles panel:
    - **Default**: Full-featured player with image, title, description, and controls.
    - **Card**: Compact inline card with progress bar overlay.
    - **Minimal**: Just the playback controls and time.
4. Optionally enable event tracking for analytics.

## Block Markup Example

```html
<div
	class="wp-block-prc-block-audio-player is-style-card"
	data-title="Episode 1: Introduction"
	data-description="A brief overview"
	data-source="https://example.com/audio.mp3"
	data-image="https://example.com/cover.jpg"
	data-meta-title="Podcast Series"
	data-meta-description="Weekly episodes"
	data-enable-tracking="true"
>
	<!-- Inner content rendered by view.js React component -->
</div>
```

## PHP Rendering

This block uses a `render.php` template file rather than a PHP class render callback:

1. Extracts the audio URL via `wp_get_attachment_url()` from `source.id`.
2. Extracts the cover image URL via `wp_get_attachment_image_src()` from `imageSource.id`. When the attachment is missing or invalid, `wp_get_attachment_image_src()` returns `false` (not `null`); the template checks `is_array( $image_attachment )` before reading `[0]`, so an empty image URL is used instead of triggering a PHP notice.
3. Outputs a `<div>` wrapper with `data-*` attributes containing all the player configuration: title, description, source URL, image URL, meta title, meta description, and tracking flag.
4. The PHP class (`class-audio-player.php`) only handles block registration with no custom render callback.

## Frontend Interactivity

The `view.js` file uses `@wordpress/dom-ready` and `@wordpress/element` (React `render`) to hydrate each `.wp-block-prc-block-audio-player` element on the page:

1. On DOM ready, finds all audio player elements.
2. Reads configuration from `data-*` attributes.
3. Renders an `AudioPlayer` React component (from `./player`) into each element, passing all configuration as props.

The AudioPlayer component handles:

-   Play/pause toggle
-   Seek bar interaction
-   Time display (current / total)
-   Progress bar (in card style)
-   Cover image display (in default style)
-   Optional analytics event tracking

## Styles

The block has three distinct visual presentations:

### Default (Player) Style

Full-featured player with:

-   Cover image (150x150px)
-   Title (`<h1>`) and description (`<p>`)
-   Play/pause button (black background, white text)
-   Seek bar (full-width range input)
-   Time display

### Card Style

Compact inline button with:

-   Progress bar overlay behind content
-   Play icon, title text, and timestamp
-   Bordered with rounded corners (5px)

### Minimal Style

Controls-only layout:

-   Play button, seeker bar, and time display in a flex row

## Related Blocks

This block is standalone and does not depend on other custom blocks.

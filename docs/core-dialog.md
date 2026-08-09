# Core Dialog

PRC's custom dialog block, currently namespaced as `prc-block/dialog` with plans to transition to `core/dialog` when it lands in WordPress core.

## Block Namespace

`prc-block/core-dialog`

**Target Block:** `prc-block/dialog` (will become `core/dialog`)

## What PRC Customizes

This is not strictly a core block override -- it extends PRC's own `prc-block/dialog` with video playback support and registers a Video Dialog variation. The block anticipates eventual inclusion in WordPress core.

-   Syncs **[Entity as Iframe](entity-as-iframe.md)** inside the dialog with the native `<dialog open>` state (lazy iframe load when the dialog is open)
-   Adds video support (VideoPress, YouTube, Vimeo) to dialog elements
-   Registers a "Video Dialog" block variation
-   Provides a PHP utility for programmatically creating dialog blocks
-   Manages video lifecycle: play on open, pause/reset on close
-   Tracks video watch progress (marks as "watched" at 70% completion)

## Supports Modifications

| Support         | Value                            |
| --------------- | -------------------------------- |
| `interactivity` | `true` (defined in `block.json`) |

## Additional Attributes

None registered via this extension. The parent `prc-block/dialog` block defines its own attributes.

## Available Styles

No new block styles registered. The variation applies `is-style-video` className.

## Style Overrides

From `style.scss`:

**Video dialog styles** (`.is-style-video` or auto-detected video content):

-   Black background, no padding
-   Video figures and wrappers get zero margins
-   `jetpack-video-wrapper` gets 16:9 aspect ratio via padding-bottom hack
-   Iframes positioned absolutely to fill the wrapper

**Auto-detection:** Styles also apply to any dialog element containing a single `.wp-block-jetpack-videopress` or `.wp-block-video` child.

## Editor Enhancements

From `index.js`:

Registers the **"Video Dialog"** block variation on `prc-block/dialog`:

```
Name: dialog-video
Title: Video Dialog
Class: is-style-video
Dialog Type: modal
```

Pre-populates with:

-   A `prc-block/dialog-trigger` with a paragraph placeholder
-   A `prc-block/dialog-element` containing a `videopress/video` block

## Frontend Interactivity

From `view.js`:

Extends the `prc-block/dialog` Interactivity API store with comprehensive video player management:

**Supported platforms:**

-   **VideoPress** -- uses `VideoPressIframeApi` (from global window)
-   **YouTube** -- dynamically loads YouTube IFrame API
-   **Vimeo** -- dynamically loads Vimeo Player SDK

**Actions:**

-   `play(id)` -- plays the video in the specified dialog
-   `pause(id)` -- pauses the video
-   `reset(id)` -- seeks to the beginning
-   `initVideoPressAPI()` -- lazily initializes VideoPress on first dialog open (avoids 0x0 iframe rendering)
-   `initYouTubeAPI()` -- detects YouTube iframes, loads API, enables JS API on the iframe
-   `initVimeoAPI()` -- detects Vimeo iframes, loads API
-   `runAnimation()` -- dispatches animation start for any `prc-block/animation` blocks inside the dialog

**Callbacks:**

-   `onVideoInit` -- initializes YouTube and Vimeo on dialog content load (VideoPress deferred to open)
-   `onOpenStartVideo` -- plays video when dialog opens
-   `onCloseStopVideo` -- pauses on close; resets to beginning if already marked as watched
-   `onAnimationEnd` -- fires `wpDialogAnimationEnd` custom event after animation duration
-   `syncEntityIframeWithDialog` -- when the dialog markup includes **Entity as Iframe**, used with **`data-wp-watch--sync-entity-iframes`**: reads **`state.dialog.isOpen`** on the shared `prc-block/dialog` store (same state as `wp_interactivity_state` / `state.dialogs[id]`) and sets `store('prc-block/entity-as-iframe').state[iframeId].isActive` so nested entity iframes load only while the dialog is open (no DOM `open` / `MutationObserver` wiring). Guards with optional chaining (`dialog?.isOpen`) when context or `state.dialogs[id]` is missing or not yet initialized.
-   `prefetchEntityIframeOnTriggerPointer` -- bound via **`data-wp-on--pointerenter`** on **`.wp-block-prc-block-dialog-trigger`** (injected by `Core_Dialog::render_block__dialog` when the dialog subtree contains entity iframe): resolves the dialog by `aria-controls`, then prefetches `data-entity-iframe-prefetch-url` values inside that `<dialog>` (best-effort cache warm before first open)

**Watch tracking:**

-   Videos are marked as "watched" when 70% of cumulative playback time is reached
-   Tracked per dialog ID via `state.watchedVideos` array

## PHP Rendering

**Class:** `Core_Dialog`

Key behaviors:

1. **Dialog wrapper (`prc-block/dialog`):** `render_block_prc-block/dialog` -- when the rendered subtree contains **`wp-block-prc-block-entity-as-iframe`**, finds the first **`.wp-block-prc-block-dialog-trigger`** and adds **`data-wp-on--pointerenter="callbacks.prefetchEntityIframeOnTriggerPointer"`** for hover prefetch.

2. **Dialog element rendering:** Hooks into `render_block_prc-block/dialog-element` to inject video-related Interactivity API directives:

    - `data-wp-init--videoSupport="callbacks.onVideoInit"`
    - `data-wp-watch--on-open-start-video="callbacks.onOpenStartVideo"`
    - `data-wp-watch--on-close-stop-video="callbacks.onCloseStopVideo"`
    - `data-wp-watch--on-open-watch-animation-end="callbacks.onAnimationEnd"`
    - When block output contains **`wp-block-prc-block-entity-as-iframe`**, also injects **`data-wp-watch--sync-entity-iframes="callbacks.syncEntityIframeWithDialog"`**

3. **Utility functions** (`util.php`):
    - `create_dialog($args)` -- programmatically creates a parsed dialog block with trigger and element
    - `render_dialog($args)` -- creates and renders a dialog block, returning the HTML string

**`create_dialog` default args:**

```php
[
    'id'               => null,
    'content'          => '',
    'trigger'          => '',
    'dialogAttributes' => [
        'backgroundColor' => 'ui-white',
        'backdropColor'   => 'ui-black',
        'style'           => [
            'padding' => [...],
            'shadow'  => 'var:preset|shadow|shallow',
            'border'  => ['radius' => '12px', 'width' => '1px'],
        ],
    ],
]
```

## Block Markup Example

```html
<div class="wp-block-prc-block-dialog is-style-video">
	<div class="wp-block-prc-block-dialog-trigger">
		<p>Click to watch video</p>
	</div>
	<dialog
		class="wp-block-prc-block-dialog-element"
		data-wp-interactive="prc-block/dialog"
		data-wp-init--videoSupport="callbacks.onVideoInit"
		data-wp-watch--on-open-start-video="callbacks.onOpenStartVideo"
		data-wp-watch--on-close-stop-video="callbacks.onCloseStopVideo"
	>
		<figure class="jetpack-videopress-player">
			<iframe src="..."></iframe>
		</figure>
	</dialog>
</div>
```

## Variations

| Variation Name | Title        | Style Class      | Description                                                                    |
| -------------- | ------------ | ---------------- | ------------------------------------------------------------------------------ |
| `dialog-video` | Video Dialog | `is-style-video` | Modal dialog pre-configured with VideoPress block, designed for video playback |

# Core Cover

PRC's override/extension of the WordPress `core/cover` block.

## Block Namespace

`prc-block/core-cover`

**Target Block:** `core/cover`

## What PRC Customizes

- Adds responsive background image support (separate mobile and tablet images)
- Registers a "Disable Mobile Collapse" block style
- Applies extensive mobile-responsive behavior that collapses covers into stacked layouts on small screens
- Applies custom styling for video backgrounds, carousel integration, content width constraints, and text shadows on overlaid elements

## Supports Modifications

None directly. The block's supports are unchanged.

## Additional Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `mobileId` | `number` | -- | Attachment ID for the mobile background image |
| `mobileUrl` | `string` | -- | URL for the mobile background image |
| `tabletId` | `number` | -- | Attachment ID for the tablet background image |
| `tabletUrl` | `string` | -- | URL for the tablet background image |

Attributes are registered both server-side (`block_type_metadata` filter) and client-side (`blocks.registerBlockType` filter).

## Available Styles

| Style Name | Label | Description |
|------------|-------|-------------|
| `disable-mobile-collapse` | Disable Mobile Collapse | Prevents the cover from collapsing to a stacked layout on mobile |

## Style Overrides

From `style.scss`:

**Video background glassmorphism:**
- Groups with backgrounds inside covers containing `<video>` get a frosted glass effect (`backdrop-filter: blur(2px)`, semi-transparent white background, rounded corners)

**Default cover styles:**
- `margin-bottom: 2em`
- Centered content alignment when no custom position is set
- Inner container inherits color from parent
- Child blocks constrained to `--wp--custom--content-size` max-width (post title gets +280px)
- Carousel controllers inside covers get `height: 100%`
- Post bylines, dates, and titles get `text-shadow: 0px 1px 2px rgba(0,0,0,0.8)`

**Mobile collapse (screens <= 785px):**
- Covers (unless `.is-style-disable-mobile-collapse`) switch to `flex-direction: column`
- Min-height removed, padding-top zeroed
- Background images/videos become relatively positioned and stretch beyond container (-2em margins)
- Text shadows removed
- Text color overridden to `--wp--preset--color--ui-text-color`
- Background overlay and spacers hidden
- Post titles capped at 36px/115% line-height

## Editor Enhancements

From `index.js` and `controls.jsx`:

- Injects a **"Responsive Backgrounds"** panel into the Inspector Controls sidebar
- Provides two `MediaDropZone` components for selecting mobile and tablet background images
- Uses `createHigherOrderComponent` to wrap the core block edit with additional controls

## Frontend Interactivity

None. No `view.js` file. Responsive image swapping is handled server-side.

## PHP Rendering

**Class:** `Core_Cover`

Key behaviors:

1. **Device-based image replacement:** Uses `\PRC\Platform\get_current_device()` to detect `mobile` or `tablet` devices and replaces the cover's `<img>` `src` attribute with the appropriate responsive image URL
2. **Style enqueuing:** Ensures PRC's cover styles are loaded when the block renders

## Block Markup Example

```html
<div class="wp-block-cover" style="min-height:500px">
  <span class="wp-block-cover__background has-background-dim"></span>
  <img class="wp-block-cover__image-background"
       src="desktop-image.jpg" />
  <div class="wp-block-cover__inner-container">
    <h2 class="wp-block-post-title">Article Title</h2>
  </div>
</div>
```

On mobile devices, `desktop-image.jpg` is dynamically replaced with the mobile image URL.

## Variations

None.

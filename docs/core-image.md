# Core Image

PRC's override/extension of the WordPress `core/image` block.

## Block Namespace

`prc-block/core-image`

**Target Block:** `core/image`

## What PRC Customizes

- Completely replaces the default `wp-block-image` stylesheet with PRC's own
- Adds a "Disable Lazy Loading" toggle for performance-critical images
- Automatically disables lazy loading for images inside carousels and timeline slides
- Removes the "Rounded" block style
- Provides comprehensive image sizing classes (A1-A4, XL, and pixel-based widths)
- Fixes alignment behavior on mobile (collapses float to centered)
- Normalizes figcaption alignment and max-width

## Supports Modifications

None directly. The "Rounded" style is unregistered via `domReady`.

## Additional Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `disableLazyLoading` | `boolean` | `false` | When true, image loads eagerly instead of lazily |

Registered via `block_type_metadata` filter.

## Available Styles

The "Rounded" style is **removed**. No new styles are registered.

## Style Overrides

From `style.scss` (replaces core styles entirely):

**Sizing classes:**

| Class | Max Width |
|-------|-----------|
| `.size-A1` | 564px |
| `.size-A2` | 268px |
| `.size-A3` | 194px |
| `.size-A4` | 268px |
| `.size-XL` | 720px |
| `.size-200-wide` | 200px |
| `.size-260-wide` | 260px |
| `.size-310-wide` | 310px |
| `.size-420-wide` | 420px |
| `.size-640-wide` | 640px |
| `.size-740-wide` | 740px |
| `.size-1400-wide` | 1400px |

**Base image styles:**
- Non-wide/full images constrained to `max-width: 100%`
- Images get `height: auto`, `max-width: 100%`, `vertical-align: bottom`, `box-sizing: border-box`
- Border radius inheritance (except rounded style)
- Custom border support with `box-sizing: border-box`

**Alignment:**
- Center: `clear: none`, `text-align: center`
- Wide/Full: images stretch to 100% width
- Left/Right: `display: table` with table-caption figcaptions
- **Mobile (< 992px):** Left/right alignment collapses to centered (block theme only)
- **Desktop (>= 992px):** Left gets `float: left`, right gets `float: right`, with appropriate margins

**Figcaptions:** Max-width from `--wp--custom--max-width`, 0.5em top margin, left-aligned

From `editor.scss`:

- Wide/full alignment images stretch to 100% in editor
- Left/right alignment margins in editor
- Placeholder shimmer styling on selection
- Resize handle container uses `display: table`
- Crop area and zoom UI styles

## Editor Enhancements

From `index.js` and `controls.jsx`:

- **Removes "Rounded" style** on `domReady`
- Wraps block edit with controls via `createHigherOrderComponent`
- **Inspector Advanced Controls:** Adds a "Disable Lazy Loading" toggle with contextual help text

## Frontend Interactivity

None. No `view.js` file. Lazy loading behavior is managed server-side.

## PHP Rendering

**Class:** `Core_Image`

Key behaviors:

1. **Style replacement:** Deregisters `wp-block-image` and re-registers it with PRC's stylesheet

2. **Automatic lazy load disable:** `set_image_to_lazy_load_inside_blocks` detects when an image is inside a `prc-block/carousel-slide` or `prc-block/timeline-slide` and sets `disableLazyLoading` to `true`

3. **No-lazy-load class propagation:** `share_figure_no_lazy_load_classname_with_img` adds `no-lazy-load` class and `decoding="sync"` to the `<img>` tag when lazy loading is disabled

4. **Eager loading:** `eager_load` filter sets `loading="eager"` when the `no-lazy-load` class is present

5. **Dominant color disable:** `disable_dominate_color_for_no_lazy_loading` disables the dominant color placeholder for eagerly-loaded images

## Block Markup Example

```html
<!-- Standard image -->
<figure class="wp-block-image size-A1 alignright">
  <img src="chart.png" alt="Survey results chart"
       loading="lazy" decoding="async" />
  <figcaption>Source: Pew Research Center</figcaption>
</figure>

<!-- Image with lazy loading disabled (e.g., inside carousel) -->
<figure class="wp-block-image size-full">
  <img class="no-lazy-load" src="hero.jpg" alt="Hero image"
       loading="eager" decoding="sync" />
</figure>
```

## Variations

None.

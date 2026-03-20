# Core Code

PRC's override/extension of the WordPress `core/code` block.

## Block Namespace

`prc-block/core-code`

**Target Block:** `core/code`

## What PRC Customizes

- Completely replaces the default `wp-block-code` stylesheet with PRC's custom styles
- Applies a distinct visual treatment: light gray background with red italic code text

## Supports Modifications

None. PRC does not modify the core block's supports.

## Additional Attributes

None.

## Available Styles

None registered.

## Style Overrides

From `style.scss`:

- **Box sizing:** `box-sizing: border-box` on `.wp-block-code` for predictable padding
- **Code element styling:**
  - `display: inline-block`
  - `font-family: inherit` (inherits from `<pre>`)
  - `overflow-wrap: break-word` with `white-space: pre-wrap`
  - Forces LTR direction and initial text alignment (RTL-safe)
  - `background: #eff1f2` (light gray)
  - `color: #c80200` (red)
  - `font-style: italic`

## Editor Enhancements

From `index.js`:

- Only imports `style.scss` -- no editor-specific modifications

## Frontend Interactivity

None. No `view.js` file.

## PHP Rendering

**Class:** `Core_Code`

Key behaviors:

1. **Style replacement:** Deregisters the default `wp-block-code` stylesheet and re-registers it with PRC's custom CSS source. This ensures PRC's styles fully replace WordPress core styles rather than layering on top.

## Block Markup Example

```html
<pre class="wp-block-code"><code>const example = "hello world";</code></pre>
```

The visual output renders with a `#eff1f2` background and `#c80200` red italic text.

## Variations

None.

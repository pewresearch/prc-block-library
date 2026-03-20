# Core File

PRC's override/extension of the WordPress `core/file` block.

## Block Namespace

`prc-block/core-file`

**Target Block:** `core/file`

## What PRC Customizes

- Adds layout styling for file blocks that contain embedded `<object>` elements (e.g., inline PDF previews), arranging them in a flex layout with the preview ordered after the file link

## Supports Modifications

None. PRC does not modify the core block's supports.

## Additional Attributes

None.

## Available Styles

None.

## Style Overrides

From `style.scss`:

When a `.wp-block-file` contains an `<object>` element:
- Applies `display: flex` with `flex-wrap: wrap`
- `justify-content: space-between` with `align-items: center`
- `gap: 1rem` between elements
- The `<object>` element gets `order: 2` (pushed below the file link)

## Editor Enhancements

From `index.js`:

- Only imports `style.scss` -- no editor-specific modifications

## Frontend Interactivity

None. No `view.js` file.

## PHP Rendering

**Class:** `Core_File`

Minimal -- registers and enqueues the style asset. No render-time modifications to block output.

**Note:** There appears to be a minor bug in the constructor where it references `prc_block_library_manifest('core-code')` instead of `prc_block_library_manifest('core-file')`.

## Block Markup Example

```html
<div class="wp-block-file">
  <a href="/wp-content/uploads/report.pdf">Download Report (PDF)</a>
  <object data="/wp-content/uploads/report.pdf" type="application/pdf"
          style="width:100%;height:600px"></object>
</div>
```

## Variations

None.

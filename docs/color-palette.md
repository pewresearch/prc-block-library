# Color Palette

Displays the full theme color palette as a design system reference guide.

## Block Metadata

| Property    | Value                      |
|-------------|----------------------------|
| Namespace   | `prc-block/color-palette`  |
| Category    | `design`                   |
| Version     | `1.0.0`                    |
| API Version | `3`                        |

## Supports

| Feature       | Value   |
|---------------|---------|
| Anchor        | `true`  |
| HTML editing  | `false` |
| Interactivity | `true`  |

## Attributes

None. This block has no configurable attributes. It reads the theme color palette automatically.

## Available Styles

None.

## Inner Blocks

None. This is not a container block.

## Parent/Ancestor Requirements

None. Can be placed anywhere.

## Usage Instructions

1. Insert the **Color Palette** block from the block inserter (under the Design category).
2. The block automatically reads the theme's color palette from the block editor settings.
3. Colors are organized into sections:
   - **UI groups** (Surfaces & Backgrounds, Text, Borders & Dividers, Links, Status & Accent) — grouped by explicitly defined slug lists.
   - **Spectrum groups** — auto-detected from slugs matching the pattern `{family}-spectrum-{shade}`, sorted light-to-dark.
4. Colors using `light-dark()` CSS values display both light and dark mode variants side by side.
5. In the editor, the block renders a read-only visual grid of all color swatches.
6. On the frontend, clicking any swatch copies its hex value to the clipboard.

## Block Markup Example

The block saves as `null` (server-side rendered only). In `post_content`:

```html
<!-- wp:prc-block/color-palette /-->
```

## PHP Rendering

The `Color_Palette` PHP class provides a full server-side render callback:

1. Reads the theme color palette via `wp_get_global_settings( array( 'color', 'palette', 'theme' ) )`.
2. Groups colors into **UI sections** (hardcoded slug lists) and **Spectrum sections** (auto-detected from slug patterns).
3. Parses `light-dark()` CSS values to display separate light and dark swatches.
4. Calculates contrast-safe text colors using luminance for each swatch.
5. Each swatch element includes Interactivity API directives (`data-wp-interactive`, `data-wp-context`, `data-wp-on--click`, `data-wp-text`) for the copy-to-clipboard feature.

Rendered structure:

```html
<div class="wp-block-prc-block-color-palette">
  <div class="color-palette-section">
    <h3 class="color-palette-section__title">UI — Surfaces & Backgrounds</h3>
    <div class="color-palette-grid">
      <div class="color-palette-card">
        <div class="color-palette-card__name">ui-white</div>
        <div class="color-palette-card__pair">
          <div class="color-palette-card__swatch" style="background:#FFFFFF;color:#000000">
            #FFFFFF
          </div>
        </div>
      </div>
      <!-- more cards... -->
    </div>
  </div>
  <!-- more sections... -->
</div>
```

## Frontend Interactivity

Uses the WordPress Interactivity API with store namespace `prc-block/color-palette`.

**Actions:**
- `copyToClipboard` — Copies the hex value of the clicked swatch to the clipboard. Temporarily changes the swatch text to "Copied!" for 2 seconds before reverting.

The swatch text is bound via `data-wp-text="context.copied ? 'Copied!' : context.hex"`, providing immediate visual feedback on click.

## Related Blocks

None. This is a standalone design system utility block.

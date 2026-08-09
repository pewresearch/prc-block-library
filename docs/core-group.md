# Core Group

PRC's override/extension of the WordPress `core/group` block.

## Block Namespace

`prc-block/core-group`

**Target Block:** `core/group`

## What PRC Customizes

- Extends alignment support to include all options (left, right, center, wide, full)
- Adds Interactivity API support
- Adds grid context awareness for PRC's grid system
- Adds an interior divider feature (horizontal lines between child blocks)
- Registers multiple width-constrained variations (200px through 640px)
- Registers "Callout" and "Social Group" variations
- Registers a "Dynamic Width" block style
- Provides transforms from the legacy `prc-block/callout` block and `[callout]` shortcode
- Applies extensive styling for callout, social group, card, and fluid layouts

## Supports Modifications

| Support | Value |
|---------|-------|
| `interactivity` | `true` (added via `block_type_metadata_settings`) |
| `align` | `['left', 'right', 'center', 'wide', 'full']` (enforces all options) |

## Additional Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `dividerColor` | `string` | `null` | Color slug for interior divider lines between child blocks |

Registered both server-side (`block_type_metadata_settings`) and client-side (`blocks.registerBlockType`).

**Additional context consumed:**

Grid column context values for desktop, tablet, and mobile (span, start, row).

## Available Styles

| Style Name | Label | Description |
|------------|-------|-------------|
| `dynamic-wide` | Dynamic Width | Sets max-width to `--wp--custom--content-size-wide` |

Additional styles applied via CSS class conventions (not registered as formal block styles):
- `is-style-social-group` -- Social sharing group with bottom border
- `is-style-callout` -- Callout box with top border and beige background
- `is-style-card-alt` -- Legacy "baseball card" style
- `is-style-fluid` -- Full width (100%)
- `is-style-200-wide` through `is-style-640-wide` -- Fixed max-width styles
- `is-style-collapse-row-on-mobile` -- Row layout that collapses to column on mobile

## Style Overrides

From `style.scss`:

**Adjacency rule:** Full-width cover followed by full-width group adds padding

**Interior divider:**
- Child blocks get `border-bottom: 1px solid var(--divider-color)` and padding
- Last child has no border

**Social group:** Bottom border with light gray, white background on social links

**Callout:** Top border, 1em padding, sans-serif font at 14px for paragraphs

**Card alt (Baseball Card):** Bottom padding, responsive horizontal padding, sub-header styling

**Alignment:** Left/right alignment with float and margin on desktop (992px+)

**Fixed widths:** Styles for 200px, 250px, 300px, 320px, 420px, 640px, and dynamic-wide

**Mobile collapse:** `is-style-collapse-row-on-mobile` switches to `flex-direction: column` on screens <= 782px

**Essay toolbar:** Flex layout for toolbar-style groups with social links and post dates

## Editor Enhancements

From `index.jsx`:

- Extends alignment support to all options
- Adds `dividerColor` attribute
- Injects **Interior Divider** color control in the Inspector's color panel (only shown when block has 2+ inner blocks)
- Applies `has-interior-divider` and `has-{color}-interior-divider-color` classes to the editor wrapper
- Sets `--grid-gutter` CSS variable on the wrapper

From `controls/interior-divider.jsx`:

- Uses `withColors` HOC and `ColorGradientSettingsDropdown` for color selection
- Conditionally renders based on inner block count

**Max width per device:** The per-device **Max Width** inspector control was removed. Device-specific visibility toggles remain. Legacy saved `maxWidth` values still apply on the frontend; use Gutenberg content width / layout settings or custom CSS for new width constraints.

## Frontend Interactivity

None. No `view.js` file.

## PHP Rendering

**Class:** `Core_Group`

Key behaviors:

1. **Style enqueuing:** Ensures group styles are loaded
2. **Interior divider:** When `dividerColor` is set:
   - Adds `has-interior-divider` and `has-{color}-interior-divider-color` classes to the wrapper
   - Generates and inlines CSS: `--divider-color: var(--wp--preset--color--{slug})`

## Block Markup Example

```html
<!-- Group with interior divider -->
<div class="wp-block-group has-interior-divider has-ui-gray-light-interior-divider-color"
     style="--divider-color: var(--wp--preset--color--ui-gray-light)">
  <p class="wp-block-paragraph">First block</p>
  <p class="wp-block-paragraph">Second block</p>
</div>

<!-- Callout variation -->
<div class="wp-block-group is-style-callout has-ui-beige-very-light-background-color has-background">
  <h4 class="wp-block-heading">Callout Title</h4>
  <p>Callout content...</p>
</div>
```

## Variations

| Variation Name | Title | Description |
|----------------|-------|-------------|
| `two-hundred-px` | 200px | Group constrained to 200px content width |
| `two-hundred-fifty-px` | 250px | Group constrained to 250px content width |
| `three-hundred-px` | 300px | Group constrained to 300px content width |
| `three-hundred-twenty-px` | 320px | Group constrained to 320px content width |
| `four-hundred-twenty-px` | 420px | Group constrained to 420px content width |
| `six-hundred-forty-px` | 640px | Group constrained to 640px content width |
| `callout` | Callout | Beige background, callout style, pre-populated with heading and paragraph |
| `social-group` | Social Group | Social sharing wrapper with content area and social links (Facebook, X, LinkedIn) |

## Transforms

- **Block transform:** `prc-block/callout` to `core/group` with `is-style-callout`
- **Raw transform:** HTML `<div class="callout">` to callout-styled group
- **Shortcode transform:** `[callout]` shortcode to callout-styled group

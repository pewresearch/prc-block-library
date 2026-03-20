# Progress Bar

A configurable horizontal progress bar with label, value display, and animation support.

## Block Namespace

`prc-block/progress-bar`

## Category

`media`

## Supports

| Feature | Enabled |
|---------|---------|
| Anchor | Yes |
| HTML | No |
| Interactivity | Yes |
| Animations | Yes |
| Color (background) | Yes (skip serialization) |
| Color (text) | Yes (skip serialization) |
| Spacing (blockGap) | Yes |
| Spacing (margin) | Yes |
| Spacing (padding) | Yes (default control) |
| Typography (fontSize) | Yes |
| Typography (lineHeight) | Yes |
| Typography (letterSpacing) | Yes |
| Typography (textTransform) | Yes |
| Typography (fontFamily) | Yes |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `barColor` | `string` | `"social-trends-teal"` | Preset color slug for the filled portion of the progress bar. |
| `valueColor` | `string` | `"ui-black"` | Preset color slug for the value text. |
| `backgroundColor` | `string` | `"ui-beige-very-light"` | Preset color slug for the unfilled track background. |
| `barHeight` | `number` | `10` | Height of the progress bar track in pixels. |
| `maxValue` | `number` | `100` | The maximum value representing 100% progress. |
| `label` | `string` | `"Progress"` | RichText label displayed above/beside the bar. Source: `html`, selector: `label`. |
| `value` | `number` | `0` | The current progress value. |
| `labelFormat` | `string` | `"percentage"` | How the value is displayed. One of: `percentage`, `fractional`. |
| `labelPosition` | `string` | `"left"` | Position of the label relative to the bar. One of: `left`, `right`. |
| `valuePosition` | `string` | `"outside"` | Position of the value text. One of: `inside` (within the bar fill), `outside` (after the bar). |
| `valueFontSize` | `number` | `12` | Font size in pixels for the value text display. |

## Available Styles

No block style variations defined.

## Inner Blocks

None.

## Parent/Ancestor Requirements

None.

## Usage Instructions

1. Insert the **Progress Bar** block.
2. In the **Inspector Panel > Data and Formatting**:
   - Set the **Label** text (also editable inline via RichText).
   - Set **Label Position** to left or right.
   - Adjust the **Value** slider (0 to max).
   - Set the **Maximum value** to define the scale.
   - Choose **Value Position**: inside the bar fill or outside.
   - Choose **Value Format**: percentage (`35%`) or fractional (`35/100`).
3. In the **Dimensions** panel:
   - Adjust the **Bar Height** (1-30px).
4. In the **Typography** panel:
   - Adjust the **Value Font Size** in pixels.
5. In the **Color** panel:
   - Set **Bar Color** (the filled portion).
   - Set **Value Color** (the value text).
   - Background and text colors are available via standard block supports.

## Block Markup Example

```html
<div class="wp-block-prc-block-progress-bar">
  <label class="prc-progress-bar-label has-ui-black-color"
         style="color: #000">Progress</label>
  <div class="prc-progress-bar has-ui-beige-very-light-background-color"
       style="background-color: #f7f5f2">
    <div class="prc-progress-bar-value"></div>
    <span class="prc-progress-bar-value-text" style="font-size: 12px"></span>
  </div>
</div>
```

## PHP Rendering

The `render_block_callback` method:

1. Generates a unique block ID via `wp_unique_id`.
2. Stores the block's attributes in the interactivity state keyed by block ID via `wp_interactivity_state`.
3. Uses `WP_HTML_Tag_Processor` to augment the saved markup:
   - Sets the unique `id`, `data-wp-interactive`, and `data-wp-context` on the wrapper.
   - Binds `data-wp-bind--style` to `state.barStyle` on the `.prc-progress-bar-value` element.
   - Binds `data-wp-text` to `state.value` on the `.prc-progress-bar-value-text` element.

## Frontend Interactivity

Uses the WordPress Interactivity API (`@wordpress/interactivity`).

**Store namespace:** `prc-block/progress-bar`

**State (derived):**
- `barStyle` -- Computes the inline style string for the bar fill: `height: {barHeight}px; width: {percentage}%; background-color: var(--wp--preset--color--{barColor});`
- `value` -- Returns the current value for the text display

The bar width and styling are dynamically computed from the interactivity state, allowing the value to be updated programmatically by other interactive blocks.

## Related Blocks

None.

## Block Example

```json
{
  "attributes": {
    "label": "Progress",
    "value": 35,
    "maxValue": 100
  }
}
```

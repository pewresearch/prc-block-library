# Promo Rotator

Rotates through child promo blocks randomly on page load, displaying only one at a time.

## Block Namespace

`prc-block/promo-rotator`

## Category

`marketing`

## Supports

| Feature | Enabled |
|---------|---------|
| Anchor | Yes |
| HTML | No |
| Spacing (blockGap) | Yes |
| Spacing (margin) | Top and bottom only |
| Spacing (padding) | Yes (default control) |
| Typography (fontSize) | Yes (default control) |
| Typography (fontFamily) | Yes (default control) |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `allowedBlocks` | `array` | -- | Optional override for which block types can be placed inside. Defaults to `prc-block/promo` and `prc-block/card` if not set. |

## Available Styles

No block style variations defined.

## Inner Blocks

Allowed inner blocks (default):

- `prc-block/promo`
- `prc-block/card`

The `allowedBlocks` attribute can override this list to allow any block types.

Inner blocks are displayed vertically in the editor, with an appender that switches from a button appender (when empty) to a default block appender (when blocks exist).

## Parent/Ancestor Requirements

None.

## Usage Instructions

1. Insert a **Promo Rotator** block.
2. Add multiple **Promo** or **Card** blocks inside it. Each child block represents one possible display option.
3. All child blocks are visible in the editor for content management.
4. On the frontend, only **one** randomly selected child block is rendered per page load.
5. Customize spacing and typography via block supports.

## Block Markup Example

In the editor, all children are visible:

```html
<!-- wp:prc-block/promo-rotator -->
  <!-- wp:prc-block/promo {"heading":"Promo A"} /-->
  <!-- wp:prc-block/promo {"heading":"Promo B"} /-->
  <!-- wp:prc-block/promo {"heading":"Promo C"} /-->
<!-- /wp:prc-block/promo-rotator -->
```

On the frontend, only one randomly selected promo is rendered.

## PHP Rendering

The `render_block_callback` method outputs the serialized inner block content through `wp_kses`.

The actual rotation logic is handled by the `randomly_select_inner_block` method which hooks into `render_block`:

1. Checks if the block being rendered is `prc-block/promo-rotator`.
2. Uses `array_rand()` to randomly select one inner block.
3. Calls `render_block()` on only the selected inner block.
4. Returns only that single block's rendered HTML.

This means on each page load, a different promo/card is shown at random.

## Frontend Interactivity

No frontend JavaScript. The randomization is handled server-side during PHP rendering.

## Related Blocks

- `prc-block/promo` -- Primary child block type for promotional content
- `prc-block/card` -- Alternative child block type

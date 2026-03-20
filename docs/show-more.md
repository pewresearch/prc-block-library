# Show More

## Block Overview

| Property    | Value                                                                                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name        | `prc-block/show-more`                                                                                                                                       |
| Title       | Show More                                                                                                                                                   |
| Category    | `widgets`                                                                                                                                                   |
| Version     | 0.1.0                                                                                                                                                       |
| Description | A block that hides content until a user clicks a button to reveal it. Useful for long content that you want to hide by default. You can select the previewable surface area and height based on device. |

## Supports

| Feature         | Enabled                                              |
| --------------- | ---------------------------------------------------- |
| HTML editing    | No                                                   |
| Anchor          | Yes                                                  |
| Color           | background, text, link                               |
| Spacing         | blockGap, margin (top/bottom), padding               |
| Typography      | fontSize, lineHeight, fontFamily, fontWeight, fontStyle, textTransform, textDecoration, letterSpacing |

## Attributes

| Attribute               | Type     | Default                                        | Description                                                    |
| ----------------------- | -------- | ---------------------------------------------- | -------------------------------------------------------------- |
| `allowedBlocks`         | `array`  | _(none)_                                       | Override allowed inner block types. Defaults to `core/group`, `core/paragraph`. |
| `heights`               | `object` | `{ desktop: 200, tablet: 150, mobile: 100 }`  | Collapsed height in pixels per device type.                    |
| `buttonBackground`      | `string` | _(none)_                                       | Color slug for the expand button background.                   |
| `customButtonBackground`| `string` | _(none)_                                       | Custom hex color for the expand button background.             |
| `buttonColor`           | `string` | _(none)_                                       | Color slug for the expand button text.                         |
| `customButtonColor`     | `string` | _(none)_                                       | Custom hex color for the expand button text.                   |
| `showLabel`             | `string` | `"Show More"`                                  | Button label when content is collapsed.                        |
| `hideLabel`             | `string` | `"Hide"`                                       | Button label when content is expanded.                         |
| `splitAtViewportWidth`  | `string` | _(none)_                                       | Viewport width at which to split behavior.                     |

## Available Styles

| Style Name | Label   | Default |
| ---------- | ------- | ------- |
| `default`  | Default | Yes     |
| `card`     | Card    | No      |

The **Default** style adds a box-shadow above the expand button when collapsed. The **Card** style adds a bordered card appearance with rounded bottom corners when collapsed.

## Inner Blocks

Accepts inner blocks. Default allowed blocks: `core/group`, `core/paragraph`. Can be overridden via the `allowedBlocks` attribute.

## Parent / Ancestor Requirements

None.

## Usage Instructions

1. Insert the **Show More** block.
2. Add content inside the block that you want to be collapsible.
3. In the editor, use the **resize handle** (toggle via the toolbar resize icon) to drag and set the collapsed preview height for the current device type (desktop, tablet, mobile). Switch device preview modes to set different heights per device.
4. Edit the **Show More** / **Hide** button labels directly using the inline RichText editor on the button.
5. Use the **Color** inspector panel to customize the button background and text colors.
6. Choose between **Default** and **Card** block styles.

## Block Markup Example

```html
<div class="wp-block-prc-block-show-more"
     id="abc123"
     data-wp-interactive='{"namespace":"prc-block/show-more"}'
     data-wp-class--is-expanded="context.isExpanded"
     data-wp-context='{"showLabel":"Show More","hideLabel":"Hide","isExpanded":false,"heights":{"desktop":200,"tablet":150,"mobile":100},"currentDevice":"desktop"}'
     data-wp-on-window--resize="callbacks.onResize"
     data-wp-bind--style="callbacks.getStyle"
     style="--collapsed-height: 200px;">
  <div class="prc-show-more__inner-blocks">
    <!-- Inner block content -->
  </div>
  <button class="prc-show-more__expand-button" type="button" data-wp-on--click="actions.toggleExpanded">
    <span data-wp-bind--hidden="context.isExpanded"><!-- plus icon --></span>
    <span data-wp-bind--hidden="!context.isExpanded"><!-- minus icon --></span>
    <span data-wp-text="state.label" class="prc-show-more__expand-button__label"></span>
  </button>
</div>
```

## PHP Rendering

The block is server-side rendered via `Show_More::render_callback()`:

- Detects the current device using `\PRC\Platform\get_current_device()`.
- Sets up Interactivity API context with `showLabel`, `hideLabel`, `isExpanded` state, `heights` object, and `currentDevice`.
- Supports a `show-more-block` query var to pre-expand a specific block by its content hash ID.
- Renders plus/minus icons using `\PRC\Platform\Icons\render()`.
- Wraps inner content in a `.prc-show-more__inner-blocks` container and appends the expand/collapse button.

## Frontend Interactivity

The `view.js` uses the WordPress Interactivity API:

- **`state.label`** (derived): Returns `showLabel` or `hideLabel` based on `context.isExpanded`.
- **`actions.toggleExpanded`**: Toggles the `isExpanded` context value on button click.
- **`callbacks.onResize`**: Listens to window resize events and updates `context.currentDevice` based on breakpoints (mobile <= 600px, tablet 601-782px, desktop 783px+).
- **`callbacks.getStyle`**: Returns inline CSS setting `--collapsed-height` based on the current device's configured height.

The collapsed height is applied via the CSS custom property `--collapsed-height`, which sets the `height` on `.prc-show-more__inner-blocks` with `overflow: hidden` when not expanded.

## Related Blocks

None. This is a standalone collapsible container block.

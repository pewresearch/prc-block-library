# Collapsible

> **Deprecated.** This block has been superseded by `core/details`. It remains registered for backward compatibility with existing content. Source files live in `deprecated/src/collapsible/`.

An accordion-style collapsible content section, commonly used for "How we did this" methodology panels.

## Block Metadata

| Property    | Value                                   |
| ----------- | --------------------------------------- |
| Namespace   | `prc-block/collapsible`                 |
| Category    | `design`                                |
| Version     | `0.1.0`                                 |
| API Version | `3`                                     |
| Keywords    | collapsible, accordion, how we did this |

## Supports

| Feature          | Value                                       |
| ---------------- | ------------------------------------------- |
| Anchor           | `false`                                     |
| HTML editing     | `false`                                     |
| Inserter         | `false` (only available through variations) |
| Block gap        | Vertical sides only                         |
| Spacing margin   | `top`, `bottom`                             |
| Spacing padding  | `true` (default controls enabled)           |
| Color background | `true`                                      |
| Color text       | `true`                                      |
| Color link       | `true`                                      |
| Border color     | `true` (default controls enabled)           |
| Border style     | `true` (default controls enabled)           |
| Border width     | `true` (default controls enabled)           |
| Font size        | `true` (default controls enabled)           |
| Font family      | `true` (default controls enabled)           |
| Interactivity    | `true`                                      |

## Attributes

| Attribute         | Type      | Default                 | Description                                                                              |
| ----------------- | --------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| `title`           | `string`  | —                       | The title text shown in the collapsible header (e.g. "How we did this").                 |
| `allowedBlocks`   | `array`   | —                       | Override the default list of allowed inner blocks.                                       |
| `backgroundColor` | `string`  | `"ui-beige-very-light"` | Preset background color slug.                                                            |
| `borderColor`     | `string`  | `"ui-beige-dark"`       | Preset border color slug.                                                                |
| `isCoBranded`     | `boolean` | `false`                 | When true, displays the Pew-Knight co-branding logo instead of a text title.             |
| `style`           | `object`  | _(see defaults)_        | Default border width of 1px, vertical block gap of spacing/30, padding of spacing/20-30. |

## Available Styles

No registered block styles. Visual variants are handled via block variations.

## Block Variations

| Variation Name                      | Title                             | Default | Description                                                                        |
| ----------------------------------- | --------------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `collapsible`                       | Collapsible                       | Yes     | Standard collapsible with text title and beige background/border.                  |
| `pew-knight-co-branded-collapsible` | Pew Knight Co-Branded Collapsible | No      | Shows Pew-Knight logo, white background, top/bottom borders only, no side borders. |

## Inner Blocks

Default allowed inner blocks:

-   `core/paragraph`
-   `core/heading`
-   `core/image`
-   `core/table`
-   `core/list`
-   `core/buttons`
-   `core/file`
-   `core/video`
-   `core/group`

The allowed list can be overridden via the `allowedBlocks` attribute. The default template starts with a single empty `core/paragraph`.

## Parent/Ancestor Requirements

None. Can be placed anywhere (though it is only insertable through its registered variations).

## Block Transforms

-   **From `[collapsible]` shortcode**: Converts the legacy shortcode to this block, extracting the title from the first `<h4>` tag in the shortcode content.

## Usage Instructions

1. Insert the block through one of its **variations** (standard Collapsible or Pew-Knight Co-Branded).
2. For the standard variant, type a title in the header area (defaults to "How we did this..." placeholder).
3. Add content blocks inside the collapsible body.
4. Click the plus/minus icon button in the editor to toggle the content open/closed for previewing.
5. The co-branded variant replaces the text title with the Pew-Knight logo and links to the `/pew-knight` page.

## Block Markup Example

```html
<!-- wp:prc-block/collapsible {"title":"How we did this"} -->
<!-- wp:paragraph -->
<p>Methodology content here...</p>
<!-- /wp:paragraph -->
<!-- /wp:prc-block/collapsible -->
```

## PHP Rendering

Server-side rendered via `render.php`. The render template:

1. Decodes and sanitizes the title attribute, stripping any erroneous `<strong>` tags.
2. Generates a collapsible ID from the title (or a unique ID for co-branded variants).
3. For co-branded mode, replaces the title with a linked Pew-Knight logo image.
4. Outputs the Interactivity API directives: `data-wp-interactive`, `data-wp-context` (with `collapsibleId` and `isOpen` state), `data-wp-class--is-open`, and `data-wp-init--scroll-into-view`.
5. Renders plus/minus circle icons for the toggle button, with `data-wp-bind--hidden` directives to show/hide the appropriate icon.
6. Supports a `collapsibleId` query variable — if the URL contains a matching `collapsibleId`, the block initializes in an open state.

The PHP class also registers a `[collapsible]` shortcode fallback that converts legacy shortcodes to block markup at render time.

## Frontend Interactivity

Uses the WordPress Interactivity API (`@wordpress/interactivity`) with store namespace `prc-block/collapsible`.

**Actions:**

-   `onClick` — Toggles `context.isOpen` to expand/collapse the content.

**Callbacks:**

-   `onInitScrollIntoView` — On page load, if the collapsible is initialized in an open state (via the `collapsibleId` query var), scrolls the element into view after a 500ms delay with smooth scrolling behavior.

## Related Blocks

None specific, but commonly used alongside `core/paragraph`, `core/heading`, and `core/list` as inner content.

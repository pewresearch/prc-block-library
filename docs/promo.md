# Promo (Ad)

Stylized block to create promotional banners and ad units with heading, subheading, optional icon, and action area.

## Block Namespace

`prc-block/promo`

## Category

`marketing`

## Supports

| Feature | Enabled |
|---------|---------|
| Align | `full`, `wide`, `center` |
| Anchor | Yes |
| HTML | No |
| Color (background) | Yes |
| Color (text) | Yes |
| Color (link) | Yes |
| Border (color) | Yes |
| Border (width) | Yes |
| Spacing (margin) | Top and bottom only |
| Spacing (padding) | Yes |
| Spacing (blockGap) | Yes |
| Typography (fontSize) | Yes |
| Typography (lineHeight) | Yes |
| Typography (fontFamily) | Yes |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `heading` | `string` | -- | The promo heading text. Source: `html`, selector: `.wp-block-prc-block-promo__heading`. |
| `headingLevel` | `integer` | `2` | The heading tag level (1-6). |
| `subHeading` | `string` | -- | The promo description/subheading text. Source: `html`, selector: `.wp-block-prc-block-promo__sub_heading`. |
| `icon` | `string` | `"weekly"` | The SVG icon to display. Options: `""` (none), `alexa`, `global`, `internet`, `journalism`, `politics`, `religion`, `weekly`. |
| `hasForm` | `boolean` | `false` | Auto-set to true when a `prc-block/mailchimp-form` is present in inner blocks. |
| `style` | `object` | `{"spacing":{"blockGap":"var:preset\|spacing\|20"}}` | Default style object. |

## Available Styles

| Style | Label | Default |
|-------|-------|---------|
| `standard` | Standard | Yes |
| `pancake` | Pancake | No |

## Inner Blocks

The action area accepts:

- `core/buttons`
- `core/paragraph`
- `prc-block/mailchimp-form`

Inner blocks are rendered in a `.wp-block-prc-block-promo__action` container with vertical orientation.

## Parent/Ancestor Requirements

None.

## Usage Instructions

1. Insert a **Promo (Ad)** block.
2. Type a **heading** directly in the block (RichText, customizable heading level via toolbar).
3. When selected, type a **subheading/description** below the heading.
4. Use the **Icon toolbar dropdown** in the block toolbar to select a decorative SVG icon:
   - No Icon, Alexa, Global, Internet, Journalism, Politics, Religion, Weekly
5. Add action inner blocks (buttons, paragraph text, or a MailChimp form) in the action area below.
6. Choose a **block style** from the styles panel:
   - **Standard** -- default layout
   - **Pancake** -- alternate layout
7. Customize colors, borders, spacing, and typography via block supports.
8. The `hasForm` attribute is automatically set when a mailchimp form is added/removed from inner blocks.

## Block Markup Example

```html
<div class="wp-block-prc-block-promo is-style-standard has-icon has-form"
     id="abc123">
  <div class="wp-block-prc-block-promo__inner-container">
    <div class="wp-block-prc-block-promo__icon">
      <img src="/path/to/weekly.svg" alt="Icon for promotion number 1"/>
    </div>
    <div class="wp-block-prc-block-promo__text">
      <h2 class="wp-block-prc-block-promo__heading">Sign up for our newsletter</h2>
      <div class="wp-block-prc-block-promo__sub_heading">
        <p>Fresh data delivered Saturday mornings</p>
      </div>
    </div>
    <div class="wp-block-prc-block-promo__action">
      <!-- Inner blocks (buttons, forms) rendered here -->
    </div>
  </div>
</div>
```

## PHP Rendering

The `render_callback` method:

1. Determines the class name style (defaults to `is-style-standard`).
2. Checks if an icon should be displayed (icon is non-empty and style is not `asymmetrical`).
3. Generates a deterministic block ID from the attributes hash.
4. Renders an `<img>` tag for the SVG icon from the block's `assets/` directory.
5. Wraps everything in `.wp-block-prc-block-promo__inner-container`.
6. Applies conditional CSS classes: `has-icon`, `has-large-icon` (for Alexa), `has-form`.

**Legacy shortcode support:** Also registers a `[newsletter]` shortcode fallback that renders a promo block with a mailchimp form from legacy shortcode attributes (`list_id`, `headline`, `subheadline`).

## Frontend Interactivity

No frontend JavaScript.

## Available Icons

| Icon | Value | File |
|------|-------|------|
| No Icon | `""` | -- |
| Alexa | `alexa` | `assets/alexa.svg` |
| Global | `global` | `assets/global.svg` |
| Internet | `internet` | `assets/internet.svg` |
| Journalism | `journalism` | `assets/journalism.svg` |
| Politics | `politics` | `assets/politics.svg` |
| Religion | `religion` | `assets/religion.svg` |
| Weekly | `weekly` | `assets/weekly.svg` |

## Related Blocks

- `prc-block/promo-rotator` -- Container that randomly selects one promo to display per page load
- `prc-block/mailchimp-form` -- Newsletter subscription form, commonly used in the action area
- `core/buttons` -- Call-to-action buttons in the action area

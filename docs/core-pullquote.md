# Core Pullquote

PRC's override/extension of the WordPress `core/pullquote` block.

## Block Namespace

`prc-block/core-pullquote`

## What PRC Customizes

- Deregisters the core pullquote stylesheet and re-registers it with PRC's custom version
- Registers a "Fancy Quote" block style
- Adds smart curly quotes around pullquote text via CSS pseudo-elements
- Styles the citation with a right-aligned layout and dash prefix
- Controls float alignment and max-width for left/right aligned pullquotes

## Supports Modifications

None.

## Additional Attributes

None.

## Available Styles

| Style Name    | Label       | Description                       |
|---------------|-------------|-----------------------------------|
| `fancy-quote` | Fancy Quote | Left-aligned text variant         |

Registered in PHP via `register_block_style` with inline CSS.

## Style Overrides

**File:** `style.scss`

- **Base pullquote** -- `max-width: 420px` via CSS custom property, `color: #565656`, `font-size: 20px`, `line-height: 30px`, zero padding
- **Blockquote** -- `padding: 24px`, clearfix via `::after`, color inherited
- **Smart quotes** -- `p:first-child::before` adds an opening curly quote; `p:last-of-type::after` adds a closing curly quote
- **Text alignment** -- supports `has-text-align-center` and `has-text-align-right` classes
- **Citation** -- floated right, `font-size: 15px`, sans-serif font family, `::before` pseudo-element adds a 10px horizontal line separator with `border-bottom: 1px solid #8c8c8c`
- **Left/right alignment** -- `alignleft` and `alignright` classes (and editor `data-align` equivalents) constrain to `max-width: 420px` and apply appropriate float

## Editor Enhancements

None. No editor script.

## Frontend Interactivity

None. No `view.js` file.

## PHP Rendering

**File:** `class-core-pullquote.php`

- **`register_assets`** (`init` hook) -- registers the PRC style handle and the `fancy-quote` block style
- **`register_style`** (`enqueue_block_assets` hook) -- deregisters the core `wp-block-pullquote` stylesheet and re-registers it using PRC's custom stylesheet source

No render filter modifications to block content.

## Block Markup Example

```html
<!-- Default pullquote -->
<figure class="wp-block-pullquote alignright">
  <blockquote>
    <p>The survey found significant differences across demographic groups.</p>
    <cite class="wp-block-pullquote__citation">Pew Research Center</cite>
  </blockquote>
</figure>

<!-- Fancy Quote style -->
<figure class="wp-block-pullquote is-style-fancy-quote">
  <blockquote>
    <p>A notable finding from the research.</p>
    <cite class="wp-block-pullquote__citation">Source Name</cite>
  </blockquote>
</figure>
```

## Variations

None.

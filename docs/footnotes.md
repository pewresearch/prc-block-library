# Footnotes

A dynamic block that collects footnote shortcodes from post content and renders them as a numbered, linked footnote list. Footnotes are authored inline using a bracket-based shortcode syntax and automatically extracted, replaced with superscript links, and compiled into an ordered list at the block's position.

## Block inserter example

`block.json` defines an `example` with `numoffset: 0` so the inserter preview matches default numbering behavior.

## Namespace

`prc-block/footnotes`

## Category

`theme`

## Supports

| Feature                 | Value   |
| ----------------------- | ------- |
| Anchor                  | `true`  |
| Color (text)            | `true`  |
| Color (background)      | `true`  |
| Color (link)            | `true`  |
| Spacing (margin)        | `true`  |
| Spacing (padding)       | `true`  |
| Border (color)          | `true`  |
| Border (radius)         | `true`  |
| Border (style)          | `true`  |
| Border (width)          | `true`  |
| Typography (fontSize)   | `true`  |
| Typography (lineHeight) | `true`  |
| Typography (fontFamily) | `true`  |
| HTML                    | `false` |

## Attributes

| Attribute   | Type     | Default     | Description                                                                                                 |
| ----------- | -------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `numoffset` | `number` | `0`         | Offset applied to footnote numbering. When set, the footnote list starts counting from this value plus one. |
| `style`     | `object` | `undefined` | Block style object for color, spacing, border, and typography settings.                                     |

## Available Styles

None defined. The block uses default presentation only.

## Inner Blocks

None. This is a leaf block with no inner block support.

## Parent / Ancestor Requirements

None. The block can be placed anywhere in the editor, though it is typically positioned at the bottom of post content.

**Uses Context:**

| Context Key | Description                                                                 |
| ----------- | --------------------------------------------------------------------------- |
| `postId`    | The current post ID, used to scope footnote collection to the correct post. |

## Usage Instructions

### Authoring Footnotes

Footnotes are written inline within post content using bracket shortcode syntax:

```
This is a sentence with a footnote.[1. This is the footnote text.]
```

The number before the period is the footnote index. Footnotes are collected in the order they appear.

### Number Offset

To start numbering from a value other than 1, set the `numoffset` attribute. For example, `numoffset: 5` causes the first footnote to display as number 6.

```
[1. numoffset="5" This footnote will render as number 6.]
```

### Escaping Brackets

Use `{{` and `}}` as escape sequences for literal brackets within footnote text:

```
[1. This footnote contains {{curly brackets}} inside it.]
```

### Placing the Block

Add the Footnotes block where you want the footnote list to appear (typically at the end of a post). The block automatically scans the post content for footnote shortcodes and renders them.

## Block Markup Example

The block has no meaningful saved markup in the editor (dynamic block):

```html
<!-- wp:prc-block/footnotes {"numoffset":0} /-->
```

## PHP Rendering

The block is fully server-side rendered via `render_callback` in `class-footnotes.php`.

### Render Pipeline

1. **Content Filter** (`the_content`, priority 100): The `Footnotes_API` class processes the entire post content, converting inline shortcodes `[N. text]` into superscript anchor links (`<sup class="footnote"><a href="#footnote-N">N</a></sup>`) and collecting footnote text into an array.

2. **Block Render Callback**: The `render_block_callback` method receives the processed footnotes from `Footnotes_API` and renders an `<ol>` element with `<li>` items for each footnote. Each list item includes an `id` anchor and a return link back to the superscript reference in the content.

### Key PHP Classes

-   **`Footnotes`** (`class-footnotes.php`): Registers the block, hooks the content filter, and implements `render_block_callback`.
-   **`Footnotes_API`** (`class-footnotes-api.php`): Core processing class. Uses regex to match `[\d+.\s(.*?)]` patterns, extracts footnote text, replaces shortcodes with superscript links, and supports `numoffset` for custom numbering.

### Rendered Output

```html
<ol class="wp-block-prc-block-footnotes" start="1">
	<li id="footnote-1" class="wp-block-prc-block-footnotes__footnote">
		<span>This is the footnote text.</span>
		<a
			class="wp-block-prc-block-footnotes__footnote__return"
			href="#footnote-1-link"
			>↩</a
		>
	</li>
</ol>
```

## Frontend Interactivity

None. This block has no client-side interactivity module. Footnote navigation relies on standard anchor link behavior (`#footnote-N` and `#footnote-N-link`).

## Related Blocks

None. This block operates independently. It reads from post content directly rather than depending on other blocks.

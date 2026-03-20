# Copyright Disclaimer

Renders a copyright disclaimer with the current year. Implemented as a block variation of `core/paragraph` using Block Bindings.

## Block Metadata

| Property    | Value                     |
|-------------|---------------------------|
| Namespace   | `prc-block/copyright`     |
| Category    | `text`                    |
| Version     | `0.1.0`                   |
| API Version | `3`                       |

## Supports

This block does not register its own supports. It is a **variation of `core/paragraph`** and inherits all of that block's supports.

## Attributes

This block has no custom attributes. It works by registering a `core/paragraph` block variation with the following preset attributes:

| Attribute                       | Value                                |
|---------------------------------|--------------------------------------|
| `content`                       | `"© 20xx Pew Research Center"`       |
| `metadata.bindings.content.source` | `"prc-platform/copyright"`        |

The content is dynamically replaced at render time via the block bindings API.

## Available Styles

None specific. Inherits all `core/paragraph` styles.

## Inner Blocks

None.

## Parent/Ancestor Requirements

None. Can be placed anywhere a paragraph block can be used.

## Usage Instructions

1. Insert the **Copyright Disclaimer** block from the block inserter (it appears as a variation of the Paragraph block).
2. No configuration is needed. The block automatically displays the current year via the block bindings system.
3. The displayed text is always in the format: `© {current year} Pew Research Center`.

## Block Markup Example

In `post_content`, this is a standard paragraph with binding metadata:

```html
<!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"prc-platform/copyright"}}}} -->
<p>© 20xx Pew Research Center</p>
<!-- /wp:paragraph -->
```

## PHP Rendering

The `Copyright` PHP class works differently from most blocks:

1. It does **not** register a block type. Instead, it registers a **block bindings source** named `prc-platform/copyright`.
2. The binding's `get_value_callback` returns the string `© {year} Pew Research Center` using `gmdate('Y')` for the current year.
3. At render time, WordPress replaces the paragraph's content with the dynamically generated copyright string.
4. The editor script is enqueued via `enqueue_block_editor_assets` to register the `core/paragraph` variation in the editor.

## Frontend Interactivity

None. The copyright text is rendered server-side as static HTML.

## Related Blocks

- `core/paragraph` — This block is a variation of the core paragraph block.

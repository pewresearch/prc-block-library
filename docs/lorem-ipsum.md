# Lorem Ipsum

## Block Name & Description

**Title:** Lorem Ipsum
**Description:** Lorem ipsum placeholder text.

## Block Namespace

`prc-block/lorem-ipsum`

## Category

`text`

## Supports

| Feature | Enabled | Details |
|---------|---------|---------|
| Inserter | No | Cannot be inserted from the block inserter |
| HTML editing | No | |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `totalParagraphs` | `number` | `1` | Number of placeholder paragraphs to generate |

## Available Styles

None.

## Inner Blocks

None. This is a "ghost" block -- it renders nothing and exists solely to provide a transform.

## Parent / Ancestor Requirements

None.

## Usage Instructions

This block is not inserted through the block inserter. Instead, it provides a **text transform** triggered by typing a special command:

1. In any paragraph block, type `%ipsum` and press Enter.
2. The block is replaced with 1 paragraph of placeholder text.
3. To generate multiple paragraphs, type `%ipsum N` (e.g., `%ipsum 5`) and press Enter.
4. Maximum of **15 blocks** can be generated at once. If you request more, a warning notice is shown and 15 blocks are generated.

The generated content uses the `jabber` library with Pew Research Center topic keywords as the word source, producing research-themed placeholder text.

### Generated Content Types

For more than 3 blocks, a heading is added at the start. The content varies:
- Regular paragraphs (30-70 words)
- Every 3rd block has a chance (~30%) of being a **quote block**, or (~30%) a **list block** (3-6 items), or a regular paragraph.

## Block Markup Example

This block does not produce markup. It transforms into standard `core/paragraph`, `core/heading`, `core/quote`, and `core/list` blocks.

Example of typing `%ipsum 3`:
```
Before: "%ipsum 3" [Enter]
After:
  - core/paragraph (30-70 words)
  - core/paragraph (30-70 words)
  - core/paragraph (30-70 words)
```

Example of typing `%ipsum 5`:
```
After:
  - core/heading (level 2)
  - core/paragraph
  - core/paragraph
  - core/paragraph (or core/quote or core/list)
  - core/paragraph
  - core/paragraph
```

## PHP Rendering

The PHP class (`Lorem_Ipsum`) only registers the block from metadata. There is no render callback because the block never appears in post content -- it transforms immediately into other blocks in the editor.

## Frontend Interactivity

None.

## Related Blocks

- `core/paragraph` -- The primary output block after transformation
- `core/heading` -- Generated as headers in multi-block output
- `core/quote` -- Occasionally generated in varied content
- `core/list` -- Occasionally generated in varied content

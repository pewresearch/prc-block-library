# Popular Story

A popular post item, typically placed in a group block for numbered list display.

## Block Namespace

`prc-block/popular-story`

## Category

`content-curation`

## Supports

| Feature | Enabled |
|---------|---------|
| Anchor | Yes |
| HTML | No |
| Spacing (margin) | Top and bottom only |
| Spacing (padding) | Yes |
| Typography (fontSize) | Yes |
| Typography (fontFamily) | Yes |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | `string` | -- | The display title of the popular story. |
| `url` | `string` | `""` | The URL the story title links to. |
| `postId` | `integer` | -- | The WordPress post ID of the selected story. |
| `blockIndexAttr` | `integer` | -- | The index position of this block within its parent group (auto-calculated). |
| `enableNumber` | `boolean` | `true` | Whether to display the numbered index. Automatically set based on parent block context. |

## Available Styles

No block style variations defined.

## Inner Blocks

None.

## Parent/Ancestor Requirements

None, but the block is designed to be placed inside a `core/group` block. When placed inside a group, the block automatically detects its index position and displays a sequential number.

## Usage Instructions

1. Insert a **Popular Story** block. A placeholder will appear prompting you to search for a post or paste a URL.
2. Use the **URL Search Field** to find and select a post. The title, URL, and post ID are automatically populated.
3. Alternatively, click **Skip** to create a custom entry and manually type a title.
4. When selected, the title becomes editable via a RichText field (supports bold and italic).
5. Place multiple Popular Story blocks inside a `core/group` block to create a numbered list of popular stories.
6. The block toolbar includes a **URL Search Toolbar** to change the selected post at any time.
7. Press Enter at the end of a title to automatically insert a new Popular Story block after the current one.

## Block Markup Example

```html
<aside class="wp-block-prc-block-popular-story">
  <div class="big-number">1</div>
  <a href="https://example.com/story" class="title">Story Title Here</a>
</aside>
```

When `enableNumber` is false or the block is not in a group:

```html
<aside class="wp-block-prc-block-popular-story">
  <a href="https://example.com/story" class="title">Story Title Here</a>
</aside>
```

## PHP Rendering

The `render_callback` method:

1. Returns empty string if no title or URL is set.
2. Calculates the display index: if `enableNumber` is true, adds 1 to `blockIndexAttr` (zero-based to one-based).
3. Renders an `<aside>` element with:
   - A `.big-number` div (if index > 0)
   - A linked `.title` element

## Frontend Interactivity

No frontend JavaScript. This block is purely server-side rendered.

## Related Blocks

- `core/group` -- Recommended parent block for numbered list display

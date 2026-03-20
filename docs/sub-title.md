# Sub-Title

## Block Overview

| Property    | Value                                      |
| ----------- | ------------------------------------------ |
| Name        | `prc-block/subtitle`                       |
| Title       | Sub-title                                  |
| Category    | `layout`                                   |
| Version     | 0.1.0                                      |
| Description | Displays the sub-title of a post.          |

## Supports

| Feature         | Enabled                                              |
| --------------- | ---------------------------------------------------- |
| HTML editing    | No                                                   |
| Anchor          | Yes                                                  |
| Multiple        | No (only one instance per post)                      |
| Color           | text, background                                     |
| Spacing         | margin (top/bottom), padding                         |
| Typography      | fontSize, lineHeight, fontFamily, fontWeight, fontStyle, textTransform, textDecoration, letterSpacing |

## Attributes

| Attribute   | Type     | Default                                                      | Description                                  |
| ----------- | -------- | ------------------------------------------------------------ | -------------------------------------------- |
| `textAlign` | `string` | _(none)_                                                     | Text alignment: `left`, `center`, `right`.   |
| `fontSize`  | `string` | `"h2"`                                                       | Font size preset slug.                       |
| `style`     | `object` | `{ typography: { fontWeight: "400", fontStyle: "italic" } }` | Default style: normal weight, italic.        |

## Uses Context

| Context Key | Description                |
| ----------- | -------------------------- |
| `postType`  | Current post type.         |
| `postId`    | Current post ID.           |

## Available Styles

None defined in `block.json`.

## Inner Blocks

This block does not accept inner blocks.

## Parent / Ancestor Requirements

None. Typically placed in post templates directly below the post title.

## Usage Instructions

1. Insert the **Sub-title** block, typically below the post title in a template or post content.
2. Type the sub-title text directly in the block using the inline RichText editor (no formatting allowed -- plain text only).
3. Use the **Alignment** toolbar control to set text alignment (left, center, right).
4. The sub-title is stored as post meta (`sub_headline` or `sub_title`), not in the block content. This means changes to the sub-title update the post's metadata.
5. Only one Sub-title block is allowed per post (enforced via `"multiple": false`).
6. If no sub-title meta exists for the post, the block renders nothing on the frontend.
7. Child posts (posts with a parent) do not render the sub-title.

## Block Markup Example

```html
<h2 class="wp-block-prc-block-subtitle has-text-align-left" aria-level="2">
  This is the sub-title text for the article
</h2>
```

## PHP Rendering

The block is server-side rendered via `Sub_Title::render_callback()`:

- Reads the post ID from block context (`postId`).
- Returns empty string if no `postId` is available or if the post is a child (has a parent).
- Looks up the sub-title from post meta: first checks `sub_title` (new field), falls back to `sub_headline` (legacy field).
- Returns empty string if no sub-title value exists.
- Renders as an `<h2>` tag with `aria-level="2"` and the configured text alignment class.

### Additional PHP Behavior

- **Duplicate removal**: Tracks render counts. If a subtitle block has already been rendered once (in the template), subsequent occurrences inside `core/post-content` are stripped on singular post views to prevent duplication.
- **Post meta registration**: Registers both `sub_headline` (legacy) and `sub_title` (new) post meta fields, both as strings with `show_in_rest: true`.
- **VIP Block Data API**: Extends the VIP Block Data API response to include the sub-title content from post meta via the `vip_block_data_api__sourced_block_result` filter.

## Frontend Interactivity

No view script. This is a statically rendered block.

## Related Blocks

- **`core/post-title`** -- The main post title block. Sub-title is typically placed immediately after it.
- **`core/post-content`** -- The sub-title block inside post content is automatically removed if already rendered in the template.

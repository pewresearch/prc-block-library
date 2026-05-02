# Post Parent Title

Displays the title of the current post's parent post. Useful in hierarchical post type templates.

## Block inserter example

`block.json` defines an `example` with `level` 4 and `isLink` false — inserter preview.

## Block Namespace

`prc-block/post-parent-title`

## Category

`theme`

## Supports

| Feature                     | Enabled        |
| --------------------------- | -------------- |
| Align                       | `wide`, `full` |
| HTML                        | No             |
| Color (background)          | Yes            |
| Color (text)                | Yes            |
| Color (gradients)           | No             |
| Color (link)                | Yes            |
| Spacing (margin)            | Yes            |
| Spacing (padding)           | Yes            |
| Typography (fontSize)       | Yes            |
| Typography (lineHeight)     | Yes            |
| Typography (fontFamily)     | Yes            |
| Typography (fontWeight)     | Yes            |
| Typography (fontStyle)      | Yes            |
| Typography (textTransform)  | Yes            |
| Typography (textDecoration) | Yes            |
| Typography (letterSpacing)  | Yes            |

## Attributes

| Attribute    | Type      | Default   | Description                                             |
| ------------ | --------- | --------- | ------------------------------------------------------- |
| `textAlign`  | `string`  | --        | Text alignment for the heading (left, center, right).   |
| `level`      | `number`  | `4`       | The heading level (1-6) for the rendered tag.           |
| `isLink`     | `boolean` | `false`   | Whether to wrap the title in a link to the parent post. |
| `rel`        | `string`  | `""`      | The `rel` attribute for the link (e.g., `noopener`).    |
| `linkTarget` | `string`  | `"_self"` | Link target. Either `_self` or `_blank`.                |

## Uses Context

| Context    | Description                       |
| ---------- | --------------------------------- |
| `postId`   | The current post ID               |
| `postType` | The current post type             |
| `queryId`  | The query loop ID (if in a query) |

## Available Styles

No block style variations defined.

## Inner Blocks

None.

## Parent/Ancestor Requirements

None, but requires a post context (typically used in post templates or query loops).

## Usage Instructions

1. Insert the **Post Parent Title** block in a post template or query loop context.
2. The block automatically looks up the parent post of the current post and displays its title.
3. Use the **Heading Level** dropdown in the toolbar to change the heading tag (h1-h6, default h4).
4. Use the **Alignment** control to set text alignment.
5. In the **Inspector Panel > Settings**:
    - Toggle **Make title a link** to wrap the title in an anchor tag pointing to the parent post.
    - When linked, toggle **Open in new tab** and set a custom **Link rel** attribute.
6. If the current post has no parent, the block renders nothing on the frontend (shows "No parent post found" in the editor).

## Block Markup Example

```html
<h4 class="wp-block-prc-block-post-parent-title has-text-align-center">
	<a href="https://example.com/parent-post/" target="_self"
		>Parent Post Title</a
	>
	<div
		data-wp-interactive="prc-block/table-of-contents"
		class="prc-post-parent-title__active-toc-part"
	>
		<span data-wp-text="state.currentlyActivePartLabel"></span>
	</div>
</h4>
```

Without link:

```html
<h4 class="wp-block-prc-block-post-parent-title">
	Parent Post Title
	<div
		data-wp-interactive="prc-block/table-of-contents"
		class="prc-post-parent-title__active-toc-part"
	>
		<span data-wp-text="state.currentlyActivePartLabel"></span>
	</div>
</h4>
```

## PHP Rendering

The `render_block_callback` method:

1. Returns empty if no `postId` in block context.
2. Gets the parent post ID via `wp_get_post_parent_id()`.
3. Returns empty if no parent or no parent title.
4. Determines the heading tag from the `level` attribute (default `h4`).
5. If `isLink` is true, wraps the title in an `<a>` tag with the parent's permalink, target, and rel attributes.
6. Appends a `prc-post-parent-title__active-toc-part` div that integrates with the `prc-block/table-of-contents` Interactivity API store to display the currently active section label.

## Frontend Interactivity

The block itself has no dedicated view script, but the rendered markup includes an Interactivity API binding to `prc-block/table-of-contents` for displaying the currently active table-of-contents part label.

## Related Blocks

-   `core/post-title` -- Displays the current post's own title
-   `prc-block/table-of-contents` -- Provides the active section label shown in the parent title block

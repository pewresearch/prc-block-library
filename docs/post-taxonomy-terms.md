# Post Taxonomy Terms

Display the current post's selected taxonomy terms. Replaces core's `core/post-terms` block with enhanced functionality.

## Block inserter example

`block.json` defines an `example` with `taxonomy` categories, `enableLink` true, and `perPage` 5 — inserter preview.

## Block Namespace

`prc-block/post-taxonomy-terms`

## Category

`theme`

## Supports

| Feature                     | Enabled                  |
| --------------------------- | ------------------------ |
| Anchor                      | Yes                      |
| HTML                        | No                       |
| Color (background)          | Yes                      |
| Color (text)                | Yes                      |
| Color (link)                | Yes                      |
| Layout (flex)               | Yes                      |
| Layout (justification)      | Yes                      |
| Layout (orientation)        | Yes                      |
| Layout (sizing on children) | Yes                      |
| Layout (vertical alignment) | Yes                      |
| Typography (fontSize)       | Yes                      |
| Typography (lineHeight)     | Yes                      |
| Typography (fontStyle)      | Yes                      |
| Typography (fontWeight)     | Yes                      |
| Typography (textTransform)  | Yes                      |
| Typography (fontFamily)     | Yes                      |
| Typography (letterSpacing)  | Yes                      |
| Typography (textDecoration) | Yes (skip serialization) |
| Spacing (blockGap)          | Yes                      |
| Spacing (padding)           | Yes                      |

## Attributes

| Attribute                     | Type      | Default                                              | Description                                                                                |
| ----------------------------- | --------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `getAllTerms`                 | `boolean` | `false`                                              | If true, fetches all terms for the taxonomy (not just those assigned to the current post). |
| `taxonomy`                    | `string`  | `"categories"`                                       | The taxonomy REST base name to display terms from.                                         |
| `perPage`                     | `number`  | `25`                                                 | Maximum number of terms to display.                                                        |
| `separator`                   | `string`  | --                                                   | Character(s) used to separate terms when in horizontal layout (e.g., `,`, `\|`).           |
| `enableLink`                  | `boolean` | `true`                                               | Whether terms are linked to their archive pages.                                           |
| `linkToPublicationsPage`      | `boolean` | `false`                                              | If true, links filter the publications page instead of going to the term archive.          |
| `activeBackgroundColor`       | `string`  | --                                                   | Preset color name for active term background.                                              |
| `activeTextColor`             | `string`  | --                                                   | Preset color name for active term text.                                                    |
| `customActiveBackgroundColor` | `string`  | --                                                   | Custom color value for active term background.                                             |
| `customActiveTextColor`       | `string`  | --                                                   | Custom color value for active term text.                                                   |
| `hoverBackgroundColor`        | `string`  | --                                                   | Preset color name for hover term background.                                               |
| `hoverTextColor`              | `string`  | --                                                   | Preset color name for hover term text.                                                     |
| `customHoverBackgroundColor`  | `string`  | --                                                   | Custom color value for hover term background.                                              |
| `customHoverTextColor`        | `string`  | --                                                   | Custom color value for hover term text.                                                    |
| `style`                       | `object`  | `{"spacing":{"blockGap":"var:preset\|spacing\|20"}}` | Default style object.                                                                      |

## Uses Context

| Context    | Description           |
| ---------- | --------------------- |
| `postId`   | The current post ID   |
| `postType` | The current post type |

## Available Styles

No block style variations in `block.json`. Taxonomy-based variations are dynamically registered in PHP from all publicly queryable taxonomies (e.g., Categories, Tags, Topics, etc.).

## Block Variations (Dynamic)

Variations are generated at registration time from all taxonomies with `publicly_queryable` and `show_in_rest` set to true. Built-in taxonomies (category, post_tag) appear first. The category variation is the default.

## Inner Blocks

None.

## Parent/Ancestor Requirements

None, but requires a post context (typically used in post templates or query loops).

## Usage Instructions

1. Insert the **Post Taxonomy Terms** block (or choose a specific taxonomy variation from the inserter, e.g., "Categories", "Tags", "Topics").
2. The block displays terms assigned to the current post for the selected taxonomy.
3. In the **Inspector Panel > Settings**:
    - **Number of Terms**: Adjust the maximum number of terms displayed (1-25).
    - **Separator**: Set a character to separate terms in horizontal layout.
    - **Get all terms**: Toggle to show all terms in the taxonomy, not just those assigned to the current post.
    - **Enable Link**: Toggle term linking.
    - **Link to Publications Page**: When enabled, links filter the publications/blog page by the term instead of navigating to the term archive.
4. Use the **Color** panel to set hover and active state colors for terms.
5. Use the **Layout** controls to switch between vertical (list) and horizontal (inline) orientations.

## Block Markup Example

```html
<div
	class="wp-block-prc-block-post-taxonomy-terms has-separator"
	style="--separator: ','"
>
	<ul class="wp-block-prc-block-post-taxonomy-terms__list">
		<li class="wp-block-prc-block-post-taxonomy-terms__list-item">
			<a href="https://example.com/category/politics/">Politics</a>
		</li>
		<li class="wp-block-prc-block-post-taxonomy-terms__list-item">
			<a href="https://example.com/category/social-trends/"
				>Social Trends</a
			>
		</li>
	</ul>
</div>
```

With `linkToPublicationsPage` enabled:

```html
<li class="wp-block-prc-block-post-taxonomy-terms__list-item">
	<a href="https://example.com/publications/?_category=politics">Politics</a>
</li>
```

## PHP Rendering

The `render_block_callback` method:

1. Normalizes the taxonomy name (`categories` becomes `category`).
2. If `getAllTerms` is false:
    - Gets terms for the current post via `wp_get_post_terms`.
    - If the only category is "uncategorized", treats it as empty.
    - Falls back to the parent post's terms if the current post has none.
3. If `getAllTerms` is true:
    - Gets all terms via `get_terms` regardless of post assignment.
4. Renders a `<ul>` list with `<li>` items. Each item is either a linked `<a>` or a plain `<span>` based on `enableLink`.
5. When `linkToPublicationsPage` is true, links point to the blog page with a `?_{taxonomy}={slug}` query parameter.
6. Appends CSS custom properties for hover and active colors via `WP_HTML_Tag_Processor`.

**Additional PHP hooks:**

-   `short_circuit_core_post_terms_variations` -- Removes all variations from `core/post-terms` to prevent duplicate taxonomy term blocks in the inserter.

## Frontend Interactivity

No dedicated frontend JavaScript. Colors for hover/active states are applied via CSS custom properties (`--hover-background-color`, `--hover-text-color`, `--active-background-color`, `--active-text-color`).

## Related Blocks

-   `core/post-terms` -- Core block that this replaces (its variations are disabled)

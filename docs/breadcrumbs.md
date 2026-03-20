# Breadcrumbs

Displays a breadcrumb navigation trail showing the hierarchical path to the current page.

## Block Metadata

| Property   | Value                      |
|------------|----------------------------|
| Name       | `prc-block/breadcrumbs`    |
| Title      | Breadcrumbs                |
| Category   | `theme`                    |
| Version    | `1.0.0`                    |
| API        | 3                          |
| Textdomain | `breadcrumbs`              |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `contentJustification` | `string` | -- | Horizontal alignment of the breadcrumb trail: `left`, `center`, or `right`. |
| `separator` | `string` | `">"` | The character displayed between breadcrumb items. |
| `showCurrentPageTitle` | `boolean` | `false` | Whether to display the current page as the last breadcrumb. |
| `showLeadingSeparator` | `boolean` | `false` | Whether to show a separator before the first breadcrumb item. |
| `showHome` | `boolean` | `true` | Whether to display the home crumb. |
| `homeCrumb` | `object` | -- | Configuration for the home breadcrumb. Properties: `id`, `url`, `text`, `asIcon` (boolean). |
| `showIndex` | `boolean` | `true` | Whether to display the index/section crumb. |
| `indexCrumb` | `object` | -- | Configuration for the index breadcrumb. Properties: `id`, `url`, `text`. |
| `crumbs` | `array` | -- | Array of breadcrumb objects. Each has: `id`, `url`, `text`, `is_current_page` (boolean), and optional nested `crumbs` array for sub-navigation. |
| `style` | `object` | `{ spacing: { blockGap: { left: "var:preset|spacing|50" } } }` | Default horizontal spacing between breadcrumb items. |

## Supports

| Feature | Enabled | Notes |
|---------|---------|-------|
| Anchor | Yes | |
| HTML editing | No | |
| Color: background | Yes | |
| Color: text | Yes | |
| Color: link | Yes | |
| Color: heading | Yes | |
| Spacing: blockGap | Yes (horizontal only) | Controls spacing between breadcrumb items |
| Spacing: margin | Yes (top, bottom only) | |
| Spacing: padding | Yes (default control) | |
| Typography: fontSize | Yes (default control) | |
| Typography: fontFamily | Yes (default control) | |
| Border: color, style, width | Yes (all default controls) | |

## Context

| Context | Description |
|---------|-------------|
| `postId` | Current post ID. |
| `postType` | Current post type. |
| `query` | Query context. |
| `queryId` | Query loop ID. |
| `previewPostType` | Preview post type in the editor. |

## Usage Instructions

1. Insert the **Breadcrumbs** block, typically in a site template header area.
2. Configure the home crumb text and URL in the sidebar controls.
3. Optionally configure an index/section crumb (e.g., "Research" linking to a topic index).
4. Toggle `showCurrentPageTitle` to include or exclude the current page in the trail.
5. Choose a separator character (defaults to `>`).
6. Adjust content justification (left, center, right) as needed.
7. The breadcrumb trail is generated automatically based on the post hierarchy or taxonomy.

## Block Markup Example

```html
<nav class="wp-block-prc-block-breadcrumbs is-content-justification-left"
     id="breadcrumbs-abc123"
     aria-label="Breadcrumbs"
     style="--breadcrumbs-gap: 1em;">
    <div class="prc-block-breadcrumbs__list">
        <div class="prc-block-breadcrumbs__item">
            <a href="/"><span>Home</span></a>
        </div>
        <span class="prc-block-breadcrumbs__separator" aria-hidden="true">></span>
        <div class="prc-block-breadcrumbs__item">
            <a href="/research/"><span>Research</span></a>
        </div>
        <span class="prc-block-breadcrumbs__separator" aria-hidden="true">></span>
        <div class="prc-block-breadcrumbs__item">
            <a href="/research/topic/" aria-current="page"><span>Current Page</span></a>
        </div>
    </div>
</nav>
```

## PHP Rendering

The `render_block_callback` in `class-breadcrumbs.php` is fully server-side rendered. It:

1. Determines the current queried object type (`WP_Post`, `WP_Term`, `WP_Post_Type`, `WP_User`).
2. For **attachment pages**, redirects to the parent post for breadcrumb generation.
3. For **hierarchical post types** (pages), walks up the ancestor chain using `get_ancestors()`.
4. For **non-hierarchical post types** (posts, reports), uses the primary term in the `category` taxonomy via `\PRC\Platform\get_primary_term_id()` and walks up the term hierarchy.
5. For **taxonomy terms**, walks up the term ancestor chain.
6. Constructs the breadcrumb array: home crumb, index crumb, ancestors, and optionally the current page.
7. Applies the `prc_platform_breadcrumbs` filter so other plugins can modify the breadcrumb list.
8. Renders each crumb as an `<a>` inside a `.prc-block-breadcrumbs__item` div, with separators between items.
9. Supports **nested sub-crumbs** -- items can have a `crumbs` array for dropdown sub-navigation.

### Core Breadcrumbs Disabled

The PHP class filters `allowed_block_types_all` to remove `yoast-seo/breadcrumbs` and `core/breadcrumbs` from the block inserter.

## Frontend Interactivity

This block does not have a view script. Sub-list dropdowns are handled via CSS `:hover` and `:focus-within` states.

## Styles

Key CSS behaviors:
- The breadcrumb list is displayed inline with overflow hidden and clamped to 1 line (`-webkit-line-clamp: 1`).
- Items are spaced using the `--breadcrumbs-gap` CSS custom property.
- The current page (`a[aria-current="page"]`) is displayed in bold.
- **Sub-lists** (`.prc-block-breadcrumbs__sub_list`) are hidden by default and shown on hover/focus as absolute-positioned dropdown menus with a white background, box shadow, and rounded corners.

## Related Blocks

This block is standalone. It is typically used in site-wide templates alongside navigation blocks.

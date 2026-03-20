# Core Social Links

PRC's override/extension of the WordPress `core/social-links` and `core/social-link` blocks.

## Block Namespace

`prc-block/core-social-links`

## What PRC Customizes

- Adds `title`, `description`, `url`, `imageId`, and `hashtags` attributes to `core/social-links`
- Provides block context from parent `core/social-links` to child `core/social-link` blocks
- Registers "Print" and "Bookmark" as custom social services with FontAwesome icons
- Falls back to the post shortlink when no URL is provided
- Adds an Interactivity API store (`core/social-links`) for client-side share link generation
- Supports sharing to Facebook, LinkedIn, Twitter/X, Threads, and Bluesky
- Handles print (redirect to `?pdf=true`), mail (mailto: link), and bookmark actions
- Hides the Print link for logged-out users
- Adds a "Share Meta" inspector panel to configure title, description, and URL overrides
- Enables full typography support on the social-links block
- Registers "Pill Shape" style with rounded borders

## Supports Modifications

| Support       | Change                                               |
|---------------|------------------------------------------------------|
| `typography`  | Enables fontSize, lineHeight, fontFamily, fontWeight, fontStyle, textTransform, textDecoration, letterSpacing |

Applied via `block_type_metadata_settings` filter in `add_settings`.

## Additional Attributes

| Attribute     | Type     | Description                                      |
|---------------|----------|--------------------------------------------------|
| `title`       | `text`   | Override title for social sharing                 |
| `description` | `string` | Override description/excerpt for sharing          |
| `url`         | `string` | Override URL for sharing (falls back to shortlink)|
| `imageId`     | `number` | Image attachment ID for sharing                   |
| `hashtags`    | `array`  | Array of hashtag strings                          |

Added via `block_type_metadata` filter in `add_attributes`.

## Available Styles

| Style Name   | Label      | Description                                        |
|--------------|------------|----------------------------------------------------|
| `pill-shape` | Pill Shape | Rounded pill borders with light gray border color  |

Defined in `style.scss`.

## Style Overrides

**File:** `style.scss`

- **Link visited color** -- `.wp-block-social-link-anchor:visited` inherits color
- **Pill Shape** -- `.is-style-pill-shape` sets `align-items: stretch`, adds `border-radius: 9999px` and `1px solid ui-gray-light` border on social link anchors and buttons

## Editor Enhancements

**File:** `index.js`

- HOC wrapping `editor.BlockEdit` for `core/social-links` to inject the `Controls` component
- Registers `print` and `bookmark` block variations on `core/social-link` with FontAwesome icons

**File:** `controls.jsx`

- "Share Meta" inspector panel with `TextControl` fields for Title, Description, and URL override

## Frontend Interactivity

**File:** `view.js` (Interactivity API module)

- Registers store `core/social-links` with:
  - **`actions.onClick`** -- routes clicks to the appropriate handler based on platform
  - **`actions.onShareClick`** -- generates platform-specific share URLs and opens a popup window:
    - **Facebook** -- `facebook.com/sharer/sharer.php?u=`
    - **LinkedIn** -- `linkedin.com/shareArticle` with summary, url, title, source
    - **Twitter/X** -- `twitter.com/intent/tweet` with text and url
    - **Threads** -- `threads.net/intent/post` with text
    - **Bluesky** -- `bsky.app/intent/compose` with text
  - **`actions.onPrintClick`** -- redirects to `?pdf=true` for PDF generation
  - **`actions.onMailClick`** -- opens a `mailto:` link with subject and body
  - **`actions.onBookmarkClick`** -- placeholder for future PRC User Accounts Bookmarks integration
- Falls back to OG meta tags (`og:title`, `og:description`, `og:url`) when context values are not provided

## PHP Rendering

**File:** `class-core-social-links.php`

- **`register_assets`** (`init` hook) -- registers editor script, view script module, and style handles
- **`add_attributes`** (`block_type_metadata` filter) -- adds `title`, `description`, `url`, `imageId`, `hashtags` attributes to `core/social-links`
- **`add_settings`** (`block_type_metadata_settings` filter) -- configures `provides_context` on parent block and `uses_context` on `core/social-link` child block; enables full typography support
- **`social_links_url_fallback`** (`render_block_data` filter) -- falls back to `wp_get_shortlink()` when no URL attribute is set
- **`social_link_icons`** (`block_core_social_link_get_services` filter) -- adds "Print" and "Bookmark" social services with SVG icons
- **`social_links_context_handler`** (`render_block_context` filter) -- populates URL (shortlink fallback), title (post title), and description (post excerpt) context values for child blocks
- **`social_link_render_callback`** (`render_block` filter on `core/social-link`) -- hides Print link for logged-out users; adds Interactivity API attributes (`data-wp-interactive`, `data-wp-context`, `data-wp-on--click`) to social link items

## Block Markup Example

```html
<ul class="wp-block-social-links is-style-pill-shape">
  <li class="wp-social-link wp-social-link-facebook"
      data-wp-interactive="core/social-links"
      data-wp-context='{"url":"https://pewrsr.ch/abc","title":"Report Title","description":"...","platform":"facebook"}'
      data-wp-on--click="actions.onClick">
    <a class="wp-block-social-link-anchor" href="">
      <svg>...</svg>
      <span class="wp-block-social-link-label">Facebook</span>
    </a>
  </li>
  <li class="wp-social-link wp-social-link-print"
      data-wp-interactive="core/social-links"
      data-wp-context='{"url":"...","title":"...","description":"...","platform":"print"}'
      data-wp-on--click="actions.onClick">
    <a class="wp-block-social-link-anchor" href="">
      <svg>...</svg>
      <span class="wp-block-social-link-label">Print</span>
    </a>
  </li>
</ul>
```

## Variations

| Block              | Variation Name | Title    | Description                        |
|--------------------|----------------|----------|------------------------------------|
| `core/social-link` | `print`        | Print    | Triggers PDF print via `?pdf=true` |
| `core/social-link` | `bookmark`     | Bookmark | Placeholder for future bookmarking |

Registered in `index.js` via `registerBlockVariation`.

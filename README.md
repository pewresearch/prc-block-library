# PRC Block Library

The core Gutenberg block library for the PRC Platform — provides all custom blocks and core block enhancements used across pewresearch.org.

## Overview

PRC Block Library registers ~90 blocks across two namespaces: `prc-block/*` for custom PRC blocks and modifications to `core/*` blocks. It is the display layer of the platform and the first plugin loaded when rendering any content. Beyond blocks, it also ships a set of cross-cutting support systems (Interactivity API helpers, a Print Engine, block visibility controls, custom rich text formats, sticky/max-width layout supports, and a form data store) that apply globally to all registered blocks.

### Dependencies

- **Upstream**: `prc-platform-core` (required plugin), `prc-schema-seo` (optional, for PDF contact resolution), `prc-staff-bylines` (optional, for PDF bylines), Report Package plugin (optional, for multi-chapter PDF rendering), WordPress AI plugin (optional, for tabular data AI experiment)
- **Downstream**: Every plugin or theme that renders blocks on the front end depends on this library. The `prc-block-library/forms` `@wordpress/data` store is a direct integration point for any plugin registering custom form types.

## Local Development Setup

### Prerequisites

- Node.js 22+ / npm 10.9+
- PHP 8.2+
- WordPress Playground (via `npm run playground:start` from repo root)

### Running Locally

```bash
# Build the entire library (run from repo root)
npm run build:library -w @prc/block-library

# Build a single block only
npm run build grid-controller -w @prc/block-library

# Watch mode for a single block during development
npm run start grid-controller -w @prc/block-library

# Watch mode for the full library
npm run start:library -w @prc/block-library
```

### Running Tests

```bash
# Run Playwright e2e tests (requires Playground to be running)
npm run test -w @prc/block-library
```

## Architecture

Blocks are discovered and loaded automatically at runtime. `Plugin::load_blocks()` globs all subdirectories of `src/` (in local/dev) or `build/` (in production) and calls `include_block()` for each. Any directory prefixed with `_` or `.` is skipped. Each block is expected to have a `class-{block-name}.php` file which self-registers with WordPress using `register_block_type_from_metadata()`. Block metadata is pre-indexed at build time via `build/blocks-manifest.php` and registered with `wp_register_block_metadata_collection()` for performance.

Blocks are split into two groups initialized by `Plugin`:

- **Core blocks** (`define_core_blocks`): extensions and modifications to existing `core/*` blocks — adding attributes, context, controls, or custom rendering.
- **PRC blocks** (`define_prc_blocks`): net-new blocks in the `prc-block` namespace.

In addition to block classes, `Plugin` boots several support subsystems via `define_library_dependencies()`. These run independently of individual blocks and hook into WordPress globally.

Block scaffolding uses `@wordpress/create-block` with a local template. There are four variants:

| Variant | When to use |
|---------|------------|
| `default` | Standard block with optional InnerBlocks/RichText; uses `render.php` |
| `dynamic` | Block needing a PHP class for server-side rendering or REST registration |
| `static` | Primitive block that serializes HTML directly to the database |
| `coreBlock` | Extension of an existing `core/*` block |

### Key Files

| Path | Purpose |
|------|---------|
| `prc-block-library.php` | Plugin entry point; defines constants, runs `Plugin` |
| `includes/class-plugin.php` | Boots all blocks and support subsystems; registers block categories and HTML allowlist |
| `includes/class-loader.php` | Maintains and runs all WordPress action/filter hooks |
| `includes/utils.php` | `convert_number_to_words()`, `prc_log_error()`, `prc_block_library_manifest()` helpers |
| `includes/ai-experiments/class-ai-experiments.php` | Registers the Tabular Data AI experiment via the WordPress AI plugin |
| `includes/block-visibility/class-block-visibility.php` | Adds editor UI for per-block visibility control |
| `includes/custom-text-formats/class-custom-text-formats.php` | Registers custom rich text format buttons in the editor toolbar |
| `includes/interactivity-api/class-interactivity-api.php` | Injects `interactiveNamespace` and `interactiveSubsumption` attributes and context on every block that declares `supports.interactivity` |
| `includes/pagination/class-pagination.php` | Registers shared pagination styles/scripts consumed by listing blocks |
| `includes/print-engine/class-print-engine.php` | Intercepts `?pdf=true` requests and renders a full print/PDF page; adds `printEngine` attribute to all blocks |
| `includes/print-engine/class-block-print-registry.php` | Static registry where other plugins register block-level print callbacks and CSS |
| `includes/supports/class-supports.php` | Adds `maxWidth` (responsive per-breakpoint constraint) and sticky-state color/shadow attributes to every block |
| `build/blocks-manifest.php` | Auto-generated block metadata index; do not edit manually |
| `src/README.md` | Instructions for scaffolding a new block |
| `bin/build-block.js` | CLI helper for building a single named block |
| `bin/start-block.js` | CLI helper for watching a single named block |
| `webpack.config.js` | Inherits from root `webpack.config.js` |
| `tests/` | Playwright e2e specs |

## Blocks

### Core Block Modifications (`core/*`)

Adds attributes, context, rendering changes, or new editor controls to existing WordPress core blocks.

| Block | Notes |
|-------|-------|
| `core/button` | PRC platform customizations |
| `core/categories` | PRC platform customizations |
| `core/code` | PRC platform customizations |
| `core/cover` | PRC platform customizations |
| `core/details` | Interactivity API integration |
| `core/dialog` | PRC dialog pattern utilities |
| `core/embed` | PRC platform customizations |
| `core/file` | PRC platform customizations |
| `core/group` | PRC platform customizations |
| `core/heading` | PRC platform customizations |
| `core/image` | PRC platform customizations |
| `core/list` | PRC platform customizations |
| `core/list-item` | PRC platform customizations |
| `core/media-text` | PRC platform customizations |
| `core/navigation` | PRC platform customizations |
| `core/paragraph` | PRC platform customizations |
| `core/post-content` | PRC platform customizations |
| `core/post-title` | Custom render callback for PRC title patterns |
| `core/pullquote` | PRC platform customizations |
| `core/query-pagination-numbers` | PRC platform customizations |
| `core/search` | PRC platform customizations |
| `core/separator` | PRC platform customizations |
| `core/social-links` | Interactivity API integration |
| `core/table` | PRC platform customizations |
| `core/tabs` | PRC platform customizations; registered as Remote Data Blocks template |

### Content & Editorial (`prc-block/*`)

| Block | Description |
|-------|-------------|
| `prc-block/story-item` | Primary content card for linking to articles; supports block bindings and query loop context |
| `prc-block/popular-story` | Variant of story item for trending/popular content |
| `prc-block/sub-title` | Deck/subtitle display below a post title |
| `prc-block/post-parent-title` | Renders the parent post title with link |
| `prc-block/post-taxonomy-terms` | Displays taxonomy term links for the current post |
| `prc-block/breadcrumbs` | Breadcrumb navigation for the current post |
| `prc-block/table-of-contents` | Generates a TOC from heading blocks; also used by the Print Engine |
| `prc-block/footnotes` | Footnote rendering |
| `prc-block/copyright` | Copyright statement block |
| `prc-block/version` | Displays a version/update notice |
| `prc-block/promo` | Promotional content unit |
| `prc-block/promo-rotator` | Cycles through multiple `prc-block/promo` blocks |
| `prc-block/logo` | PRC logo block with link support |
| `prc-block/timeline` | Container for `prc-block/timeline-slide` items |
| `prc-block/timeline-slide` | Individual slide within a timeline |

### Navigation & Layout

| Block | Description |
|-------|-------------|
| `prc-block/navigation-mega-menu` | Mega-menu extension for `core/navigation` |
| `prc-block/grid-controller` | CSS grid layout container |
| `prc-block/grid-column` | Column within a `prc-block/grid-controller` |
| `prc-block/accordion-controller` | Manages expand/collapse state across child accordions |
| `prc-block/accordion` | Individual accordion panel |
| `prc-block/carousel-controller` | Splide.js-powered carousel container |
| `prc-block/carousel-slide` | Individual slide within a carousel |
| `prc-block/tabs` | Tab container; registered as Remote Data Blocks template |
| `prc-block/tab` | Individual tab panel |
| `prc-block/collapsible` | Single show/hide content region |
| `prc-block/responsive-container-controller` | Renders different inner block sets at different breakpoints |
| `prc-block/responsive-container-view` | A breakpoint-specific view within a responsive container |

### Interactive UI

| Block | Description |
|-------|-------------|
| `prc-block/dialog` | Modal dialog container |
| `prc-block/dialog-trigger` | Button or element that opens a dialog |
| `prc-block/dialog-element` | Content region inside a dialog |
| `prc-block/flip-card-controller` | Flip card animation container |
| `prc-block/flip-card-side` | Front or back face of a flip card |
| `prc-block/show-more` | Truncates content with an expandable "show more" control |
| `prc-block/animation` | Applies scroll/entrance animations to inner content |
| `prc-block/progress-bar` | Animated progress indicator |
| `prc-block/render-to-region` | (In progress) Portals block content to a named page region |
| `prc-block/entity-as-iframe` | Embeds a WordPress post or page as a resizing iframe |

### Forms

| Block | Description |
|-------|-------------|
| `prc-block/form` | Form container; uses `prc-block-library/forms` data store |
| `prc-block/form-page` | Multi-page form step |
| `prc-block/form-submit` | Submit button |
| `prc-block/form-message` | Displays success/error messages |
| `prc-block/form-captcha` | reCAPTCHA integration |
| `prc-block/form-input-text` | Text input |
| `prc-block/form-input-textarea` | Textarea input |
| `prc-block/form-input-checkbox` | Checkbox input |
| `prc-block/form-input-radio-group` | Radio button group |
| `prc-block/form-input-select` | Select/dropdown |
| `prc-block/form-input-select-range` | Dual-handle range select |
| `prc-block/form-input-range` | Single-handle range slider |
| `prc-block/form-input-password` | Password input |
| `prc-block/mailchimp-form` | Mailchimp list subscription form |
| `prc-block/mailchimp-select` | Mailchimp interest group selector |

### Social

| Block | Description |
|-------|-------------|
| `prc-block/social-share-sheet` | Social sharing action sheet |
| `prc-block/social-share-text-link` | Inline "share this" text link |
| `prc-block/social-share-url-field` | Copyable URL field for sharing |

### Taxonomy & Data

| Block | Description |
|-------|-------------|
| `prc-block/taxonomy-list` | Lists terms from a taxonomy |
| `prc-block/taxonomy-list-link` | Individual term link within a taxonomy list |
| `prc-block/taxonomy-search` | Searchable term browser |
| `prc-block/taxonomy-index-az-controller` | A–Z index controller for taxonomy browsing |
| `prc-block/taxonomy-index-az-list` | Letter-grouped term list |
| `prc-block/taxonomy-index-list-controller` | Paginated/filtered taxonomy list controller |
| `prc-block/tokens-list` | Displays a list of design tokens |
| `prc-block/roper-db-search` | Roper Center database search interface |
| `prc-block/remote-pivot-table` | Remote Data Blocks template for pivot table data |

### Attachments & Media

| Block | Description |
|-------|-------------|
| `prc-block/attachments-list` | Lists file attachments for a post |
| `prc-block/attachments-pagination` | Pagination for attachment lists |
| `prc-block/audio-player` | HLS.js/MediaElement audio player |

### Utilities & Developer Tools

| Block | Description |
|-------|-------------|
| `prc-block/card` | Generic content card container |
| `prc-block/icon` | FontAwesome icon picker and renderer |
| `prc-block/color-palette` | Displays the active theme color palette |
| `prc-block/code-syntax` | highlight.js syntax-highlighted code block |
| `prc-block/lorem-ipsum` | Placeholder text generator for layout work |
| `prc-block/playground` | Embeds a WordPress Playground instance |

## Support Systems

These subsystems are booted by `Plugin` and apply globally, not per-block.

### Interactivity API (`includes/interactivity-api/`)

Injects `interactiveNamespace` (string) and `interactiveSubsumption` (boolean) attributes on every block that declares `"interactivity": true` in its `supports`. Also wires `prc-block/interactiveNamespace` into `usesContext` and `providesContext` so namespace values flow down the block tree automatically.

### Print Engine (`includes/print-engine/`)

Intercepts `?pdf=true` on singular post URLs and renders a standalone print/PDF page with cover sheet, about page, table of contents, and full article content. Handles multi-chapter report packages automatically.

**`Block_Print_Registry`** is a static registry other plugins use to customize block output in the print view. Register on the `prc_print_engine_register_block_callbacks` action:

```php
add_action( 'prc_print_engine_register_block_callbacks', function() {
    \PRC\Platform\Blocks\Block_Print_Registry::register(
        'my-plugin/my-block',
        function( string $content, array $block, \WP_Post $post ): string {
            return '<div class="print-block">' . $content . '</div>';
        }
    );
    // Styles applied in the ?pdf=true browser view (no @media wrapper):
    \PRC\Platform\Blocks\Block_Print_Registry::register_style(
        'my-plugin/my-block',
        '.print-block { page-break-inside: avoid; }'
    );
    // Styles applied via @media print (browser print dialog / html2pdf):
    \PRC\Platform\Blocks\Block_Print_Registry::register_print_style(
        'my-plugin/my-block',
        __DIR__ . '/print.css'
    );
} );
```

The `printEngine` block attribute (`hideOnPrint`, `displayOnPrint`) is injected on every block and reflected as `data-hide-on-print` / `data-display-on-print` HTML attributes at render time.

### Block Supports (`includes/supports/`)

Adds two layout features to all blocks:

- **`maxWidth`** — per-breakpoint max-width constraints (`desktop`, `tablet`, `mobile`); rendered as CSS custom properties on the block element.
- **Sticky enhancements** — `isStuckBackground`, `isStuckText`, `isStuckBoxShadow` attributes that swap colors and add a box shadow when a sticky block is in the "stuck" state via the Interactivity API.

### Form Data Store

Forms are registered through a `@wordpress/data` store rather than WordPress filters.

```js
import { dispatch } from '@wordpress/data';

dispatch('prc-block-library/forms').registerForm({
    label: 'My Custom Form',
    namespace: 'my-plugin/namespace',
    action: 'my-action',
    method: 'api',
    template: [ /* block template */ ],
});
```

Retrieve registered forms:

```js
import { useSelect } from '@wordpress/data';

const forms = useSelect(
    (select) => select('prc-block-library/forms').getForms(),
    []
);
```

## Hooks & Filters

| Hook | Type | Description |
|------|------|-------------|
| `block_categories_all` | filter | Adds five categories: **Content Curation**, **Marketing**, **Forms**, **Editorial Product**, **Interactivity API** |
| `should_load_separate_core_block_assets` | filter | Returns `true`; enables per-block asset loading for performance |
| `wp_kses_allowed_html` | filter | Extends allowed tags to include `iframe`, `input`, `textarea`, `form`, `picture`, `source`, `svg`, `path`, `rect`; extends `img` with `srcset`/`sizes`; extends `a` with aria attributes |
| `safe_style_css` | filter | Adds `container` and `@container` to allowed inline CSS properties |
| `block_type_metadata` | filter | Multiple usages — injects `interactiveNamespace`/`interactiveSubsumption`, `printEngine`, `maxWidth`, and sticky attributes on all blocks |
| `block_type_metadata_settings` | filter | Merges Interactivity API context entries for blocks that support it |
| `render_block` | filter | Applied by Print Engine (visibility and `data-*` attribute injection) and Supports (sticky and max-width rendering) |
| `remote_data_blocks_template_blocks` | filter | Signals to Remote Data Blocks that `prc-block/remote-pivot-table`, `prc-block/tabs`, and `core/tabs` support RDB templates |
| `remote_data_blocks_register_example_block` | filter | Returns `false`; disables the RDB example block |
| `prc_platform_rewrite_query_vars` | filter | Adds `print`, `printEngineBeta`, and `pdf` to recognized query vars |
| `prc_print_engine_register_block_callbacks` | action | Fires at `init` priority 5; use this to register print callbacks via `Block_Print_Registry` |
| `prc_print_engine_block_{block_name}` | filter | Per-block filter on print-rendered HTML; fires after the registered `Block_Print_Registry` callback |
| `ai_experiments_register_experiments` | action | Used internally to register the Tabular Data AI experiment |

## Troubleshooting

### Block class not found on activation

**Symptom**: Fatal error referencing a missing class (e.g. `Core_Button`) on plugin load.  
**Cause**: A block directory exists in `build/` but its `class-{block-name}.php` file is missing — usually because the library was not built after a fresh clone.  
**Fix**: Run `npm run build:library -w @prc/block-library` from the repo root.

### Block not appearing in the editor

**Symptom**: A block is not visible in the block inserter after adding its directory to `src/`.  
**Cause**: The new block class was not initialized in `Plugin::define_prc_blocks()` or `Plugin::define_core_blocks()`, or its directory name starts with `_` or `.`.  
**Fix**: Add `new My_Block($this->get_loader());` in the appropriate method in `includes/class-plugin.php` and rebuild.

### `?pdf=true` page is blank or crashes

**Symptom**: The print/PDF view renders nothing or throws a PHP error.  
**Cause**: The Print Engine exits early if `is_singular()` is false, or if `$post` is null. Can also happen when the `prc-block/table-of-contents` block's `render.php` is not built.  
**Fix**: Confirm the URL is for a singular post type, that the library is fully built, and that `prc-block/table-of-contents` appears in `build/blocks-manifest.php`.

## Related Docs

- [Development Guidelines](../../docs/DEVELOPMENT_GUIDELINES.md)
- [JavaScript Development Rules](../../.cursor/rules/javascript-development.mdc)
- [WordPress Development Rules](../../.cursor/rules/wordpress-development.mdc)
- [Block Development Skill](../../.claude/skills/wp-block-development/SKILL.md)
- [Interactivity API Skill](../../.claude/skills/wp-interactivity-api/SKILL.md)

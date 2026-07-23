# PRC Block Library

The core Gutenberg block library for the PRC Platform — provides all custom blocks and core block enhancements used across pewresearch.org.

## Overview

PRC Block Library registers ~90 blocks across two namespaces: `prc-block/*` for custom PRC blocks and modifications to `core/*` blocks. It is the display layer of the platform and the first plugin loaded when rendering any content. Beyond blocks, it also ships a set of cross-cutting support systems (Interactivity API helpers, a Print Engine, block visibility controls, custom rich text formats, sticky/max-width layout supports, and a form data store) that apply globally to all registered blocks.

In the block editor, the plugin registers the **Pew Research Center Block Library** block collection (namespace `prc-block`) in `includes/supports/src/index.jsx`, which is enqueued with the Supports subsystem.

### Dependencies

- **Upstream**: `prc-platform-core` (required plugin), `prc-schema-seo` (optional, for PDF contact resolution), `prc-staff-bylines` (optional, for PDF bylines), Report Package plugin (optional, for multi-chapter PDF rendering), WordPress AI plugin (optional, for tabular data AI experiment)
- **Downstream**: Every plugin or theme that renders blocks on the front end depends on this library. Form input blocks (`prc-block/form-input-*`) live here; the form container and related blocks live in `@prc/block-forms`. The `prc-block-library/forms` `@wordpress/data` store (registered by `@prc/block-forms`) is a direct integration point for any plugin registering custom form types.

## Local Development Setup

### Prerequisites

- Node.js 22+ / npm 10.9+
- PHP 8.2+
- WordPress Playground (via ``npm run vip:start` from repo root)

### Running Locally

```bash
# Build the entire library (run from repo root)
npm run build:library -w @prc/block-library

# Build a single deprecated block only
npm run build deprecated:grid-controller -w @prc/block-library

# Watch mode for a single deprecated block during development
npm run start deprecated:grid-controller -w @prc/block-library

# Watch mode for the full library
npm run start:library -w @prc/block-library
```

### Running Tests

```bash
# Run Playwright e2e tests (from monorepo root; VIP dev-env + Playwright are centralized)
npm run vip:start
npm test -- tests/prc-block-library/e2e/
```

## Architecture

Blocks are discovered and loaded automatically at runtime. `Plugin::load_blocks()` globs all subdirectories of `src/` (in local/dev) or `build/` (in production) and calls `include_block()` for each. Any directory prefixed with `_` or `.` is skipped. Each block is expected to have a `class-{block-name}.php` file which self-registers with WordPress using `register_block_type_from_metadata()`. Block metadata is pre-indexed at build time via `build/blocks-manifest.php` and registered with `wp_register_block_metadata_collection()` for performance.

Blocks are split into two groups initialized by `Plugin`:

- **Core blocks** (`define_core_blocks`): extensions and modifications to existing `core/*` blocks — adding attributes, context, controls, or custom rendering.
- **PRC blocks** (`define_prc_blocks`): net-new blocks in the `prc-block` namespace.

In addition to block classes, `Plugin` boots several support subsystems via `define_library_dependencies()`. These run independently of individual blocks and hook into WordPress globally.

Block scaffolding uses `@wordpress/create-block` with templates located at the repository root (`/block-templates`). There are four variants:

| Variant           | When to use                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| `default`         | Standard block with InnerBlocks and server-side rendering via `render.php` |
| `syncedEntity`    | Block that wraps a custom post type or synced entity with create/search UI |
| `contextProvider` | Block that provides context to children and uses Interactivity API routing |
| `coreBlock`       | Extension of an existing `core/*` block via filters                        |

To scaffold a new block, run `npm run create-block` from the repository root. See `/block-templates/README.md` for detailed documentation.

### Key Files

| Path                                                         | Purpose                                                                                                                                  |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `prc-block-library.php`                                      | Plugin entry point; defines constants, runs `Plugin`                                                                                     |
| `includes/class-plugin.php`                                  | Boots all blocks and support subsystems; registers block categories and HTML allowlist                                                   |
| `includes/class-loader.php`                                  | Maintains and runs all WordPress action/filter hooks                                                                                     |
| `includes/utils.php`                                         | `convert_number_to_words()`, `prc_log_error()`, `prc_block_library_manifest()` helpers                                                   |
| `src/story-item/class-ai.php`                                | Story Item AI title/blurb generation via the WordPress AI plugin                                                                         |
| `includes/block-visibility/class-block-visibility.php`       | Adds editor UI for per-block visibility control                                                                                          |
| `includes/custom-text-formats/class-custom-text-formats.php` | Registers custom rich text format buttons in the editor toolbar                                                                          |
| `includes/interactivity-api/class-interactivity-api.php`     | Injects `interactiveNamespace` and `interactiveSubsumption` attributes and context on every block that declares `supports.interactivity` |
| `includes/pagination/class-pagination.php`                   | Registers shared pagination styles/scripts consumed by listing blocks                                                                    |
| `includes/print-engine/class-print-engine.php`               | Intercepts `?pdf=true` requests and renders a full print/PDF page; adds `printEngine` attribute to all blocks                            |
| `includes/print-engine/class-block-print-registry.php`       | Static registry where other plugins register block-level print callbacks and CSS                                                         |
| `includes/supports/class-supports.php`                       | Adds `maxWidth` (responsive per-breakpoint constraint) and sticky-state color/shadow attributes to every block                           |
| `build/blocks-manifest.php`                                  | Auto-generated block metadata index; do not edit manually                                                                                |
| `src/README.md`                                              | Instructions for scaffolding a new block                                                                                                 |
| `bin/build-block.js`                                         | CLI helper for building a single named block                                                                                             |
| `bin/start-block.js`                                         | CLI helper for watching a single named block                                                                                             |
| `webpack.config.js`                                          | Inherits from root `webpack.config.js`                                                                                                   |
| `tests/prc-block-library/e2e/`                                | Playwright e2e specs (monorepo root)                                                                                                     |

## Blocks

This section doubles as the documentation index. Each block links to its detailed doc in [`docs/`](docs/).

### Core Block Modifications (`core/*`)

Adds attributes, context, rendering changes, or new editor controls to existing WordPress core blocks.

| Block                                                                    | Notes                                                                  |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [`core/button`](docs/core-button.md)                                     | PRC platform customizations                                            |
| [`core/categories`](docs/core-categories.md)                             | PRC platform customizations                                            |
| [`core/carousel`](docs/core-carousel.md)                                 | WIP, no functional implementation yet                                  |
| [`core/code`](docs/core-code.md)                                         | PRC platform customizations                                            |
| [`core/cover`](docs/core-cover.md)                                       | PRC platform customizations                                            |
| [`core/details`](docs/core-details.md)                                   | Interactivity API integration                                          |
| [`core/dialog`](docs/core-dialog.md)                                     | PRC dialog pattern utilities                                           |
| [`core/embed`](docs/core-embed.md)                                       | PRC platform customizations                                            |
| [`core/file`](docs/core-file.md)                                         | PRC platform customizations                                            |
| [`core/group`](docs/core-group.md)                                       | PRC platform customizations                                            |
| [`core/heading`](docs/core-heading.md)                                   | PRC platform customizations                                            |
| [`core/image`](docs/core-image.md)                                       | PRC platform customizations                                            |
| [`core/list`](docs/core-list.md)                                         | PRC platform customizations                                            |
| [`core/list-item`](docs/core-list-item.md)                               | PRC platform customizations                                            |
| [`core/media-text`](docs/core-media-text.md)                             | PRC platform customizations                                            |
| [`core/navigation`](docs/core-navigation.md)                             | PRC platform customizations                                            |
| [`core/paragraph`](docs/core-paragraph.md)                               | PRC platform customizations                                            |
| [`core/post-content`](docs/core-post-content.md)                         | PRC platform customizations                                            |
| [`core/post-title`](docs/core-post-title.md)                             | Custom render callback for PRC title patterns                          |
| [`core/pullquote`](docs/core-pullquote.md)                               | PRC platform customizations                                            |
| [`core/query-pagination-numbers`](docs/core-query-pagination-numbers.md) | PRC platform customizations                                            |
| [`core/search`](docs/core-search.md)                                     | PRC platform customizations                                            |
| [`core/separator`](docs/core-separator.md)                               | PRC platform customizations                                            |
| [`core/social-links`](docs/core-social-links.md)                         | Interactivity API integration                                          |
| [`core/table`](docs/core-table.md)                                       | PRC platform customizations                                            |
| [`core/tabs`](docs/core-tabs.md)                                         | PRC platform customizations; registered as Remote Data Blocks template |

### Content & Editorial (`prc-block/*`)

| Block                                                          | Description                                                                                  |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`prc-block/story-item`](docs/story-item.md)                   | Primary content card for linking to articles; supports block bindings and query loop context |
| [`prc-block/popular-story`](docs/popular-story.md)             | Variant of story item for trending/popular content                                           |
| [`prc-block/sub-title`](docs/sub-title.md)                     | Deck/subtitle display below a post title                                                     |
| [`prc-block/post-parent-title`](docs/post-parent-title.md)     | Renders the parent post title with link                                                      |
| [`prc-block/post-taxonomy-terms`](docs/post-taxonomy-terms.md) | Displays taxonomy term links for the current post                                            |
| [`prc-block/breadcrumbs`](docs/breadcrumbs.md)                 | Breadcrumb navigation for the current post                                                   |
| [`prc-block/table-of-contents`](docs/table-of-contents.md)     | Generates a TOC from heading blocks; also used by the Print Engine                           |
| [`prc-block/footnotes`](docs/footnotes.md)                     | Footnote rendering                                                                           |
| [`prc-block/copyright`](docs/copyright.md)                     | Copyright statement block                                                                    |
| [`prc-block/version`](docs/version.md)                         | Displays a version/update notice                                                             |
| [`prc-block/promo`](docs/promo.md)                             | Promotional content unit                                                                     |
| [`prc-block/promo-rotator`](docs/promo-rotator.md)             | Cycles through multiple `prc-block/promo` blocks                                             |
| [`prc-block/logo`](docs/logo.md)                               | PRC logo block with link support                                                             |
| [`prc-block/timeline`](docs/timeline.md)                       | Container for `prc-block/timeline-slide` items                                               |
| [`prc-block/timeline-slide`](docs/timeline-slide.md)           | Individual slide within a timeline                                                           |

### Navigation & Layout

| Block                                                                                  | Description                                                 |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [`prc-block/navigation-mega-menu`](docs/navigation-mega-menu.md)                       | Mega-menu extension for `core/navigation`                   |
| [`prc-block/accordion-controller`](docs/accordion-controller.md)                       | Manages expand/collapse state across child accordions       |
| [`prc-block/accordion`](docs/accordion.md)                                             | Individual accordion panel                                  |
| [`prc-block/carousel-controller`](docs/carousel-controller.md)                         | Splide.js-powered carousel container                        |
| [`prc-block/carousel-slide`](docs/carousel-slide.md)                                   | Individual slide within a carousel                          |
| [`prc-block/tabs`](docs/tabs.md)                                                       | Tab container; registered as Remote Data Blocks template    |
| [`prc-block/tab`](docs/tab.md)                                                         | Individual tab panel                                        |
| [`prc-block/collapsible`](docs/collapsible.md)                                         | Single show/hide content region                             |
| [`prc-block/responsive-container-controller`](docs/responsive-container-controller.md) | Renders different inner block sets at different breakpoints |
| [`prc-block/responsive-container-view`](docs/responsive-container-view.md)             | A breakpoint-specific view within a responsive container    |

### Interactive UI

| Block                                                            | Description                                                |
| ---------------------------------------------------------------- | ---------------------------------------------------------- |
| [`prc-block/dialog`](docs/dialog.md)                             | Modal dialog container                                     |
| [`prc-block/dialog-trigger`](docs/dialog-trigger.md)             | Button or element that opens a dialog                      |
| [`prc-block/dialog-element`](docs/dialog-element.md)             | Content region inside a dialog                             |
| [`prc-block/flip-card-controller`](docs/flip-card-controller.md) | Flip card animation container                              |
| [`prc-block/flip-card-side`](docs/flip-card-side.md)             | Front or back face of a flip card                          |
| [`prc-block/show-more`](docs/show-more.md)                       | Truncates content with an expandable "show more" control   |
| [`prc-block/animation`](docs/animation.md)                       | Applies scroll/entrance animations to inner content        |
| [`prc-block/progress-bar`](docs/progress-bar.md)                 | Animated progress indicator                                |
| [`prc-block/render-to-region`](docs/render-to-region.md)         | (In progress) Portals block content to a named page region |
| [`prc-block/entity-as-iframe`](docs/entity-as-iframe.md)         | Embeds a WordPress post or page as a resizing iframe       |

### Forms

Form container and structure blocks (`prc-block/form`, `form-page`, `form-submit`, `form-message`, `form-captcha`, `form-message-bindings`) are registered by [`@prc/block-forms`](../prc-block-forms/README.md). Form **input** blocks remain in this plugin:

| Block                                                                  | Description                                               |
| ---------------------------------------------------------------------- | --------------------------------------------------------- |
| [`prc-block/form-input-text`](docs/form-input-text.md)                 | Text input                                                |
| [`prc-block/form-input-textarea`](docs/form-input-textarea.md)         | Textarea input                                            |
| [`prc-block/form-input-checkbox`](docs/form-input-checkbox.md)         | Checkbox input                                            |
| [`prc-block/form-input-radio-group`](docs/form-input-radio-group.md)   | Radio button group                                        |
| [`prc-block/form-input-select`](docs/form-input-select.md)             | Select/dropdown                                           |
| [`prc-block/form-input-select-range`](docs/form-input-select-range.md) | Dual-handle range select                                  |
| [`prc-block/form-input-range`](docs/form-input-range.md)               | Single-handle range slider                                |
| [`prc-block/form-input-password`](docs/form-input-password.md)         | Password input                                            |
| [`prc-block/mailchimp-form`](docs/mailchimp-form.md) (deprecated)     | Use Form block **Newsletter Signup (Mailchimp)** variation |
| [`prc-block/mailchimp-select`](docs/mailchimp-select.md) (deprecated) | Use Form block **Newsletter Selection (Mailchimp)** variation |

### Social

| Block                                                                | Description                    |
| -------------------------------------------------------------------- | ------------------------------ |
| [`prc-block/social-share-sheet`](docs/social-share-sheet.md)         | Social sharing action sheet    |
| [`prc-block/social-share-text-link`](docs/social-share-text-link.md) | Inline "share this" text link  |
| [`prc-block/social-share-url-field`](docs/social-share-url-field.md) | Copyable URL field for sharing |

### Taxonomy & Data

| Block                                                                                | Description                                      |
| ------------------------------------------------------------------------------------ | ------------------------------------------------ |
| [`prc-block/table`](docs/table.md)                                                   | Data table with TypeScript editor and sorting    |
| [`prc-block/taxonomy-list`](docs/taxonomy-list.md)                                   | Lists terms from a taxonomy                      |
| [`prc-block/taxonomy-list-link`](docs/taxonomy-list-link.md)                         | Individual term link within a taxonomy list      |
| [`prc-block/taxonomy-search`](docs/taxonomy-search.md)                               | Searchable term browser                          |
| [`prc-block/taxonomy-index-az-controller`](docs/taxonomy-index-az-controller.md)     | A–Z index controller for taxonomy browsing       |
| [`prc-block/taxonomy-index-az-list`](docs/taxonomy-index-az-list.md)                 | Letter-grouped term list                         |
| [`prc-block/taxonomy-index-list-controller`](docs/taxonomy-index-list-controller.md) | Paginated/filtered taxonomy list controller      |
| [`prc-block/tokens-list`](docs/tokens-list.md)                                       | Displays a list of design tokens                 |
| [`prc-block/roper-db-search`](docs/roper-db-search.md)                               | Roper Center database search interface           |

### Attachments & Media

| Block                                                                | Description                       |
| -------------------------------------------------------------------- | --------------------------------- |
| [`prc-block/attachments-list`](docs/attachments-list.md)             | Lists file attachments for a post |
| [`prc-block/attachments-pagination`](docs/attachments-pagination.md) | Pagination for attachment lists   |
| [`prc-block/audio-player`](docs/audio-player.md)                     | HLS.js/MediaElement audio player  |

### Utilities & Developer Tools

| Block                                              | Description                                |
| -------------------------------------------------- | ------------------------------------------ |
| [`prc-block/card`](docs/card.md)                   | Generic content card container             |
| [`prc-block/icon`](docs/icon.md)                   | FontAwesome icon picker and renderer       |
| [`prc-block/color-palette`](docs/color-palette.md) | Displays the active theme color palette    |
| [`prc-block/code-syntax`](docs/code-syntax.md)     | highlight.js syntax-highlighted code block |
| [`prc-block/lorem-ipsum`](docs/lorem-ipsum.md)     | Placeholder text generator for layout work |
| [`prc-block/playground`](docs/playground.md)       | Embeds a WordPress Playground instance     |

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

The same editor script (`src/index.jsx`) unregisters unused core block types (archives, calendar, latest comments, tag cloud, verse) and a set of `core/embed` service variations; edit that file to change the list.

### Form Data Store

The `prc-block-library/forms` `@wordpress/data` store is registered by `@prc/block-forms` (see [`plugins/prc-block-forms/src/form/store.js`](../prc-block-forms/src/form/store.js)). Form types are registered through that store rather than WordPress filters.

```js
import { dispatch } from '@wordpress/data';

dispatch('prc-block-library/forms').registerForm({
	label: 'My Custom Form',
	namespace: 'my-plugin/namespace',
	action: 'my-action',
	method: 'api',
	template: [
		/* block template */
	],
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

| Hook                                        | Type   | Description                                                                                                                                                                              |
| ------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `block_categories_all`                      | filter | Adds five categories: **Content Curation**, **Marketing**, **Forms**, **Editorial Product**, **Interactivity API**                                                                       |
| `should_load_separate_core_block_assets`    | filter | Returns `true`; enables per-block asset loading for performance                                                                                                                          |
| `wp_kses_allowed_html`                      | filter | Extends allowed tags to include `iframe`, `input`, `textarea`, `form`, `picture`, `source`, `svg`, `path`, `rect`; extends `img` with `srcset`/`sizes`; extends `a` with aria attributes |
| `safe_style_css`                            | filter | Adds `container` and `@container` to allowed inline CSS properties                                                                                                                       |
| `block_type_metadata`                       | filter | Multiple usages — injects `interactiveNamespace`/`interactiveSubsumption`, `printEngine`, `maxWidth`, and sticky attributes on all blocks                                                |
| `block_type_metadata_settings`              | filter | Merges Interactivity API context entries for blocks that support it                                                                                                                      |
| `render_block`                              | filter | Applied by Print Engine (visibility and `data-*` attribute injection) and Supports (sticky and max-width rendering)                                                                      |
| `remote_data_blocks_template_blocks`        | filter | Signals to Remote Data Blocks that `prc-block/tabs` and `core/tabs` support RDB templates                                                                                                |
| `remote_data_blocks_register_example_block` | filter | Returns `false`; disables the RDB example block                                                                                                                                          |
| `query_vars`                                | filter | Adds `print`, `printEngineBeta`, and `pdf` to recognized query vars                                                                                                                      |
| `prc_print_engine_register_block_callbacks` | action | Fires at `init` priority 5; use this to register print callbacks via `Block_Print_Registry`                                                                                              |
| `prc_print_engine_block_{block_name}`       | filter | Per-block filter on print-rendered HTML; fires after the registered `Block_Print_Registry` callback                                                                                      |
| `wpai_register_features`                    | action | Used internally to register block library AI features (tabular data, story blurb) with the WordPress AI plugin                                                                           |

## Block patterns (disposition-A scaffolds)

Patterns live in `patterns/` and register via `register_plugin_patterns()` from `client-mu-plugins/plugin-patterns.php`. Category slug: **`prc-block-library`**.

| Retired variation     | Pattern slug                              | Block Types header |
| --------------------- | ----------------------------------------- | ------------------ |
| Callout               | `prc-block-library/callout`               | `core/group`       |
| Social Group          | `prc-block-library/social-group`          | `core/group`       |
| Collapsible           | `prc-block-library/collapsible`           | `core/details`     |
| Pew Knight co-branded | `prc-block-library/pew-knight-co-branded` | `core/details`     |

Use the **Patterns** inserter (`prc-block-library` category) for these scaffolds.

### core/group width presets (transform-scoped variations)

Constrained-width group presets (200px, 250px, 300px, 320px, 420px, 640px) register as `core/group` block variations with `scope: ['transform']` in `src/core-group/variations.js`. They appear in the **block transforms** menu when converting or transforming a Group block, not in the block inserter, Patterns inserter, or variation switcher.

### core/heading presets (transform-scoped variations)

Heading (H4 default), Section (`isChapter: true`, level 3), and Layout Heading (`is-style-layout-heading`) register as `core/heading` block variations with `scope: ['transform']` in `src/core-heading/index.js`. They appear in the **block transforms** menu only.

## Binding companions (patterns + inserter variations)

| Discovery                                  | Item                 | Where                                                        |
| ------------------------------------------ | -------------------- | ------------------------------------------------------------ |
| Pattern                                    | Copyright Disclaimer | `prc-block-library/copyright-disclaimer` — Patterns inserter |
| Inserter variation (`scope: ['inserter']`) | Tab Label            | `core/paragraph` + `core/heading` inside `core/tab-panel`    |
| Inserter variation                         | Dialog Label         | `core/heading` inside `prc-block/dialog-element`             |
| Inserter variation                         | Form: Result Message | `core/paragraph` inside `prc-block/form-message`             |
| Inserter variation                         | Version Info         | `core/paragraph` (global inserter)                           |

Copyright disclaimer remains a parent-scoped pattern. Tab label, dialog label, form result message, and version info register as block variations visible in the **block inserter** only (not the variation switcher). Use **Attributes → Bindings** to retrofit existing blocks.

## Author discovery (bindings, patterns, bits)

| Author task                                                          | Preferred path                                                                     |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Layout scaffold (group width, callout, collapsible, heading presets) | Block pattern under `prc-block-library` or `prc-religious-landscape-study`         |
| Staff field on a whole block (photo, bio, job title)                 | Staff Context Provider → pattern **or** Attributes → Bindings → **Staff Info API** |
| Staff name/title/bio inline in copy                                  | Staff Context Provider → block bits toolbar (**Staff** category)                   |
| Quiz / typology field in results                                     | Parent block → pattern **or** Attributes → Bindings (ancestor-scoped source)       |
| User login/profile/logout button URL                                 | User State panel → Attributes → Bindings → **User Accounts**                       |
| Copyright year in running text                                       | Block bits → **Copyright**                                                         |

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
- [Block Development Skill](../../.cursor/skills/wp-block-development/SKILL.md)
- [Interactivity API Skill](../../.cursor/skills/wp-interactivity-api/SKILL.md)

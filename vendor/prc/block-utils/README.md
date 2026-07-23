# prc/block-utils

Shared PHP utilities for PRC block rendering: `classNames`, `find_block` / `find_blocks`, gap/spacing helpers, `get_block_attributes`, sliding-window `Pagination` markup, device detection, URL helpers, bot detection, country/region lists, and more.

## Install

```bash
composer require prc/block-utils
```

Develop this library in its own repository (e.g. [`pewresearch/prc-block-utils`](https://github.com/pewresearch/prc-block-utils)). In the PRC Platform monorepo, `prc-platform-core` currently wires `prc/block-utils` with a **path** repository pointing at a sibling checkout (`../prc-block-utils` next to `prc-platform`). After you publish this package on GitHub, switch that Composer entry to a **`vcs`** repository with the same URL (mirroring `prc/wp-html-processors`).

## Namespace

All functions live in `PRC\BlockUtils`:

```php
use function PRC\BlockUtils\classNames;
use function PRC\BlockUtils\find_block;
use function PRC\BlockUtils\get_current_device;
use function PRC\BlockUtils\log_error;
use function PRC\BlockUtils\get_list_of;
use function PRC\BlockUtils\normalize_url_to_production;
use PRC\BlockUtils\Pagination;

$class = classNames( 'foo', [ 'is-active' => $active ] );

$pagination = new Pagination( $items );
echo $pagination->get_markup();

$device = get_current_device(); // 'mobile' | 'tablet' | 'desktop'
$states = get_list_of( 'us-states' );
$url    = normalize_url_to_production( $permalink );
```

### Available functions

| Function | Description |
|----------|-------------|
| `classNames(...$args)` | jQuery-style conditional class string builder |
| `find_block($blocks, $pattern)` | Find first matching block by name pattern |
| `find_blocks($blocks, $pattern)` | Find all matching blocks by name pattern |
| `load_blocks($root_dir)` | Load block class files from a plugin's src/build dir |
| `get_block_attributes($name, $given, $desired)` | Merge block attributes with defaults |
| `get_block_gap_support_value($attrs, $dim)` | Resolve blockGap spacing preset CSS var |
| `get_spacing_preset_css_var($value)` | Convert spacing preset to CSS var |
| `get_block_html_attributes($attrs)` | Render HTML attributes from array |
| `get_primary_term_id($post_id, $taxonomy)` | Shim for Schema SEO primary term |
| `get_domain()` | Site domain without scheme |
| `get_current_url()` | Full current URL, env-aware |
| `normalize_url_to_production($url)` | Rewrite non-production URLs to www.pewresearch.org |
| `get_wp_admin_current_post_type()` | Current post type in wp-admin |
| `is_google_bot()` | Detect Googlebot UA |
| `is_gpt_bot()` | Detect GPTBot UA |
| `is_bot()` | Detect any known bot |
| `is_facebook_request()` | Detect Facebook scraper UA |
| `is_twitter_request()` | Detect Twitterbot UA |
| `is_index($include_search)` | True on home/archive/tax pages |
| `is_publications()` | True on the publications (home) page |
| `log_error($error)` | Log WP_Error, Throwable, or string to New Relic / error_log |
| `get_list_of($type)` | Countries, US states, countries-and-regions, or industries list |
| `get_devices()` | Jetpack device detection info array |
| `get_current_device()` | Current device type string |
| `get_country_code_from_name($name)` | ISO alpha-2 code from country name |

## Development & tests

```bash
composer install
npm install
npm run env:start
npm run env:install-tests   # one-time
npm test
```

Refresh the vendored design-system palette fixture from a sibling checkout:

```bash
bash bin/sync-design-system.sh
```

## License

GPL-2.0-or-later

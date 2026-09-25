# PRC Primitives

Shared PHP library for PRC Platform plugins. It holds block rendering helpers, HTML processors built on `WP_HTML_Tag_Processor`, a delay/cancel helper for Action Scheduler jobs, a URL to post ID resolver, and term data store relationships that keep a post type and a taxonomy in 1:1 sync.

The package changes infrequently. Plugins such as email builder and Apple News depend on it as a stable layer.

## Require

```json
{
	"require": {
		"prc/primitives": "^2.0"
	},
	"repositories": {
		"prc-primitives": {
			"type": "vcs",
			"url": "https://origin.cursor.com/pewresearch/prc-primitives.git"
		}
	}
}
```

Then run `composer update prc/primitives`. Clone access to `origin.cursor.com` needs Origin git credentials (`origin auth login` locally).

Every public symbol lives under `PRC\Primitives\<Module>`. The package replaces `prc/block-utils`, `prc/wp-html-processors`, `prc/url-helper`, and `prc/term-data-store`. Drop those from `require` when you add `prc/primitives`.

## Upgrade from 1.x

2.0 moves every namespace. There are no aliases for the 1.x names.

| 1.x | 2.x |
| --- | --- |
| `PRC\BlockUtils` | `PRC\Primitives\BlockUtils` |
| `PRC\Html` | `PRC\Primitives\HTML_Processors` |
| `PRC\DelayedAction` | `PRC\Primitives\DelayedAction` |
| `PRC\TDS` | `PRC\Primitives\TDS` |
| `PRC\URL_Helper` | `PRC\Primitives\URL_Helper\URL_Helper` |

The codemod ships with the package. Run it over your code after `composer update`, then run it again with `--check` to confirm nothing is left:

```bash
php vendor/prc/primitives/bin/migrate-namespaces.php src/
php vendor/prc/primitives/bin/migrate-namespaces.php --check src/
```

It rewrites PHP, strings with doubled backslashes, JSON, and Markdown. It skips `vendor/`, `node_modules/`, `build/`, lock files, and changelogs. Add `--skip=<path substring>` for anything else to leave alone.

## Trees

| Directory | Namespace | What it contains |
| --- | --- | --- |
| `src/block-utils/` | `PRC\Primitives\BlockUtils` | `classNames`, `find_block` / `find_blocks`, gap and spacing helpers, `Pagination`, device and URL helpers |
| `src/html-processors/` | `PRC\Primitives\HTML_Processors` | `TableProcessor`, `HeadingProcessor`, `ElementFinder`, and the `parse_*` functions |
| `src/delayed-action/` | `PRC\Primitives\DelayedAction` | Queue and cancel a unique delayed Action Scheduler job |
| `src/url-helper/` | `PRC\Primitives\URL_Helper` | `URL_Helper`, which resolves a preview link, wp-admin edit link, or canonical URL to a post ID |
| `src/term-data-store/` | `PRC\Primitives\TDS` | `add_relationship`, `get_related_post`, `get_related_term`, and the sync hooks. Forked from 10up/term-data-store; see `src/term-data-store/LICENSE` |

Callers keep their own post meta and hook callbacks. `DelayedAction` only talks to the scheduler.

```php
use PRC\Primitives\DelayedAction\ActionSchedulerGateway;
use PRC\Primitives\DelayedAction\DelayedAction;
use PRC\Primitives\URL_Helper\URL_Helper;
use function PRC\Primitives\TDS\add_relationship;
use function PRC\Primitives\BlockUtils\classNames;
use function PRC\Primitives\HTML_Processors\parse_table_block_into_array;

$class = classNames( 'foo', array( 'is-active' => $active ) );
$data  = parse_table_block_into_array( $html );

$delayed = new DelayedAction( new ActionSchedulerGateway() );
$queued  = $delayed->queue( 'prc_example_send', array( $post_id ), 'prc-example', 600 );
$cancel  = $delayed->cancel( 'prc_example_send', array( $post_id ), 'prc-example' );

$post_id = ( new URL_Helper( $url ) )->post_id;

add_action( 'init', fn() => add_relationship( 'staff', 'bylines' ), 20 );
```

`queue()` returns `{ queued: true, scheduled_at: int }` or a `WP_Error`. Codes are `action_scheduler_unavailable` and `schedule_failed`. `cancel()` returns `{ cancelled: true }` or a `WP_Error`. Codes are `no_pending`, `in_progress`, and `action_scheduler_unavailable`.

`URL_Helper::$post_id` is an `int` or a `WP_Error` with code `404`. It is `null` when the input is not a valid URL.

Call `add_relationship()` after both the post type and the taxonomy are registered. It throws `Invalid_Input_Exception` when either is missing or already paired. Pass `false` as the third argument to keep post permalinks unchanged. Post and term meta keys are `tds_term_id` and `tds_post_id`.

## Tests

```bash
composer install
bash bin/install-wp-tests.sh wordpress_test root <password> 127.0.0.1 latest true
composer test
```

Refresh the design-system palette fixture from a sibling `prc-platform` checkout:

```bash
bash bin/sync-design-system.sh
```

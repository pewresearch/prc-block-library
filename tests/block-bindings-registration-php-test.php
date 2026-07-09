<?php
/**
 * Smoke test: PRC block binding sources register on the frontend.
 *
 * `prc-block/remote-pivot-table-sum` registers from `@prc/block-tables`.
 *
 * Run from repo root (VIP dev-env):
 *   vip dev-env exec --slug prc-platform -- wp eval-file wp-content/plugins/prc-block-library/tests/block-bindings-registration-php-test.php --url=https://prc-platform.vipdev.lndo.site/pewresearch-org
 *
 * Note: `prc-block/form-message` binding source is registered by `@prc/block-forms`.
 *
 * @package PRC\Platform\Blocks
 */

if ( ! class_exists( 'WP_Block_Bindings_Registry' ) ) {
	fwrite( STDERR, "FAIL: WordPress block bindings registry unavailable\n" );
	exit( 1 );
}

$required_sources = array(
	'prc-platform/staff-info',
	'prc-platform/copyright',
	'prc-platform/version',
	'prc-platform/dataset-description',
	'prc-quiz/builder',
	'prc-quiz/political-typology',
	'prc-quiz/religious-typology',
	'prc-rls/image-api',
	'prc-rls/language-api',
	'prc-user-accounts/user-state',
	'core/tab-label',
	'prc-block/dialog-element-label',
	'prc-block/form-message',
	'prc-block/remote-pivot-table-sum',
);

$registered = WP_Block_Bindings_Registry::get_instance()->get_all_registered();
$failures   = array();

foreach ( $required_sources as $source_name ) {
	if ( ! isset( $registered[ $source_name ] ) ) {
		$failures[] = "missing source: {$source_name}";
	}
}

if ( ! empty( $failures ) ) {
	fwrite( STDERR, "FAIL:\n- " . implode( "\n- ", $failures ) . "\n" );
	exit( 1 );
}

echo 'OK: ' . count( $required_sources ) . " PRC binding sources registered\n";

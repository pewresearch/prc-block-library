<?php
/**
 * Permalink normalization for AI prompts.
 *
 * @package PRC\Platform\Blocks\AI_Features
 */

declare(strict_types=1);

namespace PRC\Platform\Blocks\AI_Features;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Ensures AI prompts receive public production URLs when the editor runs on a non-production origin.
 */
final class AI_Prompt_Permalink {

	/**
	 * Swap the current site's home URL prefix for the public production origin when not in production.
	 *
	 * Mirrors {@see \PRC\Platform\Schema_SEO\Search_Console::get_inspection_url()} so AI prompts match
	 * the canonical production host (filterable via `prc_schema_seo_gsc_production_url`).
	 *
	 * @param string $url Permalink or other absolute URL rooted at this site's home.
	 * @return string
	 */
	public static function normalize_for_public_origin( string $url ): string {
		if ( 'production' === wp_get_environment_type() ) {
			return $url;
		}

		$home_url       = trailingslashit( home_url() );
		$default_public = 'https://www.' . 'pewresearch.org'; // pragma: allowlist secret — public site origin for AI prompts, not an API key.
		$production_url = trailingslashit(
			apply_filters( 'prc_schema_seo_gsc_production_url', $default_public )
		);

		if ( $home_url !== $production_url && str_starts_with( $url, $home_url ) ) {
			return $production_url . substr( $url, strlen( $home_url ) );
		}

		return $url;
	}
}

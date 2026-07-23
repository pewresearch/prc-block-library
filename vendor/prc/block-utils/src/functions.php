<?php
/**
 * PRC shared block utilities.
 *
 * @package PRC\BlockUtils
 */

namespace PRC\BlockUtils;

use DougSisk\CountryState\CountryState;
use WP_Block_Type_Registry;
use WP_Error;
use WP_HTML_Tag_Processor;

/**
 * Helper utility to include all PRC formatted class-<block-name>.php files from the plugin (or any file path) /src directory.
 *
 * @param string|null $root_dir The root directory of the plugin.
 * @return true|WP_Error Returns WP_Error if a block file is missing.
 */
function load_blocks( $root_dir = null ) {
	if ( null === $root_dir ) {
		return new WP_Error( 'no-block-root-dir', __( 'No root directory provided.', 'prc' ) );
	}
	$block_files = glob( $root_dir . '/src/*', GLOB_ONLYDIR );
	$errors      = array();
	foreach ( $block_files as $block ) {
		$block           = basename( $block );
		$dir             = 'local' === wp_get_environment_type() ? 'src' : 'build';
		$block_file_path = '/' . $dir . '/' . $block . '/class-' . $block . '.php';
		$file            = $root_dir . $block_file_path;
		if ( file_exists( $file ) ) {
			require_once $file;
		} else {
			$errors[] = new WP_Error( 'block-file-missing', sprintf( __( 'Block file missing: %s', 'prc' ), $file ) );
		}
	}
	if ( ! empty( $errors ) ) {
		return new WP_Error( 'block-files-missing', __( 'One or more block files are missing.', 'prc' ), $errors );
	}
	return true;
}

/**
 * Finds a block in an array of blocks by its blockName attribute. Recursively searches innerBlocks 5 levels deep.
 *
 * @param mixed  $blocks The blocks.
 * @param string $pattern The pattern.
 * @param int    $depth The depth.
 * @return array|null
 */
function find_block( $blocks, $pattern = 'prc-block/', $depth = 0 ) {
	if ( $depth > 5 ) {
		return null;
	}

	foreach ( $blocks as $block ) {
		// Check for the blockname if it matches the wildcard given, like prc-block/form-input-* should return the first prc-block/form-input-checkbox block it finds for example.
		if ( isset( $block['blockName'] ) && str_starts_with( $block['blockName'], $pattern ) !== false ) {
			return $block;
		}

		if ( isset( $block['innerBlocks'] ) && count( $block['innerBlocks'] ) > 0 ) {
			$inner_block = find_block( $block['innerBlocks'], $pattern, $depth + 1 );
			if ( null !== $inner_block ) {
				return $inner_block;
			}
		}
	}

	return null;
}

/**
 * Finds all blocks in an array of blocks by their blockName attribute. Recursively searches innerBlocks 5 levels deep.
 *
 * @param array  $blocks The blocks to search through.
 * @param string $pattern The pattern to match against block names (e.g., 'prc-block/' or 'core/paragraph').
 * @param int    $depth Current recursion depth (internal use).
 * @return array Array of matching blocks, or empty array if none found.
 */
function find_blocks( $blocks, $pattern = 'prc-block/', $depth = 0 ) {
	if ( $depth > 5 ) {
		return array();
	}

	$found_blocks = array();

	foreach ( $blocks as $block ) {
		if ( isset( $block['blockName'] ) && str_starts_with( $block['blockName'], $pattern ) !== false ) {
			$found_blocks[] = $block;
		}

		if ( isset( $block['innerBlocks'] ) && count( $block['innerBlocks'] ) > 0 ) {
			$inner_blocks = find_blocks( $block['innerBlocks'], $pattern, $depth + 1 );
			if ( ! empty( $inner_blocks ) ) {
				$found_blocks = array_merge( $found_blocks, $inner_blocks );
			}
		}
	}

	return $found_blocks;
}

/**
 * If a inner block is an input element, return its value.
 *
 * @param mixed $content The content.
 * @return mixed The input value.
 */
function get_wp_interactive_input_value( $content ) {
	$processor = new WP_HTML_Tag_Processor( $content );
	if ( $processor->next_tag( 'input' ) && $processor->get_attribute( 'value' ) ) {
		return $processor->get_attribute( 'value' );
	}
	return null;
}

/**
 * If a inner block has a data-wp-on--click attribute, return it.
 *
 * @param mixed $content The content.
 * @return mixed The on click action.
 */
function get_wp_interactive_on_click_action( $content ) {
	$processor = new WP_HTML_Tag_Processor( $content );
	if ( $processor->next_tag( 'input' ) && $processor->get_attribute( 'data-wp-on--click' ) ) {
		return $processor->get_attribute( 'data-wp-on--click' );
	}
	return null;
}

/**
 * If a inner block has a data-wp-on--mouseenter attribute, return it.
 *
 * @param mixed $content The content.
 * @return mixed The on mouseenter action.
 */
function get_wp_interactive_on_mouseenter_action( $content ) {
	$processor = new WP_HTML_Tag_Processor( $content );
	if ( $processor->next_tag( 'input' ) && $processor->get_attribute( 'data-wp-on--mouseenter' ) ) {
		return $processor->get_attribute( 'data-wp-on--mouseenter' );
	}
	return null;
}

/**
 * If a inner block has a data-wp-class attribute, return it.
 *
 * @param mixed $content The content.
 * @param mixed $classname The classname.
 * @return mixed The classname.
 */
function get_wp_interactive_classname( $content, $classname ) {
	$processor = new WP_HTML_Tag_Processor( $content );
	if ( $processor->next_tag( 'input' ) && $processor->get_attribute( 'data-wp-class--' . $classname ) ) {
		return $processor->get_attribute( 'data-wp-class--' . $classname );
	}
	return null;
}

/**
 * If a inner block has a data-wp-context attribute, return it.
 *
 * @param mixed $content The content.
 * @return mixed The context.
 */
function get_wp_interactive_context( $content ) {
	$processor = new WP_HTML_Tag_Processor( $content );
	if ( $processor->next_tag( 'input' ) && $processor->get_attribute( 'data-wp-context' ) ) {
		return $processor->get_attribute( 'data-wp-context' );
	}
	return null;
}

/**
 * Returns the proper css value for a block's gap attribute.
 *
 * @param mixed $attributes The attributes.
 * @param mixed $dimension_to_return The dimension to return.
 * @return string The block gap support value.
 */
function get_block_gap_support_value( $attributes, $dimension_to_return = false ) {
	if ( ! is_array( $attributes ) ) {
		return '';
	}
	if ( ! array_key_exists( 'style', $attributes ) || ! is_array( $attributes['style'] ) ) {
		return 'inherit';
	}
	if ( ! array_key_exists( 'spacing', $attributes['style'] ) || ! is_array( $attributes['style']['spacing'] ) ) {
		return 'inherit';
	}
	if ( ! array_key_exists( 'blockGap', $attributes['style']['spacing'] ) ) {
		return 'inherit';
	}

	$block_gap = $attributes['style']['spacing']['blockGap'];

	if ( is_array( $block_gap ) && false !== $dimension_to_return ) {
		$check_key = 'horizontal' === $dimension_to_return ? 'left' : 'top';
		$block_gap = array_key_exists( $check_key, $block_gap ) ? $block_gap[ $check_key ] : '';
	} elseif ( is_array( $block_gap ) ) {
		$block_gap = 'inherit';
	}

	return preg_match( '/^var:preset\|spacing\|\d+$/', $block_gap ) ? 'var(--wp--preset--spacing--' . substr( $block_gap, strrpos( $block_gap, '|' ) + 1 ) . ')' : $block_gap;
}

/**
 * Returns an array of attributes for a given block name, with the given attributes merged with the block's default attributes.
 *
 * @param string      $block_name The name of the block to get attributes for.
 * @param array       $given_attributes If no given attributes are provided, the default attributes will be returned.
 * @param string|null $desired_attribute If a desired attribute is provided, only that attribute will be returned.
 * @return array|string|null
 */
function get_block_attributes( string $block_name, array $given_attributes, ?string $desired_attribute = null ) {
	$block               = WP_Block_Type_Registry::get_instance()->get_registered( $block_name );
	$attributes          = $block->get_attributes();
	$modified_attributes = array();
	foreach ( $attributes as $attr_name => $attr_data ) {
		if ( array_key_exists( $attr_name, $given_attributes ) ) {
			$modified_attributes[ $attr_name ] = $given_attributes[ $attr_name ];
		} elseif ( array_key_exists( 'default', $attr_data ) ) {
			$modified_attributes[ $attr_name ] = $attr_data['default'];
		} else {
			$modified_attributes[ $attr_name ] = null;
		}
	}
	if ( null !== $desired_attribute ) {
		return array_key_exists( $desired_attribute, $modified_attributes ) ? $modified_attributes[ $desired_attribute ] : null;
	}
	return $modified_attributes;
}

/**
 * Converts a spacing preset into a custom value.
 *
 * @param string|null $value Value to convert.
 * @return string|null CSS var string for given spacing preset value.
 */
function get_spacing_preset_css_var( $value ) {
	if ( empty( $value ) ) {
		return null;
	}

	if ( ! preg_match( '/var:preset\|spacing\|(.+)/', $value, $matches ) ) {
		return $value;
	}

	return sprintf( 'var(--wp--preset--spacing--%s)', $matches[1] );
}

/**
 * The classNames function takes any number of arguments which can be a string or array.
 *
 * @param mixed ...$args The arguments.
 * @return string
 */
function classNames( ...$args ): string { // phpcs:ignore WordPress.NamingConventions.ValidFunctionName.FunctionNameInvalid
	$data = array_reduce(
		$args,
		function ( $carry, $arg ) {
			if ( is_array( $arg ) ) {
				return array_merge( $carry, $arg );
			}

			$carry[] = $arg;
			return $carry;
		},
		array()
	);

	$classes = array_map(
		function ( $key, $value ) {
			$condition = $value;
			$return    = $key;

			if ( is_int( $key ) ) {
				$condition = null;
				$return    = $value;
			}

			$is_array             = is_array( $return );
			$is_object            = is_object( $return );
			$is_stringable_type   = ! ( $is_array || $is_object );
			$is_stringable_object = $is_object && method_exists( $return, '__toString' );

			if ( ! $is_stringable_type && ! $is_stringable_object ) {
				return null;
			}

			if ( $condition === null ) {
				return $return;
			}

			return $condition ? $return : null;
		},
		array_keys( $data ),
		array_values( $data )
	);

	$classes = array_filter( $classes );

	return implode( ' ', $classes );
}

/**
 * Get the legacy color by slug.
 *
 * @param string $slug The slug of the color.
 * @return array|false The color array or false if no color is found.
 */
function get_legacy_color_by_slug( $slug ) {
	$colors = array(
		'white'                => '#fff',
		'black'                => '#000',
		'link-color'           => '#346EAD',
		'text-color'           => '#2a2a2a',
		'slate'                => '#282828',
		'gray-darkest'         => '#444444',
		'gray-dark'            => '#818181',
		'gray-medium'          => '#b7b8b9',
		'gray-light'           => '#dadbdb',
		'gray'                 => '#efefef',
		'gray-alt'             => '#6b6b6b',
		'gray-cool'            => '#F8F8F8',
		'beige-dark'           => '#b7b8af',
		'beige-medium'         => '#f0f0e6',
		'beige'                => '#f7f7f1',
		'oatmeal-text'         => '#58585a',
		'oatmeal-dark'         => '#b2b3a5',
		'oatmeal-light'        => '#f8f9f5',
		'oatmeal'              => '#ecece3',
		'democrat-blue'        => '#436983',
		'republican-red'       => '#bf3927',
		'eggplant'             => '#756a7e',
		'science-orange'       => '#ea9e2c',
		'global-green'         => '#949d48',
		'race-ethnicity-brown' => '#a55a26',
		'politics-brown'       => '#d1a730',
		'religion-blue'        => '#0090bf',
		'social-trends-teal'   => '#377668',
		'journalism-plum'      => '#733d47',
		'internet-blue'        => '#006699',
		'mustard'              => '#d7b236',
		'sandwisp'             => '#e4cb84',
		'cape-palliser'        => '#a5673f',
	);
	if ( array_key_exists( $slug, $colors ) ) {
		return array(
			'hex'  => $colors[ $slug ],
			'slug' => $slug,
			'name' => $colors[ $slug ],
		);
	}
	return false;
}

/**
 * Get the color by slug.
 *
 * @param string $slug The slug of the color.
 * @return array|string|false
 */
function get_color_by_slug( $slug ) {
	if ( is_admin() ) {
		return $slug;
	}
	$colors       = \wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
	$legacy_color = get_legacy_color_by_slug( $slug );
	if ( $legacy_color ) {
		return $legacy_color;
	}
	$picked_color = array_filter(
		$colors,
		function ( $color ) use ( $slug ) {
			return $color['slug'] === $slug;
		}
	);
	$picked_color = array_pop( $picked_color );
	$hex          = $picked_color ? $picked_color['color'] : '#000';
	$slug         = $picked_color ? $picked_color['slug'] : 'black';
	$name         = $picked_color ? $picked_color['name'] : 'Black';
	return array(
		'hex'  => $hex,
		'slug' => $slug,
		'name' => $name,
	);
}

/**
 * Mimics core get_block_wrapper_attributes for when global $block data is lost.
 *
 * @param array $attributes The attributes.
 * @return string The HTML attributes.
 */
function get_block_html_attributes( $attributes = array() ) {
	$normalized_attributes = array();
	foreach ( $attributes as $key => $value ) {
		$normalized_attributes[] = $key . '="' . esc_attr( $value ) . '"';
	}
	return implode( ' ', $normalized_attributes );
}

/**
 * Get the primary term id.
 *
 * @param int    $post_id Post ID.
 * @param string $taxonomy Taxonomy slug.
 * @return int|null Term ID if PRC Schema SEO active and primary term found, null otherwise.
 */
function get_primary_term_id( ?int $post_id, string $taxonomy ): ?int {
	if ( ! $post_id ) {
		return null;
	}
	if ( function_exists( '\PRC\Platform\Schema_SEO\Utils\get_primary_term_id' ) ) {
		return \PRC\Platform\Schema_SEO\Utils\get_primary_term_id( $post_id, $taxonomy );
	}
	return null;
}

/**
 * Get the domain for the server.
 *
 * @return string
 */
function get_domain() {
	return str_replace( array( 'https://', 'http://' ), '', get_site_url() );
}

/**
 * Get the current URL. Accounts for if off production.
 *
 * @return string
 */
function get_current_url() {
	if ( 'production' !== wp_get_environment_type() ) {
		$request_uri = str_replace( '/pewresearch-org/', '/', $_SERVER['REQUEST_URI'] );
		return 'https://' . get_domain() . $request_uri;
	}
	return 'https://' . get_domain() . $_SERVER['REQUEST_URI'];
}

/**
 * Normalize a URL to its production canonical form (www.pewresearch.org).
 *
 * Used when a stable production URL is required (e.g. third-party APIs keyed by public URL).
 * Strips the multisite `/pewresearch-org` path prefix from non-production environments.
 *
 * @param string $url Absolute URL.
 * @return string Normalized URL, or the original string if parsing fails.
 */
function normalize_url_to_production( string $url ): string {
	if ( 'production' === wp_get_environment_type() ) {
		return $url;
	}

	$parts = wp_parse_url( $url );
	if ( false === $parts || empty( $parts['host'] ) ) {
		return $url;
	}

	$host = strtolower( $parts['host'] );

	// Non-production PRC hosts that should be rewritten to the production canonical host.
	$replace_hosts = array(
		'platform.pewresearch.org',
		'alpha.pewresearch.org',
		'beta.pewresearch.org',
		'prc-platform.vipdev.lndo.site',
		'pewresearch-org-alpha.go-vip.net',
		'pewresearch-org-alpha.go-vip.co',
		'pewresearch-org-beta.go-vip.co',
		'pewresearch-org-beta.go-vip.net',
		'prc-local.vipdev.lndo.site',
	);

	if ( in_array( $host, $replace_hosts, true ) ) {
		$host = 'www.pewresearch.org';
	}

	$path = $parts['path'] ?? '/';
	if ( preg_match( '#^/pewresearch-org(/|$)#', $path ) ) {
		$path = preg_replace( '#^/pewresearch-org#', '', $path );
		if ( '' === $path ) {
			$path = '/';
		}
	}

	$scheme   = $parts['scheme'] ?? 'https';
	$port     = isset( $parts['port'] ) ? ':' . (int) $parts['port'] : '';
	$userpass = '';
	if ( ! empty( $parts['user'] ) ) {
		$userpass = $parts['user'];
		if ( isset( $parts['pass'] ) ) {
			$userpass .= ':' . $parts['pass'];
		}
		$userpass .= '@';
	}

	$query    = isset( $parts['query'] ) ? '?' . $parts['query'] : '';
	$fragment = isset( $parts['fragment'] ) ? '#' . $parts['fragment'] : '';

	return $scheme . '://' . $userpass . $host . $port . $path . $query . $fragment;
}

/**
 * Quick helper function for wp-admin to determine the current post type.
 *
 * @return string|null The current post type or null if not found.
 */
function get_wp_admin_current_post_type() {
	global $post, $typenow, $current_screen;

	if ( $post && $post->post_type ) {
		return $post->post_type;

	} elseif ( $typenow ) {
		return $typenow;

	} elseif ( $current_screen && $current_screen->post_type ) {
		return $current_screen->post_type;

	} elseif ( isset( $_REQUEST['post_type'] ) ) {
		return sanitize_key( $_REQUEST['post_type'] );
	}

	return null;
}

/**
 * Check if the current request is from Googlebot.
 *
 * @return bool
 */
function is_google_bot() {
	if ( strpos( $_SERVER['HTTP_USER_AGENT'], 'Googlebot' ) !== false ) {
		return true;
	}
	return false;
}

/**
 * Check if the current request is from GPTBot.
 *
 * @return bool
 */
function is_gpt_bot() {
	if ( strpos( $_SERVER['HTTP_USER_AGENT'], 'GPTBot' ) !== false ) {
		return true;
	}
	return false;
}

/**
 * Check if the current request is from a bot.
 *
 * @return bool
 */
function is_bot() {
	if ( is_google_bot() || is_gpt_bot() ) {
		return true;
	}
	return false;
}

/**
 * Check if the current request is from Facebook.
 *
 * @return bool
 */
function is_facebook_request() {
	if (
		strpos( $_SERVER['HTTP_USER_AGENT'], 'facebookexternalhit/' ) !== false ||
		strpos( $_SERVER['HTTP_USER_AGENT'], 'facebookcatalog/1.0' ) !== false
	) {
		return true;
	}
	return false;
}

/**
 * Check if the current request is from Twitter.
 *
 * @return bool
 */
function is_twitter_request() {
	if (
		strpos( $_SERVER['HTTP_USER_AGENT'], 'Twitterbot' ) !== false
	) {
		return true;
	}
	return false;
}

/**
 * Check if the current page is an index page.
 *
 * @param bool $include_search Whether to include search pages.
 * @return bool
 */
function is_index( $include_search = false ) {
	$return = false;
	if ( is_home() || is_archive() || is_tax() ) {
		$return = true;
	} else {
		$return = false;
	}
	if ( true === $include_search && is_search() ) {
		$return = true;
	}
	return $return;
}

/**
 * Check if the current page is a publication page.
 *
 * @return bool
 */
function is_publications() {
	return is_home();
}

/**
 * Log an error to the error log and optionally to New Relic.
 *
 * @param mixed $error The error to log (string, WP_Error, Throwable).
 * @return mixed $error The error that was logged.
 */
function log_error( $error ) {
	$message = '';
	if ( $error instanceof \WP_Error ) {
		$message = $error->get_error_message();
		$code    = $error->get_error_code();
	} else {
		if ( $error instanceof \Throwable ) {
			$message = $error->getMessage();
			$code    = $error->getCode();
		} elseif ( is_string( $error ) ) {
			$message = $error;
			$code    = 0;
		} else {
			$message = 'Unknown error';
			$code    = 0;
		}
	}

	do_action(
		'qm/debug',
		'LOG_ERROR:' . print_r(
			array(
				'message' => $message,
				'code'    => $code,
			),
			true
		)
	);

	if ( extension_loaded( 'newrelic' ) && function_exists( 'newrelic_notice_error' ) ) {
		if ( $error instanceof \Throwable ) {
			\newrelic_notice_error( $error );
		} else {
			\newrelic_notice_error( $message, $code );
		}
	} else {
		error_log( print_r( $error, true ) );
	}

	return $error;
}

/**
 * Get a list of countries, US states, or industries.
 *
 * @param string $list_of 'countries' | 'us-states' | 'countries-and-regions' | 'industries'
 * @return array $list
 */
function get_list_of( $list_of = null ) {
	$country_state = new CountryState();
	if ( 'us-states' === $list_of ) {
		$list = $country_state->getStates( 'US' );
		$tmp  = array();
		foreach ( $list as $value => $label ) {
			$tmp[] = array(
				'label' => $label,
				'value' => $value,
			);
		}
		return $tmp;
	} elseif ( 'countries' === $list_of ) {
		$list = $country_state->getCountries();
		$tmp  = array();
		foreach ( $list as $value => $label ) {
			$tmp[] = array(
				'label' => $label,
				'value' => $value,
			);
		}
		return $tmp;
	} elseif ( 'countries-and-regions' === $list_of ) {
		$list = $country_state->getCountries();

		$excluded_countries = array( 'AX', 'BL', 'BV', 'CC', 'CD', 'CW', 'CX', 'HM', 'IO', 'KN', 'LC', 'MF', 'PM', 'PN', 'RE', 'SJ', 'ST', 'TF', 'UM', 'VC', 'XK' );
		$list               = array_diff_key( $list, array_flip( $excluded_countries ) );

		$tmp = array(
			array(
				'label' => 'Global total',
				'value' => 'Global total',
			),
			array(
				'label' => 'All Asia-Pacific',
				'value' => 'All Asia-Pacific',
			),
			array(
				'label' => 'All Europe',
				'value' => 'All Europe',
			),
			array(
				'label' => 'All Latin America-Caribbean',
				'value' => 'All Latin America-Caribbean',
			),
			array(
				'label' => 'All Middle East-North Africa',
				'value' => 'All Middle East-North Africa',
			),
			array(
				'label' => 'All North America',
				'value' => 'All North America',
			),
			array(
				'label' => 'All sub-Saharan Africa',
				'value' => 'All sub-Saharan Africa',
			),
			array(
				'label' => 'Democratic Republic of the Congo',
				'value' => 'DRC',
			),
		);
		foreach ( $list as $value => $label ) {
			$tmp[] = array(
				'label' => $label,
				'value' => $label,
			);
		}
		return $tmp;
	} elseif ( 'industries' === $list_of ) {
		return array(
			array(
				'label' => 'Agriculture',
				'value' => 'agriculture',
			),
			array(
				'label' => 'Automotive',
				'value' => 'automotive',
			),
			array(
				'label' => 'Construction',
				'value' => 'construction',
			),
			array(
				'label' => 'Education',
				'value' => 'education',
			),
			array(
				'label' => 'Finance',
				'value' => 'finance',
			),
			array(
				'label' => 'Healthcare',
				'value' => 'healthcare',
			),
			array(
				'label' => 'Hospitality',
				'value' => 'hospitality',
			),
			array(
				'label' => 'Manufacturing',
				'value' => 'manufacturing',
			),
			array(
				'label' => 'Media',
				'value' => 'media',
			),
			array(
				'label' => 'Nonprofit',
				'value' => 'nonprofit',
			),
			array(
				'label' => 'Real Estate',
				'value' => 'real-estate',
			),
			array(
				'label' => 'Retail',
				'value' => 'retail',
			),
			array(
				'label' => 'Technology',
				'value' => 'technology',
			),
			array(
				'label' => 'Transportation',
				'value' => 'transportation',
			),
			array(
				'label' => 'Other',
				'value' => 'other',
			),
		);
	} else {
		return array();
	}
}

/**
 * Device Detection.
 * Powered by: https://github.com/Automattic/jetpack-device-detection
 *
 * @return array $device_info array(
 *  'is_phone'            => (bool) Whether the current device is a mobile phone.
 *  'is_smartphone'       => (bool) Whether the current device is a smartphone.
 *  'is_tablet'           => (bool) Whether the current device is a tablet device.
 *  'is_handheld'         => (bool) Whether the current device is a handheld device.
 *  'is_desktop'          => (bool) Whether the current device is a laptop / desktop device.
 *  'platform'            => (string) Detected platform.
 *  'is_phone_matched_ua' => (string) Matched UA.
 * );
 */
function get_devices() {
	if ( class_exists( '\Automattic\Jetpack\Device_Detection' ) ) {
		return \Automattic\Jetpack\Device_Detection::get_info();
	} else {
		return array(
			'is_phone'      => false,
			'is_smartphone' => false,
			'is_tablet'     => false,
			'is_handheld'   => false,
			'is_desktop'    => true,
		);
	}
}

/**
 * Get the current device type.
 *
 * @return string 'mobile' | 'tablet' | 'desktop'
 */
function get_current_device() {
	$devices = get_devices();
	return $devices['is_phone'] ? 'mobile' : ( $devices['is_tablet'] ? 'tablet' : 'desktop' );
}

/**
 * Get the ISO 3166-1 alpha-2 country code from a country name.
 *
 * Uses the DougSisk\CountryState library to look up country codes.
 * Returns the lowercase two-letter country code for use with flag-icons library.
 *
 * @param string $country_name The country name to look up (e.g., "Argentina", "United States").
 * @return string|null The lowercase ISO 3166-1 alpha-2 code (e.g., "ar", "us"), or null if not found.
 */
function get_country_code_from_name( string $country_name ): ?string {
	$country_state = new CountryState();
	$countries     = $country_state->getCountries();
	$normalized    = strtolower( trim( $country_name ) );

	$abbreviation_map = array(
		'us'   => 'United States',
		'u.s.' => 'United States',
		'u.s'  => 'United States',
		'usa'  => 'United States',
		'uk'   => 'United Kingdom',
		'u.k.' => 'United Kingdom',
		'u.k'  => 'United Kingdom',
	);

	if ( array_key_exists( $normalized, $abbreviation_map ) ) {
		$normalized = strtolower( $abbreviation_map[ $normalized ] );
	}

	foreach ( $countries as $code => $name ) {
		if ( strtolower( $name ) === $normalized || strtolower( $code ) === $normalized ) {
			return strtolower( $code );
		}
	}

	return null;
}

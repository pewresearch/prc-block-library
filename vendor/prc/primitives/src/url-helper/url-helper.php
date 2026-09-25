<?php
/**
 * PRC URL Helper
 *
 * Resolves any WordPress URL — preview link, wp-admin edit link, or canonical
 * post URL — to the corresponding post ID.
 *
 * @package PRC\Primitives\URL_Helper
 * @license GPL-2.0-or-later
 */

namespace PRC\Primitives\URL_Helper;

use WP_Error;

if ( ! class_exists( '\\PRC\\Primitives\\URL_Helper\\URL_Helper' ) ) {

	/**
	 * URL Helper.
	 *
	 * Whether it is a preview link, an edit link, or a published post link,
	 * URL_Helper resolves it to the underlying post ID.
	 */
	class URL_Helper {
		/**
		 * The URL.
		 *
		 * @var string|null
		 */
		public $url = null;

		/**
		 * The resolved post ID (or WP_Error on failure).
		 *
		 * @var int|WP_Error|null
		 */
		public $post_id = null;

		/**
		 * Determine whether a URL is valid and, if so, resolve its post ID.
		 *
		 * @param string $url The URL to check.
		 */
		public function __construct( string $url ) {
			if ( ! is_string( $url ) ) {
				return new WP_Error( '404', 'No url in data, this is not a string' );
			}
			if ( ! filter_var( $url, FILTER_VALIDATE_URL ) ) {
				return new WP_Error( '404', 'No url in data, this is not a valid url' );
			}
			$this->url     = $url;
			$this->post_id = $this->get_post_id();
		}

		/**
		 * Get the post ID from the URL.
		 *
		 * @return int|WP_Error The post ID, or WP_Error if it cannot be resolved.
		 */
		public function get_post_id() {
			if ( null === $this->url ) {
				return new WP_Error( '404', 'No url in data' );
			}
			$url = $this->url;

			$post_id   = false;
			$operation = 'n/a';

			if ( $this->is_preview_link( $url ) ) {
				$operation = 'is_preview_link()';
				$post_id   = $this->get_post_id_from_preview_link( $url );
			} elseif ( $this->is_wp_admin_edit_link( $url ) ) {
				$operation = 'is_wp_admin_edit_link()';
				$post_id   = $this->get_post_id_from_edit_link( $url );
			} elseif ( $this->is_published_post_link( $url ) ) {
				$operation = 'is_published_post_link()';
				$post_id   = $this->get_post_id_from_published_link( $url );
			}

			if ( false === $post_id ) {
				return new WP_Error( '404', \wp_sprintf( 'Post ID could not be found using URL_Helper using op: %s & url: %s', $operation, $url ) );
			}

			return $post_id;
		}

		/**
		 * Resolve a URL to a post ID using VIP's helper when available, falling
		 * back to WordPress core's `url_to_postid()` otherwise.
		 *
		 * @param string $url The URL to resolve.
		 * @return int Post ID, or 0 if no match.
		 */
		private function url_to_postid( $url ) {
			if ( function_exists( '\\wpcom_vip_url_to_postid' ) ) {
				return \wpcom_vip_url_to_postid( $url );
			}
			return \url_to_postid( $url );
		}

		/**
		 * Parse the URL for query parameters.
		 *
		 * @param string $url The URL to parse.
		 * @return array|false Parsed parameters, or false if the URL is malformed.
		 */
		private function parse_url_for_params( $url ) {
			$parts = wp_parse_url( $url );
			if ( false === $parts ) {
				return false;
			}
			if ( ! array_key_exists( 'query', $parts ) ) {
				return array();
			}
			$params = array();
			wp_parse_str( $parts['query'], $params );
			return $params;
		}

		/**
		 * Check whether the URL is a preview link (`?preview=true`).
		 *
		 * @param string $url The URL to check.
		 * @return bool
		 */
		private function is_preview_link( $url ) {
			$params = $this->parse_url_for_params( $url );
			if ( array_key_exists( 'preview', $params ) ) {
				return $params['preview'];
			}
			return false;
		}

		/**
		 * Check whether the URL is a wp-admin edit link (`?action=edit`).
		 *
		 * @param string $url The URL to check.
		 * @return bool
		 */
		private function is_wp_admin_edit_link( $url ) {
			$params = $this->parse_url_for_params( $url );
			if ( array_key_exists( 'action', $params ) && 'edit' === $params['action'] ) {
				return true;
			}
			return false;
		}

		/**
		 * Check whether the URL is a published post link.
		 *
		 * @param string $url The URL to check.
		 * @return bool
		 */
		private function is_published_post_link( $url ) {
			$check = $this->url_to_postid( $url );
			if ( 0 === $check ) {
				return false;
			}
			return true;
		}

		/**
		 * Pull the post ID out of a preview link's query string.
		 *
		 * @param string $url The URL to inspect.
		 * @return int|false
		 */
		private function get_post_id_from_preview_link( $url ) {
			$params = $this->parse_url_for_params( $url );
			if ( array_key_exists( 'preview_id', $params ) ) {
				return (int) $params['preview_id'];
			} elseif ( array_key_exists( 'p', $params ) ) {
				return (int) $params['p'];
			}
			return false;
		}

		/**
		 * Pull the post ID out of a wp-admin edit link's query string.
		 *
		 * @param string $url The URL to inspect.
		 * @return int|false
		 */
		private function get_post_id_from_edit_link( $url ) {
			$params = $this->parse_url_for_params( $url );
			if ( array_key_exists( 'post', $params ) ) {
				return (int) $params['post'];
			}
			return false;
		}

		/**
		 * Resolve a published post link to its post ID.
		 *
		 * @param string $url The URL to resolve.
		 * @return int Post ID, or 0 if no match.
		 */
		private function get_post_id_from_published_link( $url ) {
			return $this->url_to_postid( $url );
		}
	}
}

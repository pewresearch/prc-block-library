<?php
/**
 * API class for Table block
 *
 * @package PRC\Platform\Blocks\Table;
 * @author Aki Hamano, Seth Rubenstein
 * @license GPL-2.0+
 */

namespace PRC\Platform\Blocks\Table;

use WP_Error;
use WP_REST_Response;

/**
 * API class for Table block
 *
 * @package PRC\Platform\Blocks\Table;
 * @author Aki Hamano, Seth Rubenstein
 * @license GPL-2.0+
 */
class API {
	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the class
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'rest_api_init', $this, 'register_routes' );
		}
	}

	/**
	 * Register REST API routes
	 */
	public function register_routes() {
		register_rest_route(
			FTB_NAMESPACE . '/v1',
			'/options',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_options' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'update_options' ),
					'permission_callback' => function () {
						$show_global_setting = get_option( FTB_OPTION_PREFIX . '_show_global_setting', Settings::OPTIONS['show_global_setting']['default'] );

						if ( $show_global_setting ) {
							return current_user_can( 'edit_posts' );
						} else {
							return current_user_can( 'administrator' );
						}
					},
				),
				array(
					'methods'             => 'DELETE',
					'callback'            => array( $this, 'delete_options' ),
					'permission_callback' => function () {
						$show_global_setting = get_option( FTB_OPTION_PREFIX . '_show_global_setting', Settings::OPTIONS['show_global_setting']['default'] );

						if ( $show_global_setting ) {
							return current_user_can( 'edit_posts' );
						} else {
							return current_user_can( 'administrator' );
						}
					},
				),
			)
		);
	}

	/**
	 * Get options
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_options() {
		$options              = Settings::get_options();
		$options['block_css'] = Helper::minify_css( Helper::get_block_css( '.editor-styles-wrapper ' ) );
		return rest_ensure_response( $options );
	}

	/**
	 * Update options
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public function update_options( $request ) {
		$params = $request->get_json_params();

		// Sanitize option values.
		foreach ( $params as $key => $value ) {
			if ( ! array_key_exists( $key, Settings::OPTIONS ) ) {
				continue;
			}

			if ( 'boolean' === Settings::OPTIONS[ $key ]['type'] ) {
				$value = $value ? 1 : 0;
			}

			if ( 'array' === Settings::OPTIONS[ $key ]['type'] ) {
				if ( ! is_array( $value ) ) {
					continue;
				}

				$new_value = array();
				foreach ( $value as $array_key => $array_value ) {
					if ( isset( Settings::OPTIONS[ $key ]['default'][ $array_key ] ) ) {
						$new_value[ $array_key ] = $array_value;
					}
				}
			}

			if ( isset( Settings::OPTIONS[ $key ]['range'] ) ) {
				$min   = Settings::OPTIONS[ $key ]['range']['min'];
				$max   = Settings::OPTIONS[ $key ]['range']['max'];
				$value = min( max( $value, $min ), $max );
			}

			if ( is_wp_error( $value ) ) {
				return rest_ensure_response(
					array(
						'status'  => 'error',
						'message' => $value->get_error_message(),
					)
				);
			} else {
				update_option( FTB_OPTION_PREFIX . '_' . $key, $value );
			}
		}

		return rest_ensure_response(
			array(
				'status'    => 'success',
				'message'   => __( 'Global setting saved.', 'flexible-table-block' ),
				'block_css' => Helper::minify_css( Helper::get_block_css( '.editor-styles-wrapper ' ) ),
			)
		);
	}

	/**
	 * Delete options
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public function delete_options() {
		foreach ( Settings::OPTIONS as $key => $value ) {
			delete_option( FTB_OPTION_PREFIX . '_' . $key );
		}

		return rest_ensure_response(
			array(
				'options'   => Settings::get_options(),
				'status'    => 'success',
				'message'   => __( 'Global setting restored.', 'flexible-table-block' ),
				'block_css' => Helper::minify_css( Helper::get_block_css( '.editor-styles-wrapper ' ) ),
			)
		);
	}
}

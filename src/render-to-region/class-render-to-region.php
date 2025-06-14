<?php
/**
 * Render To Region
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Render To Region
 * Description:       This block allows other blocks to &quot;render to&quot; this defined region upon certain conditions.
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Render_To_Region {
	public static $option_key = 'prc_block__render_to_regions';

	public $defined_regions = array();

	public $requested_regions = array();

	public $region_attach_ids = array();

	/**
	 * Constructor
	 *
	 * @param object $loader The loader object
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param object $loader The loader object
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_action( 'render_block', $this, 'add_region_attribute_to_block_wrapper', 10, 2 );
			$loader->add_filter( 'prc_api_endpoints', $this, 'define_regions_api_endpoint', 10, 1 );
		}
	}

	/**
	 * Register the post meta
	 */
	public function register_post_meta() {
		\register_post_meta(
			'',
			'prc_block__render_to_regions',
			array(
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type' => 'string',
						),
					),
				),
				'single'       => true,
				'type'         => 'array',
				'default'      => array(),
			)
		);
	}

	/**
	 * Schedule the update of the post meta with the regions.
	 *
	 * @hook prc_platform_on_incremental_save
	 *
	 * @param object $post The post object
	 */
	public function schedule_update_post_meta_with_regions( $post ) {
		as_enqueue_async_action(
			'prc_platform_on_render_to_region_update',
			array(
				'post_id' => $post->ID,
			)
		);
	}

	/**
	 * Get the regions.
	 *
	 * @return array The regions.
	 */
	public function get_regions() {
		$regions = get_option( self::$option_key, array() );
		if ( empty( $regions ) ) {
			return array(
				'template-name' => array(
					'region-1',
					'region-2',
				),
				'single'        => array(
					'test',
				),
			);
			return array();
		}
		return $regions;
	}

	/**
	 * Get the regions for the template.
	 *
	 * @param string $template_name The template name.
	 * @return array The regions.
	 */
	public function get_regions_for_template( $template_name ) {
		$regions = $this->get_regions();
		return $regions[ $template_name ] ?? array();
	}

	/**
	 * Get the regions for the post.
	 *
	 * @param int $post_id The post ID.
	 * @return array The regions.
	 */
	public function get_regions_for_post( $post_id ) {
		$post_template = get_post_meta( $post_id, '_wp_template', true );
		if ( ! $post_template ) {
			$post_template = 'single';
		}
		return $this->get_regions_for_template( $post_template );
	}

	/**
	 * Get the regions for the restfully.
	 *
	 * @param object $rest_request The rest request.
	 * @return array The regions.
	 */
	public function get_regions_for_restfully( $rest_request ) {
		$post_id       = $rest_request->get_param( 'post' );
		$template_name = $rest_request->get_param( 'template' );
		if ( $post_id ) {
			return $this->get_regions_for_post( $post_id );
		}
		if ( $template_name ) {
			return $this->get_regions_for_template( $template_name );
		}
		return null;
	}

	/**
	 * Define the regions API endpoint.
	 *
	 * @hook prc_api_endpoints
	 *
	 * @param array $endpoints The endpoints.
	 * @return array The endpoints.
	 */
	public function define_regions_api_endpoint( $endpoints ) {
		array_push(
			$endpoints,
			array(
				'route'               => 'render-to-regions',
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_regions_for_restfully' ),
				'args'                => array(
					'post'     => array(
						'type'     => 'integer',
						'required' => false,
					),
					'template' => array(
						'type'     => 'string',
						'required' => false,
					),
				),
				'permission_callback' => function () {
					return true;
				},
			)
		);
		return $endpoints;
	}

	/**
	 * Add the region attribute to the block wrapper.
	 *
	 * @hook render_block
	 *
	 * @param string $block_content The block content
	 * @param array  $block The block
	 * @return string
	 */
	public function add_region_attribute_to_block_wrapper( $block_content, $block ) {
		$attributes = $block['attrs'];
		if ( ! isset( $attributes['metadata'] ) ) {
			return $block_content;
		}
		$metadata = $attributes['metadata'];
		if ( ! isset( $metadata['regionName'] ) ) {
			return $block_content;
		}
		$region_name               = $metadata['regionName'];
		$this->requested_regions[] = $region_name;

		$region_attach_id                        = wp_unique_id( 'region-attach-id-' );
		$this->region_attach_ids[ $region_name ] = $region_attach_id;

		if ( ! in_array( $region_name, $this->defined_regions ) ) {
			do_action(
				'qm/warning', // phpcs:ignore WordPress.NamingConventions.ValidHookName.UseUnderscores
				sprintf( 'Render To Region: Region name %s is not defined.', $region_name ),
			);
			return $block_content;
		}

		$tag_processor = new \WP_HTML_Tag_Processor( $block_content );
		$tag_processor->set_attribute( 'data-wp-init--render-to-region', 'prc-block/render-to-region::callbacks.onMount' );
		$tag_processor->set_attribute( 'data-wp-watch--render-to-region', 'prc-block/render-to-region::callbacks.onUpdate' );
		$tag_processor->set_attribute( 'data-prc-block--render-to-region--name', $region_name );
		$tag_processor->set_attribute( 'data-prc-block--render-to-region--attach-id', $region_attach_id );

		$block_content = $tag_processor->get_updated_html();

		// Add some additional html right after the block that can be used to "re-attach" the block when it is no longer needed in the active region.
		$block_content .= '<div class="prc-block-render-to-region__re-attach"
		data-prc-block--render-to-region--block-name="' . esc_attr( $block['name'] ) . '"
		data-prc-block--render-to-region--name="' . esc_attr( $region_name ) . '"
		data-prc-block--render-to-region--attach-id="' . esc_attr( $region_attach_id ) . '"></div>';

		return $block_content;
	}

	/**
	 * Render the block render to region.
	 *
	 * @param array  $attributes Block attributes
	 * @param string $content Block content
	 * @param array  $block WP_Block object
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$region_name = $attributes['metadata']['regionName'];
		if ( ! $region_name ) {
			return $content;
		}
		$this->defined_regions[] = $region_name;

		// Blocks will check if the region has already been defined and rendered, if so, we'll throw a qm debug warning message and stop rendering again.
		if ( in_array( $region_name, $this->defined_regions ) ) {
			do_action(
				'qm/warning', // phpcs:ignore WordPress.NamingConventions.ValidHookName.UseUnderscores
				sprintf(
					'Render To Region: Region name %s is already defined.',
					$region_name,
				),
			);
			return '<!-- Render To Region: Region name "' . $region_name . '" is already defined. -->';
		}

		$state = wp_interactivity_state(
			'prc-block/render-to-region',
			array(
				'regionName'  => $region_name,
				'attachedIds' => $this->region_attach_ids[ $region_name ],
			)
		);

		$tag_processor = new \WP_HTML_Tag_Processor( $content );
		$tag_processor->set_attribute( 'data-wp-interactive', 'prc-block/render-to-region' );
		$tag_processor->set_attribute( 'data-wp-init', 'callbacks.onRegionMount' );
		$tag_processor->set_attribute( 'data-wp-watch', 'callbacks.onRegionUpdate' );
		$content = $tag_processor->get_updated_html();

		return $content;
	}

	/**
	 * Registers the block using the block manifest (if registered). Fails over to the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/render-to-region',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
		$this->register_post_meta();
	}
}

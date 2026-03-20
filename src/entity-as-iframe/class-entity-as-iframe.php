<?php
/**
 * Entity As Iframe Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Render Entity as Iframe
 * Description:       Confusing name aside, this block allows you to render any entity (post, page, etc) as an IFRAME. Additionally, utilizing the interacitivty api you can toggle an on or off state.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Entity_As_Iframe {
	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Render callback for the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		$ref = array_key_exists( 'ref', $attributes ) ? (int) $attributes['ref'] : false;

		// What we need to do... is tap into the embeds system and isntead of rendering the content directly we need to render the url for this ref as an iframe with the /iframe endpoint.
		$url = get_permalink( $ref );

		if ( ! $url ) {
			return '<pre class="prc-platform-message__warning__not-found">No entity found</pre>';
		}

		$iframe_id  = wp_unique_id( 'prc-entity-iframe-' );
		$iframe_url = trailingslashit( $url ) . 'iframe/';
		// Check if the entity has a set height, otherwise default to 500px.
		$iframe_height = get_post_meta( $ref, 'iframe_height', true ) ?: 500;
		$iframe_height = $iframe_height . 'px';

		// @TODO figure out how to add external non module dependencies...
		wp_enqueue_script( 'prc-platform-iframe-embeds-resizer-script' );

		wp_interactivity_state(
			'prc-block/entity-as-iframe',
			array(
				$iframe_id => array(
					'isActive' => false,
					'resizer'  => null,
				),
			)
		);

		$iframe_content = wp_sprintf(
			'<iframe id="%1$s" data-wp-bind--src="context.src" height="%3$s" width="100%%" scrolling="no" frameborder="0"></iframe>',
			$iframe_id,
			$iframe_url,
			$iframe_height,
		);

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'data-ref-id'                => $ref,
				'data-wp-interactive'        => wp_json_encode(
					array(
						'namespace' => 'prc-block/entity-as-iframe',
					)
				),
				'data-wp-context'            => wp_json_encode(
					array(
						'id'  => $iframe_id,
						'url' => $iframe_url,
						'src' => '',
					)
				),
				'data-wp-watch--on-activate' => 'callbacks.onActivate',
				'data-wp-class--is-active'   => 'callbacks.isActive',
			)
		);

		return wp_sprintf(
			'<div %1$s data-iframe-height>%2$s %3$s</div>',
			$block_wrapper_attrs,
			$placeholder,
			$iframe_content,
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/entity-as-iframe',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}

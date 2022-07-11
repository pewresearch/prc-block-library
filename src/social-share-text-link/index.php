<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class PRC_Social_Share_Text_Link extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Renders the `prc-block/menu-link` block.
	 *
	 * @param array $attributes The block attributes.
	 * @param array $content The saved content.
	 * @param array $block The parsed block.
	 *
	 * @return string Returns the post content with the legacy widget added.
	 */
	public function render_social_share_text_link( $attributes, $content, $block ) {
		// Don't render the block's subtree if it has no label.
		if ( empty( $attributes['label'] ) ) {
			return '';
		}

		if ( ! is_object( $block ) ) {
			return '';
		}

		// Don't render the block's subtree if it has no label.
		if ( empty( $attributes['label'] ) ) {
			return '';
		}

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class'  => classNames(),
				'href'   => isset( $attributes['url'] ) ? esc_url( $attributes['url'] ) : false,
				'rel'    => 'nofollow',
				'target' => isset( $attributes['opensInNewTab'] ) && true === $attributes['opensInNewTab'] ? '_blank' : false,
			)
		);

		// End appending HTML attributes to anchor tag.
		// Start anchor tag content.
		$html = '<a ' . $wrapper_attributes . '>';

		if ( isset( $attributes['label'] ) ) {
			$html .= wp_kses(
				$attributes['label'],
				array(
					'code'   => array(),
					'em'     => array(),
					'img'    => array(
						'scale' => array(),
						'class' => array(),
						'style' => array(),
						'src'   => array(),
						'alt'   => array(),
					),
					's'      => array(),
					'span'   => array(
						'style' => array(),
					),
					'strong' => array(),
				)
			);
		}

		$html .= '</a>';

		return normalize_whitespace( $html );
	}

	/**
	 * Register the menu link block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'social-share-text-link',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/social-share-text-link',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style' => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_social_share_text_link' ),
			)
		);
	}
}

new PRC_Social_Share_Text_Link( true );

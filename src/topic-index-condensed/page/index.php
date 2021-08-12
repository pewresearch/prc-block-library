<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio;

class Topic_Index_Condensed_Page extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Render callback for prc-block/topic-index-condensed-page
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_page_placeholder( $attributes, $content, $block ) {
		if ( ! array_key_exists( 'heading', $attributes ) || ! $attributes['heading'] ) {
			return $content;
		}
		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'class'     => classNames(
					'item',
					array(
						'active' => sanitize_title( $attributes['heading'] ) === get_query_var( 'menuItem', false ), 
					)
				),
				'data-uuid' => $attributes['uuid'],
			)
		);
		ob_start();
		?>
		<div <?php echo $block_wrapper_attrs; ?>>
			<h2 class="ui header"><a href="<?php echo esc_url( $attributes['url'] ); ?>"><?php echo filter_block_kses_value( $attributes['heading'], 'post' ); ?></a></h2>
			<?php echo wp_kses( $content, 'post' ); ?>
		</div><!--/.wp-block-prc-block-topic-index-condensed-page-->
		<?php
		return ob_get_clean();
	}

	/**
	 * Register the prc-block/topic-index-condensed-page block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'topic-index-condensed-page',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . 'page',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_page_placeholder' ),
			)
		);
	}
}

new Topic_Index_Condensed_Page( true );

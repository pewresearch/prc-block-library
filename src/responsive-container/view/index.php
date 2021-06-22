<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\EnqueueNew;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Responsive_Container_View extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$min = array_key_exists(
			'min',
			$attributes
		) && 0 !== $attributes['min'] ? $attributes['min'] : null;
		$max = array_key_exists(
			'max',
			$attributes
		) && 0 !== $attributes['max'] ? $attributes['max'] : null;

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'       => array_key_exists( 'id', $attributes ) ? $attributes['id'] : md5( wp_json_encode( $block ) ),
				'data-min' => esc_attr( $min ),
				'data-max' => esc_attr( $max ),
			)
		);

		$allowed_html = wp_kses_allowed_html( 'post' );
		if ( is_array( $allowed_html ) ) {
			$allowed_html['style']        = true;
			$allowed_html['div']['style'] = true;
		}
		
		ob_start();
		?>
		<div <?php echo $wrapper_attributes; ?> style="display: none;">
			<?php echo wp_kses( $content, $allowed_html ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$enqueue = new EnqueueNew( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'responsive-container-view',
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
			plugin_dir_path( __DIR__ ) . 'view',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'editor_style'    => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Responsive_Container_View( true );

<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Topic_Index_Categorized extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function register_frontend() {
		$js_deps = array( 'wp-dom-ready' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.1', 'plugin', parent::$plugin_file );
		return $enqueue->register(
			'frontend',
			'topic-index-categorized',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function enqueue_frontend() {
		$registered    = $this->register_frontend();
		$script_handle = array_pop( $registered['js'] )['handle'];
		wp_enqueue_script( $script_handle );
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$heading = array_key_exists( 'heading', $attributes ) ? $attributes['heading'] : null;
		$url     = array_key_exists( 'url', $attributes ) ? $attributes['url'] : null;
		ob_start();
		?>
		<div class="">
			<h2 class="sans-serif"><a href="<?php echo esc_url( $url ); ?>"><?php echo filter_block_kses_value( $heading, 'post' ); ?> <i class="chevron right icon"></i></a></h2>
			<?php echo wp_kses( $content, 'post' ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$block_editor_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue              = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.1', 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'topic-index-categorized',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_editor_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/topic-index-categorized',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Topic_Index_Categorized( true );

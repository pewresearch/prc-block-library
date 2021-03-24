<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Block_Name extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function register_frontend() {
		$js_deps = array( 'wp-dom-ready', 'wp-element', 'wp-api-fetch' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', parent::$plugin_file );
		return $enqueue->register(
			'frontend',
			'topic-index-search-field',
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
		$this->enqueue_frontend();
		ob_start();
		print_r( $attributes );
		?>
			<div class="js-react-topic-index-search-field" data-term-id="<?php echo esc_attr( null ); ?>">Test</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$block_editor_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue              = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'topic-index-search-field',
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
			plugin_dir_path( __DIR__ ) . '/topic-index-search-field',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Block_Name( true );

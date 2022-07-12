<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/video-popup` block.
 *
 * @package gutenberg
 */

class Popup_Controller extends PRC_Block_Library {
	public static $version = '1.0.1';
	public $vimeo_script_handle = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function makes_js_deps() {
		return array('vimeo-for-wordpress-player');
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$block_attrs = get_block_wrapper_attributes(array(
			'id' => md5($content),
		));
		ob_start();
		?>
		<div <?php echo $block_attrs; ?>>
			<?php echo apply_filters( 'the_content', $content ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$block = $enqueue->register(
			'blocks',
			'popup-controller',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		$frontend = $enqueue->register(
			'frontend',
			'popup-controller',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . 'controller',
			array(
				'editor_script'   => array_pop( $block['js'] )['handle'],
				'script' => array_pop( $frontend['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Popup_Controller( true );

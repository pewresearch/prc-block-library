<?php
use \WPackio;

/**
 * Server-side rendering of the `prc-block/github-gist` block.
 *
 * @package gutenberg
 */

class Github_Gist extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$block_wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id' => md5( wp_json_encode( $attributes ) ),
			)
		);
		ob_start();
		$src = $attributes['file'] ? "{$attributes['url']}.js?file={$attributes['file']}" : "{$attributes['url']}.js";
		?>
		 <div <?php echo $block_wrapper_attributes; ?>>
			<script src="<?php echo $src; ?>"></script>
			<?php echo wp_kses( $content, 'post' ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'github-gist',
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
			plugin_dir_path( __DIR__ ) . '/github-gist',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Github_Gist( true );

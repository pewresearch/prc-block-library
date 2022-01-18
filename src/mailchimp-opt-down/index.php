<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class MailChimp_Opt_Down extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		ob_start();
		?>
			<div <?php echo get_block_wrapper_attributes();?>></div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$block = $enqueue->register(
			'blocks',
			'mailchimp-opt-down',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		$frontend = $enqueue->register(
			'frontend',
			'mailchimp-opt-down',
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
			plugin_dir_path( __DIR__ ) . '/mailchimp-opt-down',
			array(
				'editor_script'   => array_pop( $block['js'] )['handle'],
				'editor_style'   => array_pop( $block['css'] )['handle'],
				'script' => array_pop( $frontend['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new MailChimp_Opt_Down( true );

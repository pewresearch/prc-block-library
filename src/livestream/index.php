<?php
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/livestream` block.
 *
 * @package gutenberg
 */

class Livestream extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes ) {
		$this->enqueue_frontend_assets();

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'               => md5( wp_json_encode( $attributes ) ),
				'class'            => classnames(
					$attributes['className'],
				),
				'data-stream-url'  => $attributes['streamUrl'],
				'data-chat-url'    => $attributes['chatUrl'],
			)
		);
		ob_start();
		?>
		<div <?php echo wp_kses($wrapper_attributes, 'post'); ?>>
			<div class='prc-livestream-stream'>
				<div class='ui fluid placeholder' style='height: 100%;'>
					<div class='image' style='height: 100%;'></div>
				</div>
			</div>
			<div class='prc-livestream-chat'>
				<div class='ui placeholder' style='width: 100%; height: 100%; min-height: 560px;'>
					<div class='paragraph'>
						<?php for ( $i = 0; $i < 30; $i++ ) : ?>
						<div class='line'></div>
						<?php endfor; ?>
					</div>
				</div>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
	public function enqueue_frontend_assets() {
		if ( is_admin() ) {
			return;
		}
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );
		$enqueue->enqueue(
			'frontend',
			'livestream',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'livestream',
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
			plugin_dir_path( __DIR__ ) . '/livestream',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Livestream( true );

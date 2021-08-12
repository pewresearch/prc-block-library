<?php
// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio;

/**
 * Server-side rendering of the `prc-block/collapsible` block.
 *
 * @package gutenberg
 */

class Collapsible extends PRC_Block_Library {
	public $frontend_script = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_frontend' ) );
		}
	}

	public function register_frontend() {
		$js_deps               = array( 'wp-dom-ready', 'wp-element', 'wp-i18n' );
		$enqueue               = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		$script                = $enqueue->register(
			'frontend',
			'collapsible',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$this->frontend_script = $script;
		// Add legacy support for shortcodes.
		add_filter(
			'prc_block_collapsible_frontend_shim',
			function() {
				return array_pop( $this->frontend_script['js'] )['handle'];
			}
		);
		return $script;
	}

	public function enqueue_frontend() {
		if ( is_admin() ) {
			return;
		}
		if ( false === $this->frontend_script || ! is_array( $this->frontend_script ) ) {
			$this->register_frontend();
		}
		$script_handle = array_pop( $this->frontend_script['js'] )['handle'];
		wp_enqueue_script( $script_handle );
	}

	public function render_collapsible_placeholder( $attributes, $content, $block ) {
		// No need to load this script in backend.
		if ( ! is_admin() ) {
			$this->enqueue_frontend();
		}
		$class_names = explode( ' ', array_key_exists( 'className', $attributes ) ? $attributes['className'] : '' );
		$alt_style   = false;
		if ( in_array( 'is-style-alternate', $class_names ) ) {
			$alt_style = true;
		}
		ob_start();
		?>
		<div class='js-react-collapsible' data-title="<?php echo esc_attr( $attributes['title'] ); ?>" data-style="<?php echo $alt_style ? 'is-style-alternate' : null; ?>">
			<?php echo wp_kses( $content, 'post' ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$block_editor_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue              = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'collapsible',
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
			plugin_dir_path( __DIR__ ) . '/collapsible',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_collapsible_placeholder' ),
			)
		);
	}
}

new Collapsible( true );

<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Core_Group extends PRC_Block_Library {
	public static $block_name = 'core/group';
	public static $version = '3.0.6';
	public static $styles = array(
		array(
			'name' => 'fluid',
			'label' => 'Fluid',
			'isDefault' => true,
		),
		array(
			'name' => '200-wide',
			'label' => '200px Wide',
		),
		array(
			'name' => '300-wide',
			'label' => '300px Wide',
		),
		array(
			'name' => '420-wide',
			'label' => '420px Wide',
		),
		array(
			'name' => '640-wide',
			'label' => '640px Wide',
		),
	);

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array($this, 'register_new_styles'), 0 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_script' ) );
			add_filter( 'render_block', array( $this, 'add_additional_frontend_styles' ), 10, 2 );
			add_shortcode( 'callout', array( $this, 'callout_shortcode_fallback' ) );
		}
	}

	/**
	 * Work In Progress: Registering block styles server side.
	 * @return void
	 */
	public function register_new_styles() {
		foreach( self::$styles as $style_args ) {
			register_block_style(
				self::$block_name,
				$style_args,
			);
		}
	}

	public function enqueue_assets( $js = true, $css = true ) {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );
		$enqueue->enqueue(
			'blocks',
			'group',
			array(
				'js'        => $js,
				'css'       => $css,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function add_additional_frontend_styles( $block_content, $block ) {
		if ( 'core/group' !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		$this->enqueue_assets(
			false,
			true
		);

		return $block_content;
	}

	/**
	 * For content in the legacy content editor
	 * fallback to using core/block when calling the [callout] shortcode.
	 */
	public function callout_shortcode_fallback( $attr, $content = null ) {
		$attr = wp_parse_args(
			$attr,
			array(
				'style' => false,
				'align' => false,
			)
		);

		ob_start();
		?>
		<!-- wp:group {<?php echo $attr['align'] ? '' : esc_attr( '"align":"' . substr( $attr['align'], 5 ) ); ?> "style":{"color":{"background":"#f7f7f1"}},"className":"is-style-callout <?php echo $attr['align'] ? '' : esc_attr( $attr['align'] ); ?>"} -->
		<div class="wp-block-group <?php echo $attr['align'] ? '' : esc_attr( $attr['align'] ); ?> is-style-callout has-background" style="background-color:#f7f7f1">
		%s
		</div>
		<!-- /wp:group -->
		<?php
		$block_content = ob_get_clean();
		$block_content = wp_sprintf( $block_content, do_shortcode( $content ) );
		$callout_block = parse_blocks( $block_content );
		$callout_block = render_block( $callout_block[1] );
		return $callout_block;
	}

	/**
	 * Enqueue a modification plugin for the core/group block and override the render_callback
	 *
	 * @uses Enqueue
	 */
	public function register_script() {
		$this->enqueue_assets( true, true );
	}
}

new Core_Group( true );

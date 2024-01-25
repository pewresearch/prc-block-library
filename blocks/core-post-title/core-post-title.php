<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Tag_Processor;

/**
 * Block Name:        Core Post-Title
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Post_Title {
	public static $block_json = null;
	public static $version;
	public static $block_name = 'core/post-title';
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;

	public function __construct($loader) {
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_new_styles', 0 );
			$loader->add_filter( 'render_block',  $this, 'render' , 100, 2 );
			$loader->add_filter( 'prc_block_styles', $this, 'print_style' );
		}
	}

	/**
	 * @hook prc_block_styles
	 * @param mixed $styles
	 * @return void
	 */
	public function print_style($styles) {
		ob_start();
		?>
		.prc-block-library-print-engine__cover-sheet .wp-block-post-title {
			font-size: 65px;
			line-height: 65px;
			padding-bottom: 10px;
			border-bottom: 3px solid black;
		}
		<?php
		return $styles . ob_get_clean();
	}

	public function render_post_title( $block_content, $block ) {
		if ( is_admin() ) {
			return $block_content;
		}
		$w = new WP_HTML_Tag_Processor( $block_content );
		if ( $w->next_tag() ) {
			// Add aria-level 1 for accessibility.
			$w->set_attribute( 'aria-level', '1' );
		}
		return $w;
	}

	/**
	 * @hook render_block
	 * @param mixed $block_content
	 * @param mixed $block
	 * @return mixed
	 */
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		return $this->render_post_title($block_content, $block);
	}

	/**
	 * Add aditional wp-block-post-title style
	 * @hook init
	 * @return void
	 * @throws LogicException
	 */
	public function register_new_styles() {
		ob_start();
		?>
		.wp-block-post-title.is-style-essay-title {
			font-size: 48px!important;
			line-height: 1.2!important;
		}
		<?php
		$style = normalize_whitespace( ob_get_clean() );
		register_block_style(
			'core/post-title',
			array(
				'name'         => 'essay-title',
				'label'        => __( 'Essay Title', 'prc-block-library' ),
				'inline_style' => $style,
			)
		);
	}

}


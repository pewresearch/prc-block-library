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
	public $block_json;
	public $version;
	public $block_name = 'core/post-title';
	public $view_style_handle;

	public function __construct($loader) {
		$this->block_json = prc_block_library_manifest('core-post-title');
		$this->version = $this->block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_assets', $this, 'register_style');
			$loader->add_filter( 'render_block',  $this, 'render' , 100, 2 );
			$loader->add_filter( 'prc_block_styles', $this, 'print_style' );
		}
	}

	/**
	* Register the block's assets.
	* @hook init
	*/
	public function register_assets() {
		$this->view_style_handle = register_block_style_handle( $this->block_json, 'style' );
		$this->register_new_styles();
	}


	/**
	* Register the block's style assets.
	* @hook enqueue_block_assets
	*/
	public function register_style() {
		wp_enqueue_style( $this->view_style_handle );
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
		wp_enqueue_style( $this->view_style_handle );
		$post_id = get_the_ID();
		$post_type = get_post_type( $post_id );
		$parent_id = wp_get_post_parent_id( $post_id );
		$w = new WP_HTML_Tag_Processor( $block_content );
		if ( $w->next_tag() ) {
			// Add aria-level 1 for accessibility.
			$w->set_attribute( 'aria-level', '1' );
			if ( 0 !== $parent_id ) {
				$w->set_attribute(
					'data-post-parent-id',
					$parent_id
				);
			}
			$w->set_attribute(
				'data-post-type',
				$post_type
			);
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
		if ( $this->block_name !== $block['blockName'] || is_admin() ) {
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


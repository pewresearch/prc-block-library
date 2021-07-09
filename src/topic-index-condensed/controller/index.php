<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\EnqueueNew;

class Topic_Index_Condensed_Controller extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_filter( 'query_vars', array( $this, 'register_query_vars' ), 20, 1 );
		}
	}

	public function register_query_vars( $qvars ) {
		$qvars[] = 'menuItem';
		return $qvars;
	}

	public function render_accordion_title( $label, $link, $uuid, $inner_blocks ) {
		ob_start();
		?>
		<div>
			<h2><?php echo $label; ?></h2>
			<div>
				<p><a href="<?php echo esc_url( $link ); ?>">Main <?php echo $label; ?> page</a></p>
				<?php 
				foreach ( $inner_blocks as $block ) {
					render_block( $block );
				}
				?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	public function render_mobile_accordion( $block ) {
		$page_items = $block->parsed_block['innerBlocks'][1]['innerBlocks'];
		ob_start();
		foreach ( $page_items as $page_item ) {
			echo $this->render_accordion_title( 
				$page_item['attrs']['heading'],
				$page_item['attrs']['url'],
				$page_item['attrs']['uuid'],
				$page_item['innerBlocks']
			);
		}
		return ob_get_clean();
	}

	/**
	 * Render callback for prc-block/topic-index-condensed-controller
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_controller_placeholder( $attributes, $content, $block ) {
		$this->enqueue_frontend();
		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'class' => 'ui grid',
			)
		);
		if ( jetpack_is_mobile() ) {
			return $this->render_mobile_accordion( $block );
		} 
		ob_start();
		?>
		<div <?php echo $block_wrapper_attrs; ?>>
			<?php echo wp_kses( $content, 'post' ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_frontend() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-url' );
		$enqueue = new EnqueueNew( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		return $enqueue->register(
			'frontend',
			'topic-index-condensed',
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
		wp_localize_script( $script_handle, 'prcTopicIndexCondensed', array( 'active' => get_query_var( 'menuItem', false ) ) );
		wp_enqueue_script( $script_handle );
	}

	/**
	 * Register the prc-block/grid block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new EnqueueNew( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'topic-index-condensed-controller',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . 'controller',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_controller_placeholder' ),
			)
		);
	}
}

new Topic_Index_Condensed_Controller( true );

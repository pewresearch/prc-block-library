<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Topic_Index_AZ_Controller extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		// get all the inner blocks columns and then all the innerblocks a-z blocks inside those columns and compute available a-z list.
		$az      = array( 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' );
		$present = array();
		foreach ( $block->inner_blocks as $block ) {
			foreach ( $block->inner_blocks as $row ) {
				foreach ( $row->inner_blocks as $column ) {
					foreach ( $column->inner_blocks as $az_block ) {
						$present[] = strtoupper( $az_block->attributes['letter'] );
					}
				}
			}
		}
		ob_start();
		?>
		<div class="ui secondary fluid menu">
		<?php
		foreach ( $az as $letter ) {
			$class = classnames( 'item', array( 'disabled' => ! in_array( $letter, $present ) ) );
			echo "<a href='#{$letter}' class='{$class}'>{$letter}</a>";
		}
		?>
		</div>
		<?php echo wp_kses( $content, 'post' ); ?>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$block_editor_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue              = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'topic-index-az-controller',
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
			plugin_dir_path( __DIR__ ) . '/topic-index-az-controller',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Topic_Index_AZ_Controller( true );

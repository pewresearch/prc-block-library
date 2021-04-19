<?php

// Require the composer autoload for getting conflict-free access to enqueue
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\Enqueue;

class ConvertHelper{
	static function getdata($contents)
	{
		$DOM = new DOMDocument;
		@$DOM->loadHTML($contents);
		$items = $DOM->getElementsByTagName('tr');
		$return = array();
		foreach ($items as $node) {
			$return[] = self::tdrows($node->childNodes);
		}
		return $return;
	}

	static function tdrows($elements)
	{
		$str = array();
		foreach ($elements as $element) {
			$str[] = $element->nodeValue;
		}

		return $str;
	}
}

class PRC_Chart_Builder_Data_Wrapper extends PRC_Block_Library {

	public function __construct( $init = false ) {
		if ( true === $init ) {
			// Do hooks here
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	private function cherry_pick_attr( $needle, $haystack ) {
		if ( array_key_exists( $needle, $haystack ) ) {
			return $haystack[ $needle ];
		}
		return null;
	}


	public function render_chart_builder_data_wrapper( $attributes, $content = '', $block ) {
		// $this->enqueue_frontend();
		$attrs         = wp_json_encode( $block->attributes );

		if ( empty( $block->inner_blocks ) ) {
			return '';
		}

		$inner_blocks_html = '';
		$table_content = '';
		// foreach ( $block->inner_blocks as $inner_block ) {
		// 	if ('core/table' === $inner_block->name) {
		// 		$table_content .= $inner_block->inner_html;
		// 	}
		// }
		// foreach ( $block->parsed_block['innerBlocks'] as $i => $inner_block ) {

		// 	echo render_block( $inner_block );
		// }
		$table_block  = array_pop(
            array_filter(
                $block->parsed_block['innerBlocks'],
                function( $block ) {
                    return 'core/table' === $block['blockName'];
                }
            )
        );
		$chart_block  = array_pop(
            array_filter(
                $block->parsed_block['innerBlocks'],
                function( $block ) {
					$target = 'prc-block/chart-builder';
                    return $target === $block['blockName'];
                }
            )
        );

		$table_array = ConvertHelper::getdata($table_block['innerHTML']);
		// vdump(wp_j÷son_encode($table_block));

		ob_start();
		?>
		<div class="wp-chart-builder-wrapper">
			<div class="hidden">
				<div class="table-array-data">
					<?php echo htmlspecialchars(wp_json_encode($table_array), ENT_QUOTES, 'UTF-8'); ?>
				</div>
			</div>
			<?php echo render_block($chart_block); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_frontend() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill', 'moment', 'wp-url' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );
		return $enqueue->register(
			'chart-builder-data-wrapper',
			'frontend',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	// public function enqueue_frontend() {
	// $registered = $this->register_frontend();
	// wp_enqueue_script( array_pop( $registered['js'] )['handle'] );
	// }

	public function register_block() {
		$js_deps       = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill', 'wp-components' );
		$block_js_deps = array_merge( $js_deps, array( 'wp-components' ) );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'chart-builder-wrapper',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		$my_block = register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/chart-builder-data-wrapper',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_chart_builder_data_wrapper' ),
			)
		);
	}

}

new PRC_Chart_Builder_Data_Wrapper( true );

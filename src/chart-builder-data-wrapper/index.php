<?php

// Require the composer autoload for getting conflict-free access to enqueue
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class ConvertHelper {
	static function getdata( $contents ) {
		// @TODO DOMDocument can be quite processor intensive, we should investigate alternatives.
		$DOM = new DOMDocument();
		@$DOM->loadHTML( $contents );
		$items  = $DOM->getElementsByTagName( 'tr' );
		$return = array();
		foreach ( $items as $node ) {
			$return[] = self::tdrows( $node->childNodes );
		}
		return $return;
	}

	static function tdrows( $elements ) {
		$str = array();
		foreach ( $elements as $element ) {
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

	public function render_chart_builder_data_wrapper( $attributes, $content = '', $block ) {
		if ( empty( $block->inner_blocks ) ) {
			return '';
		}
		$id = $attributes['id'];

		$chart_block = array_filter(
			$block->parsed_block['innerBlocks'],
			function( $b ) {
				return array_key_exists('blockName', $b) && 'prc-block/chart-builder' === $b['blockName'];
			}
		);
		$chart_block = array_pop($chart_block);
		// Add id to chart block, for some reason block context was not working. @TODO Need to investigate.
		$chart_block['attrs']['id'] = $id;

		$table_block = array_filter(
			$block->parsed_block['innerBlocks'],
			function( $b ) {
				return array_key_exists('blockName', $b) && 'core/table' === $b['blockName'];
			}
		);
		$table_block = array_pop( $table_block );
		// TODO: find a better place to stash demo preformatted data example.
		// $test_data = array (
		// 	array (
		// 		array (
		// 		'x' => 'Evolved; due to natural processes',
		// 		'category' => 'Evolved; due to natural processes',
		// 		'y' => 38.832664169915,
		// 		'yLabel' => '39%',
		// 		'tooltip' => 'Foobar',
		// 		),
		// 		array (
		// 		'x' => 'Evolved; due to God\'s design',
		// 		'category' => 'Evolved; due to God\'s design',
		// 		'y' => 21.297238148486,
		// 		'yLabel' => '21%',
		// 		'tooltip' => 'Foobar',
		// 		),
		// 		array (
		// 		'x' => 'Evolved; don\'t know how',
		// 		'category' => 'Evolved; don\'t know how',
		// 		'y' => 2.8484378446123,
		// 		'yLabel' => '3%',
		// 		'tooltip' => 'Foobar',
		// 		),
		// 		array (
		// 		'x' => 'Always existed in present form',
		// 		'category' => 'Always existed in present form',
		// 		'y' => 32.948412787738,
		// 		'yLabel' => '33%',
		// 		'tooltip' => 'Foobar',
		// 		),
		// 		array (
		// 		'x' => 'Don\'t know',
		// 		'category' => 'Don\'t know',
		// 		'y' => 4.0732470492481,
		// 		'yLabel' => '4%',
		// 		'tooltip' => 'Foobar',
		// 		),
		// 	)
		// );

		$table_array = array_key_exists('chartData', $attributes) ? $attributes['chartData'] : ConvertHelper::getdata( $table_block['innerHTML'] );
		$preformatted_data = array_key_exists('chartPreformattedData', $attributes) ? $attributes['chartPreformattedData'] : null;
		$script_handle = $this->enqueue_frontend();

		wp_add_inline_script($script_handle, "if ( !window.chartData ) {window.chartData = {};} window.chartData['".$id."'] = " . wp_json_encode( $table_array ) . ";");
		wp_add_inline_script($script_handle, "if ( !window.chartPreformattedData ) {window.chartPreformattedData = {};} window.chartPreformattedData['".$id."'] = " . wp_json_encode( $preformatted_data ) . ";");

		ob_start();
		?>
		<div class="wp-chart-builder-wrapper">
			<?php echo render_block( $chart_block ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_frontend() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		return $enqueue->register(
			'frontend',
			'chart-builder-wrapper',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function enqueue_frontend() {
		$registered = $this->register_frontend();
		wp_enqueue_script( array_pop( $registered['js'] )['handle'] );
		return array_pop( $registered['js'] )['handle'];
	}

	public function register_block() {
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'chart-builder-wrapper',
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
			plugin_dir_path( __DIR__ ) . '/chart-builder-data-wrapper',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_chart_builder_data_wrapper' ),
			)
		);
	}

}

new PRC_Chart_Builder_Data_Wrapper( true );
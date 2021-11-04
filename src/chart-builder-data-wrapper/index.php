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
			// Debugging:
			// add_filter('the_content', function($content) {
			// 	return prc_chart_builder() . $content;
			// }, 10, 1);
		}
	}

	public function render_chart_builder_data_wrapper( $attributes, $content = '', $block ) {
		if ( empty( $block->inner_blocks ) ) {
			return '';
		}

		$table_block = array_pop(
			array_filter(
				$block->parsed_block['innerBlocks'],
				function( $b ) {
					return 'core/table' === $b['blockName'];
				}
			)
		);
		$chart_block = array_pop(
			array_filter(
				$block->parsed_block['innerBlocks'],
				function( $b ) {
					return 'prc-block/chart-builder' === $b['blockName'];
				}
			)
		);

		$table_array = ConvertHelper::getdata( $table_block['innerHTML'] );

		ob_start();
		?>
		<div class="wp-chart-builder-wrapper">
			<div class="hidden">
				<div class="table-array-data">
					<?php echo htmlspecialchars( wp_json_encode( $table_array ), ENT_QUOTES, 'UTF-8' ); ?>
				</div>
			</div>
			<?php echo render_block( $chart_block ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_frontend() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', '1.0.1', 'plugin', plugin_dir_path( __DIR__ ) );
		return $enqueue->register(
			'chart-builder-data-wrapper',
			'frontend',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array('moment'),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function register_block() {
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', '1.0.1', 'plugin', plugin_dir_path( __DIR__ ) );

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

function prc_chart_builder() {
	$parsed = new WP_Block_Parser_Block( 
		'prc-block/chart-builder-data-wrapper',
		array(
			// Attributes for chart wrapper here
			// See structure here https://github.com/wpcomvip/pewresearch-org/blob/master/plugins/prc-block-library/src/chart-builder-data-wrapper/block.json#L18-L46
		),
		array(
			array(
				'core/table',
				array(
					// Attributes for table block here (data)
					// See structure here https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/table/block.json#L8-L124
					'className' => 'chart-builder-data-table'	
				), 
				//inner blocks
				array(),
				//innerHTML
				'<figure class="wp-block-table chart-builder-data-table"><table><thead><tr><th>x axis</th><th>y axis</th></tr></thead><tbody><tr><td>2</td><td>2</td></tr><tr><td>1</td><td>1</td></tr></tbody></table></figure>',
				//innerContent
				array('<figure class="wp-block-table chart-builder-data-table"><table><thead><tr><th>x axis</th><th>y axis</th></tr></thead><tbody><tr><td>2</td><td>2</td></tr><tr><td>1</td><td>1</td></tr></tbody></table></figure>')
			),
			array(
				'prc-block/chart-builder',
				array(
					// Attributes for chart here
					// See structure here https://github.com/wpcomvip/pewresearch-org/blob/master/plugins/prc-block-library/src/chart-builder/block.json#L5-L290
					"chartType" => "scatter",
					"colorValue" => "light-brown-spectrum",
					"xLabel" => "the x axis",
					"xMaxDomain" => 2,
					"yLabel" => "the y axis",
					"yMaxDomain" => 2,
					"legendActive" => true,
					"className" => "is-style-scatter"				
				), array(), '', array()
			),
		),
		'',
		array()
	);

	echo render_block( (array) $parsed );
}
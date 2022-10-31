<?php
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;
class Row_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function has_section_heading( $block ) {
		$inner_blocks = array_pop( $block->parsed_block['innerBlocks'] );
		if ( 'prc-block/column' !== $inner_blocks['blockName'] ) {
			return false;
		}

		$first_block = $inner_blocks['innerBlocks'][0];

		if ( 'core/heading' !== $first_block['blockName'] && 'is-style-section-header' !== $first_block['attrs']['className'] ) {
			return false;
		}

		return true;
	}

	/**
	 * Render callback for prc-block/row
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_row( $attributes, $content, $block ) {
		$use_css_grid = array_key_exists( 'useCssGrid', $attributes ) ? $attributes['useCssGrid'] : false;
		$as_row       = array_key_exists( 'asRow', $attributes ) ? $attributes['asRow'] : false;
		$classnames   = array_key_exists( 'className', $attributes ) ? $attributes['className'] : null;
		$row_classes  = array_merge(
			array(
				'ui'                      => false === $use_css_grid,
				'equal width'             => $attributes['equal'],
				'divided'                 => $attributes['divided'],
				'stackable'               => array_key_exists( 'stackable', $attributes ) ? $attributes['stackable'] : false,
				'grid'                    => ! $as_row && false === $use_css_grid,
				'row'                     => $as_row,
				'wp-block-prc-block-grid' => ! $as_row,
			),
			explode( ' ', $classnames )
		);
		$row_classes  = apply_filters( 'prc_grid_row_classes_DEPRECATED', $row_classes, $block->parsed_block );
		remove_filter( 'the_content', 'wpautop' );
		ob_start();
		?>
		<div class="<?php echo esc_attr( classNames( $row_classes ) ); ?>">
			<?php echo apply_filters( 'the_content', normalize_whitespace( $content ) ); ?>
		</div>
		<?php
		$markup = ob_get_clean();
		add_filter( 'the_content', 'wpautop' );
		return $markup;
	}

	/**
	 * Register the prc-block/row block.
	 *
	 * @uses render_row()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'row',
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
			plugin_dir_path( __DIR__ ) . '/row',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_row' ),
			)
		);
	}
}

new Row_Block( true );

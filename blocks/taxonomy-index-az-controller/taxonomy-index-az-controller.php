<?php
/**
 * Block Name:        Taxonomy Index A-Z Controller
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class TaxonomyIndexAzController extends PRC_Block_Library {
	public static $version = '0.1.0';
	public static $dir = __DIR__;
	public static $range = null;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			if ( null === self::$range ) {
				self::$range = range( 'A', 'Z' );
			}
			add_action('init', array($this, 'block_init'));
		}
	}

	public function render_az_list( $block ) {
		$present = array();
		foreach ( $block->inner_blocks as $grid ) {
			foreach ( $grid->inner_blocks as $column ) {
				foreach ( $column->inner_blocks as $az_block ) {
					if ( array_key_exists( 'letter', $az_block->attributes ) ) {
						$present[] = strtoupper( $az_block->attributes['letter'] );
					}
				}
			}
		}
		$list = '';
		foreach ( self::$range as $letter ) {
			$class = classNames( 'item', array( 'disabled' => ! in_array( $letter, $present ) ) );
			$list .= "<a href='#{$letter}' class='{$class}'>{$letter}</a>";
		}
		return empty( $list ) ? false : $list;
	}

	public function render_as_accordion( $block ) {
		$accordion_blocks = '';
		foreach ( $block->parsed_block['innerBlocks'] as $grid ) {
			foreach ( $grid['innerBlocks'] as $column ) {
				foreach ( $column['innerBlocks'] as $az_block ) {
					if ( array_key_exists( 'letter', $az_block['attrs'] ) ) {
						$letter = $az_block['attrs']['letter'];
						$exclude = $az_block['attrs']['exclude'];
						$taxonomy = $az_block['attrs']['taxonomy'];
						ob_start();
						?>
						<!-- wp:prc-block/accordion {"title":"<?php echo $letter;?>"} -->
						<!-- wp:prc-block/taxonomy-index-az-list {"letter":"<?php echo $letter;?>","disableHeading": true, "exclude":"<?php echo $exclude;?>","taxonomy":["topic","regions-countries"]} /-->
						<!-- /wp:prc-block/accordion -->
						<?php
						$accordion_blocks .= ob_get_clean();
					}
				}
			}
		}

		ob_start();
		?>
		<!-- wp:prc-block/accordion-controller {"borderColor":"light-gray"} -->
		%s
		<!-- /wp:prc-block/accordion-controller -->
		<?php
		$block_content = ob_get_clean();
		$block_content = wp_sprintf( normalize_whitespace($block_content), $accordion_blocks );

		$blocks = parse_blocks($block_content);
		return render_block( array_pop($blocks) );
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$wrapper_attributes = get_block_wrapper_attributes();
		$is_mobile = jetpack_is_mobile();

		if ( $is_mobile ) {
			$content = $this->render_as_accordion( $block );
		} else {
			$content = $this->render_az_list( $block ) . $content;
		}

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$content
		);
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}

}

new TaxonomyIndexAzController(true);

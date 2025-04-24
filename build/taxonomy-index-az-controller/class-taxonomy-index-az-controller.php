<?php
/**
 * Taxonomy Index A-Z Controller Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Taxonomy Index A-Z Controller
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Taxonomy_Index_AZ_Controller {
	/**
	 * Range
	 *
	 * @var null
	 */
	public $range = null;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		if ( null === $this->range ) {
			$this->range = range( 'A', 'Z' );
		}
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Render the A-Z list
	 *
	 * @param WP_Block $block Block.
	 * @return string
	 */
	public function render_az_list( $block ) {
		$present = array();
		foreach ( $block->parsed_block['innerBlocks'] as $grid ) {
			foreach ( $grid['innerBlocks'] as $column ) {
				foreach ( $column['innerBlocks'] as $az_block ) {
					if ( array_key_exists( 'letter', $az_block['attrs'] ) ) {
						$present[] = strtoupper( $az_block['attrs']['letter'] );
					}
				}
			}
		}
		$list = '<ul class="wp-block-prc-block-taxonomy-index-az-controller--list">';
		foreach ( $this->range as $letter ) {
			$class = \PRC\Platform\Block_Utils\classNames( 'item', array( 'disabled' => ! in_array( $letter, $present ) ) );
			$list .= "<li><a href='#{$letter}' class='{$class}'>{$letter}</a></li>";
		}
		$list .= '</ul>';
		return $list;
	}

	/**
	 * Render the accordion block
	 *
	 * @param WP_Block $block Block.
	 * @return string
	 */
	public function render_as_accordion_block( $block ) {
		$accordion_blocks = '';
		foreach ( $block->parsed_block['innerBlocks'] as $grid ) {
			foreach ( $grid['innerBlocks'] as $column ) {
				foreach ( $column['innerBlocks'] as $az_block ) {
					if ( array_key_exists( 'letter', $az_block['attrs'] ) ) {
						$letter   = $az_block['attrs']['letter'];
						$exclude  = $az_block['attrs']['exclude'] ?? array();
						$taxonomy = array_key_exists( 'taxonomy', $az_block['attrs'] ) ? $az_block['attrs']['taxonomy'] : array( 'category' );
						// convert $taxonomy to a comma separated string but wrap each item in quotes
						// we need to do this because the taxonomy attribute is a printed array of strings in the block markup.
						$taxonomy = implode(
							',',
							array_map(
								function ( $item ) {
									return '"' . $item . '"';
								},
								$taxonomy
							)
						);
						$exclude  = implode(
							',',
							array_map(
								function ( $item ) {
									return '"' . $item . '"';
								},
								$exclude
							)
						);
						ob_start();
						?>
						<!-- wp:prc-block/accordion {"title":"<?php echo $letter; ?>"} -->
						<!-- wp:prc-block/taxonomy-index-az-list {"letter":"<?php echo $letter; ?>","disableHeading": true, "exclude":[<?php echo $exclude; ?>],"taxonomy":[<?php echo $taxonomy; ?>]} /-->
						<!-- /wp:prc-block/accordion -->
						<?php
						$accordion_blocks .= ob_get_clean();
					}
				}
			}
		}

		ob_start();
		?>
		<!-- wp:prc-block/accordion-controller {"borderColor":"ui-white"} -->
		%s
		<!-- /wp:prc-block/accordion-controller -->
		<?php
		$block_content = ob_get_clean();
		$block_content = wp_sprintf( normalize_whitespace( $block_content ), $accordion_blocks );

		$blocks = parse_blocks( $block_content );
		return render_block( array_pop( $blocks ) );
	}

	/**
	 * Render the block callback
	 *
	 * @param array    $attributes Attributes.
	 * @param string   $content Content.
	 * @param WP_Block $block Block.
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$wrapper_attributes = get_block_wrapper_attributes();
		$is_mobile          = jetpack_is_mobile();

		if ( is_admin() ) {
			return;
		}

		if ( $is_mobile ) {
			$content = $this->render_as_accordion_block( $block );
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
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/taxonomy-index-az-controller',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

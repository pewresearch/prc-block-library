<?php
/**
 * Block Name:        Taxonomy Navigation Controller
 * Description:       Display a grid of taxonomy menu blocks that converts to an accordion on mobile
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class TaxonomyMenuController extends PRC_Block_Library {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action('init', array($this, 'block_init'));
		}
	}

	public function render_as_accordion_block( $block ) {
		$accordion_blocks = '';

		foreach ( $block->parsed_block['innerBlocks'] as $grid ) {
			foreach ( $grid['innerBlocks'] as $column ) {
				foreach ( $column['innerBlocks'] as $taxonomy_menu_block ) {
					$inner_blocks = $taxonomy_menu_block['innerBlocks'];
					// Get the first inner_block with an attribute classname of is-style-sub-heading.
					$heading_block = array_filter($inner_blocks, function($block) {
						return array_key_exists('attrs', $block) && array_key_exists('className', $block['attrs']) && strpos($block['attrs']['className'], 'is-style-sub-heading') !== false;
					});
					// Get the label from heading block
					$label = $heading_block[0]['attrs']['label'];

					// Get the array index of the heading block in the inner_blocks array
					$heading_block_index = array_search($heading_block[0], $inner_blocks);
					// Remove the heading block from the inner_blocks array
					unset($inner_blocks[$heading_block_index]);
					// Reindex the array to cleanup data.
					$inner_blocks = array_values($inner_blocks);

					if ( $label && $inner_blocks ) {
						ob_start();
						?>
						<!-- wp:prc-block/accordion {"title":"<?php echo $label;?>"} -->
						<?php echo serialize_blocks($inner_blocks); ?>
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

		if ( jetpack_is_mobile() ) {
			return $this->render_as_accordion_block( $block );
		}

		$wrapper_attributes = get_block_wrapper_attributes();

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

new TaxonomyMenuController(true);

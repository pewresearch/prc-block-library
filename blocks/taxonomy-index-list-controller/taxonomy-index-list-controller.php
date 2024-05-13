<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Taxonomy Index List Controller
 * Description:       Display a grid of taxonomy list blocks that converts to an accordion on mobile devices.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Taxonomy_Index_List_Controller {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/taxonomy-index-list-controller/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
		}
	}

	/**
	 * Renders the `core/block` block on server.
	 *
	 * Cribbed from https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/block/index.php
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Rendered HTML of the referenced block.
	 */
	public function render_reusable_block( $attributes ) {
		static $seen_refs = array();

		if ( empty( $attributes['ref'] ) ) {
			return '';
		}

		$reusable_block = get_post( $attributes['ref'] );
		if ( ! $reusable_block || 'wp_block' !== $reusable_block->post_type ) {
			return '';
		}

		if ( isset( $seen_refs[ $attributes['ref'] ] ) ) {
			// WP_DEBUG_DISPLAY must only be honored when WP_DEBUG. This precedent
			// is set in `wp_debug_mode()`.
			$is_debug = WP_DEBUG && WP_DEBUG_DISPLAY;

			return $is_debug ?
				// translators: Visible only in the front end, this warning takes the place of a faulty block.
				__( '[block rendering halted]' ) :
				'';
		}

		if ( 'publish' !== $reusable_block->post_status || ! empty( $reusable_block->post_password ) ) {
			return '';
		}

		$seen_refs[ $attributes['ref'] ] = true;

		$blocks = parse_blocks( $reusable_block->post_content );

		// If the reusable block has a single block, and that block is a taxonomy list, then render it as an accordion.
		if (count($blocks) === 1 && $blocks[0]['blockName'] === 'prc-block/taxonomy-list') {
			$content = $this->parse_taxonomy_list_as_accordion($blocks[0]);
		} else {
			$content = render_block( $blocks[0] );
		}

		unset( $seen_refs[ $attributes['ref'] ] );
		return $content;
	}

	public function parse_taxonomy_list_as_accordion($taxonomy_list_block) {
		$inner_blocks = $taxonomy_list_block['innerBlocks'];
		// Get the first inner_block with an attribute classname of is-style-sub-heading.
		$heading_block = array_filter($inner_blocks, function($block) {
			return array_key_exists('attrs', $block) && array_key_exists('className', $block['attrs']) && strpos($block['attrs']['className'], 'is-style-sub-heading') !== false;
		});
		// Get the label from heading block
		$label = $heading_block[0]['attrs']['label'];
		$url = $heading_block[0]['attrs']['url'];

		// Get the array index of the heading block in the inner_blocks array
		$heading_block_index = array_search($heading_block[0], $inner_blocks);
		// Remove the heading block from the inner_blocks array
		unset($inner_blocks[$heading_block_index]);
		// Reindex the array to cleanup data.
		$inner_blocks = array_values($inner_blocks);

		if ( $url ) {
			$psuedo_accordion_title_term_link = array(
				'blockName' => 'prc-block/taxonomy-list-link',
				'attrs' => array(
					'label' => "Main $label page",
					'url' => $url,
					'fontFamily' => 'sans-serif',
				),
				'innerBlocks' => array(),
				'innerHTML' => '',
				'innerContent' => array(),
			);
			// Add the psuedo accordion title term link to the beginning of the inner_blocks array
			array_unshift($inner_blocks, $psuedo_accordion_title_term_link);
		}

		$markup = '';

		if ( $label && $inner_blocks ) {
			ob_start();
			?>
			<!-- wp:prc-block/accordion {"title":"<?php echo $label;?>", "fontFamily":"sans-serif"} -->
			<?php echo serialize_blocks($inner_blocks); ?>
			<!-- /wp:prc-block/accordion -->
			<?php
			$markup = ob_get_clean();
		}

		return $markup;
	}

	public function render_as_accordion_block( $block ) {
		$accordion_blocks = '';

		foreach ( $block->parsed_block['innerBlocks'] as $grid ) {
			foreach ( $grid['innerBlocks'] as $column ) {
				foreach ( $column['innerBlocks'] as $innerblock ) {
					$accordion_blocks .= $this->parse_taxonomy_list_as_accordion($innerblock);
				}
			}
		}

		ob_start();
		?>
		<!-- wp:prc-block/accordion-controller {"borderColor":"ui-gray-light"} -->
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
	* @hook init
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

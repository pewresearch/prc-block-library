<?php
/**
 * Block Name:        Tabs
 * Version:           0.1.1
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class TabsController extends PRC_Block_Library {
	public static $version = '0.1.1';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action('init', array($this, 'block_init'));
			add_filter( 'query_vars', array( $this, 'register_query_vars' ), 20, 1 );
		}
	}

	public function register_query_vars( $qvars ) {
		$qvars[] = 'menuItem';
		return $qvars;
	}

	public function parse_menu_item($label, $pane_innerblocks) {
		$markup = '';

		if ( $label && $pane_innerblocks ) {
			ob_start();
			?>
			<!-- wp:prc-block/accordion {"title":"<?php echo $label;?>"} -->
			<?php echo serialize_blocks($pane_innerblocks); ?>
			<!-- /wp:prc-block/accordion -->
			<?php
			$markup = ob_get_clean();
		}

		return $markup;
	}

	public function render_as_accordion_block( $block ) {
		$inner_blocks = $block->parsed_block['innerBlocks'];

		$menu_block = array_filter($inner_blocks, function($block) {
			return $block['blockName'] === 'prc-block/tabs-menu';
		});
		$menu_block = array_pop($menu_block);
		$menu_items = array_map(function($item) {
			return $item['attrs'];
		}, $menu_block['innerBlocks']);

		$panes = array_filter($inner_blocks, function($block) {
			return $block['blockName'] === 'prc-block/tabs-panes';
		});
		$panes = array_pop($panes);
		$panes = array_map(function($pane) {
			return array(
				'attrs' => $pane['attrs'],
				'innerBlocks' => $pane['innerBlocks']
			);
		}, $panes['innerBlocks']);

		// match up the menu items with the pane innerblocks by uuid attribute
		$matched_items = array_map(function($item) use ($panes) {
			$matched_pane = array_filter($panes, function($pane) use ($item) {
				return $pane['attrs']['uuid'] === $item['uuid'];
			});
			$matched_pane = array_pop($matched_pane);
			return array(
				'title' => $item['title'],
				'pane_innerblocks' => $matched_pane['innerBlocks']
			);
		}, $menu_items);

		$accordion_blocks = '';
		foreach ($matched_items as $item) {
			$accordion_blocks .= $this->parse_menu_item(
				$item['title'],
				$item['pane_innerblocks']
			);
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

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'id'    => 'tabs-'. md5( wp_json_encode( $attributes ) ),
				'class' => classnames( array(
					'is-vertical-tabs' => $attributes['vertical'],
					'is-horizontal-tabs' => ! $attributes['vertical'],
				) ),
			)
		);

		return wp_sprintf(
			'<div %1$s><div>%2$s</div></div>',
			$block_wrapper_attrs,
			wp_kses( $content, 'post' )
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

new TabsController(true);

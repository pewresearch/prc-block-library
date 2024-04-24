<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Tabs
 * Version:           0.1.1
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Tabs_Controller {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/tabs-controller/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			$loader->add_filter('query_vars', $this, 'register_query_vars', 20, 1);
		}
	}

	public function register_query_vars( $qvars ) {
		$qvars[] = 'tabItem';
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

	/**
	 * Either return the uuid from the `tabItem` url var or get the uuid for the first menu item block.
	 * @param mixed $block
	 * @return mixed
	 */
	private function get_first_menu_item_uuid($block) {
		$url_var_value = get_query_var('tabItem');
		if ( $url_var_value ) {
			return $url_var_value;
		}

		$parsed_block = $block->parsed_block;
		$tabs_controller_innerblocks = $parsed_block['innerBlocks'];
		$menu_block = wp_get_first_block($tabs_controller_innerblocks, 'prc-block/tabs-menu');
		$first_menu_item_block = wp_get_first_block($menu_block['innerBlocks'], 'prc-block/tabs-menu-item');
		return $first_menu_item_block['attrs']['uuid'];
	}

	private function check_for_dialog_link_tab($block) {
		$parsed_block = $block->parsed_block;
		$tabs_controller_innerblocks = $parsed_block['innerBlocks'];
		$menu_block = wp_get_first_block($tabs_controller_innerblocks, 'prc-block/tabs-menu');
		$menu_items = $menu_block['innerBlocks'];
		// go through menu items and see if any of them has an attributes classname is-style-dialog-link then return the uuid for that item
		$dialog_link_item = array_filter($menu_items, function($item) {
			$classnames = array_key_exists('className', $item['attrs']) ? explode(' ', $item['attrs']['className']) : array();
			return in_array('is-style-dialog', $classnames);
		});
		$dialog_link_item = array_pop($dialog_link_item);
		if ( $dialog_link_item ) {
			return $dialog_link_item['attrs']['uuid'];
		}
		return false;
	}

	private function get_initial_context($block) {
		$initial_context = array(
			'activeUUID' => $this->get_first_menu_item_uuid($block),
		);
		$dialog_link = $this->check_for_dialog_link_tab($block);
		if ( $dialog_link ) {
			$initial_context['dialogLinkUUID'] = $dialog_link;
		}
		return $initial_context;
	}

	/**
	 * Render the Tabs Controller
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		if ( is_admin() ) {
			return;
		}

		$initial_context = array(
			'activeUUID' => $this->get_first_menu_item_uuid($block),
		);
		$dialog_link = $this->check_for_dialog_link_tab($block);
		if ( $dialog_link ) {
			$initial_context['dialogLinkUUID'] = $dialog_link;
		}

		$id = wp_unique_id('tabs-');

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'id'    => $id,
				'class' => \PRC\Platform\Block_Utils\classNames( array(
					'is-vertical-tabs' => $attributes['vertical'],
					'is-horizontal-tabs' => ! $attributes['vertical'],
				) ),
				'data-wp-interactive' => wp_json_encode(array('namespace' => 'prc-block/tabs-controller')),
				'data-wp-context' => wp_json_encode($initial_context),
				'data-wp-init' => 'callbacks.onTabsInit',
			)
		);

		return wp_sprintf(
			'<div %1$s><div>%2$s</div></div>',
			$block_wrapper_attrs,
			$content,
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

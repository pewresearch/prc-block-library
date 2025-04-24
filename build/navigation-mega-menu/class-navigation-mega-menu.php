<?php
/**
 * Navigation Mega Menu Block.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use MatthiasMullie\Minify;

/**
 * Block Name:        Navigation Mega Menu
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Navigation_Mega_Menu {
	/**
	 * Constructor.
	 *
	 * @param array $loader The loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param array $loader The loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_action( 'enqueue_block_assets', $this, 'enqueue_custom_mega_menu_styles' );
			$loader->add_filter( 'default_wp_template_part_areas', $this, 'mega_menu_template_part_areas', 10, 1 );
			$loader->add_filter( 'block_core_navigation_listable_blocks', $this, 'enable_mega_menu_list_wrapper', 10, 1 );
		}
	}

	/**
	 * Generate mega menu styles.
	 *
	 * @return string The generated styles.
	 */
	public function generate_mega_menu_styles() {
		$colors = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
		ob_start();
		foreach ( $colors as $color ) {
			$slug = $color['slug'];
			?>
			.wp-block-prc-block-navigation-mega-menu.has-active-menu-item-background.has-<?php echo $slug; ?>-active-menu-item-background.is-active {
				--overlay-background-color: var(--wp--preset--color--<?php echo $slug; ?>);
				background-color: var(--wp--preset--color--<?php echo $slug; ?>);
			}
			.wp-block-prc-block-navigation-mega-menu.has-active-border-color.has-<?php echo $slug; ?>-active-border-color.is-active {
				--active-border-color: var(--wp--preset--color--<?php echo $slug; ?>);
			}
			.wp-block-prc-block-navigation-mega-menu.has-active-menu-item-color.has-<?php echo $slug; ?>-active-menu-item-color.is-active {
				color: var(--wp--preset--color--<?php echo $slug; ?>);
			}

			.wp-block-prc-block-navigation-mega-menu.has-menu-item-background.has-<?php echo $slug; ?>-menu-item-background {
				background-color: var(--wp--preset--color--<?php echo $slug; ?>);
			}
			.wp-block-prc-block-navigation-mega-menu.has-menu-item-color.has-<?php echo $slug; ?>-active-menu-item-color {
				color: var(--wp--preset--color--<?php echo $slug; ?>);
			}

			.wp-block-prc-block-navigation-mega-menu__container.has-overlay-background.has-<?php echo $slug; ?>-overlay-background {
				background-color: var(--wp--preset--color--<?php echo $slug; ?>);
			}
			.wp-block-prc-block-navigation-mega-menu__container.has-<?php echo $slug; ?>-overlay-color,
			.wp-block-prc-block-navigation-mega-menu__container.has-<?php echo $slug; ?>-overlay-color * {
				color: var(--wp--preset--color--<?php echo $slug; ?>)!important;
			}
			<?php
		}
		$styles   = ob_get_clean();
		$minifier = new Minify\CSS( $styles );
		return $minifier->minify();
	}

	/**
	 * Enables the mega menu block to be auto-wrapped in an <li> element by the navigation block on the frontend.
	 *
	 * @hook block_core_navigation_listable_blocks
	 * @param array $blocks The blocks to enable.
	 * @return array The modified blocks.
	 */
	public function enable_mega_menu_list_wrapper( $blocks ) {
		$blocks[] = 'prc-block/navigation-mega-menu';
		return $blocks;
	}

	/**
	 * Enqueue custom mega menu styles.
	 *
	 * @hook enqueue_block_assets, enqueue_block_editor_assets
	 */
	public function enqueue_custom_mega_menu_styles() {
		$styles = $this->generate_mega_menu_styles();
		if ( is_wp_error( $styles ) ) {
			return;
		}
		wp_add_inline_style( 'prc-block-navigation-mega-menu-style', $styles );
	}

	/**
	 * Adds a custom template part area for mega menus to the list of template part areas.
	 *
	 * This function introduces a new area specifically for menu templates, allowing
	 * the creation of sections within a mega menu. The new area is appended to the
	 * existing list of template part areas.
	 *
	 * @see https://developer.wordpress.org/reference/hooks/default_wp_template_part_areas/
	 *
	 * @param array $areas Existing array of template part areas.
	 * @return array Modified array of template part areas including the new mega menu area.
	 */
	public function mega_menu_template_part_areas( array $areas ) {
		$areas[] = array(
			'area'        => 'menu',
			'label'       => __( 'Menu', 'navigation-mega-menu' ),
			'description' => __( 'Menu templates are used to create sections of a mega menu.', 'navigation-mega-menu' ),
			'icon'        => 'layout',
			'area_tag'    => 'div',
		);
		return $areas;
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
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/navigation-mega-menu' );
	}
}

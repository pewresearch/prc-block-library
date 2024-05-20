<?php
namespace PRC\Platform\Blocks;

class Common_Styles {
	public function __construct($loader) {
		require_once plugin_dir_path( __FILE__ ) . '/class-additional-color-supports.php';
		$this->init($loader);
	}

	public function init($loader) {
		$additional_color_supports = new Additional_Color_Supports();

		$loader->add_filter( 'safe_style_css', $this, 'allowed_inline_styles', 10, 1 );
		$loader->add_action( 'enqueue_block_assets', $this, 'register_baseball_card_style', 2 );
		$loader->add_action( 'enqueue_block_assets', $this, 'register_pagination_style', 2 );
		$loader->add_action( 'enqueue_block_assets', $additional_color_supports, 'register_style', 2 );
	}

	/**
	 * Add @container css rules to allowed safe style css.
	 *
	 * @hook safe_style_css
	 *
	 * @param mixed $styles
	 * @return mixed
	 */
	public function allowed_inline_styles( $styles ) {
		$styles[] = 'container';
		$styles[] = '@container';
		return $styles;
	}

	/**
	 * Register the "Baseball Card" `prc-block-library--baseball-card` support style.
	 * @hook enqueue_block_assets
	 */
	public function register_baseball_card_style() {
		// Baseball Card
		$asset_file = include(  plugin_dir_path( __FILE__ )  . 'baseball-card/build/index.asset.php' );
		wp_register_style(
			'prc-block-library--baseball-card',
			plugins_url( 'baseball-card/build/style-index.css', __FILE__ ),
			array(),
			$asset_file['version'],
		);
	}

	public function register_pagination_style() {
		// Pagination
		$asset_file = include(  plugin_dir_path( __FILE__ )  . 'pagination/build/index.asset.php' );
		wp_register_style(
			'prc-block-library--pagination',
			plugins_url( 'pagination/build/style-index.css', __FILE__ ),
			array(),
			$asset_file['version'],
		);
	}
}

function generate_pagination_list(
	$array = [[
		// Should be on most lists
		'ID' => '',
		'title' => '',
		'link' => '#',
		// What you'll need to add
		'pageNum' => 1,
		'isActive' => true,
	]],
	$classnames = ''
) {
	wp_enqueue_style('prc-block-library--pagination');

	$pagination_list = '';
	foreach ($array as $item) {
		$number = $item['pageNum'];
		$is_active = $item['isActive'];
		$link = $item['link'];
		$title = $item['title'];
		$tag_name = $is_active || ! $link ? 'span' : 'a';
		$extra_attrs = 'a' === $tag_name ? wp_sprintf(
			' href="%1$s" alt="%2$s"',
			esc_url($link),
			esc_attr($title)
		) : '';
		$classnames = \PRC\Platform\Block_Utils\classNames(
			'common-block-style--pagination__pagination-item',
			$classnames,
			array(
				'is-active' => $is_active,
			)
		);
		$pagination_list .=  wp_sprintf(
			'<%1$s class="%2$s"%3$s>%4$s</%1$s>',
			$tag_name,
			$classnames,
			$extra_attrs,
			esc_html($number)
		);
	}
	return $pagination_list;
}

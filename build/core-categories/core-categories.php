<?php
namespace PRC\Platform\Blocks;
use MatthiasMullie\Minify;

/**
 * Block Name:        Categories
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Core_Categories {
	public static $block_name = 'core/categories';

	public function __construct($loader) {
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_columns_style');
		}
	}

	/**
	* Register the block's assets.
	* @hook init
	*/
	public function register_columns_style() {
		ob_start();
		?>
		.wp-block-categories.is-style-columns {
			columns: 2;
			column-gap: 1em;
			padding: 0;
		}
		.wp-block-categories.is-style-columns li {
			list-style: none;
		}
		<?php
		$style = ob_get_clean();
		$minifier = new Minify\CSS($style);
		$style = $minifier->minify();
		register_block_style(
			self::$block_name,
			array(
				'name' => 'columns',
				'label' => 'Columns',
				'inline_style' => $style,
			),
		);
	}

}

<?php
/**
 * Block Bits
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Class Block_Bits
 *
 * Handles reusable bits that can be inserted into RichText inside blocks.
 *
 * @package PRC\Platform\Blocks
 */
class Block_Bits {
	public static $bits = array(
		'copyright' => array(
			'callback' => 'PRC\Platform\Blocks\Block_Bits::copyright',
		),
	);

	public function __construct( $loader ) {
	}

	public function block_context() {
	}

	public function register() {
	}

	/**
	 * Handle block bits.
	 *
	 * @param string $block_content The block content.
	 */
	public function handle_block_bits( $block_content ) {
		$tag = new WP_HTML_Tag_Processor( $block_content );
		while ( $tag->next_tag( array( 'class_name' => 'prc-block-bit' ) ) ) {
			$bit_namespace = $tag->get_attribute( 'data-prc-block-bit' );
			if ( ! $bit_namespace || ! isset( self::$bits[ $bit_namespace ] ) ) {
				continue;
			}
			// set attributes...
		}
		return $tag->get_updated_html();
	}
}

class Copyright extends Block_Bits {
	public static $bit_namespace = 'prc-block-bit/copyright';
	/**
	 * Generate the copyright bit.
	 *
	 * @param array $attributes The attributes for the bit.
	 * @return string The generated copyright HTML.
	 */
	public static function copyright( $attributes ) {
		$year = gmdate( 'Y' );
		if ( isset( $attributes['startYear'] ) && is_numeric( $attributes['startYear'] ) && (int) $attributes['startYear'] < (int) $year ) {
			$year = (int) $attributes['startYear'] . ' - ' . $year;
		}
		$holder = isset( $attributes['holder'] ) ? esc_html( $attributes['holder'] ) : 'Pew Research Center';
		return '<span class="prc-block-copyright">&copy; ' . $year . ' ' . $holder . '</span>';
	}
}

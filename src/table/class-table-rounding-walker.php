<?php
/**
 * Walk Power Table HTML and apply server-side rounding to body/footer cells (parity with view.js applyRoundingPhaseA).
 *
 * @package PRC\Platform\Blocks\Table
 */

namespace PRC\Platform\Blocks\Table;

/**
 * DOM-based walker — direct tbody/tr/td only (nested tables are not traversed as siblings of outer rows).
 */
class Rounding_Walker {

	/**
	 * Apply rounding to saved block HTML when column/cell rounding is configured.
	 *
	 * @param string $content    Full block HTML (typically figure.wp-block-prc-block-table).
	 * @param array  $attributes Block attributes (columnRoundDecimals, etc.).
	 * @return string
	 */
	public static function apply( $content, array $attributes ) {
		if ( ! self::attributes_have_rounding( $attributes ) ) {
			return $content;
		}

		$column_round = isset( $attributes['columnRoundDecimals'] ) && is_array( $attributes['columnRoundDecimals'] )
			? $attributes['columnRoundDecimals']
			: array();

		$dom      = new \DOMDocument( '1.0', 'UTF-8' );
		$internal = libxml_use_internal_errors( true );
		$wrapped  = '<div id="prc-table-rounding-root">' . $content . '</div>';
		$dom->loadHTML(
			'<?xml encoding="UTF-8">' . $wrapped,
			LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
		);
		libxml_clear_errors();
		libxml_use_internal_errors( $internal );

		$xpath   = new \DOMXPath( $dom );
		$figures = $xpath->query( "//div[@id='prc-table-rounding-root']//figure[contains(@class,'wp-block-prc-block-table')]" );
		if ( ! $figures || 0 === $figures->length ) {
			return $content;
		}

		$figure = $figures->item( 0 );
		$table  = null;
		foreach ( $figure->childNodes as $node ) {
			if ( XML_ELEMENT_NODE !== $node->nodeType ) {
				continue;
			}
			if ( 'table' === strtolower( $node->nodeName ) ) {
				$table = $node;
				break;
			}
		}
		if ( ! $table ) {
			return $content;
		}

		foreach ( $table->childNodes as $section ) {
			if ( XML_ELEMENT_NODE !== $section->nodeType ) {
				continue;
			}
			$name = strtolower( $section->nodeName );
			if ( 'tbody' === $name || 'tfoot' === $name ) {
				self::process_section( $dom, $section, $column_round );
			}
		}

		$root = $dom->getElementById( 'prc-table-rounding-root' );
		if ( ! $root || ! $root->firstChild ) {
			return $content;
		}

		$out = '';
		foreach ( $root->childNodes as $child ) {
			$out .= $dom->saveHTML( $child );
		}
		return $out;
	}

	/**
	 * @param array $attributes Block attributes.
	 * @return bool
	 */
	private static function attributes_have_rounding( array $attributes ) {
		$cols = isset( $attributes['columnRoundDecimals'] ) ? $attributes['columnRoundDecimals'] : array();
		if ( is_array( $cols ) ) {
			foreach ( $cols as $c ) {
				if ( null !== $c && is_numeric( $c ) && $c >= 1 && $c <= 10 ) {
					return true;
				}
			}
		}
		foreach ( array( 'body', 'foot' ) as $section ) {
			if ( empty( $attributes[ $section ] ) || ! is_array( $attributes[ $section ] ) ) {
				continue;
			}
			foreach ( $attributes[ $section ] as $row ) {
				if ( empty( $row['cells'] ) || ! is_array( $row['cells'] ) ) {
					continue;
				}
				foreach ( $row['cells'] as $cell ) {
					if ( isset( $cell['roundDecimals'] ) && is_numeric( $cell['roundDecimals'] ) && $cell['roundDecimals'] >= 1 && $cell['roundDecimals'] <= 10 ) {
						return true;
					}
				}
			}
		}
		return false;
	}

	/**
	 * @param \DOMDocument $dom          Document.
	 * @param \DOMElement  $section      tbody or tfoot.
	 * @param array        $column_round Column round decimals.
	 */
	private static function process_section( \DOMDocument $dom, \DOMElement $section, array $column_round ) {
		foreach ( $section->childNodes as $tr ) {
			if ( XML_ELEMENT_NODE !== $tr->nodeType || 'tr' !== strtolower( $tr->nodeName ) ) {
				continue;
			}
			foreach ( $tr->childNodes as $cell ) {
				if ( XML_ELEMENT_NODE !== $cell->nodeType ) {
					continue;
				}
				$name = strtolower( $cell->nodeName );
				if ( 'td' !== $name && 'th' !== $name ) {
					continue;
				}
				self::maybe_round_cell( $dom, $cell, $column_round );
			}
		}
	}

	/**
	 * @param \DOMDocument $dom          Document.
	 * @param \DOMElement  $cell         td or th.
	 * @param array        $column_round Column defaults.
	 */
	private static function maybe_round_cell( \DOMDocument $dom, \DOMElement $cell, array $column_round ) {
		foreach ( $cell->childNodes as $child ) {
			if ( XML_ELEMENT_NODE === $child->nodeType ) {
				return;
			}
		}

		$v_col_attr = $cell->getAttribute( 'data-prc-v-col' );
		$cell_round = $cell->getAttribute( 'data-prc-round-decimals' );
		$effective  = Round_Display::get_effective_round_decimals( $v_col_attr, $cell_round, $column_round );
		if ( null === $effective ) {
			return;
		}

		$inner_html = '';
		foreach ( $cell->childNodes as $child ) {
			$inner_html .= $dom->saveHTML( $child );
		}

		$rounded = Round_Display::round_plain_html_text_for_display( $inner_html, $effective );
		if ( null === $rounded ) {
			return;
		}

		$plain_for_sort = trim( Round_Display::strip_html_to_plain( $inner_html ) );
		if ( '' !== $plain_for_sort ) {
			$cell->setAttribute( 'data-sort-value', $plain_for_sort );
		}

		while ( $cell->firstChild ) {
			$cell->removeChild( $cell->firstChild );
		}
		$cell->appendChild( $dom->createTextNode( $rounded ) );
	}
}

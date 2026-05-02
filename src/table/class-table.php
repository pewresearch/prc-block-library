<?php
/**
 * Block Name:        Table
 * Description:       A fork of Aki Hamano's Flexible Table Block.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein and Aki Hamano
 *
 * @package           prc-block
 */

namespace PRC\Platform\Blocks;

define( 'FTB_BLOCK_CLASS', 'wp-block-prc-block-table' );
define( 'FTB_NAMESPACE', 'flexible-table-block' );
define( 'FTB_OPTION_PREFIX', 'flexible_table_block' );
define( 'FTB_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'FTB_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );

/**
 * Table Block
 *
 * @package           prc-block
 */
class Table {
	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		require_once PRC_BLOCK_LIBRARY_DIR . '/build/table/class-helper.php';
		require_once PRC_BLOCK_LIBRARY_DIR . '/build/table/class-settings.php';
		require_once PRC_BLOCK_LIBRARY_DIR . '/build/table/class-api.php';
		require_once PRC_BLOCK_LIBRARY_DIR . '/build/table/class-round-display.php';
		require_once PRC_BLOCK_LIBRARY_DIR . '/build/table/class-table-rounding-walker.php';

		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_action( 'enqueue_block_assets', $this, 'enqueue_additional_styles' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'enqueue_validation_schemas' );
			new Table\API( $loader );
		}
	}

	/**
	 * Collect schemas registered via the prc_table_validation_schemas filter and
	 * expose them to the block editor as window.prcTableValidationSchemas.
	 *
	 * Schema shape (each array item):
	 *   slug          string   Machine-readable identifier, e.g. "geo-state"
	 *   label         string   Human-readable name shown in the SelectControl
	 *   requiredTypes string[] ColumnDataType values the schema requires at least one of
	 *
	 * Other plugins register schemas by hooking prc_table_validation_schemas and
	 * appending to the $schemas array. The table block itself registers nothing.
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function enqueue_validation_schemas() {
		/**
		 * Filters the list of validation schemas available in the table block editor.
		 *
		 * @param array[] $schemas Array of schema objects. Each item must contain:
		 *                         - slug (string)
		 *                         - label (string)
		 *                         - requiredTypes (string[])
		 */
		$schemas = apply_filters( 'prc_table_validation_schemas', array() );

		if ( ! is_array( $schemas ) ) {
			$schemas = array();
		}

		wp_localize_script( 'wp-blocks', 'prcTableValidationSchemas', $schemas );
	}

	/**
	 * Enqueue additional "global table styles"
	 *
	 * @hook enqueue_block_assets
	 */
	public function enqueue_additional_styles() {
		if ( ! is_admin() ) {
			return;
		}
		$block_css = Table\Helper::get_block_css( '.editor-styles-wrapper ' );
		$css       = Table\Helper::minify_css( $block_css );
		wp_add_inline_style( 'prc-block-table-editor-style', $css );
	}

	/**
	 * Block init
	 *
	 * @hook init
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/table',
			array(
				'render_callback' => array( self::class, 'render_block' ),
			)
		);
	}

	/**
	 * Whether column or per-cell rounding is configured.
	 *
	 * Checks the unified columnMeta array first, then falls back to the legacy
	 * columnRoundDecimals parallel array for pre-migration blocks.
	 *
	 * @param array $attributes Block attributes.
	 * @return bool
	 */
	private static function has_rounding( $attributes ) {
		// Check unified columnMeta first.
		$column_meta = isset( $attributes['columnMeta'] ) ? $attributes['columnMeta'] : array();
		if ( is_array( $column_meta ) ) {
			foreach ( $column_meta as $meta ) {
				if ( isset( $meta['roundDecimals'] ) && is_numeric( $meta['roundDecimals'] ) && $meta['roundDecimals'] >= 1 && $meta['roundDecimals'] <= 10 ) {
					return true;
				}
			}
		}

		// Legacy fallback: columnRoundDecimals parallel array.
		$cols = isset( $attributes['columnRoundDecimals'] ) ? $attributes['columnRoundDecimals'] : array();
		if ( is_array( $cols ) ) {
			foreach ( $cols as $c ) {
				if ( null !== $c && is_numeric( $c ) && $c >= 1 && $c <= 10 ) {
					return true;
				}
			}
		}

		// Per-cell roundDecimals on body/foot cells.
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
	 * Inject sort-related directives on thead header cells (first row only).
	 *
	 * @param string $html       Block HTML.
	 * @param array  $attributes Block attributes.
	 * @return string
	 */
	private static function inject_header_sort_directives( $html, $attributes ) {
		$is_sortable = ! empty( $attributes['isSortable'] );
		if ( ! $is_sortable ) {
			return $html;
		}

		// Derive sortable columns from columnMeta when available.
		$column_meta = isset( $attributes['columnMeta'] ) && is_array( $attributes['columnMeta'] ) ? $attributes['columnMeta'] : array();
		if ( ! empty( $column_meta ) ) {
			$sortable_columns = array();
			$all_sortable     = true;
			foreach ( $column_meta as $i => $meta ) {
				if ( isset( $meta['sortable'] ) && false === $meta['sortable'] ) {
					$all_sortable = false;
				} else {
					$sortable_columns[] = $i;
				}
			}
			// Empty array = all columns sortable (legacy convention).
			if ( $all_sortable ) {
				$sortable_columns = array();
			}
		} else {
			$sortable_columns = isset( $attributes['sortableColumns'] ) && is_array( $attributes['sortableColumns'] ) ? $attributes['sortableColumns'] : array();
		}

		$p              = new \WP_HTML_Tag_Processor( $html );
		$in_thead       = false;
		$thead_tr_index = 0;
		$v_col          = 0;

		while ( $p->next_tag( array( 'tag_closers' => 'visit' ) ) ) {
			$tag = $p->get_tag();
			if ( 'THEAD' === $tag ) {
				if ( $p->is_tag_closer() ) {
					$in_thead       = false;
					$thead_tr_index = 0;
				} else {
					$in_thead       = true;
					$thead_tr_index = 0;
				}
				continue;
			}
			if ( ! $in_thead ) {
				continue;
			}
			if ( 'TR' === $tag ) {
				if ( ! $p->is_tag_closer() ) {
					++$thead_tr_index;
					if ( 1 === $thead_tr_index ) {
						$v_col = 0;
					}
				}
				continue;
			}
			if ( ( 'TH' === $tag || 'TD' === $tag ) && ! $p->is_tag_closer() && 1 === $thead_tr_index ) {
				$colspan = (int) $p->get_attribute( 'colspan' );
				if ( $colspan < 1 ) {
					$colspan = 1;
				}
				$is_cell_sortable = empty( $sortable_columns ) || in_array( $v_col, $sortable_columns, true );
				if ( $is_cell_sortable && ! $p->get_attribute( 'data-wp-on--click' ) ) {
					$p->set_attribute( 'data-wp-on--click', 'actions.onHeaderClick' );
					$p->set_attribute( 'data-column-index', (string) $v_col );
					$p->set_attribute( 'role', 'button' );
					$p->set_attribute( 'tabindex', '0' );
					$class = $p->get_attribute( 'class' );
					if ( $class && false === strpos( $class, 'is-sortable' ) ) {
						$p->set_attribute( 'class', trim( $class . ' is-sortable' ) );
					} elseif ( ! $class ) {
						$p->set_attribute( 'class', 'is-sortable' );
					}
				}
				$v_col += $colspan;
			}
		}

		return $p->get_updated_html();
	}

	/**
	 * Block render callback — inject Interactivity API attributes not stored in post content.
	 *
	 * @param array     $attributes Block attributes.
	 * @param string    $content    Saved HTML.
	 * @param \WP_Block $block      Block instance.
	 * @return string
	 */
	public static function render_block( $attributes, $content, $block ) {
		if ( empty( $content ) ) {
			return $content;
		}

		$sortable     = ! empty( $attributes['isSortable'] );
		$has_rounding = self::has_rounding( $attributes );

		if ( ! $sortable && ! $has_rounding ) {
			return $content;
		}

		// Server-side rounding for front end (editor keeps raw RichText in post content).
		if ( $has_rounding && ! is_admin() ) {
			$content = \PRC\Platform\Blocks\Table\Rounding_Walker::apply( $content, $attributes );
		}

		if ( ! $sortable ) {
			return $content;
		}

		// Server-side rounding for front end (editor keeps raw RichText in post content).
		if ( $has_rounding && ! is_admin() ) {
			$content = \PRC\Platform\Blocks\Table\Rounding_Walker::apply( $content, $attributes );
		}

		if ( ! $sortable ) {
			return $content;
		}

		$p = new \WP_HTML_Tag_Processor( $content );
		if ( ! $p->next_tag( array( 'tag_name' => 'figure' ) ) ) {
			return $content;
		}

		$figure_class = $p->get_attribute( 'class' );
		if ( ! $figure_class || false === strpos( $figure_class, 'wp-block-prc-block-table' ) ) {
			return $content;
		}

		if ( ! $p->get_attribute( 'data-wp-interactive' ) ) {
			$p->set_attribute( 'data-wp-interactive', 'prc-block/table' );

			// Resolve sortableColumns and columnRoundDecimals from columnMeta
			// (with fallback to legacy parallel arrays for pre-migration blocks).
			$column_meta     = isset( $attributes['columnMeta'] ) && is_array( $attributes['columnMeta'] ) ? $attributes['columnMeta'] : array();
			$legacy_sortable = isset( $attributes['sortableColumns'] ) && is_array( $attributes['sortableColumns'] ) ? $attributes['sortableColumns'] : array();
			$legacy_rounding = isset( $attributes['columnRoundDecimals'] ) && is_array( $attributes['columnRoundDecimals'] ) ? $attributes['columnRoundDecimals'] : array();

			if ( ! empty( $column_meta ) ) {
				// Derive from unified columnMeta.
				$sortable_columns = array();
				$column_round     = array();
				foreach ( $column_meta as $i => $meta ) {
					if ( isset( $meta['sortable'] ) && false === $meta['sortable'] ) {
						// Explicitly non-sortable — skip (we track by inclusion in the legacy model).
					} else {
						$sortable_columns[] = $i;
					}
					$column_round[] = isset( $meta['roundDecimals'] ) && is_numeric( $meta['roundDecimals'] ) ? (int) $meta['roundDecimals'] : null;
				}
				// If all columns are sortable, pass empty array (front-end treats empty = all sortable).
				$all_count = count( $column_meta );
				if ( count( $sortable_columns ) === $all_count ) {
					$sortable_columns = array();
				}
			} else {
				// Legacy fallback.
				$sortable_columns = $legacy_sortable;
				$column_round     = $legacy_rounding;
			}

			$p->set_attribute(
				'data-wp-context',
				wp_json_encode(
					array(
						'sortColumn'          => null,
						'sortDirection'       => 'none',
						'sortableColumns'     => $sortable_columns,
						'columnRoundDecimals' => $column_round,
						'columnMeta'          => $column_meta,
					),
					JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
				)
			);
			$p->set_attribute( 'data-wp-init', 'callbacks.onInit' );
		}

		$content = $p->get_updated_html();

		return self::inject_header_sort_directives( $content, $attributes );
	}
}

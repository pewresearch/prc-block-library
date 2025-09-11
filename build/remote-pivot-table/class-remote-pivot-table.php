<?php
/**
 * The loader block class.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use RemoteDataBlocks\Editor\DataBinding\BlockBindings;

/**
 * Block Name:        Remote Pivot Table
 * Description:       A block that pivots the data of a remote tabular data source.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-platform
 */
class Remote_Pivot_Table {
	/**
	 * Constructor.
	 *
	 * @param object $loader The loader object.
	 */
	public function __construct( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_action( 'init', $this, 'register_block_bindings' );
			$loader->add_filter( 'render_block_context', $this, 'pivot_in_context', 10, 2 );
		}
	}

	/**
	 * Register block bindings for remote pivot table sum functionality.
	 *
	 * Registers a block binding source 'prc-block/remote-pivot-table-sum' that allows
	 * other blocks to display the sum of raw values for a specified column from remote
	 * pivot table data.
	 *
	 * Usage example in block attributes:
	 * {
	 *   "metadata": {
	 *     "bindings": {
	 *       "content": {
	 *         "source": "prc-block/remote-pivot-table-sum",
	 *         "args": {
	 *           "column": "revenue"
	 *         }
	 *       }
	 *     }
	 *   }
	 * }
	 *
	 * This binding will extract and sum all numeric 'value' fields from the specified
	 * column in the remote data context. It handles both array-based raw_value
	 * structures with a 'value' key and simple numeric values.
	 *
	 * @hook init
	 */
	public function register_block_bindings() {
		register_block_bindings_source(
			'prc-block/remote-pivot-table-sum',
			array(
				'label'              => __( 'Remote Pivot Table Sum', 'prc-block-library' ),
				'get_value_callback' => array( $this, 'get_column_sum_binding' ),
				'uses_context'       => array( 'remote-data-blocks/remoteData' ),
			)
		);
	}

	/**
	 * Get the sum of raw values for a specified column from pivot table data.
	 *
	 * @param array    $source_args   The source arguments containing the column name.
	 * @param WP_Block $block         The block object with context.
	 * @param string   $attribute_name The attribute name being bound.
	 * @return string|int|float       The sum of raw values for the specified column.
	 */
	public function get_column_sum_binding( $source_args, $block, $attribute_name ) {
		$column_name = $source_args['column'] ?? null;
		if ( empty( $column_name ) ) {
			return 0;
		}

		$block_context       = $block->context;
		$remote_data_context = $block_context['remote-data-blocks/remoteData'] ?? array();

		if ( empty( $remote_data_context ) || empty( $remote_data_context['results'] ) ) {
			return 0;
		}

		return $this->calculate_column_sum( $remote_data_context['results'], $column_name );
	}

	/**
	 * Calculate the sum of raw values for a specified column.
	 *
	 * @param array  $results     The remote data results array.
	 * @param string $column_name The column name to sum.
	 * @return int|float          The sum of raw values for the column.
	 */
	public function calculate_column_sum( $results, $column_name ) {
		$sum = 0;

		foreach ( $results as $result ) {
			if ( ! isset( $result['result'] ) || ! is_array( $result['result'] ) ) {
				continue;
			}

			$row_data = $result['result'];
			if ( ! isset( $row_data[ $column_name ] ) ) {
				continue;
			}

			$raw_value = $row_data[ $column_name ];

			// Extract the numeric value from the raw_value structure.
			$value = ( is_array( $raw_value ) && array_key_exists( 'value', $raw_value ) )
				? $raw_value['value']
				: $raw_value;

			// Only sum numeric values.
			if ( is_numeric( $value ) ) {
				$sum += (float) $value;
			}
		}

		return $sum;
	}

	/**
	 * Pivots the data based on the data source.
	 *
	 * Mirrors the editor JS behavior:
	 * - dataSource 'row': object keyed by primary key value, each value contains only selected columns (excluding the primary key itself)
	 * - dataSource 'column': object keyed by each selected column, each value maps primary key values to that column's value
	 *
	 * @param array  $columns          List of column names available in the dataset.
	 * @param array  $rows             List of row arrays (field => value). Primary key field may be an array with a 'value' key.
	 * @param string $data_source      Either 'row' or 'column'.
	 * @param array  $selected_columns Column names selected by the user.
	 * @param string $primary_key      Column name to use as primary key.
	 * @return array                   Pivoted data structure.
	 */
	public function pivot_data( $columns, $rows, $data_source, $selected_columns, $primary_key ) {
		$pivoted = array();

		if ( 'row' === $data_source ) {
			foreach ( $rows as $item ) {
				$pk_field = $item[ $primary_key ] ?? null;
				$pk_value = is_array( $pk_field ) && array_key_exists( 'value', $pk_field ) ? $pk_field['value'] : $pk_field;
				if ( empty( $pk_value ) ) {
					continue;
				}
				$pivoted[ $pk_value ] = array_filter(
					$item,
					function ( $value, $key ) use ( $selected_columns, $primary_key ) {
						return ( $key !== $primary_key ) && in_array( $key, $selected_columns, true );
					},
					ARRAY_FILTER_USE_BOTH
				);
			}
		} elseif ( 'column' === $data_source ) {
			foreach ( $columns as $column_name ) {
				if ( ! in_array( $column_name, $selected_columns, true ) ) {
					continue;
				}
				if ( ! isset( $pivoted[ $column_name ] ) ) {
					$pivoted[ $column_name ] = array();
				}
				foreach ( $rows as $item ) {
					$pk_field = $item[ $primary_key ] ?? null;
					$pk_value = is_array( $pk_field ) && array_key_exists( 'value', $pk_field ) ? $pk_field['value'] : $pk_field;
					if ( empty( $pk_value ) ) {
						continue;
					}
					$pivoted[ $column_name ][ $pk_value ] = $item[ $column_name ] ?? null;
				}
			}
		}

		return $pivoted;
	}

	/**
	 * Renders a pivoted table.
	 *
	 * @param array  $data The pivoted data.
	 * @param string $table_block_markup The original table block markup to use as a template.
	 * @return string HTML table markup
	 */
	public function render_pivoted_table( $data, $table_block_markup ) {
		if ( empty( $data ) || ! is_array( $data ) ) {
			return '';
		}

		// Sort data by raw values (highest to lowest).
		uasort(
			$data,
			function ( $a, $b ) {
				$value_a = ( is_array( $a ) && array_key_exists( 'value', $a ) ) ? $a['value'] : $a;
				$value_b = ( is_array( $b ) && array_key_exists( 'value', $b ) ) ? $b['value'] : $b;

				// Handle numeric values for proper sorting.
				if ( is_numeric( $value_a ) && is_numeric( $value_b ) ) {
					return $value_b <=> $value_a; // Descending order (highest first).
				}

				// For non-numeric values, convert to string and compare.
				$str_a = (string) $value_a;
				$str_b = (string) $value_b;
				return strcasecmp( $str_b, $str_a ); // Descending order.
			}
		);

		// Add comma separators to numeric values.
		$data = array_map(
			function ( $raw_value ) {
				$value = ( is_array( $raw_value ) && array_key_exists( 'value', $raw_value ) ) ? $raw_value['value'] : $raw_value;
				if ( is_numeric( $value ) ) {
					$formatted_value = number_format( (float) $value );
					// Preserve additional data if present.
					if ( is_array( $raw_value ) ) {
						$raw_value['value'] = $formatted_value;
						return $raw_value;
					}
					return $formatted_value;
				}
				return $raw_value;
			},
			$data
		);

		$rows_html = '';
		foreach ( $data as $key => $raw_value ) {
			$value      = ( is_array( $raw_value ) && array_key_exists( 'value', $raw_value ) ) ? $raw_value['value'] : $raw_value;
			$value      = ( is_scalar( $value ) || null === $value ) ? $value : wp_json_encode( $value );
			$rows_html .= wp_sprintf(
				'<tr><td>%1$s</td><td>%2$s</td></tr>',
				esc_html( (string) $key ),
				esc_html( (string) $value )
			);
		}

		// Regex replace whatever is inside <tbody>.*?</tbody> with $rows_html.

		$table_block_markup = preg_replace( '/<tbody>.*<\/tbody>/s', $rows_html, $table_block_markup );

		return $table_block_markup;
	}

	/**
	 * Pivots the data in context.
	 *
	 * @hook render_block_context
	 *
	 * @param array $block_context The block context.
	 * @param array $parsed_block  The parsed block.
	 * @return array The block context.
	 */
	public function pivot_in_context( $block_context, $parsed_block ) {
		if ( 'prc-block/remote-pivot-table' !== $parsed_block['blockName'] ) {
			return $block_context;
		}
		$remote_data_context = $block_context['remote-data-blocks/remoteData'] ?? array();
		if ( empty( $remote_data_context ) ) {
			return $block_context;
		}
		$attributes = $parsed_block['attrs'] ?? array();
		if ( empty( $attributes ) ) {
			return $block_context;
		}
		$data_source      = $attributes['dataSource'] ?? 'row';
		$selected_columns = $attributes['selectedColumns'] ?? array();
		$primary_key      = $attributes['primaryKey'] ?? 'id';
		$columns          = array_keys( $remote_data_context['results'][0]['result'] );
		$rows             = array_map(
			function ( $result ) {
				return $result['result'];
			},
			$remote_data_context['results']
		);
		$pivoted_data     = $this->pivot_data(
			$columns,
			$rows,
			$data_source,
			$selected_columns,
			$primary_key
		);
		$data_to_return   = array();
		foreach ( $pivoted_data as $key => $value ) {
			$data_to_return[] = array(
				'key'  => $key,
				'data' => $value,
			);
		}
		$block_context['remote-data-blocks/pivotedData'] = $data_to_return;
		return $block_context;
	}

	/**
	 * Render callback for the Remote Data Inverter block.
	 *
	 * Consumes remote data from context, pivots it to match editor behavior,
	 * and renders the inner blocks within a wrapper element.
	 *
	 * @param array  $attributes Block attributes (expects dataSource, selectedColumns, primaryKey).
	 * @param string $content    Block content (inner blocks markup).
	 * @param object $block      WP_Block instance providing context.
	 * @return string            Rendered HTML.
	 */
	public function render_remote_pivot_table_callback( $attributes, $content, $block ) {
		$inner_blocks = $block->inner_blocks;
		if ( empty( $inner_blocks ) ) {
			return '';
		}
		// Check if the first block is prc-block/tabs.
		$first_block = $inner_blocks[0];
		if ( 'prc-block/tabs' !== $first_block->name ) {
			return '';
		}
		$tabs_attributes = $first_block->attributes;
		// Get the tabs block's first tab innerblock and then get it's inner_blocks.
		$first_tab_block = $first_block->inner_blocks[0];
		if ( 'prc-block/tab' !== $first_tab_block->name ) {
			return '';
		}
		$first_tab_inner_blocks = $first_tab_block->inner_blocks;
		if ( empty( $first_tab_inner_blocks ) ) {
			return '';
		}
		$first_tab_inner_block = $first_tab_inner_blocks[0];
		if ( 'core/table' !== $first_tab_inner_block->name ) {
			return '';
		}
		$table_block        = $first_tab_inner_block;
		$table_block_markup = $table_block->render();

		$pivoted_data = $block->context['remote-data-blocks/pivotedData'] ?? array();
		if ( empty( $pivoted_data ) ) {
			return '';
		}

		$tabs = array();
		foreach ( $pivoted_data as $item ) {
			$tabs[] = array(
				'label'   => $item['key'],
				'content' => $this->render_pivoted_table( $item['data'], $table_block_markup ),
			);
		}
		$tabs = \PRC\Platform\Blocks\render_tabs( $tabs, $tabs_attributes );

		$block_wrapper_attributes = get_block_wrapper_attributes();
		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_wrapper_attributes,
			$tabs
		);
	}

	/**
	 * Initialize the block.
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/remote-pivot-table',
			array(
				'render_callback' => array( $this, 'render_remote_pivot_table_callback' ),
			)
		);
	}
}

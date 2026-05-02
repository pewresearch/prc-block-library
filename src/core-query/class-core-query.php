<?php
/**
 * Core Query block integration (only top-level posts).
 *
 * @package PRC\Platform\Blocks
 */

declare(strict_types=1);

namespace PRC\Platform\Blocks;

/**
 * Block Name:        core/query
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      8.2
 *
 * @package prc-block-library
 */
class Core_Query {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	public string $block_name = 'core/query';

	/**
	 * Block json from the library manifest.
	 *
	 * @var array<string, mixed>
	 */
	public array $block_json;

	/**
	 * Editor script handle.
	 *
	 * @var string
	 */
	public string $editor_script_handle = '';

	/**
	 * Nesting depth of core/query blocks currently in pre_render/render (supports nested Query blocks).
	 *
	 * @var int
	 */
	private int $query_block_depth = 0;

	/**
	 * Callback registered on query_loop_block_query_vars when onlyQueryParents is active.
	 *
	 * @var callable|null
	 */
	private $query_loop_filter_callback = null;

	/**
	 * Constructor.
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-query' );
		$this->init( $loader );
	}

	/**
	 * Initialize hooks.
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ): void {
		if ( null === $loader ) {
			return;
		}
		$loader->add_action( 'init', $this, 'register_assets' );
		$loader->add_action( 'enqueue_block_editor_assets', $this, 'enqueue_editor_script' );
		$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
		$loader->add_filter( 'pre_render_block', $this, 'maybe_add_query_loop_filter', 10, 3 );
		$loader->add_filter( 'render_block', $this, 'maybe_remove_query_loop_filter', 10, 2 );
	}

	/**
	 * Register script handles from block.json.
	 *
	 * @hook init
	 */
	public function register_assets(): void {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
	}

	/**
	 * Load editor script in the block editor.
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function enqueue_editor_script(): void {
		if ( '' === $this->editor_script_handle ) {
			return;
		}
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * Register onlyQueryParents on core/query server-side.
	 *
	 * @hook block_type_metadata
	 *
	 * @param array<string, mixed> $metadata Metadata.
	 * @return array<string, mixed>
	 */
	public function add_attributes( array $metadata ): array {
		if ( $this->block_name !== ( $metadata['name'] ?? '' ) ) {
			return $metadata;
		}
		if ( ! isset( $metadata['attributes'] ) || ! is_array( $metadata['attributes'] ) ) {
			$metadata['attributes'] = array();
		}
		if ( ! array_key_exists( 'onlyQueryParents', $metadata['attributes'] ) ) {
			$metadata['attributes']['onlyQueryParents'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}
		return $metadata;
	}

	/**
	 * When a core/query with onlyQueryParents is about to render, register query_loop_block_query_vars for that subtree.
	 *
	 * @hook pre_render_block
	 *
	 * @param mixed                $pre_render   Pre-render value.
	 * @param array<string, mixed> $parsed_block Parsed block.
	 * @param mixed                $parent_block Parent block (unused).
	 * @return mixed
	 */
	public function maybe_add_query_loop_filter( $pre_render, $parsed_block, $parent_block ) {
		if ( ! is_array( $parsed_block ) || $this->block_name !== ( $parsed_block['blockName'] ?? '' ) ) {
			return $pre_render;
		}
		$attrs = $parsed_block['attrs'] ?? array();
		if ( empty( $attrs['onlyQueryParents'] ) ) {
			return $pre_render;
		}

		++$this->query_block_depth;
		if ( 1 !== $this->query_block_depth ) {
			return $pre_render;
		}

		$this->query_loop_filter_callback = function ( $query ) {
			$query['post_parent'] = 0;
			return $query;
		};
		add_filter( 'query_loop_block_query_vars', $this->query_loop_filter_callback, 10, 2 );

		return $pre_render;
	}

	/**
	 * After a core/query with onlyQueryParents finishes rendering, remove the filter if this was the outermost such block.
	 *
	 * @hook render_block
	 *
	 * @param string               $block_content HTML.
	 * @param array<string, mixed> $block         Parsed block.
	 * @return string
	 */
	public function maybe_remove_query_loop_filter( string $block_content, array $block ): string {
		if ( $this->block_name !== ( $block['blockName'] ?? '' ) ) {
			return $block_content;
		}
		$attrs = $block['attrs'] ?? array();
		if ( empty( $attrs['onlyQueryParents'] ) ) {
			return $block_content;
		}

		if ( $this->query_block_depth < 1 ) {
			return $block_content;
		}

		if ( 1 === $this->query_block_depth && null !== $this->query_loop_filter_callback ) {
			remove_filter( 'query_loop_block_query_vars', $this->query_loop_filter_callback, 10 );
			$this->query_loop_filter_callback = null;
		}

		--$this->query_block_depth;

		return $block_content;
	}
}

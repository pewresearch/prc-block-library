<?php
/**
 * Integration with prc-markdown-for-agents plugin.
 *
 * Registers markdown callbacks for interactive block types (tabs, accordion,
 * timeline, table-of-contents, collapsible, details) so they produce clean,
 * structured Markdown instead of falling through to the HTML→Markdown
 * fallback (which produces garbled output for Interactivity API blocks).
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use PRC\Platform\Markdown_For_Agents\Block_Markdown_Registry;
use PRC\Platform\Markdown_For_Agents\Markdown_Converter;

/**
 * Connects prc-block-library with prc-markdown-for-agents.
 *
 * @package PRC\Platform\Blocks
 */
class Markdown_For_Agents_Integration {

	/**
	 * Constructor.
	 *
	 * @param Loader $loader The loader instance.
	 */
	public function __construct( $loader ) {
		$loader->add_action(
			'prc_markdown_for_agents_register_block_callbacks',
			$this,
			'register_block_callbacks'
		);
		$loader->add_filter( 'prc_markdown_for_agents_toc_for_post', $this, 'filter_toc_for_post', 10, 2 );
	}

	/**
	 * Register markdown callbacks for block library blocks.
	 *
	 * @hook prc_markdown_for_agents_register_block_callbacks
	 */
	public function register_block_callbacks() {
		if ( ! class_exists( Block_Markdown_Registry::class ) ) {
			return;
		}

		// core/details — collapsible <details> block.
		Block_Markdown_Registry::register(
			'core/details',
			array( $this, 'details_to_markdown' )
		);

		// core/tabs — WordPress core tabs container.
		Block_Markdown_Registry::register(
			'core/tabs',
			array( $this, 'core_tabs_to_markdown' )
		);

		// Suppress individual core tab-related blocks (handled by parent).
		Block_Markdown_Registry::register( 'core/tab-list', '__return_empty_string' );
		Block_Markdown_Registry::register( 'core/tab-panels', '__return_empty_string' );
		Block_Markdown_Registry::register( 'core/tab-panel', '__return_empty_string' );

		// prc-block/tabs — PRC custom tabs container.
		Block_Markdown_Registry::register(
			'prc-block/tabs',
			array( $this, 'prc_tabs_to_markdown' )
		);
		Block_Markdown_Registry::register( 'prc-block/tab', '__return_empty_string' );

		// prc-block/accordion-controller — PRC accordion container.
		Block_Markdown_Registry::register(
			'prc-block/accordion-controller',
			array( $this, 'accordion_controller_to_markdown' )
		);
		Block_Markdown_Registry::register( 'prc-block/accordion', '__return_empty_string' );

		// prc-block/collapsible — PRC collapsible block (details-like).
		Block_Markdown_Registry::register(
			'prc-block/collapsible',
			array( $this, 'collapsible_to_markdown' )
		);

		// prc-block/timeline — PRC timeline container.
		Block_Markdown_Registry::register(
			'prc-block/timeline',
			array( $this, 'timeline_to_markdown' )
		);
		Block_Markdown_Registry::register( 'prc-block/timeline-slide', '__return_empty_string' );

		// prc-block/table-of-contents — PRC table of contents.
		Block_Markdown_Registry::register(
			'prc-block/table-of-contents',
			array( $this, 'table_of_contents_to_markdown' )
		);

		// core/image — preserve alignment and width as Pandoc-style attributes.
		Block_Markdown_Registry::register(
			'core/image',
			array( $this, 'image_to_markdown' )
		);
	}

	/**
	 * Convert a core/image block to Markdown, preserving alignment via
	 * Pandoc-style attributes: ![alt](url){.alignright width=280}
	 *
	 * Email providers (and other format specs) can read these attributes to
	 * emit alignment-aware HTML without losing the information during the
	 * HTML→Markdown conversion step.
	 *
	 * @param array    $block Parsed block array.
	 * @param \WP_Post $post  The post being converted.
	 * @return string Markdown image string, optionally with Pandoc attributes.
	 */
	public function image_to_markdown( array $block, \WP_Post $post ): string {
		$attrs     = $block['attrs'] ?? array();
		$align     = $attrs['align'] ?? null;      // left|right|center|wide|full|null
		$width     = isset( $attrs['width'] ) ? (int) $attrs['width'] : 0;
		$inner_html = $block['innerHTML'] ?? '';

		// Parse src, alt, and optional link href from the rendered innerHTML.
		$src  = '';
		$alt  = '';
		$href = '';

		$processor = new \WP_HTML_Tag_Processor( $inner_html );

		// Look for a wrapping <a> before the <img>.
		if ( $processor->next_tag( 'a' ) ) {
			$href = (string) $processor->get_attribute( 'href' );
		}

		// Reset and find <img>.
		$processor = new \WP_HTML_Tag_Processor( $inner_html );
		if ( $processor->next_tag( 'img' ) ) {
			$src = (string) $processor->get_attribute( 'src' );
			$alt = (string) $processor->get_attribute( 'alt' );
		}

		if ( '' === $src ) {
			return '';
		}

		// No alignment — plain markdown image, no annotation needed.
		if ( null === $align ) {
			$image_md = sprintf( '![%s](%s)', $alt, $src );
			return $href ? sprintf( '[![%s](%s)](%s)', $alt, $src, $href ) : $image_md;
		}

		// Build Pandoc-style attribute list: {.alignright width=280}
		$pandoc_attrs = array( '.align' . $align );

		if ( in_array( $align, array( 'left', 'right' ), true ) ) {
			$pandoc_attrs[] = 'width=' . ( $width ?: 280 );
		} elseif ( 'center' === $align ) {
			$pandoc_attrs[] = 'width=' . ( $width ?: 400 );
		}

		$image_md = sprintf( '![%s](%s){%s}', $alt, $src, implode( ' ', $pandoc_attrs ) );

		// Preserve link wrapping if present.
		return $href ? sprintf( '[%s](%s)', $image_md, $href ) : $image_md;
	}

	/**
	 * Provide TOC markdown for a post when it is part of a report package.
	 *
	 * @param string   $toc_markdown Incoming value (default empty).
	 * @param \WP_Post $post        The post being converted.
	 * @return string TOC markdown or the passed-through value.
	 */
	public function filter_toc_for_post( $toc_markdown, $post ) {
		$parent_id = wp_get_post_parent_id( $post->ID );
		$parent_id = ( 0 === $parent_id ) ? $post->ID : $parent_id;

		$chapters = get_post_meta( $parent_id, 'multiSectionReport', true );
		if ( is_array( $chapters ) && isset( $chapters['key'] ) && isset( $chapters['postId'] ) ) {
			$chapters = array( $chapters );
		}

		if ( empty( $chapters ) ) {
			return $toc_markdown;
		}

		return $this->table_of_contents_to_markdown( array( 'blockName' => 'prc-block/table-of-contents' ), $post );
	}

	/**
	 * Return the markdown URL for a post (permalink + /markdown).
	 *
	 * @param int $post_id Post ID.
	 * @return string URL to the markdown version of the post.
	 */
	private function get_markdown_permalink( $post_id ) {
		return rtrim( get_permalink( $post_id ), '/' ) . '/markdown';
	}

	/**
	 * Recursively convert inner blocks to markdown using the converter pipeline.
	 *
	 * @param array    $inner_blocks Array of parsed inner block arrays.
	 * @param \WP_Post $post         The post being converted.
	 * @return string Markdown string.
	 */
	private function convert_inner_blocks( array $inner_blocks, \WP_Post $post ): string {
		$converter = new Markdown_Converter();
		return $converter->blocks_to_markdown( $inner_blocks, $post );
	}

	/**
	 * Convert core/details block to markdown.
	 *
	 * Extracts the <summary> text and recursively converts innerBlocks.
	 *
	 * @param array    $block Parsed block array.
	 * @param \WP_Post $post  The post being converted.
	 * @return string Markdown representation.
	 */
	public function details_to_markdown( array $block, \WP_Post $post ): string {
		$summary = '';
		$html    = $block['innerHTML'] ?? '';
		if ( preg_match( '/<summary[^>]*>(.*?)<\/summary>/si', $html, $matches ) ) {
			$summary = html_entity_decode( wp_strip_all_tags( $matches[1] ) );
		}

		$inner_md = $this->convert_inner_blocks( $block['innerBlocks'] ?? array(), $post );

		$parts = array();
		if ( '' !== $summary ) {
			$parts[] = '**' . $summary . '**';
		}
		if ( '' !== trim( $inner_md ) ) {
			$parts[] = $inner_md;
		}

		return implode( "\n\n", $parts );
	}

	/**
	 * Convert core/tabs block to markdown.
	 *
	 * Walks innerBlocks to find core/tab-panels → core/tab-panel children.
	 * Each tab's label becomes a heading, followed by its inner content.
	 *
	 * @param array    $block Parsed block array.
	 * @param \WP_Post $post  The post being converted.
	 * @return string Markdown representation.
	 */
	public function core_tabs_to_markdown( array $block, \WP_Post $post ): string {
		$parts = array();

		foreach ( $block['innerBlocks'] ?? array() as $inner ) {
			$name = $inner['blockName'] ?? '';

			if ( 'core/tab-panels' === $name ) {
				foreach ( $inner['innerBlocks'] ?? array() as $tab_panel ) {
					if ( 'core/tab-panel' !== ( $tab_panel['blockName'] ?? '' ) ) {
						continue;
					}
					$label   = $tab_panel['attrs']['label'] ?? '';
					$tab_md  = $this->convert_inner_blocks( $tab_panel['innerBlocks'] ?? array(), $post );
					$heading = '' !== $label ? '### ' . html_entity_decode( wp_strip_all_tags( $label ) ) : '';

					$tab_parts = array_filter( array( $heading, $tab_md ) );
					if ( ! empty( $tab_parts ) ) {
						$parts[] = implode( "\n\n", $tab_parts );
					}
				}
			}
		}

		return implode( "\n\n", $parts );
	}

	/**
	 * Convert prc-block/tabs block to markdown.
	 *
	 * Iterates prc-block/tab children, extracting their label attr.
	 *
	 * @param array    $block Parsed block array.
	 * @param \WP_Post $post  The post being converted.
	 * @return string Markdown representation.
	 */
	public function prc_tabs_to_markdown( array $block, \WP_Post $post ): string {
		$parts = array();

		foreach ( $block['innerBlocks'] ?? array() as $tab ) {
			if ( 'prc-block/tab' !== ( $tab['blockName'] ?? '' ) ) {
				continue;
			}
			$label   = $tab['attrs']['label'] ?? '';
			$tab_md  = $this->convert_inner_blocks( $tab['innerBlocks'] ?? array(), $post );
			$heading = '' !== $label ? '### ' . html_entity_decode( wp_strip_all_tags( $label ) ) : '';

			$tab_parts = array_filter( array( $heading, $tab_md ) );
			if ( ! empty( $tab_parts ) ) {
				$parts[] = implode( "\n\n", $tab_parts );
			}
		}

		return implode( "\n\n", $parts );
	}

	/**
	 * Convert prc-block/accordion-controller to markdown.
	 *
	 * Each prc-block/accordion child has a `title` attr (sourced from HTML).
	 * Falls back to parsing the title from innerHTML if the attr is missing.
	 *
	 * @param array    $block Parsed block array.
	 * @param \WP_Post $post  The post being converted.
	 * @return string Markdown representation.
	 */
	public function accordion_controller_to_markdown( array $block, \WP_Post $post ): string {
		$parts = array();

		foreach ( $block['innerBlocks'] ?? array() as $accordion ) {
			if ( 'prc-block/accordion' !== ( $accordion['blockName'] ?? '' ) ) {
				continue;
			}

			$title = $accordion['attrs']['title'] ?? '';
			if ( '' === $title ) {
				$html = $accordion['innerHTML'] ?? '';
				if ( preg_match( '/class="[^"]*wp-block-prc-block-accordion__title-text[^"]*"[^>]*>(.*?)</si', $html, $matches ) ) {
					$title = html_entity_decode( wp_strip_all_tags( $matches[1] ) );
				}
			}

			$content_md = $this->convert_inner_blocks( $accordion['innerBlocks'] ?? array(), $post );

			$item_parts = array();
			if ( '' !== $title ) {
				$item_parts[] = '**' . html_entity_decode( wp_strip_all_tags( $title ) ) . '**';
			}
			if ( '' !== trim( $content_md ) ) {
				$item_parts[] = $content_md;
			}
			if ( ! empty( $item_parts ) ) {
				$parts[] = implode( "\n\n", $item_parts );
			}
		}

		return implode( "\n\n", $parts );
	}

	/**
	 * Convert prc-block/collapsible block to markdown.
	 *
	 * Similar to core/details — has a `title` attribute and innerBlocks.
	 *
	 * @param array    $block Parsed block array.
	 * @param \WP_Post $post  The post being converted.
	 * @return string Markdown representation.
	 */
	public function collapsible_to_markdown( array $block, \WP_Post $post ): string {
		$title    = $block['attrs']['title'] ?? '';
		$inner_md = $this->convert_inner_blocks( $block['innerBlocks'] ?? array(), $post );

		$parts = array();
		if ( '' !== $title ) {
			$parts[] = '**' . html_entity_decode( wp_strip_all_tags( $title ) ) . '**';
		}
		if ( '' !== trim( $inner_md ) ) {
			$parts[] = $inner_md;
		}

		return implode( "\n\n", $parts );
	}

	/**
	 * Convert prc-block/timeline block to markdown.
	 *
	 * Each prc-block/timeline-slide child stores the tick title in `metadata.name` (legacy: `label` string).
	 *
	 * @param array    $block Parsed block array.
	 * @param \WP_Post $post  The post being converted.
	 * @return string Markdown representation.
	 */
	public function timeline_to_markdown( array $block, \WP_Post $post ): string {
		$parts = array();

		foreach ( $block['innerBlocks'] ?? array() as $slide ) {
			if ( 'prc-block/timeline-slide' !== ( $slide['blockName'] ?? '' ) ) {
				continue;
			}

			$attrs = $slide['attrs'] ?? array();
			$name  = $attrs['metadata']['name'] ?? '';
			$label = is_string( $name ) ? trim( $name ) : '';
			if ( '' === $label ) {
				$legacy = $attrs['label'] ?? '';
				$label  = is_string( $legacy ) ? trim( $legacy ) : '';
			}
			$slide_md = $this->convert_inner_blocks( $slide['innerBlocks'] ?? array(), $post );
			$heading  = '' !== $label ? '### ' . html_entity_decode( wp_strip_all_tags( $label ) ) : '';

			$slide_parts = array_filter( array( $heading, $slide_md ) );
			if ( ! empty( $slide_parts ) ) {
				$parts[] = implode( "\n\n", $slide_parts );
			}
		}

		return implode( "\n\n", $parts );
	}

	/**
	 * Convert prc-block/table-of-contents block to markdown.
	 *
	 * Replicates the Table_Of_Contents::parse_toc_items() logic server-side
	 * to produce a linked Markdown list of chapters and sections without
	 * requiring Interactivity API runtime.
	 *
	 * @param array    $block Parsed block array.
	 * @param \WP_Post $post  The post being converted.
	 * @return string Markdown representation.
	 */
	public function table_of_contents_to_markdown( array $block, \WP_Post $post ): string {
		$post_id   = $post->ID;
		$parent_id = wp_get_post_parent_id( $post_id );
		$parent_id = 0 === $parent_id ? $post_id : $parent_id;

		$chapters      = get_post_meta( $parent_id, 'multiSectionReport', true );
		$package_parts = get_post_meta( $parent_id, 'package_parts', true );
		$parts_enabled = (bool) get_post_meta( $parent_id, 'package_parts__enabled', true );

		if ( is_array( $chapters ) && isset( $chapters['key'] ) && isset( $chapters['postId'] ) ) {
			$chapters = array( $chapters );
		}

		if ( empty( $chapters ) ) {
			return '';
		}

		$sections_for_post = $this->find_sections_in_post( $post );

		$parts = array( '## Table of Contents' );

		if ( empty( $package_parts ) || ! $parts_enabled ) {
			$index      = 1;
			$root_label = html_entity_decode( get_the_title( $parent_id ) );
			$root_url   = $this->get_markdown_permalink( $parent_id );
			$parts[]    = $index . '. [' . $root_label . '](' . $root_url . ')';

			if ( $parent_id === $post_id && ! empty( $sections_for_post ) ) {
				foreach ( $sections_for_post as $section_id => $section_label ) {
					$parts[] = '   - [' . $section_label . '](#' . $section_id . ')';
				}
			}

			foreach ( $chapters as $chapter ) {
				if ( ! is_array( $chapter ) || empty( $chapter['postId'] ) ) {
					continue;
				}
				++$index;
				$label   = html_entity_decode( get_the_title( $chapter['postId'] ) );
				$url     = $this->get_markdown_permalink( $chapter['postId'] );
				$parts[] = $index . '. [' . $label . '](' . $url . ')';

				if ( (int) $chapter['postId'] === $post_id && ! empty( $sections_for_post ) ) {
					foreach ( $sections_for_post as $section_id => $section_label ) {
						$parts[] = '   - [' . $section_label . '](#' . $section_id . ')';
					}
				}
			}
		} else {
			$root_label = html_entity_decode( get_the_title( $parent_id ) );
			$root_url   = $this->get_markdown_permalink( $parent_id );
			$parts[]    = '1. [' . $root_label . '](' . $root_url . ')';

			foreach ( $package_parts as $part ) {
				$part_label = $part['label'] ?? '';
				if ( '' === $part_label ) {
					continue;
				}
				$parts[]       = '';
				$parts[]       = '**' . html_entity_decode( wp_strip_all_tags( $part_label ) ) . '**';
				$part_items    = $part['items'] ?? array();
				$chapter_index = 1;

				foreach ( $chapters as $chapter ) {
					if ( ! is_array( $chapter ) || empty( $chapter['postId'] ) ) {
						continue;
					}
					if ( ! in_array( $chapter['postId'], $part_items, true ) ) {
						continue;
					}
					$label   = html_entity_decode( get_the_title( $chapter['postId'] ) );
					$url     = $this->get_markdown_permalink( $chapter['postId'] );
					$parts[] = $chapter_index . '. [' . $label . '](' . $url . ')';

					if ( (int) $chapter['postId'] === $post_id && ! empty( $sections_for_post ) ) {
						foreach ( $sections_for_post as $section_id => $section_label ) {
							$parts[] = '   - [' . $section_label . '](#' . $section_id . ')';
						}
					}
					++$chapter_index;
				}
			}
		}

		return implode( "\n", $parts );
	}

	/**
	 * Find section headings (isChapter core/heading blocks) in a post.
	 *
	 * Walks the post's parsed blocks to find core/heading blocks with
	 * isChapter === true and extracts their label and anchor ID, mirroring
	 * the Core_Heading::render() ID-generation logic.
	 *
	 * @param \WP_Post $post The post to scan.
	 * @return array<string, string> Map of section ID → section label.
	 */
	private function find_sections_in_post( \WP_Post $post ): array {
		$blocks    = parse_blocks( $post->post_content );
		$sections  = array();
		$is_legacy = $this->is_legacy_post( $post );

		$this->walk_blocks_for_sections( $blocks, $sections, $is_legacy );

		return $sections;
	}

	/**
	 * Recursively walk blocks looking for section headings.
	 *
	 * @param array $blocks    Parsed blocks array.
	 * @param array &$sections Accumulator for found sections.
	 * @param bool  $is_legacy Whether to treat all h3 as chapter headings.
	 */
	private function walk_blocks_for_sections( array $blocks, array &$sections, bool $is_legacy ): void {
		foreach ( $blocks as $block ) {
			if ( 'core/heading' === ( $block['blockName'] ?? null ) ) {
				$attrs      = $block['attrs'] ?? array();
				$is_chapter = $attrs['isChapter'] ?? false;
				$html       = $block['innerHTML'] ?? '';

				if ( $is_legacy && ! $is_chapter ) {
					$tag = new \WP_HTML_Tag_Processor( $html );
					if ( $tag->next_tag() && 'H3' === $tag->get_tag() ) {
						$is_chapter = true;
					}
				}

				if ( $is_chapter ) {
					$id    = $this->generate_heading_id( $html );
					$label = ! empty( $attrs['altTocText'] )
						? html_entity_decode( wp_strip_all_tags( $attrs['altTocText'] ) )
						: $this->extract_heading_text( $html );

					if ( '' !== $id && '' !== $label ) {
						$sections[ $id ] = $label;
					}
				}
			}

			if ( ! empty( $block['innerBlocks'] ) ) {
				$this->walk_blocks_for_sections( $block['innerBlocks'], $sections, $is_legacy );
			}
		}
	}

	/**
	 * Generate the heading anchor ID, mirroring Core_Heading::render() logic.
	 *
	 * @param string $html The heading block innerHTML.
	 * @return string The generated ID.
	 */
	private function generate_heading_id( string $html ): string {
		$tag = new \WP_HTML_Tag_Processor( $html );
		if ( ! $tag->next_tag() ) {
			$heading_text = $this->extract_heading_text( $html );
			$id           = sanitize_title( $heading_text );
			return '' !== $id ? $id : md5( $html );
		}

		$id = $tag->get_attribute( 'id' );

		if ( $id ) {
			if ( preg_match( '/^h-(\d+)-/', $id, $matches ) ) {
				$number = (int) $matches[1];
				if ( function_exists( '\convert_number_to_words' ) ) {
					$word = \convert_number_to_words( $number );
					if ( ! is_wp_error( $word ) ) {
						$id = preg_replace( '/^h-(\d+)-/', $word . '-', $id );
					} else {
						$id = preg_replace( '/^h-(\d+)-/', '', $id );
					}
				} else {
					$id = preg_replace( '/^h-(\d+)-/', '', $id );
				}
			} else {
				$id = preg_replace( '/^h-/', '', $id );
			}
			return $id;
		}

		$heading_text = $this->extract_heading_text( $html );
		$id           = sanitize_title( $heading_text );
		return '' !== $id ? $id : md5( $html );
	}

	/**
	 * Extract heading text from heading HTML.
	 *
	 * @param string $html The heading innerHTML.
	 * @return string Plain text content.
	 */
	private function extract_heading_text( string $html ): string {
		if ( preg_match( '/<h[1-6][^>]*>(.*?)<\/h[1-6]>/si', $html, $matches ) ) {
			return html_entity_decode( wp_strip_all_tags( $matches[1] ) );
		}
		return html_entity_decode( wp_strip_all_tags( $html ) );
	}

	/**
	 * Determine if a post is a legacy post (pre-March 2023).
	 *
	 * Legacy posts treat all h3 headings as chapter/section headings.
	 *
	 * @param \WP_Post $post The post to check.
	 * @return bool
	 */
	private function is_legacy_post( \WP_Post $post ): bool {
		$post_date = get_the_date( 'Y-m-d H:i:s', $post );
		return strtotime( $post_date ) < strtotime( '2023-03-01 00:00:00' );
	}
}

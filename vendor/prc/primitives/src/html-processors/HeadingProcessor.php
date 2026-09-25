<?php
/**
 * Heading HTML processor built on WP_HTML_Tag_Processor.
 *
 * @package pewresearch/wp-html-processors
 */

declare(strict_types=1);

namespace PRC\Primitives\HTML_Processors;

/**
 * Pass in a document and get back an array of h2 and h3 elements and their contents.
 *
 * The WP_HTML_Tag_Processor bookmark tree navigation is heavily cribbed from
 * WP_Directive_Processor (block interactivity experiments).
 */
class HeadingProcessor extends \WP_HTML_Tag_Processor {

	/**
	 * Find the matching closing tag for an opening tag.
	 *
	 * When called while on an open tag, traverse the HTML until we find
	 * the matching closing tag, respecting any in-between content, including
	 * nested tags of the same name. Return false when called on a closing or
	 * void tag, or if no matching closing tag was found.
	 *
	 * @return bool True if a matching closing tag was found.
	 */
	public function next_balanced_closer() {
		$depth = 0;

		$tag_name = $this->get_tag();

		while ( $this->next_tag(
			array(
				'tag_name'    => $tag_name,
				'tag_closers' => 'visit',
			)
		) ) {
			if ( ! $this->is_tag_closer() ) {
				++$depth;
				continue;
			}

			if ( 0 === $depth ) {
				return true;
			}

			--$depth;
		}

		return false;
	}

	/**
	 * Gets bookmarks for the current opener and matching closer tags.
	 *
	 * @return array{0: string, 1: string}|false
	 */
	public function get_matching_tag_bookmarks() {
		$i = 0;
		while ( array_key_exists( 'start-' . $i, $this->bookmarks ) ) {
			++$i;
		}
		$start_name = 'start-' . $i;

		$this->set_bookmark( $start_name );
		if ( ! $this->next_balanced_closer() ) {
			$this->release_bookmark( $start_name );
			return false;
		}

		$i = 0;
		while ( array_key_exists( 'end-' . $i, $this->bookmarks ) ) {
			++$i;
		}
		$end_name = 'end-' . $i;
		$this->set_bookmark( $end_name );

		return array( $start_name, $end_name );
	}

	/**
	 * Return the content between two matching tags.
	 *
	 * When called on an opening tag, return the HTML content found between
	 * that opening tag and its matching closing tag.
	 *
	 * @return string|false The content between the current opening and its matching closing tag.
	 */
	public function get_inner_html() {
		$bookmarks = $this->get_matching_tag_bookmarks();

		if ( ! $bookmarks ) {
			return false;
		}
		list( $start_name, $end_name ) = $bookmarks;

		$start = $this->bookmarks[ $start_name ]->start + $this->bookmarks[ $start_name ]->length;
		$end   = $this->bookmarks[ $end_name ]->start;

		$this->seek( $start_name ); // Return to original position.
		$this->release_bookmark( $start_name );
		$this->release_bookmark( $end_name );

		return substr( $this->html, $start, $end - $start );
	}

	/**
	 * Extract headings or inject missing ids into heading tags.
	 *
	 * @param bool $update_content When true, mutates HTML to add ids and returns updated HTML.
	 * @return array<int, array<string, mixed>>|string
	 */
	public function process( bool $update_content = false ) {
		$headings = array();

		while ( $this->next_tag() ) {
			if ( array_key_exists(
				$this->get_tag(),
				array(
					'H2' => true,
					'H3' => true,
				)
			) ) {
				$tag = $this->get_tag();
				if ( $this->get_attribute( 'no-toc' ) ) {
					continue;
				}
				$id      = $this->get_attribute( 'id' );
				$content = $this->get_attribute( 'toc-title' ); // Alt text.
				if ( empty( $content ) ) {
					$inner   = $this->get_inner_html();
					$content = is_string( $inner ) ? $inner : '';
				}
				if ( empty( $id ) ) {
					$id = sanitize_title( $content );
				}
				if ( true === $update_content ) {
					$this->set_attribute( 'id', $id );
				} else {
					$headings[] = array(
						'level'   => str_replace( 'H', '', $tag ),
						'content' => $content,
						'id'      => $id,
					);
				}
			}
		}

		if ( true === $update_content ) {
			return $this->get_updated_html();
		}

		if ( empty( $headings ) ) {
			return array();
		}

		return $headings;
	}
}

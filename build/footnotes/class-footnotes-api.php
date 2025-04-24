<?php
/**
 * Footnotes API
 *
 * @package PRC\Platform
 */

namespace PRC\Platform\Blocks;

/**
 * Footnotes API
 */
class Footnotes_API {
	/**
	 * The post ID to process.
	 *
	 * @var int
	 */
	public $post_id = null;

	/**
	 * The footnotes found in the content.
	 *
	 * @var array
	 */
	protected $footnotes = array();

	/**
	 * The start.
	 *
	 * @var int
	 */
	protected $start = 1;

	/**
	 * The content.
	 *
	 * @var string
	 */
	protected $content = null;

	/**
	 * The constructor.
	 *
	 * @param int    $post_id The post ID.
	 * @param string $post_content The post content.
	 */
	public function __construct( $post_id, $post_content = null ) {
		$this->post_id = $post_id;
		$this->init( $post_content );
	}

	/**
	 * Initialize the class.
	 *
	 * @param string $post_content The post content.
	 */
	public function init( $post_content ) {
		// Allow for passing through post content to avoid a second db call.
		if ( null === $post_content ) {
			$post_content = get_post_field( 'post_content', $this->post_id );
		}
		$this->process_content( $post_content );
	}

	/**
	 * Get the footnotes.
	 *
	 * @param string $format The format.
	 * @return array|string
	 */
	public function get_footnotes( $format = 'array' ) {
		if ( ! array_key_exists( $this->post_id, $this->footnotes ) || empty( $this->footnotes[ $this->post_id ] ) ) {
			return false;
		}
		$footnotes = $this->footnotes[ $this->post_id ];
		if ( 'array' === $format ) {
			$footnotes = $footnotes;
		} else {
			$footnotes = implode( "\n", $footnotes );
		}
		return array(
			'footnotes' => $footnotes,
			'start'     => $this->start,
		);
	}

	/**
	 * Get the content.
	 *
	 * @return string
	 */
	public function get_content() {
		return $this->content;
	}

	/**
	 * Process the content and add the footnotes to the content.
	 * Looks for content like: [0. numoffset="5" This is a footnote] and converts it to:
	 * <sup class="footnote"><a href="#fn-1-5" id="fnref-1-5">5</a></sup>
	 *
	 * @param string $content The content.
	 */
	public function process_content( $content ) {
		$post_id = $this->post_id;
		// Need to correct wpautop() which smart-quoteify's the " in the numoffset argument.
		$content = preg_replace( '/numoffset=&#8221;(\d+)&#8243;/i', 'numoffset="$1"', $content );

		if ( preg_match_all( '/\[(\d+\.((\s+)?numoffset="(\d+)+")? (.*?))\]/s', $content, $matches ) ) {
			/*
			Given [0. numoffset="5" This is a footnote]
			$matches[0] = The whole match including the square brackets: [0. numoffset="5" This is a footnote]
			$matches[4] = numoffset value: 5
			$matches[5] = The footnote text: This is a footnote
			*/
			$this->footnotes[ $post_id ] = array();

			foreach ( $matches[0] as $index => $target ) {
				$offset_value = (int) $matches[4][ $index ];
				$text         = trim( $matches[5][ $index ] );

				// Footnotes that have [ or ] in the text break. Use double curly quotes as an escape to workaround this.
				$text = str_replace( '{{', '[', $text );
				$text = str_replace( '}}', ']', $text );

				if ( $offset_value > 0 ) {
					$this->start = $offset_value;
				}

				$this->footnotes[ $post_id ][] = $text;
			}

			$n = $this->start;

			foreach ( $matches[0] as $index => $target ) {
				$content = str_replace(
					$target,
					wp_sprintf(
						'<sup class="footnote"><a href="%s" id="%s">%s</a></sup>',
						"#fn-{$post_id}-{$n}",
						"fnref-{$post_id}-{$n}",
						$n,
					),
					$content
				);
				++$n;
			}

			// Workaround for wpautop() bug. Otherwise it sometimes inserts an opening <p> but not the closing </p>.
			// There are a bunch of open wpautop tickets. See 4298 and 7988 in particular.
			$content .= "\n\n";
		}

		$this->content = $content;
	}
}

<?php
declare(strict_types=1);
/**
 * Integration with prc-email-builder's deterministic email pipeline.
 *
 * Registers email-HTML callbacks for prc-block-library block types used
 * inside newsletter posts. Currently handles prc-block/story-item, which
 * resolves content through Story_Item_API (same as the frontend) and maps
 * the resolved model onto email-safe tables.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use PRC\Platform\Email_Builder\Email_Block_Integration;
use PRC\Platform\Email_Builder\Email_Style_Resolver;

/**
 * Connects prc-block-library with the newsletter builder email pipeline.
 *
 * @package PRC\Platform\Blocks
 */
class Email_Newsletter_Integration {

	/**
	 * Frontend image size tokens → desktop max-width (px).
	 * Source: plugins/prc-block-library/src/story-item/style.scss.
	 */
	private const IMAGE_WIDTHS = array(
		'A1' => 564,
		'A2' => 268,
		'A3' => 194,
		'A4' => 268,
		'XL' => 720,
	);

	/**
	 * Column gap between image and text in left/right layouts (px).
	 * Matches frontend `grid-column-gap`.
	 */
	private const IMAGE_GUTTER = 23;

	/**
	 * Allowed inline tags preserved in excerpt / extra HTML.
	 *
	 * @var array<string,array<string,bool>>
	 */
	private const ALLOWED_INLINE_HTML = array(
		'a'      => array(
			'href'   => true,
			'title'  => true,
			'target' => true,
			'rel'    => true,
		),
		'em'     => array(),
		'i'      => array(),
		'strong' => array(),
		'b'      => array(),
		'br'     => array(),
		'p'      => array(),
		'span'   => array(),
	);

	/**
	 * Constructor.
	 *
	 * @param Loader $loader The loader instance.
	 */
	public function __construct( $loader ) {
		$loader->add_action(
			'prc_email_builder_register_email_callbacks',
			$this,
			'register_email_callbacks'
		);
	}

	/**
	 * Register email-HTML callbacks for block library blocks.
	 *
	 * @hook prc_email_builder_register_email_callbacks
	 */
	public function register_email_callbacks(): void {
		if ( ! class_exists( '\PRC\Platform\Email_Builder\Email_Block_Registry' ) ) {
			return;
		}

		\PRC\Platform\Email_Builder\Email_Block_Registry::register(
			'prc-block/story-item',
			array( $this, 'story_item_to_email_html' )
		);
	}

	/**
	 * Convert a prc-block/story-item block to an email-safe card.
	 *
	 * Resolves content through Story_Item_API (device + query-loop forced to
	 * desktop) so attribute parity with the frontend holds by construction,
	 * then maps the resolved model onto email-safe tables.
	 *
	 * @param array    $block Parsed block array.
	 * @param \WP_Post $post  The newsletter post being converted.
	 * @return string Email HTML fragment.
	 */
	public function story_item_to_email_html( array $block, \WP_Post $post ): string {
		unset( $post ); // Newsletter post unused; story-item resolves its own postId.

		if ( ! class_exists( __NAMESPACE__ . '\\Story_Item_API' ) ) {
			$api_file = PRC_BLOCK_LIBRARY_DIR . '/src/story-item/class-story-item-api.php';
			if ( is_readable( $api_file ) ) {
				require_once $api_file;
			}
		}
		if ( ! class_exists( __NAMESPACE__ . '\\Story_Item_API' ) ) {
			return '';
		}

		$attrs = is_array( $block['attrs'] ?? null ) ? $block['attrs'] : array();
		// parse_blocks() leaves InnerBlocks as null placeholders in innerHTML;
		// rebuild so enableExtra content is visible to Story_Item_API::get_extras().
		$inner_html = $this->reconstruct_block_html( $block );

		// parse_blocks() does not apply block.json defaults; merge explicitly.
		$attrs = $this->merge_story_item_defaults( $attrs );

		$story_item            = new Story_Item_API( $attrs, $inner_html, array() );
		$story_item->is_mobile = false;

		$title   = $story_item->get_title();
		$excerpt = $story_item->get_excerpt();
		$extra   = $story_item->get_extras();
		$url     = $story_item->get_url();
		$label   = $story_item->get_label();
		$date    = $story_item->get_date();

		if ( $url instanceof \WP_Error || ! is_string( $url ) ) {
			$url = '';
		}

		$text_content = $this->build_text_content(
			$attrs,
			is_string( $title ) ? $title : '',
			is_string( $excerpt ) ? $excerpt : '',
			is_string( $extra ) ? $extra : '',
			$url,
			is_string( $label ) ? $label : '',
			is_string( $date ) ? $date : '',
			(bool) $excerpt
		);

		if ( '' === $text_content ) {
			return '';
		}

		$image_slot = $story_item->get_image_slot();
		$image_size = $story_item->get_image_size();
		$imgs       = $story_item->get_image();
		// Manual-image string fallback in get_image() sets bordered=null;
		// honor isChartArt via is_image_bordered() as well.
		$bordered = (bool) $story_item->is_image_bordered()
			|| ( is_array( $imgs ) && ! empty( $imgs['bordered'] ) );

		$image_markup = $this->build_image_markup(
			is_array( $imgs ) ? $imgs : null,
			is_string( $image_size ) ? $image_size : '',
			$url,
			is_string( $title ) ? $title : '',
			$bordered
		);

		$slot = is_string( $image_slot ) ? $image_slot : '';
		$rows = $this->build_layout_rows( $slot, is_string( $image_size ) ? $image_size : '', $image_markup, $text_content );

		$merged = Email_Style_Resolver::merge_block_style( 'margin-bottom:16px;', $attrs );
		$class  = trim( $merged['class'] );

		return sprintf(
			'<table width="100%%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="%s"%s>%s</table>',
			esc_attr( $merged['style'] ),
			'' !== $class ? ' class="' . esc_attr( $class ) . '"' : '',
			$rows
		);
	}

	/**
	 * Rebuild a parsed block's HTML with innerBlocks filled into innerContent slots.
	 *
	 * WordPress `parse_blocks()` stores InnerBlocks as `null` placeholders in
	 * `innerContent` and omits their markup from `innerHTML`. Story_Item_API
	 * reads extras via a `.extra` regex on that HTML, so empty wrappers would
	 * otherwise drop enableExtra content.
	 *
	 * @param array<string,mixed> $block Parsed block.
	 * @return string Reconstructed HTML (falls back to innerHTML).
	 */
	private function reconstruct_block_html( array $block ): string {
		$inner_content = $block['innerContent'] ?? null;
		$inner_blocks  = $block['innerBlocks'] ?? array();

		if ( ! is_array( $inner_content ) || empty( $inner_blocks ) ) {
			return (string) ( $block['innerHTML'] ?? '' );
		}

		$html        = '';
		$inner_index = 0;
		foreach ( $inner_content as $chunk ) {
			if ( is_string( $chunk ) ) {
				$html .= $chunk;
				continue;
			}
			// null (or non-string) placeholder → splice in the matching inner block.
			if ( isset( $inner_blocks[ $inner_index ] ) && is_array( $inner_blocks[ $inner_index ] ) ) {
				$html .= $this->reconstruct_block_html( $inner_blocks[ $inner_index ] );
			}
			++$inner_index;
		}

		return $html;
	}

	/**
	 * Merge block.json defaults into attrs (parse_blocks output has none).
	 *
	 * @param array<string,mixed> $attrs Block attrs.
	 * @return array<string,mixed>
	 */
	private function merge_story_item_defaults( array $attrs ): array {
		$defaults = array(
			'url'                   => '',
			'imageSlot'             => 'top',
			'imageSize'             => 'A1',
			'isChartArt'            => false,
			'headerSize'            => 2,
			'enableAltHeaderWeight' => false,
			'enableHeader'          => true,
			'enableExcerpt'         => true,
			'enableExtra'           => false,
			'enableMeta'            => true,
			'metaTaxonomy'          => 'formats',
			'isPreview'             => false,
		);

		$block_json = PRC_BLOCK_LIBRARY_DIR . '/src/story-item/block.json';
		if ( is_readable( $block_json ) && function_exists( 'wp_json_file_decode' ) ) {
			$decoded = wp_json_file_decode( $block_json, array( 'associative' => true ) );
			if ( is_array( $decoded['attributes'] ?? null ) ) {
				$defaults = array();
				foreach ( $decoded['attributes'] as $key => $opts ) {
					if ( is_array( $opts ) && array_key_exists( 'default', $opts ) ) {
						$defaults[ $key ] = $opts['default'];
					}
				}
			}
		}

		return wp_parse_args( $attrs, $defaults );
	}

	/**
	 * Build meta + title + excerpt + extra text column HTML.
	 *
	 * @param array<string,mixed> $attrs         Block attrs.
	 * @param string              $title         Resolved title.
	 * @param string              $excerpt       Resolved excerpt HTML.
	 * @param string              $extra         Resolved extra HTML.
	 * @param string              $url           Story URL.
	 * @param string              $label         Meta label.
	 * @param string              $date          Meta date.
	 * @param bool                $has_excerpt   Whether an excerpt is present (light-weight rule).
	 * @return string
	 */
	private function build_text_content(
		array $attrs,
		string $title,
		string $excerpt,
		string $extra,
		string $url,
		string $label,
		string $date,
		bool $has_excerpt
	): string {
		$serif = Email_Style_Resolver::EMAIL_FONT_SERIF;
		$sans  = Email_Style_Resolver::EMAIL_FONT_FRANKLIN_SANS;

		$parts = '';

		// Meta is gated by enableMeta inside get_label()/get_date(); still
		// require enableMeta here so a stray label/date attr cannot leak when
		// the flag is off (defensive — getters already return false).
		$enable_meta = ! empty( $attrs['enableMeta'] );
		if ( $enable_meta ) {
			$meta_parts = array_filter( array( $label, $date ) );
			if ( ! empty( $meta_parts ) ) {
				$parts .= sprintf(
					'<p style="font-family:%s;font-size:12px;line-height:18px;color:#666666;margin:0;padding-bottom:1.5em;text-transform:uppercase;letter-spacing:0.1em;">%s</p>',
					esc_attr( $sans ),
					esc_html( implode( ' · ', $meta_parts ) )
				);
			}
		}

		if ( '' !== $title ) {
			$header = $this->header_typography( (int) ( $attrs['headerSize'] ?? 2 ), ! empty( $attrs['enableAltHeaderWeight'] ) || ! $has_excerpt );
			$title_linked = '' !== $url
				? sprintf( '<a href="%s" style="color:#000000;text-decoration:none;">%s</a>', esc_url( $url ), esc_html( $title ) )
				: esc_html( $title );
			$parts .= sprintf(
				'<p style="font-family:%s;font-size:%dpx;line-height:%dpx;font-weight:%s;color:#000000;margin:0;">%s</p>',
				esc_attr( $serif ),
				$header['size'],
				$header['line'],
				esc_attr( (string) $header['weight'] ),
				$title_linked
			);
		}

		if ( '' !== $excerpt ) {
			$excerpt_html = $this->sanitize_inline_html( $excerpt );
			if ( '' !== $excerpt_html ) {
				if ( class_exists( Email_Block_Integration::class ) ) {
					$excerpt_html = Email_Block_Integration::rewrite_body_links( $excerpt_html, $attrs );
				}
				$parts .= sprintf(
					'<div style="font-family:%s;font-size:16px;line-height:1.4285em;color:#444444;margin:10px 0 0 0;">%s</div>',
					esc_attr( $serif ),
					$excerpt_html
				);
			}
		}

		if ( '' !== $extra ) {
			$extra_html = $this->sanitize_inline_html( $extra );
			if ( '' !== $extra_html ) {
				if ( class_exists( Email_Block_Integration::class ) ) {
					$extra_html = Email_Block_Integration::rewrite_body_links( $extra_html, $attrs );
				}
				$parts .= sprintf(
					'<div style="font-family:%s;font-size:15px;line-height:22px;color:#333333;margin:1em 0 0 0;">%s</div>',
					esc_attr( $sans ),
					$extra_html
				);
			}
		}

		return $parts;
	}

	/**
	 * Map headerSize + light-weight rule to font size / weight / line-height.
	 *
	 * @param int  $header_size Header size (1|2|3).
	 * @param bool $light       Apply normal (light) weight.
	 * @return array{size:int,weight:string|int,line:int}
	 */
	private function header_typography( int $header_size, bool $light ): array {
		switch ( $header_size ) {
			case 1:
				$spec = array(
					'size'   => 28,
					'weight' => 'bold',
					'line'   => 34,
				);
				break;
			case 3:
				$spec = array(
					'size'   => 18,
					'weight' => 400,
					'line'   => 25,
				);
				break;
			case 2:
			default:
				$spec = array(
					'size'   => 20,
					'weight' => 700,
					'line'   => 26,
				);
				break;
		}

		if ( $light ) {
			$spec['weight'] = 'normal';
		}

		return $spec;
	}

	/**
	 * Allow a safe inline subset in excerpt/extra HTML.
	 *
	 * @param string $html Raw HTML.
	 * @return string
	 */
	private function sanitize_inline_html( string $html ): string {
		$html = trim( $html );
		if ( '' === $html ) {
			return '';
		}
		if ( function_exists( 'wp_kses' ) ) {
			return trim( (string) wp_kses( $html, self::ALLOWED_INLINE_HTML ) );
		}
		return trim( wp_strip_all_tags( $html ) );
	}

	/**
	 * Build an anchor-wrapped <img> from Story_Item_API::get_image() data.
	 *
	 * @param array<string,mixed>|null $imgs       Image payload.
	 * @param string                   $image_size Size token (A1–XL).
	 * @param string                   $url        Story URL for the anchor.
	 * @param string                   $title      Fallback alt text.
	 * @param bool                     $bordered   Chart-art / bordered flag.
	 * @return string Empty when no resolvable image.
	 */
	private function build_image_markup( ?array $imgs, string $image_size, string $url, string $title, bool $bordered = false ): string {
		if ( null === $imgs ) {
			return '';
		}

		$resolved = $this->resolve_image_src( $imgs, $image_size );
		if ( null === $resolved ) {
			return '';
		}

		$border_style = $bordered || ! empty( $imgs['bordered'] )
			? 'border:1px solid #dadada;'
			: 'border:0;';

		$alt = '';
		if ( ! empty( $imgs['alt'] ) && is_string( $imgs['alt'] ) ) {
			$alt = $imgs['alt'];
		} elseif ( '' !== $title ) {
			$alt = $title;
		}

		$img = sprintf(
			'<img src="%s" alt="%s" width="%d" style="display:block;width:%dpx;max-width:100%%;height:auto;%s" />',
			esc_url( $resolved['url'] ),
			esc_attr( $alt ),
			$resolved['width'],
			$resolved['width'],
			$border_style
		);

		if ( '' === $url ) {
			return $img;
		}

		return sprintf(
			'<a href="%s" style="text-decoration:none;border:0;">%s</a>',
			esc_url( $url ),
			$img
		);
	}

	/**
	 * Pick HIDPI (fallback 1x) URL and declared 1x width from get_image() shape.
	 *
	 * Handles both art-direction arrays `[url, w, h, …]` and manual-image
	 * string fallbacks.
	 *
	 * @param array<string,mixed> $imgs       Image payload.
	 * @param string              $image_size Size token.
	 * @return array{url:string,width:int,bordered:bool}|null
	 */
	private function resolve_image_src( array $imgs, string $image_size ): ?array {
		$default = $imgs['desktop']['default'] ?? null;
		$hidpi   = $imgs['desktop']['hidpi'] ?? null;
		$token_w = self::IMAGE_WIDTHS[ $image_size ] ?? self::IMAGE_WIDTHS['A2'];
		$budget  = class_exists( Email_Block_Integration::class )
			? Email_Block_Integration::CONTENT_INNER_WIDTH
			: 536;

		$url    = '';
		$width  = min( $token_w, $budget );
		$from_w = 0;

		if ( is_array( $default ) && ! empty( $default[0] ) && is_string( $default[0] ) ) {
			$url    = $default[0];
			$from_w = isset( $default[1] ) ? (int) $default[1] : 0;
		} elseif ( is_string( $default ) && '' !== $default ) {
			$url = $default;
		}

		if ( is_array( $hidpi ) && ! empty( $hidpi[0] ) && is_string( $hidpi[0] ) ) {
			$url = $hidpi[0];
		} elseif ( is_string( $hidpi ) && '' !== $hidpi ) {
			$url = $hidpi;
		}

		if ( '' === $url ) {
			return null;
		}

		if ( $from_w > 0 ) {
			$width = min( $from_w, $budget );
		}

		return array(
			'url'      => $url,
			'width'    => $width,
			'bordered' => ! empty( $imgs['bordered'] ),
		);
	}

	/**
	 * Map imageSlot + imageSize onto table rows (stacked or two-column).
	 *
	 * @param string $slot          Image slot (top|bottom|left|right|'').
	 * @param string $image_size    Size token.
	 * @param string $image_markup  Anchor-wrapped image HTML (may be empty).
	 * @param string $text_content  Text column HTML.
	 * @return string Table rows HTML.
	 */
	private function build_layout_rows( string $slot, string $image_size, string $image_markup, string $text_content ): string {
		if ( '' === $image_markup ) {
			return '<tr><td style="padding:0;">' . $text_content . '</td></tr>';
		}

		$token_w = self::IMAGE_WIDTHS[ $image_size ] ?? self::IMAGE_WIDTHS['A2'];
		$budget  = class_exists( Email_Block_Integration::class )
			? Email_Block_Integration::CONTENT_INNER_WIDTH
			: 536;

		$is_side = ( 'left' === $slot || 'right' === $slot );
		// A1/XL exceed half the budget — degrade side layouts to stacked.
		if ( $is_side && $token_w > (int) floor( $budget / 2 ) ) {
			$is_side = false;
			$slot    = 'top';
		}

		if ( ! $is_side ) {
			$img_w         = min( $token_w, $budget );
			$stacked_image = $this->force_image_width( $image_markup, $img_w );
			if ( 'bottom' === $slot ) {
				return '<tr><td style="padding:0 0 12px 0;">' . $text_content . '</td></tr>'
					. '<tr><td class="story-item-image" style="padding:0;">' . $stacked_image . '</td></tr>';
			}
			return '<tr><td class="story-item-image" style="padding:0 0 12px 0;">' . $stacked_image . '</td></tr>'
				. '<tr><td style="padding:0;">' . $text_content . '</td></tr>';
		}

		$img_w      = min( $token_w, $budget );
		$image_cell = sprintf(
			'<td class="story-item-image" width="%d" valign="top" style="padding:%s;width:%dpx;">%s</td>',
			$img_w,
			'right' === $slot ? '0 0 0 ' . self::IMAGE_GUTTER . 'px' : '0 ' . self::IMAGE_GUTTER . 'px 0 0',
			$img_w,
			$this->force_image_width( $image_markup, $img_w )
		);
		$text_cell = sprintf(
			'<td class="story-item-text" valign="top" style="padding:0;">%s</td>',
			$text_content
		);

		return '<tr>' . ( 'right' === $slot ? $text_cell . $image_cell : $image_cell . $text_cell ) . '</tr>';
	}

	/**
	 * Ensure the declared width on <img> matches the layout token.
	 *
	 * @param string $markup Image (possibly anchored) markup.
	 * @param int    $width  Target width.
	 * @return string
	 */
	private function force_image_width( string $markup, int $width ): string {
		$markup = (string) preg_replace(
			'/\swidth="\d+"/i',
			' width="' . $width . '"',
			$markup,
			1
		);
		$markup = (string) preg_replace(
			'/width:\d+px/i',
			'width:' . $width . 'px',
			$markup,
			1
		);
		return $markup;
	}
}

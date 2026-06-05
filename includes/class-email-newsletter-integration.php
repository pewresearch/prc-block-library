<?php
declare(strict_types=1);
/**
 * Integration with prc-email-builder's deterministic email pipeline.
 *
 * Registers email-HTML callbacks for prc-block-library block types used
 * inside newsletter posts. Currently handles prc-block/story-item, which
 * produces an email-safe card (image + title link + label/date + excerpt).
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Connects prc-block-library with the newsletter builder email pipeline.
 *
 * @package PRC\Platform\Blocks
 */
class Email_Newsletter_Integration {

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
	 * Honors the block's imageSlot attribute:
	 *  - 'left' (default): two-column card (image 180px | title/meta/excerpt).
	 *  - 'right': two-column card with the image in the right column.
	 *  - 'top' / 'bottom': image stacked full-width above / below the text.
	 *  - 'disabled': text-only card (image suppressed even if a URL exists).
	 *
	 * Also falls back to a text-only card when no image URL is available.
	 *
	 * @param array    $block Parsed block array.
	 * @param \WP_Post $post  The newsletter post being converted.
	 * @return string Email HTML fragment.
	 */
	public function story_item_to_email_html( array $block, \WP_Post $post ): string {
		$attrs   = $block['attrs'] ?? array();
		$title   = wp_strip_all_tags( (string) ( $attrs['title'] ?? '' ) );
		$url     = (string) ( $attrs['url'] ?? '' );
		$excerpt = (string) ( $attrs['excerpt'] ?? '' );
		$label   = wp_strip_all_tags( (string) ( $attrs['label'] ?? '' ) );
		$date    = wp_strip_all_tags( (string) ( $attrs['date'] ?? '' ) );
		$image      = (string) ( $attrs['image'] ?? '' );
		$image_slot = (string) ( $attrs['imageSlot'] ?? '' );

		// 'disabled' suppresses the image entirely (text-only card), regardless
		// of any stored URL or featured image — skip resolution below.
		if ( 'disabled' === $image_slot ) {
			$image = '';
		}

		// Resolve image URL from post if only an ID is stored.
		if ( '' === $image && 'disabled' !== $image_slot && ! empty( $attrs['postId'] ) ) {
			$thumb_id = get_post_thumbnail_id( (int) $attrs['postId'] );
			if ( $thumb_id ) {
				$img_data = wp_get_attachment_image_src( $thumb_id, 'medium' );
				if ( $img_data ) {
					$image = $img_data[0];
				}
			}
		}

		$font_stack = "Georgia,'Times New Roman',Times,serif";
		$sans_stack = "'franklin-gothic-urw',Verdana,Geneva,sans-serif";

		// Meta line: label · date.
		$meta_parts = array_filter( array( $label, $date ) );
		$meta_html  = '';
		if ( ! empty( $meta_parts ) ) {
			$meta_html = sprintf(
				'<p style="font-family:%s;font-size:12px;line-height:18px;color:#666666;margin:0 0 6px 0;text-transform:uppercase;letter-spacing:0.5px;">%s</p>',
				esc_attr( $sans_stack ),
				esc_html( implode( ' · ', $meta_parts ) )
			);
		}

		// Title.
		$title_html = '';
		if ( '' !== $title ) {
			$title_linked = '' !== $url
				? sprintf( '<a href="%s" style="color:#000000;text-decoration:none;">%s</a>', esc_url( $url ), esc_html( $title ) )
				: esc_html( $title );
			$title_html = sprintf(
				'<p style="font-family:%s;font-size:18px;line-height:24px;font-weight:bold;color:#000000;margin:0 0 8px 0;">%s</p>',
				esc_attr( $font_stack ),
				$title_linked
			);
		}

		// Excerpt — strip tags, truncate to first sentence if very long.
		$excerpt_text = wp_strip_all_tags( $excerpt );
		$excerpt_html = '';
		if ( '' !== $excerpt_text ) {
			$excerpt_html = sprintf(
				'<p style="font-family:%s;font-size:15px;line-height:22px;color:#444444;margin:0;">%s</p>',
				esc_attr( $font_stack ),
				esc_html( $excerpt_text )
			);
		}

		$text_content = $meta_html . $title_html . $excerpt_html;

		if ( '' === $text_content ) {
			return '';
		}

		// Image card layouts by imageSlot. 'disabled' already cleared $image above.
		//  - 'top'/'bottom': image stacked full-width above / below the text.
		//  - 'right': two-column with the image in the right column.
		//  - 'left' (and any other value): two-column with the image on the left.
		if ( '' !== $image ) {
			if ( 'top' === $image_slot || 'bottom' === $image_slot ) {
				$stacked_image = sprintf(
					'<img src="%s" alt="%s" width="100%%" style="display:block;width:100%%;height:auto;border:0;" />',
					esc_url( $image ),
					esc_attr( $title )
				);
				$rows = 'bottom' === $image_slot
					? '<tr><td style="padding:0 0 12px 0;">' . $text_content . '</td></tr><tr><td style="padding:0;">' . $stacked_image . '</td></tr>'
					: '<tr><td style="padding:0 0 12px 0;">' . $stacked_image . '</td></tr><tr><td style="padding:0;">' . $text_content . '</td></tr>';

				return sprintf(
					'<table width="100%%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin-bottom:16px;">%s</table>',
					$rows
				);
			}

			$image_cell = sprintf(
				'<td width="180" valign="top" style="padding:%s;">'
				. '<img src="%s" alt="%s" width="180" style="display:block;width:180px;height:auto;border:0;" />'
				. '</td>',
				'right' === $image_slot ? '0 0 0 16px' : '0 16px 0 0',
				esc_url( $image ),
				esc_attr( $title )
			);
			$text_cell = sprintf( '<td valign="top" style="padding:0;">%s</td>', $text_content );

			return sprintf(
				'<table width="100%%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin-bottom:16px;"><tr>%s</tr></table>',
				'right' === $image_slot ? $text_cell . $image_cell : $image_cell . $text_cell
			);
		}

		// Text-only card.
		return sprintf(
			'<table width="100%%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin-bottom:16px;">'
			. '<tr><td style="padding:0;">%s</td></tr>'
			. '</table>',
			$text_content
		);
	}
}

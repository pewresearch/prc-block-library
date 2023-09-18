<?php
namespace Apple_Exporter\Components;

class Collapsible extends Component {

	public static function node_matches( $node ) {
		return self::node_has_class( $node, 'wp-block-prc-block-collapsible' ) ? $node : null;
	}

	public function register_specs() {
		$this->register_spec(
			'json-with-image-and-text',
			__( 'JSON With Image', 'apple-news' ),
			array(
				'role' => 'container',
				"layout" => 'callout-layout-full',
				"style" => array(
					"backgroundColor" => "#f7f7f1",
					"border" => array(
						"all" => array(
							"width" => 1,
							"style" => "solid",
							"color" => "#dededf"
						),
						"bottom" => true,
						"right" => true,
						"top" => true,
						"left" => true
					)
				),
				'components' => array(
					array(
						'role'   => 'quote',
						'text'   => '#text_1#',
						'format' => 'html',
						'layout' => 'blockquote-layout',
						'textStyle' => 'default-blockquote-left'
					),
					array(
						'role' => 'photo',
						'URL' => '#url#',
						'layout' => '#image_layout#'
					),
					array(
						'role'   => 'quote',
						'text'   => '#text_2#',
						'format' => 'html',
						'layout' => 'blockquote-layout',
						'textStyle' => 'default-blockquote-left'
					),
				),
			)
		);

		$this->register_spec(
			'json',
			__( 'JSON', 'apple-news' ),
			array(
				'role' => 'container',
				"layout" => 'callout-layout-full',
				"style" => array(
					"backgroundColor" => "#f7f7f1",
					"border" => array(
						"all" => array(
							"width" => 1,
							"style" => "solid",
							"color" => "#dededf"
						),
						"bottom" => true,
						"right" => true,
						"top" => true,
						"left" => true
					)
				),
				'components' => array(
					array(
						'role'   => 'quote',
						'text'   => '#text_1#',
						'format' => 'html',
						'layout' => 'blockquote-layout',
						'textStyle' => 'default-blockquote-left'
					)
				),
			)
		);

		$this->register_spec(
			'json-with-image',
			__( 'JSON', 'apple-news' ),
			array(
				'role' => 'container',
				"layout" => 'callout-layout-full',
				"style" => array(
					"backgroundColor" => "#f7f7f1",
					"border" => array(
						"all" => array(
							"width" => 1,
							"style" => "solid",
							"color" => "#dededf"
						),
						"bottom" => true,
						"right" => true,
						"top" => true,
						"left" => true
					)
				),
				'components' => array(
					array(
						'role'   => 'quote',
						'text'   => '#text_1#',
						'format' => 'html',
						'layout' => 'blockquote-layout',
						'textStyle' => 'default-blockquote-left'
					),
					array(
						'role' => 'photo',
						'URL' => '#url#',
						'layout' => '#image_layout#'
					)
				),
			)
		);
	}

	protected function build( $html ) {
		$allowed_tags = '<p><a><em><strong><i><b><li><ul><ol>';
		$layouts = array(
			'640' => 'full-width-image-no-bleed',
			'420' => 'anchor-layout-left-4-col',
			'200' => 'anchor-layout-left-2-col'
		);

		preg_match('/\<div class=\"wp-block-prc-block-collapsible__title\".*\>\X*?\<div>(.*?)\<\/div>/i', $html, $title_match );
		preg_match('/\<div class=\"wp-block-prc-block-collapsible__content\".*\>(\X*?)\<\/div>/i', $html, $content_match );
		$title = $title_match[1];
		$content = $content_match[1];
		// prepend title
		$innerHTML = '<p><strong>' . $title . '</strong></p>' . $content;
		$spec = 'json';

		$values = array();
		// is there an image?
		// Todo: handle multiple images?
		if ( preg_match( '/(\X*)?<figure.*?<img.*src=\"(.*?)\".*?figure>(\X*)?/i', $innerHTML, $match ) ) {
			if ( strlen( trim( wp_strip_all_tags($match[3]) ) ) ){
				$spec = 'json-with-image-and-text';
				$values['#text_2#'] = wp_strip_all_tags($match[3], $allowed_tags);
			} else {
				$spec = 'json-with-image';
			}

			$width = substr($match[2], -3);
			$image_layout = isset($layouts[$width]) ? $layouts[$width] : 'anchor-layout-left';

			//remove ?w after image url
			$url = preg_replace('/\.(jpg|jpeg|png|gif|svg).*/i','.${1}', $match[2]);
			$values['#url#'] = esc_url_raw($url);
			$values['#text_1#'] = wp_strip_all_tags($match[1], $allowed_tags);
			$values['#image_layout#'] = $image_layout;

		} else {
			$values['#text_1#'] = $innerHTML;
		}

		$this->register_json( $spec, $values );
	}
}

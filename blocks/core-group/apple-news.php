<?php
namespace Apple_Exporter\Components;

class Core_Group_Callout extends Component {
	public $needs_layout_if_anchored = false;

	public static function node_matches($node) {
		$class_name_target = 'is-style-callout';
		//wp-block-prc-block-callout;
		return self::node_has_class( $node, $class_name_target ) ? $node : null;
	}

	public function register_specs() {
		$this->register_spec(
			'json-with-text',
			__( 'JSON With Text', 'apple-news' ),
			array(
				'role' => 'container',
				'layout' => '#layout#',
				"style" => array(
					"backgroundColor" => "#f7f7f1",
					"border" => array(
						"all" => array(
							"width" => 1,
							"style" => "solid",
							"color" => "#dededf"
						),
						"bottom" => false,
						"right" => false,
						"top" => true,
						"left" => false
					)
				),
				'components' => array(
					array(
						'role' => 'quote',
						'text' => '#text_1#',
						'format' => 'html',
						'layout' => 'blockquote-layout',
						'textStyle' => 'default-blockquote-left'
					)
				)
			)
		);

		$this->register_spec(
			'json-with-image',
			__( 'JSON With Image', 'apple-news' ),
			array(
				'role' => 'container',
				'layout' => '#layout#',
				"style" => array(
					"backgroundColor" => "#f7f7f1",
					"border" => array(
					"all" => array(
						"width" => 1,
						"style" => "solid",
						"color" => "#dededf"
					),
					"bottom" => false,
					"right" => false,
					"top" => true,
					"left" => false
					)
				),
				'components' => array(
					array(
						'role' => 'photo',
						'URL' => '#url#',
						'layout' =>  array(
							"padding" => array(
								"bottom" => 12,
								"left" => 12,
								"right" => 12,
								"top" => 12
							)
						),
					),
				),
			)
		);

		$this->register_spec(
			'json-with-text-image',
			__( 'JSON With Text and Image', 'apple-news' ),
			array(
				'role' => 'container',
				'layout' => '#layout#',
				"style" => array(
					"backgroundColor" => "#f7f7f1",
					"border" => array(
						"all" => array(
						"width" => 1,
						"style" => "solid",
						"color" => "#dededf"
						),
						"bottom" => false,
						"right" => false,
						"top" => true,
						"left" => false
					)
				),
				'components' => array(
					array(
						'role' => 'quote',
						'text' => '#text_1#',
						'format' => 'html',
						'layout' => 'blockquote-layout',
						'textStyle' => 'default-blockquote-left'
					),
					array(
						'role' => 'photo',
						'URL' => '#url#',
						'layout' =>  array(
							"padding" => array(
								"bottom" => 12,
								"left" => 12,
								"right" => 12,
								"top" => 12
							)
						)
					)
				)
			)
		);


		$this->register_spec(
			'json-with-image-text',
			__( 'JSON With Image and Text', 'apple-news' ),
			array(
				'role' => 'container',
				'layout' => '#layout#',
				"style" => array(
					"backgroundColor" => "#f7f7f1",
					"border" => array(
						"all" => array(
							"width" => 1,
							"style" => "solid",
							"color" => "#dededf"
						),
						"bottom" => false,
						"right" => false,
						"top" => true,
						"left" => false
					)
				),
				'components' => array(
					array(
						'role' => 'photo',
						'URL' => '#url#',
						'layout' =>  array(
							"padding" => array(
								"bottom" => 12,
								"left" => 12,
								"right" => 12,
								"top" => 12
							)
						)
					),
					array(
						'role' => 'quote',
						'text' => '#text_2#',
						'format' => 'html',
						'layout' => 'blockquote-layout',
						'textStyle' => 'default-blockquote-left'
					)
				)
			)
		);

		$this->register_spec(
			'json-with-text-image-text',
			__( 'JSON With Text and Image and Text', 'apple-news' ),
			array(
				'role' => 'container',
				'layout' => '#layout#',
				"style" => array(
					"backgroundColor" => "#f7f7f1",
					"border" => array(
						"all" => array(
							"width" => 1,
							"style" => "solid",
							"color" => "#dededf"
						),
						"bottom" => false,
						"right" => false,
						"top" => true,
						"left" => false
					)
				),
				'components' => array(
					array(
						'role' => 'quote',
						'text' => '#text_1#',
						'format' => 'html',
						'layout' => 'blockquote-layout',
						'textStyle' => 'default-blockquote-left'
					),
					array(
						'role' => 'photo',
						'URL' => '#url#',
						'layout' =>  array(
							"padding" => array(
								"bottom" => 12,
								"left" => 12,
								"right" => 12,
								"top" => 12
							)
						)
					),
					array(
						'role' => 'quote',
						'text' => '#text_2#',
						'format' => 'html',
						'layout' => 'blockquote-layout',
						'textStyle' => 'default-blockquote-left'
					)
				)
			)
		);
	}

	protected function build($html){
		$allowed_tags = '<p><a><em><strong><i><b><li><ul><ol>';
		$values = array();
		// Determine component alignment and set appropriate layout
		if ( false !== stripos( $html, 'align="left"' ) || preg_match( '/class="[^"]*alignleft[^"]*"/i', $html ) ) {
			$values['#layout#'] ='anchor-layout-left-2-col';
			$this->set_anchor_position( Component::ANCHOR_LEFT );
		} elseif ( false !== stripos( $html, 'align="right"' ) || preg_match( '/class="[^"]*alignright[^"]*"/i', $html ) ) {
			$this->set_anchor_position( Component::ANCHOR_RIGHT );
			$values['#layout#'] = 'callout-layout-right-2-col';
		} else {
			$this->set_anchor_position( Component::ANCHOR_NONE );
			$values['#layout#'] = 'callout-layout-full';
		}
		$innerHTML = preg_replace('/\<div\X*?>(\X*?)\<\/div>/i', '${1}', $html );
		$spec = 'json-with-text';
		/*
		## Variations:
			- text
			- image
			- text image
			- image text
			- text image text
		*/
		// is there an image?
		// Todo: handle multiple images?
		if ( preg_match( '/(\X*)?<figure.*?<img.*src=\"(.*?)\".*?figure>(\X*)?/i', $innerHTML, $match ) ) {
			if ( strlen( trim( wp_strip_all_tags($match[3]) ) ) ) {
				$values['#text_2#'] = wp_strip_all_tags($match[3], $allowed_tags);
			}
			if ( strlen( trim( wp_strip_all_tags($match[1]) ) ) ) {
				$values['#text_1#'] = wp_strip_all_tags($match[1], $allowed_tags);
			}

			$url = preg_replace('/\.(jpg|jpeg|png|gif|svg).*/i','.${1}', $match[2]);
			$values['#url#'] = esc_url_raw($url);

			if( isset($values['#text_1#']) && isset($values['#text_2#']) ){
				$spec = 'json-with-text-image-text';
			} elseif (isset($values['#text_2#'])) {
				$spec = 'json-with-image-text';
			} elseif (isset($values['#text_1#'])) {
				$spec = 'json-with-text-image';
			} else {
				$spec = 'json-with-image';
			}

		} else {
			$values['#text_1#'] = $innerHTML;
		}

		$this->register_json( $spec, $values );
	}
}

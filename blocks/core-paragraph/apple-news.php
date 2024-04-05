<?php
namespace Apple_Exporter\Components;

class Core_Paragraph_Big_Number extends Component {
	protected $can_be_anchor_target = true;
	public $needs_layout_if_anchored = false;

	public static function node_matches( $node ) {
		return self::node_has_class( $node, 'is-style-has-big-number' ) ? $node : null;
	}

	public function register_specs(){
		$this->register_spec(
			'json',
			__( 'JSON', 'apple-news' ),
			array(
				'role' => 'body',
				'layout' => 'body-layout',
				'textStyle' =>  '#style#',
				'text' =>  '#text#',
				'format' => 'html'
			)
		);
	}

	protected function build($html) {
		preg_match('/<section.*data-count=\"(.*?)\"/i', $html, $match);
		$count = intval($match[1]);
		$innerHTML = preg_replace('/\<section\X*?>(\X*?)\<\/section>/i', '${1}', $html );
		$innerHTML = preg_replace('/strong>/i', 'bignumstrong>', $innerHTML);
		$this->register_json( 'json', array(
			"#text#" =>  preg_replace('/<p>/i', '<p class="bignumber">', wpautop($count.$innerHTML)),
			"#style#" => $count > 9 ? 'body-bignumber-2-digit' : 'body-bignumber'
		) );
	}
}

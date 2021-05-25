<?php

class Separator_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_filter( 'render_block', array( $this, 'render_divider' ), 10, 2 );
		}
	}

	public function render_divider( $block_content, $block ) {
		if ( 'core/separator' !== $block['blockName'] ) {
			return $block_content;
		}
		
		$extra_classes = array_key_exists( 'className', $block['attrs'] ) ? $block['attrs']['className'] : null;

		$class_names = classNames( 'ui divider', $extra_classes );

		return '<div class="' . esc_attr( $class_names ) . '"></div>';
	}
}

new Separator_Block( true );

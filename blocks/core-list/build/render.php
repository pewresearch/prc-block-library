<?php
namespace PRC\Platform\Blocks;
if ( is_admin() ) {
	return;
}


$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes, 'vertical');

if ( $block_gap ) {
	$block_wrapper_attrs['style'] = '--block-gap: ' . $block_gap . ';';
}

$wrapper_attrs = get_block_wrapper_attributes($block_wrapper_attrs);



echo wp_sprintf(
    <<<'HTML'
    <div %s>
        %s
    </div>
    HTML,
    $wrapper_attrs,
    $content,
);

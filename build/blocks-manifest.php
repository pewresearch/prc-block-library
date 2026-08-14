<?php
// This file is generated. Do not modify it manually.
return array(
	'animation' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/animation',
		'title' => 'Screen Animation',
		'description' => 'Add fun screen effects like confetti and emojis to celebrate user interactions.',
		'version' => '1.0.0',
		'category' => 'design',
		'attributes' => array(
			'animation' => array(
				'type' => 'string',
				'enum' => array(
					'confetti',
					'emoji'
				)
			),
			'emoji' => array(
				'type' => 'string'
			),
			'effect' => array(
				'type' => 'string',
				'enum' => array(
					'center',
					'fireworks',
					'rain'
				)
			),
			'speed' => array(
				'type' => 'number',
				'default' => 5000
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => true,
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Animated content.'
					)
				)
			)
		),
		'textdomain' => 'animation',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'attachments-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/attachments-list',
		'version' => '0.2.0',
		'title' => 'Attachments List',
		'category' => 'text',
		'description' => 'Displays a list of attachments for the parent post of the current attachment. This block is intended to be used on attachment pages only.',
		'attributes' => array(
			'headingBackgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-black'
			),
			'headingTextColor' => array(
				'type' => 'string',
				'default' => 'ui-white'
			),
			'hoverBackgroundColor' => array(
				'type' => 'string'
			),
			'hoverTextColor' => array(
				'type' => 'string'
			),
			'customHoverBackgroundColor' => array(
				'type' => 'string'
			),
			'customHoverTextColor' => array(
				'type' => 'string'
			),
			'activeBackgroundColor' => array(
				'type' => 'string'
			),
			'activeTextColor' => array(
				'type' => 'string'
			),
			'customActiveBackgroundColor' => array(
				'type' => 'string'
			),
			'customActiveTextColor' => array(
				'type' => 'string'
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-white'
			),
			'heading' => array(
				'type' => 'string',
				'default' => 'Attachments'
			),
			'hideHeading' => array(
				'type' => 'boolean',
				'default' => false
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'spacing' => array(
						'blockGap' => 'var:preset|spacing|20'
					)
				)
			),
			'parentId' => array(
				'type' => 'number'
			)
		),
		'example' => array(
			'attributes' => array(
				'heading' => 'Attachments',
				'hideHeading' => false
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => false,
				'__experimentalDefaultControls' => array(
					'__experimentalFontFamily' => true
				)
			)
		),
		'usesContext' => array(
			'postId',
			'postType'
		),
		'textdomain' => 'attachments-list',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'attachments-pagination' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/attachments-pagination',
		'version' => '0.1.0',
		'title' => 'Attachments Pagination',
		'category' => 'text',
		'description' => 'Displays paginated list for the attachments of the parent post of the current attachment. This is only intended for use on Attachment pages.',
		'attributes' => array(
			'hoverBackgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-beige-very-light'
			),
			'hoverTextColor' => array(
				'type' => 'string',
				'default' => 'ui-black'
			),
			'activeBackgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-gray-very-light'
			),
			'activeTextColor' => array(
				'type' => 'string',
				'default' => 'ui-black'
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-white'
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'spacing' => array(
						'blockGap' => 'var:preset|spacing|20'
					)
				)
			),
			'parentId' => array(
				'type' => 'number'
			)
		),
		'example' => array(
			
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom',
					'left',
					'right'
				),
				'__experimentalDefaultControls' => array(
					'margin' => true,
					'blockGap' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => false,
				'__experimentalDefaultControls' => array(
					'__experimentalFontFamily' => true
				)
			)
		),
		'usesContext' => array(
			'postId',
			'postType'
		),
		'textdomain' => 'attachments-pagination',
		'editorScript' => array(
			'file:./index.js',
			'prc-block-library--pagination'
		),
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css',
			'prc-block-library--pagination',
			'prc-block-library--additional-color-supports'
		)
	),
	'audio-player' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/audio-player',
		'version' => '0.1.0',
		'title' => 'Audio Player',
		'category' => 'media',
		'description' => 'Custom audio player',
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => ''
			),
			'description' => array(
				'type' => 'string',
				'default' => ''
			),
			'source' => array(
				'type' => 'object',
				'default' => array(
					'title' => '',
					'description' => ''
				)
			),
			'imageSource' => array(
				'type' => 'object',
				'default' => array(
					'id' => ''
				)
			),
			'enableEventTracking' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'attributes' => array(
				'title' => 'Audio Title',
				'description' => 'A brief description of this audio clip.'
			)
		),
		'styles' => array(
			array(
				'name' => 'card',
				'label' => 'Card',
				'isDefault' => false
			),
			array(
				'name' => 'minimal',
				'label' => 'Minimal',
				'isDefault' => false
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'textdomain' => 'audio-player',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css',
			'wp-mediaelement'
		),
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'breadcrumbs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/breadcrumbs',
		'version' => '1.0.0',
		'title' => 'Breadcrumbs',
		'category' => 'theme',
		'attributes' => array(
			'contentJustification' => array(
				'type' => 'string'
			),
			'separator' => array(
				'type' => 'string',
				'default' => '>'
			),
			'showCurrentPageTitle' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showLeadingSeparator' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showHome' => array(
				'type' => 'boolean',
				'default' => true
			),
			'homeCrumb' => array(
				'type' => 'object',
				'properties' => array(
					'id' => array(
						'type' => 'string'
					),
					'url' => array(
						'type' => 'string'
					),
					'text' => array(
						'type' => 'string'
					),
					'asIcon' => array(
						'type' => 'boolean'
					)
				)
			),
			'showIndex' => array(
				'type' => 'boolean',
				'default' => true
			),
			'indexCrumb' => array(
				'type' => 'object',
				'properties' => array(
					'id' => array(
						'type' => 'string'
					),
					'url' => array(
						'type' => 'string'
					),
					'text' => array(
						'type' => 'string'
					)
				)
			),
			'crumbs' => array(
				'type' => 'array',
				'items' => array(
					'type' => 'object',
					'properties' => array(
						'id' => array(
							'type' => 'string'
						),
						'url' => array(
							'type' => 'string'
						),
						'text' => array(
							'type' => 'string'
						),
						'is_current_page' => array(
							'type' => 'boolean'
						),
						'crumbs' => array(
							'type' => 'array',
							'items' => array(
								'type' => 'object',
								'properties' => array(
									'id' => array(
										'type' => 'string'
									),
									'url' => array(
										'type' => 'string'
									),
									'text' => array(
										'type' => 'string'
									),
									'is_current_page' => array(
										'type' => 'boolean'
									)
								)
							)
						)
					)
				)
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'spacing' => array(
						'blockGap' => array(
							'left' => 'var:preset|spacing|50'
						)
					)
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'separator' => '>',
				'showHome' => true,
				'showIndex' => true,
				'homeCrumb' => array(
					'text' => 'Home',
					'url' => '#'
				),
				'indexCrumb' => array(
					'text' => 'Publications',
					'url' => '#'
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true,
				'heading' => true
			),
			'spacing' => array(
				'blockGap' => array(
					'sides' => array(
						'horizontal'
					)
				),
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'__experimentalBorder' => array(
				'color' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'usesContext' => array(
			'postId',
			'postType',
			'query',
			'queryId',
			'previewPostType'
		),
		'textdomain' => 'breadcrumbs',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/card',
		'version' => '1.0.0',
		'title' => 'Card',
		'category' => 'design',
		'description' => 'Display content in a card',
		'attributes' => array(
			'heading' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.prc-card__heading',
				'role' => 'content'
			),
			'headingBackgroundColor' => array(
				'type' => 'string'
			),
			'customHeadingBackgroundColor' => array(
				'type' => 'string'
			),
			'headingTextColor' => array(
				'type' => 'string'
			),
			'customHeadingTextColor' => array(
				'type' => 'string'
			)
		),
		'example' => array(
			'attributes' => array(
				'heading' => 'Card Title'
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Card content goes here.'
					)
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'margin' => true,
				'padding' => true,
				'__experimentalSkipSerialization' => true
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true
			),
			'position' => array(
				'sticky' => true
			)
		),
		'usesContext' => array(
			'postId',
			'postType'
		),
		'textdomain' => 'card',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'carousel-controller' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/carousel-controller',
		'version' => '1.0.0',
		'title' => 'Carousel',
		'category' => 'design',
		'description' => 'Organize content in a vertical or horizontal CSS carousel.',
		'keywords' => array(
			'scroll',
			'carousel',
			'slider'
		),
		'allowedBlocks' => array(
			'prc-block/carousel-slide'
		),
		'attributes' => array(
			'viewType' => array(
				'type' => 'string',
				'default' => 'horizontal',
				'enum' => array(
					'horizontal',
					'vertical',
					'coverflow',
					'slideshow'
				)
			),
			'enableDots' => array(
				'type' => 'boolean',
				'default' => true
			),
			'useSlideBgForDots' => array(
				'type' => 'boolean',
				'default' => false
			),
			'enableArrows' => array(
				'type' => 'boolean',
				'default' => true
			),
			'enableRewind' => array(
				'type' => 'boolean',
				'default' => true
			),
			'arrowsSize' => array(
				'type' => 'string',
				'default' => 'medium',
				'enum' => array(
					'small',
					'medium',
					'large'
				)
			),
			'dotsSize' => array(
				'type' => 'string',
				'default' => 'small',
				'enum' => array(
					'small',
					'medium',
					'large'
				)
			),
			'dotColor' => array(
				'type' => 'string',
				'default' => 'black'
			),
			'arrowColor' => array(
				'type' => 'string',
				'default' => 'black'
			),
			'editorActiveSlideIndex' => array(
				'type' => 'number',
				'role' => 'local'
			)
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true
			),
			'interactivity' => true,
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'shadow' => true,
			'color' => array(
				'background' => true,
				'text' => true,
				'button' => true,
				'enableContrastChecker' => true,
				'gradients' => true,
				'heading' => true,
				'link' => true
			),
			'background' => array(
				'color' => true,
				'gradient' => true,
				'image' => true
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/carousel-slide',
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Carousel slide content.'
							)
						)
					)
				)
			)
		),
		'textdomain' => 'carousel-controller',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'carousel-slide' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/carousel-slide',
		'version' => '1.0.0',
		'title' => 'Carousel Slide',
		'description' => 'A slide for use in the carousel block.',
		'category' => 'design',
		'attributes' => array(
			
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'background' => array(
				'backgroundImage' => true,
				'backgroundSize' => true
			),
			'color' => array(
				'background' => true,
				'enableContrastChecker' => true,
				'gradients' => false,
				'link' => true,
				'text' => true
			),
			'layout' => array(
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical',
					'justifyContent' => 'center',
					'verticalAlignment' => 'center'
				),
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowOrientation' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowSizingOnChildren' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true
			),
			'shadow' => true,
			'spacing' => array(
				'padding' => true
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Slide content.'
					)
				)
			)
		),
		'parent' => array(
			'prc-block/carousel-controller'
		),
		'textdomain' => 'carousel-slide',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'code-syntax' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/code-syntax',
		'version' => '0.1.0',
		'title' => 'Code Syntax',
		'description' => 'Write syntax-highlighted code with automatic language detection.  Language can also be set manually.',
		'category' => 'text',
		'attributes' => array(
			'orientation' => array(
				'type' => 'string',
				'default' => 'vertical'
			),
			'value' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'code',
				'role' => 'content'
			),
			'forceLanguage' => array(
				'type' => 'string',
				'default' => ''
			),
			'detectedLanguage' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default',
				'isDefault' => true
			),
			array(
				'name' => 'dark-mode',
				'label' => 'Dark theme'
			)
		),
		'example' => array(
			'attributes' => array(
				'value' => '<?php
 echo \'Hello World!\';
 ?>'
			)
		),
		'supports' => array(
			'align' => array(
				'full',
				'wide',
				'center'
			),
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => false,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => false
				)
			)
		),
		'textdomain' => 'code-syntax',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css',
			'prc-font-monospace'
		),
		'viewScript' => 'file:./view.js'
	),
	'color-palette' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/color-palette',
		'version' => '1.0.0',
		'title' => 'Color Palette',
		'category' => 'design',
		'description' => 'Displays the full theme color palette as a design system reference guide.',
		'attributes' => array(
			
		),
		'example' => array(
			
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'interactivity' => true
		),
		'textdomain' => 'color-palette',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'copyright' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/copyright',
		'version' => '0.1.0',
		'title' => 'Copyright Disclaimer',
		'category' => 'text',
		'description' => 'Renders a copywright disclaimer with the current year.',
		'textdomain' => 'copyright',
		'editorScript' => 'file:./index.js'
	),
	'core-accordion' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-accordion',
		'version' => '1.0.0',
		'title' => 'Accordion',
		'category' => 'design',
		'description' => 'Extended core/accordion with entity iframe support and structured data.',
		'textdomain' => 'core-accordion',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'supports' => array(
			'interactivity' => true
		),
		'viewScriptModule' => 'file:./view.js'
	),
	'core-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-button',
		'version' => '0.1.0',
		'title' => 'Button',
		'category' => 'design',
		'textdomain' => 'core-button',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'core-code' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-code',
		'version' => '0.1.0',
		'title' => 'Core Code',
		'category' => 'widgets',
		'textdomain' => 'core-code',
		'style' => 'file:./style-index.css'
	),
	'core-cover' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-cover',
		'version' => '0.1.0',
		'title' => 'Core Cover',
		'category' => 'widgets',
		'textdomain' => 'core-cover',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'core-details' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-details',
		'version' => '1.0.0',
		'title' => 'Collapsible',
		'category' => 'design',
		'textdomain' => 'core-details',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js',
		'supports' => array(
			'interactivity' => true
		)
	),
	'core-dialog' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-dialog',
		'version' => '0.1.0',
		'title' => 'Core Dialog',
		'category' => 'widgets',
		'textdomain' => 'core-dialog',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js',
		'supports' => array(
			'interactivity' => true
		)
	),
	'core-embed' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-embed',
		'version' => '0.1.0',
		'title' => 'Core Embed',
		'category' => 'embed',
		'textdomain' => 'core-embed',
		'editorScript' => 'file:./index.js'
	),
	'core-file' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-file',
		'version' => '0.1.0',
		'title' => 'Core File',
		'category' => 'widgets',
		'textdomain' => 'core-file',
		'style' => 'file:./style-index.css'
	),
	'core-group' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-group',
		'version' => '2.0.0',
		'category' => 'widgets',
		'textdomain' => 'core-group',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css',
			'prc-block-library--baseball-card'
		)
	),
	'core-heading' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-heading',
		'version' => '0.1.0',
		'category' => 'widgets',
		'textdomain' => 'core-heading',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'core-image' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-image',
		'version' => '0.1.0',
		'category' => 'widgets',
		'textdomain' => 'core-image',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'core-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-list',
		'version' => '0.1.0',
		'title' => 'Core List',
		'category' => 'text',
		'description' => 'Create a list of items.',
		'textdomain' => 'core-list',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'core-navigation' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-navigation',
		'version' => '0.1.0',
		'title' => 'Core Navigation',
		'category' => 'widgets',
		'textdomain' => 'core-navigation',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'core-paragraph' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-paragraph',
		'version' => '0.1.0',
		'title' => 'Core Paragraph',
		'category' => 'widgets',
		'textdomain' => 'core-paragraph',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'core-post-content' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-post-content',
		'version' => '0.1.0',
		'title' => 'Post Content',
		'category' => 'widgets',
		'textdomain' => 'core-post-content',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'core-post-title' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-post-title',
		'version' => '0.1.0',
		'title' => 'Post Title',
		'category' => 'widgets',
		'textdomain' => 'core-post-title',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'core-pullquote' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-pullquote',
		'version' => '0.1.0',
		'title' => 'Core Pullquote',
		'category' => 'widgets',
		'textdomain' => 'core-pullquote',
		'style' => 'file:./style-index.css'
	),
	'core-query' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-query',
		'version' => '0.1.0',
		'category' => 'widgets',
		'textdomain' => 'core-query',
		'editorScript' => 'file:./index.js'
	),
	'core-search' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-search',
		'version' => '0.1.0',
		'title' => 'Core Search',
		'category' => 'theme',
		'textdomain' => 'core-search',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'core-separator' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-separator',
		'version' => '0.1.0',
		'title' => 'Core Separator',
		'category' => 'widgets',
		'textdomain' => 'core-separator',
		'style' => 'file:./style-index.css'
	),
	'core-social-links' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-social-links',
		'version' => '0.1.0',
		'title' => 'Core Social-Links',
		'category' => 'widgets',
		'textdomain' => 'core-social-links',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js',
		'supports' => array(
			'interactivity' => true
		)
	),
	'core-table' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-table',
		'version' => '0.1.0',
		'title' => 'Core Table',
		'category' => 'widgets',
		'textdomain' => 'core-table',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'core-tabs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-tabs',
		'version' => '0.1.0',
		'title' => 'Core Tabs',
		'category' => 'widgets',
		'textdomain' => 'core-tabs',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js',
		'supports' => array(
			'interactivity' => true
		)
	),
	'dark-mode-toggle' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/dark-mode-toggle',
		'version' => '0.1.0',
		'title' => 'Dark Mode Toggle',
		'category' => 'widgets',
		'description' => 'A button that lets visitors override their OS color-scheme preference for the current site, switching between light and dark mode.',
		'keywords' => array(
			'dark',
			'mode',
			'light',
			'color',
			'scheme',
			'theme'
		),
		'attributes' => array(
			'showLabel' => array(
				'type' => 'boolean',
				'default' => true
			),
			'lightLabel' => array(
				'type' => 'string',
				'default' => 'Light mode'
			),
			'darkLabel' => array(
				'type' => 'string',
				'default' => 'Dark mode'
			)
		),
		'example' => array(
			'attributes' => array(
				'showLabel' => true,
				'lightLabel' => 'Light mode',
				'darkLabel' => 'Dark mode'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'align' => array(
				'left',
				'center',
				'right',
				'wide'
			),
			'interactivity' => true,
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true,
				'__experimentalDefaultControls' => array(
					'background' => false,
					'text' => false
				)
			),
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'__experimentalBorder' => array(
				'color' => true,
				'style' => true,
				'width' => true,
				'radius' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'style' => true,
					'width' => true,
					'radius' => true
				)
			),
			'selectors' => array(
				'border' => '.wp-block-prc-block-dark-mode-toggle',
				'color' => array(
					'background' => '.wp-block-prc-block-dark-mode-toggle',
					'text' => '.wp-block-prc-block-dark-mode-toggle',
					'link' => '.wp-block-prc-block-dark-mode-toggle'
				)
			)
		),
		'textdomain' => 'dark-mode-toggle',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'dialog' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/dialog',
		'version' => '1.1.0',
		'title' => 'Dialog',
		'description' => 'Render content in a modal. Includes a trigger to open the dialog and a dialog element `<dialog/>` to display content.',
		'category' => 'media',
		'keywords' => array(
			'dialog',
			'modal',
			'popup'
		),
		'allowedBlocks' => array(
			'prc-block/dialog-element',
			'prc-block/dialog-trigger'
		),
		'attributes' => array(
			'dialogId' => array(
				'type' => 'string',
				'default' => ''
			),
			'editorIsDialogOpen' => array(
				'type' => 'boolean',
				'role' => 'local',
				'default' => false
			)
		),
		'example' => array(
			'attributes' => array(
				'dialogId' => '123'
			),
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/dialog-trigger',
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Click to open'
							)
						)
					)
				),
				array(
					'name' => 'prc-block/dialog-element',
					'attributes' => array(
						'dialogSize' => 'medium',
						'animation' => 'fade'
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/heading',
							'attributes' => array(
								'content' => 'Dialog Title'
							)
						),
						array(
							'name' => 'core/image',
							'attributes' => array(
								'url' => 'https://placehold.co/600x400'
							)
						),
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Dialog content goes here.'
							)
						)
					)
				)
			)
		),
		'supports' => array(
			'anchor' => false,
			'html' => false,
			'listView' => true,
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'interactivity' => true
		),
		'providesContext' => array(
			'dialog/id' => 'dialogId',
			'dialog/isOpen' => 'editorIsDialogOpen'
		),
		'textdomain' => 'dialog',
		'editorScript' => 'file:./index.js'
	),
	'dialog-element' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/dialog-element',
		'version' => '1.1.0',
		'title' => 'Dialog Element',
		'category' => 'media',
		'attributes' => array(
			'dialogLabel' => array(
				'type' => 'string',
				'default' => ''
			),
			'backdropColor' => array(
				'type' => 'string'
			),
			'customBackdropColor' => array(
				'type' => 'string'
			),
			'autoActivateOnRender' => array(
				'type' => 'boolean',
				'default' => false
			),
			'animation' => array(
				'type' => 'string',
				'enum' => array(
					'fade',
					'pop',
					'bounce',
					'slide',
					'slide-up',
					'slide-left',
					'slide-right',
					'zoom'
				),
				'default' => 'fade'
			),
			'animationDuration' => array(
				'type' => 'number',
				'default' => 500
			),
			'autoActivationTimer' => array(
				'type' => 'number',
				'default' => -1
			),
			'enableDeepLink' => array(
				'type' => 'boolean',
				'default' => false
			),
			'dialogSize' => array(
				'type' => 'string',
				'enum' => array(
					'small',
					'medium',
					'large'
				),
				'default' => 'medium'
			),
			'dialogPosition' => array(
				'type' => 'string',
				'enum' => array(
					'center',
					'top',
					'bottom',
					'center left',
					'center right',
					'top left',
					'top right',
					'bottom left',
					'bottom right'
				),
				'default' => 'center'
			),
			'scrollDepthPercentage' => array(
				'type' => 'number',
				'default' => -1
			),
			'dismissalPersistenceScope' => array(
				'type' => 'string',
				'enum' => array(
					'pageload',
					'session',
					'device'
				),
				'default' => 'pageload'
			),
			'dialogVariant' => array(
				'type' => 'string',
				'enum' => array(
					'default',
					'bottom-sheet'
				),
				'default' => 'default'
			)
		),
		'example' => array(
			'attributes' => array(
				'dialogSize' => 'medium',
				'animation' => 'fade'
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/heading',
					'attributes' => array(
						'content' => 'Dialog Title'
					)
				),
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Dialog content.'
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'inserter' => false,
			'animations' => true,
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true,
				'enableContrastChecker' => true,
				'gradients' => true
			),
			'layout' => array(
				'allowEditing' => true
			),
			'shadow' => true,
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'interactivity' => true
		),
		'usesContext' => array(
			'dialog/id',
			'dialog/className',
			'dialog/isOpen'
		),
		'providesContext' => array(
			'dialog/label' => 'dialogLabel'
		),
		'parent' => array(
			'prc-block/dialog'
		),
		'textdomain' => 'dialog-element',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'dialog-element-bindings' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/dialog-element-bindings',
		'version' => '1.0.0',
		'title' => 'Dialog Element Bindings',
		'textdomain' => 'prc-block-library',
		'editorScript' => 'file:./index.js'
	),
	'dialog-trigger' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/dialog-trigger',
		'version' => '1.1.0',
		'title' => 'Dialog Trigger',
		'description' => 'The content inside this block will act as the clickable \'trigger\' to display the dialog element.',
		'category' => 'media',
		'attributes' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'inserter' => false,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'interactivity' => true
		),
		'usesContext' => array(
			'dialog/id',
			'dialog/className',
			'dialog/isOpen'
		),
		'parent' => array(
			'prc-block/dialog'
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Click to open'
					)
				)
			)
		),
		'textdomain' => 'dialog-trigger',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'entity-as-iframe' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/entity-as-iframe',
		'version' => '0.1.0',
		'title' => 'Entity as Iframe',
		'category' => 'embed',
		'description' => 'Confusing name aside, this block allows you to render any entity (post, page, etc) as an IFRAME. Additionally, utilizing the interacitivty api you can toggle an on or off state. This is useful for creating a toggleable iframe that can be used to display a post or page. For developers: simply utilize `store(\'prc-block/entity-as-iframe\').state[{{ref}}].open` to toggle the iframe on or off.',
		'attributes' => array(
			'ref' => array(
				'type' => 'number'
			),
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'iframeTemplate' => array(
				'type' => 'string',
				'enum' => array(
					'content',
					'branded'
				),
				'default' => 'content'
			)
		),
		'example' => array(
			'attributes' => array(
				'iframeTemplate' => 'content'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'blockGap' => true,
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'interactivity' => true
		),
		'textdomain' => 'entity-as-iframe',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'flip-card-controller' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/flip-card-controller',
		'version' => '1.0.0',
		'title' => 'Flip Card',
		'description' => 'An interactive card that flips to reveal additional content on the back side.',
		'category' => 'media',
		'allowedBlocks' => array(
			'prc-block/flip-card-side'
		),
		'attributes' => array(
			'fixedHeight' => array(
				'type' => 'number'
			),
			'isFlipped' => array(
				'type' => 'boolean',
				'role' => 'local',
				'default' => false
			)
		),
		'providesContext' => array(
			'prc-block/flip-card-isFlipped' => 'isFlipped'
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'interactivity' => true,
			'color' => array(
				'background' => true,
				'text' => true,
				'enableContrastChecker' => true
			),
			'align' => array(
				'left',
				'right'
			),
			'layout' => array(
				'default' => array(
					'type' => 'constrained'
				),
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowOrientation' => false,
				'allowSizingOnChildren' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/flip-card-side',
					'attributes' => array(
						'className' => 'is-style-front'
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Flip Card Front'
							)
						)
					)
				),
				array(
					'name' => 'prc-block/flip-card-side',
					'attributes' => array(
						'className' => 'is-style-back'
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Flip Card Back'
							)
						)
					)
				)
			)
		),
		'textdomain' => 'flip-card-controller',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'flip-card-side' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/flip-card-side',
		'version' => '1.0.0',
		'title' => 'Flip Card Side',
		'category' => 'media',
		'attributes' => array(
			
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Card side content.'
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'interactivity' => true,
			'layout' => array(
				'type' => 'constrained',
				'default' => array(
					'type' => 'constrained',
					'orientation' => 'vertical',
					'verticalAlignment' => 'center',
					'allowOrientation' => true,
					'contentSize' => '420px'
				),
				'allowSwitching' => true,
				'allowInheriting' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'padding' => true,
				'margin' => false
			),
			'__experimentalBorder' => array(
				'color' => true,
				'width' => true,
				'radius' => true
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'enableContrastChecker' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'parent' => array(
			'prc-block/flip-card-controller'
		),
		'usesContext' => array(
			'prc-block/flip-card-isFlipped'
		),
		'textdomain' => 'flip-card-side',
		'editorScript' => 'file:./index.js'
	),
	'footnotes' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/footnotes',
		'version' => '0.1.0',
		'title' => 'Footnotes',
		'category' => 'theme',
		'description' => 'A unique take on footnotes. Supports numoffset.',
		'attributes' => array(
			'numoffset' => array(
				'type' => 'number',
				'default' => 0
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'spacing' => array(
						'blockGap' => 'var:preset|spacing|20'
					)
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'numoffset' => 0
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'__experimentalBorder' => array(
				'color' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'style' => true,
					'width' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'usesContext' => array(
			'postId'
		),
		'textdomain' => 'footnotes',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'form-input-checkbox' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-input-checkbox',
		'version' => '1.0.1',
		'title' => 'Form Input Checkbox',
		'description' => 'A primitive block for a form input checkbox field',
		'category' => 'forms',
		'attributes' => array(
			'type' => array(
				'type' => 'string',
				'enum' => array(
					'checkbox',
					'radio',
					'toggle'
				),
				'default' => 'checkbox'
			),
			'label' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'label',
				'role' => 'content'
			),
			'value' => array(
				'type' => 'string',
				'default' => ''
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false
			),
			'defaultChecked' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default',
				'isDefault' => true
			),
			array(
				'name' => 'label-only',
				'label' => 'Label Only'
			)
		),
		'example' => array(
			'attributes' => array(
				'label' => 'Form Input Checkbox Label',
				'defaultChecked' => true
			),
			'viewportWidth' => 320
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => false,
			'interactivity' => true,
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true,
				'__experimentalSkipSerialization' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockSpacing' => true
			),
			'dimensions' => array(
				'minWidth' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true
			),
			'selectors' => array(
				'root' => '.wp-block-prc-block-form-input-checkbox',
				'color' => array(
					'root' => '.wp-block-prc-block-form-input-checkbox',
					'text' => '.wp-block-prc-block-form-input-checkbox label',
					'background' => '.wp-block-prc-block-form-input-checkbox input'
				),
				'border' => '.wp-block-prc-block-form-input-checkbox input'
			)
		),
		'textdomain' => 'form-input-checkbox',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'form-input-password' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-input-password',
		'version' => '1.0.0',
		'title' => 'Password Field',
		'category' => 'forms',
		'description' => 'A block for password input in a form with optional confirmation field and strength analyzer.',
		'allowedBlocks' => array(
			'prc-block/form-input-text',
			'core/group'
		),
		'attributes' => array(
			'includesConfirmation' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/form-input-text',
					'attributes' => array(
						'type' => 'password',
						'label' => 'Password',
						'required' => true,
						'placeholder' => 'Password...'
					)
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => false,
			'interactivity' => true,
			'spacing' => array(
				'blockGap' => true,
				'padding' => true,
				'margin' => true
			),
			'dimensions' => array(
				'minWidth' => true
			),
			'layout' => array(
				'type' => 'flex',
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical',
					'verticalAlignment' => 'center',
					'allowOrientation' => true
				),
				'allowInheriting' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true
			)
		),
		'textdomain' => 'form-input-password',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'form-input-radio-group' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-input-radio-group',
		'version' => '1.0.1',
		'title' => 'Form Input Radio Group',
		'description' => 'A primitive block for a form input radio group field',
		'category' => 'forms',
		'allowedBlocks' => array(
			'prc-block/form-input-checkbox'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'label',
				'role' => 'content'
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default',
				'isDefault' => true
			),
			array(
				'name' => 'label-only',
				'label' => 'Label Only'
			)
		),
		'example' => array(
			'attributes' => array(
				'label' => 'Form Input Radio Group Label'
			),
			'viewportWidth' => 320
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => false,
			'interactivity' => true,
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => false
			),
			'layout' => array(
				'type' => 'flex',
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical',
					'verticalAlignment' => 'center',
					'allowOrientation' => true
				),
				'allowInheriting' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'padding' => true,
				'margin' => true
			),
			'dimensions' => array(
				'minWidth' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true
			)
		),
		'textdomain' => 'form-input-checkbox',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'form-input-range' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-input-range',
		'version' => '1.0.0',
		'title' => 'Input Range Field',
		'description' => 'A primitive `<input type="range">` element for slider inputs.',
		'category' => 'forms',
		'attributes' => array(
			'displayLabel' => array(
				'type' => 'boolean',
				'default' => true
			),
			'label' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'label',
				'role' => 'content'
			),
			'min' => array(
				'type' => 'number',
				'default' => 0,
				'source' => 'attribute',
				'selector' => 'input',
				'attribute' => 'min'
			),
			'max' => array(
				'type' => 'number',
				'default' => 100,
				'source' => 'attribute',
				'selector' => 'input',
				'attribute' => 'max'
			),
			'step' => array(
				'type' => 'number',
				'default' => 1,
				'source' => 'attribute',
				'selector' => 'input',
				'attribute' => 'step'
			),
			'value' => array(
				'type' => 'number',
				'default' => 50,
				'source' => 'attribute',
				'selector' => 'input',
				'attribute' => 'value'
			),
			'displayValue' => array(
				'type' => 'boolean',
				'default' => true
			),
			'displayMinMax' => array(
				'type' => 'boolean',
				'default' => true
			),
			'outputFormat' => array(
				'type' => 'string',
				'enum' => array(
					'number',
					'currency',
					'percentage'
				),
				'default' => 'number'
			),
			'orientation' => array(
				'type' => 'string',
				'enum' => array(
					'horizontal',
					'vertical'
				),
				'default' => 'horizontal'
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'viewportWidth' => 320,
			'attributes' => array(
				'label' => 'Select Volume',
				'min' => 0,
				'max' => 100,
				'value' => 75,
				'required' => false
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => true,
			'interactivity' => true,
			'layout' => array(
				'type' => 'flex',
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical',
					'verticalAlignment' => 'center',
					'allowOrientation' => true
				),
				'allowInheriting' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'padding' => true,
				'margin' => true
			),
			'dimensions' => array(
				'minWidth' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'width' => true,
				'radius' => true,
				'__experimentalSkipSerialization' => true
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'enableContrastChecker' => true,
				'__experimentalSkipSerialization' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'selectors' => array(
				'root' => '.wp-block-prc-block-form-input-range',
				'color' => '.wp-block-prc-block-form-input-range .range-container',
				'border' => '.wp-block-prc-block-form-input-range .range-container'
			)
		),
		'textdomain' => 'form-input-range',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'form-input-select' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-input-select',
		'version' => '1.5.0',
		'title' => 'Form Input Select',
		'category' => 'forms',
		'description' => 'A select element that supports search and autocomplete.',
		'attributes' => array(
			'type' => array(
				'type' => 'string',
				'enum' => array(
					'custom',
					'industries',
					'countries',
					'countries-and-regions',
					'us-states'
				),
				'default' => 'custom'
			),
			'rawOptions' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'options' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'hasClearIcon' => array(
				'type' => 'boolean',
				'default' => false
			),
			'displayLabel' => array(
				'type' => 'boolean',
				'default' => true
			),
			'label' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'label',
				'role' => 'content'
			),
			'placeholder' => array(
				'type' => 'string',
				'default' => 'A hint or example...',
				'source' => 'attribute',
				'selector' => 'input',
				'attribute' => 'placeholder',
				'role' => 'content'
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false,
				'source' => 'attribute',
				'selector' => 'input',
				'attribute' => 'required'
			),
			'disabled' => array(
				'type' => 'boolean',
				'default' => false,
				'source' => 'attribute',
				'selector' => 'input',
				'attribute' => 'disabled'
			),
			'value' => array(
				'type' => 'string',
				'source' => 'attribute',
				'selector' => 'input',
				'attribute' => 'value'
			),
			'allowMultiple' => array(
				'type' => 'boolean',
				'default' => false
			),
			'allowSearch' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'example' => array(
			'viewportWidth' => 320,
			'attributes' => array(
				'type' => 'custom',
				'label' => 'Country',
				'placeholder' => 'Select a country...',
				'required' => false,
				'options' => array(
					array(
						'label' => 'United States',
						'value' => 'us'
					),
					array(
						'label' => 'United Kingdom',
						'value' => 'uk'
					),
					array(
						'label' => 'Canada',
						'value' => 'ca'
					)
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => true,
			'interactivity' => true,
			'layout' => array(
				'type' => 'flex',
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical',
					'verticalAlignment' => 'center',
					'allowOrientation' => true
				),
				'allowInheriting' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'padding' => true,
				'margin' => true
			),
			'dimensions' => array(
				'minWidth' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'width' => true,
				'radius' => true,
				'__experimentalSkipSerialization' => true
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'enableContrastChecker' => true,
				'__experimentalSkipSerialization' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'selectors' => array(
				'root' => '.wp-block-prc-block-form-input-text',
				'color' => '.wp-block-prc-block-form-input-text > input',
				'border' => '.wp-block-prc-block-form-input-text > input'
			)
		),
		'usesContext' => array(
			'form-input-select/options',
			'form-input-select/has-clear-icon'
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default',
				'isDefault' => true
			),
			array(
				'name' => 'inline-label',
				'label' => 'Inline Label'
			)
		),
		'textdomain' => 'form-input-select',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'form-input-select-range' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-input-select-range',
		'version' => '1.0.0',
		'title' => 'Select Range Field',
		'category' => 'forms',
		'description' => 'A block for selecting a range with minimum and maximum select dropdowns.',
		'allowedBlocks' => array(
			'prc-block/form-input-select',
			'core/group'
		),
		'attributes' => array(
			'type' => array(
				'type' => 'string',
				'enum' => array(
					'years',
					'numbers'
				),
				'default' => 'numbers'
			),
			'rangeStart' => array(
				'type' => 'number',
				'default' => 0
			),
			'rangeEnd' => array(
				'type' => 'number',
				'default' => 100
			),
			'currentYear' => array(
				'type' => 'boolean',
				'default' => true
			),
			'rangeStep' => array(
				'type' => 'number',
				'default' => 1
			),
			'enableClearIcons' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'example' => array(
			'attributes' => array(
				'type' => 'years',
				'rangeStart' => 2000,
				'rangeEnd' => 2025,
				'rangeStep' => 1
			),
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/form-input-select',
					'attributes' => array(
						'type' => 'custom',
						'label' => 'Minimum',
						'placeholder' => 'Select Minimum...'
					)
				),
				array(
					'name' => 'prc-block/form-input-select',
					'attributes' => array(
						'type' => 'custom',
						'label' => 'Maximum',
						'placeholder' => 'Select Maximum...'
					)
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => false,
			'interactivity' => true,
			'spacing' => array(
				'blockGap' => true,
				'padding' => true,
				'margin' => true
			),
			'dimensions' => array(
				'minWidth' => true
			),
			'layout' => array(
				'type' => 'flex',
				'default' => array(
					'type' => 'flex',
					'orientation' => 'horizontal',
					'verticalAlignment' => 'center',
					'allowOrientation' => true
				),
				'allowInheriting' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true
			)
		),
		'providesContext' => array(
			'form-input-select/has-clear-icon' => 'enableClearIcons'
		),
		'usesContext' => array(
			'form-input-select/options',
			'form-input-select-range/key'
		),
		'textdomain' => 'form-input-select-range',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'form-input-text' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-input-text',
		'version' => '1.0.1',
		'title' => 'Input Text Field',
		'description' => 'A primitive `<input>` element.',
		'category' => 'forms',
		'attributes' => array(
			'displayLabel' => array(
				'type' => 'boolean',
				'default' => true
			),
			'label' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'label',
				'role' => 'content'
			),
			'placeholder' => array(
				'type' => 'string',
				'default' => 'A hint or example...',
				'source' => 'attribute',
				'selector' => 'input',
				'attribute' => 'placeholder',
				'role' => 'content'
			),
			'type' => array(
				'type' => 'string',
				'enum' => array(
					'email',
					'password',
					'text',
					'textarea',
					'number',
					'date',
					'url',
					'tel',
					'time',
					'search',
					'datetime-local'
				),
				'default' => 'text',
				'source' => 'attribute',
				'selector' => 'input',
				'attribute' => 'type'
			),
			'value' => array(
				'type' => 'string',
				'source' => 'attribute',
				'selector' => 'input',
				'attribute' => 'value'
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false
			),
			'responseKey' => array(
				'type' => 'string'
			),
			'copyToClipboard' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'viewportWidth' => 320,
			'attributes' => array(
				'label' => 'Name',
				'placeholder' => 'Enter your name',
				'required' => true
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => true,
			'interactivity' => true,
			'layout' => array(
				'type' => 'flex',
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical',
					'verticalAlignment' => 'center',
					'allowOrientation' => true
				),
				'allowInheriting' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'padding' => true,
				'margin' => true
			),
			'dimensions' => array(
				'minWidth' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'width' => true,
				'radius' => true,
				'__experimentalSkipSerialization' => true
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'enableContrastChecker' => true,
				'__experimentalSkipSerialization' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'selectors' => array(
				'root' => '.wp-block-prc-block-form-input-text',
				'color' => '.wp-block-prc-block-form-input-text > input',
				'border' => '.wp-block-prc-block-form-input-text > input'
			)
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default',
				'isDefault' => true
			),
			array(
				'name' => 'inline-label',
				'label' => 'Inline Label'
			),
			array(
				'name' => 'hidden',
				'label' => 'Hidden'
			)
		),
		'textdomain' => 'form-input-text',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'form-input-textarea' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-input-textarea',
		'version' => '1.0.0',
		'title' => 'Input Textarea Field',
		'description' => 'A primitive `<textarea>` element.',
		'keywords' => array(
			'textarea',
			'form',
			'input',
			'field'
		),
		'category' => 'forms',
		'attributes' => array(
			'displayLabel' => array(
				'type' => 'boolean',
				'default' => true
			),
			'label' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'label',
				'role' => 'content'
			),
			'placeholder' => array(
				'type' => 'string',
				'default' => 'A hint or example...',
				'source' => 'attribute',
				'selector' => 'textarea',
				'attribute' => 'placeholder',
				'role' => 'content'
			),
			'value' => array(
				'type' => 'string',
				'source' => 'attribute',
				'selector' => 'textarea',
				'attribute' => 'value'
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false
			),
			'maxLength' => array(
				'type' => 'number',
				'source' => 'attribute',
				'selector' => 'textarea',
				'attribute' => 'maxlength',
				'default' => 1000
			),
			'minLength' => array(
				'type' => 'number',
				'source' => 'attribute',
				'selector' => 'textarea',
				'attribute' => 'minlength',
				'default' => 10
			),
			'rows' => array(
				'type' => 'number',
				'source' => 'attribute',
				'selector' => 'textarea',
				'attribute' => 'rows',
				'default' => 4
			),
			'cols' => array(
				'type' => 'number',
				'source' => 'attribute',
				'selector' => 'textarea',
				'attribute' => 'cols',
				'default' => 20
			),
			'wrap' => array(
				'type' => 'string',
				'source' => 'attribute',
				'selector' => 'textarea',
				'attribute' => 'wrap',
				'enum' => array(
					'hard',
					'soft',
					'off'
				)
			)
		),
		'example' => array(
			'viewportWidth' => 320,
			'attributes' => array(
				'label' => 'Message',
				'placeholder' => 'Enter your message',
				'required' => true
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => false,
			'interactivity' => true,
			'layout' => array(
				'type' => 'flex',
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical',
					'verticalAlignment' => 'center',
					'allowOrientation' => true
				),
				'allowInheriting' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'padding' => true,
				'margin' => true
			),
			'dimensions' => array(
				'minWidth' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'width' => true,
				'radius' => true,
				'__experimentalSkipSerialization' => true
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'enableContrastChecker' => true,
				'__experimentalSkipSerialization' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'selectors' => array(
				'root' => '.wp-block-prc-block-form-input-textarea',
				'color' => '.wp-block-prc-block-form-input-textarea > textarea',
				'border' => '.wp-block-prc-block-form-input-textarea > textarea'
			)
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default',
				'isDefault' => true
			),
			array(
				'name' => 'inline-label',
				'label' => 'Inline Label'
			)
		),
		'textdomain' => 'form-input-textarea',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'icon' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/icon',
		'version' => '0.1.0',
		'title' => 'Icon',
		'category' => 'design',
		'description' => 'Renders a Font Awesome icon.',
		'attributes' => array(
			'size' => array(
				'type' => 'number',
				'default' => 1
			),
			'library' => array(
				'type' => 'string',
				'default' => 'solid'
			),
			'icon' => array(
				'type' => 'string',
				'default' => 'star'
			)
		),
		'example' => array(
			'attributes' => array(
				'icon' => 'star',
				'library' => 'solid',
				'size' => 1
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			)
		),
		'textdomain' => 'icon',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'logo' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/logo',
		'version' => '1.0.0',
		'title' => 'Pew Research Center Logo',
		'description' => 'The Pew Research Center logo, available in primary, alternate, decoded, and symbol styles. Dark mode aware.',
		'category' => 'theme',
		'keywords' => array(
			'logo',
			'masthead',
			'dark-mode'
		),
		'attributes' => array(
			'justification' => array(
				'type' => 'string',
				'default' => 'left',
				'enum' => array(
					'left',
					'center',
					'right'
				)
			),
			'width' => array(
				'type' => 'number',
				'default' => 361
			)
		),
		'supports' => array(
			'html' => false,
			'interactivity' => true,
			'color' => array(
				'background' => true,
				'text' => false,
				'gradients' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			)
		),
		'styles' => array(
			array(
				'name' => 'primary-only',
				'label' => 'Primary',
				'isDefault' => true
			),
			array(
				'name' => 'primary-stable-white',
				'label' => 'Primary (Stable White)'
			),
			array(
				'name' => 'alt-only',
				'label' => 'Alternate'
			),
			array(
				'name' => 'alt-stable-white',
				'label' => 'Alternate (Stable White)'
			),
			array(
				'name' => 'symbol-only',
				'label' => 'Symbol Only'
			),
			array(
				'name' => 'symbol-stable-white',
				'label' => 'Symbol (Stable White)'
			),
			array(
				'name' => 'decoded-only',
				'label' => 'Decoded'
			),
			array(
				'name' => 'pew-knight-only',
				'label' => 'Pew Knight'
			)
		),
		'example' => array(
			'viewportWidth' => 400,
			'attributes' => array(
				'width' => 300,
				'className' => 'is-style-logo-example'
			)
		),
		'usesContext' => array(
			'postType',
			'postId',
			'queryId'
		),
		'textdomain' => 'pewresearch-logo',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'script' => array(
			'prc-icons'
		),
		'viewScriptModule' => 'file:./view.js',
		'style' => 'file:./style-index.css'
	),
	'lorem-ipsum' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/lorem-ipsum',
		'version' => '0.1.0',
		'title' => 'Lorem Ipsum',
		'icon' => 'text',
		'category' => 'text',
		'description' => 'Lorem ipsum placeholder text.',
		'attributes' => array(
			'totalParagraphs' => array(
				'type' => 'number',
				'default' => 1
			)
		),
		'example' => array(
			'attributes' => array(
				'totalParagraphs' => 1
			)
		),
		'supports' => array(
			'inserter' => false,
			'html' => false
		),
		'textdomain' => 'lorem-ipsum',
		'editorScript' => 'file:./index.js'
	),
	'navigation-mega-menu' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/navigation-mega-menu',
		'version' => '1.0.0',
		'title' => 'Navigation Mega Menu',
		'category' => 'design',
		'description' => 'Mega menu that supports multiple overlay types and animations.',
		'parent' => array(
			'core/navigation'
		),
		'example' => array(
			
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'description' => array(
				'type' => 'string'
			),
			'title' => array(
				'type' => 'string'
			),
			'url' => array(
				'type' => 'string'
			),
			'menuSlug' => array(
				'type' => 'string'
			),
			'menuItemBackgroundColor' => array(
				'type' => 'string'
			),
			'customMenuItemBackgroundColor' => array(
				'type' => 'string'
			),
			'menuItemTextColor' => array(
				'type' => 'string'
			),
			'customMenuItemTextColor' => array(
				'type' => 'string'
			),
			'menuItemActiveBackgroundColor' => array(
				'type' => 'string'
			),
			'customMenuItemActiveBackgroundColor' => array(
				'type' => 'string'
			),
			'menuItemActiveTextColor' => array(
				'type' => 'string'
			),
			'customMenuItemActiveTextColor' => array(
				'type' => 'string'
			),
			'menuActiveBorderColor' => array(
				'type' => 'string'
			),
			'customMenuActiveBorderColor' => array(
				'type' => 'string'
			),
			'isMobile' => array(
				'type' => 'boolean',
				'default' => false
			),
			'icon' => array(
				'type' => 'string',
				'default' => 'dropdown',
				'enum' => array(
					'dropdown',
					'mobile',
					'search'
				)
			),
			'animation' => array(
				'type' => 'string',
				'enum' => array(
					'fade',
					'slide'
				)
			)
		),
		'supports' => array(
			'html' => false,
			'interactivity' => true,
			'renaming' => true,
			'reusable' => false,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'shadow' => true,
			'__experimentalBorder' => array(
				'color' => true,
				'width' => true
			),
			'__experimentalSlashInserter' => true
		),
		'textdomain' => 'prc-navigation-mega-menu-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'playground' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/playground',
		'version' => '0.1.0',
		'title' => 'Playground',
		'category' => 'design',
		'description' => 'A dev only block: prc-block/playground provides a simple way to see all blocks and/or components at once, delete it and drop it back in to start fresh. We dont automatically include child blocks, but you can add them in the editor.',
		'attributes' => array(
			'playgroundType' => array(
				'type' => 'string',
				'enum' => array(
					'blocks',
					'components'
				),
				'default' => 'blocks'
			)
		),
		'example' => array(
			'attributes' => array(
				'playgroundType' => 'blocks'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false
		),
		'textdomain' => 'playground',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'popular-story' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/popular-story',
		'version' => '1.0.0',
		'description' => 'A popular post, must be placed in a group block for numbers to appear.',
		'title' => 'Popular Story',
		'category' => 'content-curation',
		'attributes' => array(
			'title' => array(
				'type' => 'string'
			),
			'url' => array(
				'type' => 'string',
				'default' => ''
			),
			'postId' => array(
				'type' => 'integer'
			),
			'blockIndexAttr' => array(
				'type' => 'integer'
			),
			'enableNumber' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'example' => array(
			'attributes' => array(
				'title' => 'Most Popular Story Title',
				'url' => '#',
				'blockIndexAttr' => 1,
				'enableNumber' => true
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true
			)
		),
		'textdomain' => 'popular-story',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'post-parent-title' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/post-parent-title',
		'version' => '0.1.0',
		'title' => 'Post Parent Title',
		'category' => 'theme',
		'usesContext' => array(
			'postId',
			'postType',
			'queryId'
		),
		'attributes' => array(
			'textAlign' => array(
				'type' => 'string'
			),
			'level' => array(
				'type' => 'number',
				'default' => 4
			),
			'isLink' => array(
				'type' => 'boolean',
				'default' => false
			),
			'rel' => array(
				'type' => 'string',
				'attribute' => 'rel',
				'default' => ''
			),
			'linkTarget' => array(
				'type' => 'string',
				'default' => '_self'
			)
		),
		'example' => array(
			'attributes' => array(
				'level' => 4,
				'isLink' => false
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'color' => array(
				'gradients' => false,
				'link' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true,
					'link' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'textdomain' => 'parent-post-title',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'post-taxonomy-terms' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/post-taxonomy-terms',
		'version' => '0.1.0',
		'title' => 'Post Taxonomy Terms',
		'category' => 'theme',
		'description' => 'Display the current post\'s selected taxonomy terms.',
		'attributes' => array(
			'getAllTerms' => array(
				'type' => 'boolean',
				'default' => false
			),
			'taxonomy' => array(
				'type' => 'string',
				'default' => 'categories'
			),
			'perPage' => array(
				'type' => 'number',
				'default' => 25
			),
			'separator' => array(
				'type' => 'string'
			),
			'enableLink' => array(
				'type' => 'boolean',
				'default' => true
			),
			'linkToPublicationsPage' => array(
				'type' => 'boolean',
				'default' => false
			),
			'activeBackgroundColor' => array(
				'type' => 'string'
			),
			'activeTextColor' => array(
				'type' => 'string'
			),
			'customActiveBackgroundColor' => array(
				'type' => 'string'
			),
			'customActiveTextColor' => array(
				'type' => 'string'
			),
			'hoverBackgroundColor' => array(
				'type' => 'string'
			),
			'hoverTextColor' => array(
				'type' => 'string'
			),
			'customHoverBackgroundColor' => array(
				'type' => 'string'
			),
			'customHoverTextColor' => array(
				'type' => 'string'
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'spacing' => array(
						'blockGap' => 'var:preset|spacing|20'
					)
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'taxonomy' => 'categories',
				'enableLink' => true,
				'perPage' => 5
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true
			),
			'layout' => array(
				'allowEditing' => true,
				'allowJustification' => true,
				'allowInheriting' => false,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true,
				'allowSwitching' => false,
				'allowVerticalAlignment' => true,
				'default' => array(
					'type' => 'flex',
					'justifyContent' => 'left',
					'orientation' => 'vertical'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalFontWeight' => true,
				'__experimentalTextTransform' => true,
				'__experimentalFontFamily' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalSkipSerialization' => array(
					'textDecoration'
				),
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'spacing' => array(
				'blockGap' => true,
				'padding' => true,
				'units' => array(
					'px',
					'em',
					'rem',
					'vh',
					'vw'
				),
				'__experimentalDefaultControls' => array(
					'blockGap' => true
				)
			)
		),
		'usesContext' => array(
			'postId',
			'postType'
		),
		'textdomain' => 'post-taxonomy-terms',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'progress-bar' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/progress-bar',
		'version' => '0.1.0',
		'title' => 'Progress Bar',
		'category' => 'media',
		'icon' => 'chart-bar',
		'keywords' => array(
			'progress',
			'bar',
			'quiz',
			'result',
			'horizontal',
			'chart'
		),
		'attributes' => array(
			'barColor' => array(
				'type' => 'string',
				'default' => 'social-trends-teal'
			),
			'valueColor' => array(
				'type' => 'string',
				'default' => 'ui-black'
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-beige-very-light'
			),
			'barHeight' => array(
				'type' => 'number',
				'default' => 10
			),
			'maxValue' => array(
				'type' => 'number',
				'default' => 100
			),
			'label' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'label',
				'default' => 'Progress',
				'role' => 'content'
			),
			'value' => array(
				'type' => 'number',
				'default' => 0
			),
			'labelFormat' => array(
				'type' => 'string',
				'default' => 'percentage',
				'enum' => array(
					'percentage',
					'fractional'
				)
			),
			'labelPosition' => array(
				'type' => 'string',
				'default' => 'left',
				'enum' => array(
					'left',
					'right'
				)
			),
			'valuePosition' => array(
				'type' => 'string',
				'default' => 'outside',
				'enum' => array(
					'inside',
					'outside'
				)
			),
			'valueFontSize' => array(
				'type' => 'number',
				'default' => 12
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'interactivity' => true,
			'animations' => true,
			'color' => array(
				'background' => true,
				'text' => true,
				'__experimentalSkipSerialization' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextTransform' => true,
				'__experimentalFontFamily' => true
			)
		),
		'example' => array(
			'attributes' => array(
				'label' => 'Progress',
				'value' => 35,
				'maxValue' => 100
			)
		),
		'textdomain' => 'progress-bar',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'promo' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/promo',
		'version' => '0.1.0',
		'title' => 'Promo (Ad)',
		'description' => 'Stylized block to create promos/ads.',
		'category' => 'marketing',
		'attributes' => array(
			'heading' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.wp-block-prc-block-promo__heading',
				'role' => 'content'
			),
			'headingLevel' => array(
				'type' => 'integer',
				'default' => 2
			),
			'subHeading' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.wp-block-prc-block-promo__sub_heading',
				'role' => 'content'
			),
			'icon' => array(
				'type' => 'string',
				'default' => 'weekly'
			),
			'hasForm' => array(
				'type' => 'boolean',
				'default' => false
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'spacing' => array(
						'blockGap' => 'var:preset|spacing|20'
					)
				)
			)
		),
		'styles' => array(
			array(
				'name' => 'standard',
				'label' => 'Standard',
				'isDefault' => true
			),
			array(
				'name' => 'pancake',
				'label' => 'Pancake'
			)
		),
		'example' => array(
			'attributes' => array(
				'heading' => 'Facts are more important than ever',
				'subHeading' => '<p>In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution.</p>'
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/button',
					'attributes' => array(
						'text' => 'DONATE'
					)
				)
			),
			'viewPortWidth' => 1200
		),
		'supports' => array(
			'align' => array(
				'full',
				'wide',
				'center'
			),
			'anchor' => true,
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'width' => true
			),
			'html' => false,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true
			)
		),
		'textdomain' => 'promo',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'promo-rotator' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/promo-rotator',
		'version' => '0.1.0',
		'title' => 'Promo Rotator',
		'description' => 'Rotates through a promo block randomly on page load.',
		'keywords' => array(
			'promo',
			'rotator',
			'ads',
			'ad'
		),
		'category' => 'marketing',
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/card',
					'attributes' => array(
						'heading' => 'Promo Card'
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Promotional content.'
							)
						)
					)
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'textdomain' => 'promo-rotator',
		'editorScript' => 'file:./index.js'
	),
	'render-to-region' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/render-to-region',
		'version' => '1.0.0',
		'title' => 'Render To Region',
		'category' => 'theme',
		'description' => 'This block allows other blocks to "render to" the defined region upon certain conditions.',
		'attributes' => array(
			'regionName' => array(
				'type' => 'string'
			),
			'activationConditions' => array(
				'type' => 'object',
				'properties' => array(
					'isDesktop' => array(
						'type' => 'boolean',
						'default' => true
					),
					'isMobile' => array(
						'type' => 'boolean',
						'default' => false
					),
					'isTablet' => array(
						'type' => 'boolean',
						'default' => false
					),
					'isPortrait' => array(
						'type' => 'boolean',
						'default' => false
					),
					'isLandscape' => array(
						'type' => 'boolean',
						'default' => false
					)
				),
				'default' => array(
					'isDesktop' => false,
					'isMobile' => false,
					'isTablet' => false,
					'isPortrait' => false,
					'isLandscape' => false
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'regionName' => 'sidebar'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'reusable' => false,
			'interactivity' => true
		),
		'textdomain' => 'render-to-region',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'responsive-container-controller' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/responsive-container-controller',
		'version' => '0.1.0',
		'title' => 'Responsive Container',
		'description' => 'A set of blocks to display content at specific viewport widths.',
		'keywords' => array(
			'ai2html',
			'illustrator',
			'responsive',
			'container',
			'Illustrator',
			'AI2HTML'
		),
		'category' => 'design',
		'attributes' => array(
			
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'align' => array(
				'left',
				'right',
				'wide',
				'full'
			),
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/responsive-container-view',
					'attributes' => array(
						'deviceType' => 'desktop',
						'min' => 980
					)
				),
				array(
					'name' => 'prc-block/responsive-container-view',
					'attributes' => array(
						'deviceType' => 'tablet',
						'min' => 480,
						'max' => 979
					)
				),
				array(
					'name' => 'prc-block/responsive-container-view',
					'attributes' => array(
						'deviceType' => 'mobile',
						'max' => 479
					)
				)
			)
		),
		'textdomain' => 'responsive-container-controller',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'responsive-container-view' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/responsive-container-view',
		'version' => '0.1.0',
		'title' => 'Responsive View',
		'category' => 'design',
		'description' => 'A block of blocks that appears and hides at specific viewport widths.',
		'attributes' => array(
			'min' => array(
				'type' => 'number'
			),
			'max' => array(
				'type' => 'number'
			),
			'orientation' => array(
				'type' => 'string',
				'default' => 'vertical'
			),
			'deviceType' => array(
				'type' => 'string',
				'enum' => array(
					'desktop',
					'tablet',
					'mobile'
				)
			),
			'additionalStyles' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'blockGap' => true,
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true
			)
		),
		'example' => array(
			'attributes' => array(
				'deviceType' => 'desktop',
				'min' => 980
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/html',
					'attributes' => array(
						'content' => '<p>Desktop content</p>'
					)
				)
			)
		),
		'parent' => array(
			'prc-block/responsive-container-controller'
		),
		'textdomain' => 'responsive-container-view',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css'
	),
	'roper-db-search' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/roper-db-search',
		'version' => '0.1.0',
		'title' => 'Roper Database',
		'description' => 'Embeddable Roper Database search tool.',
		'keywords' => array(
			'database',
			'roper',
			'cornell',
			'search',
			'polling'
		),
		'category' => 'embed',
		'attributes' => array(
			'subText' => array(
				'type' => 'string',
				'default' => 'Use this tool to search our database of polling questions.'
			),
			'perPage' => array(
				'type' => 'number',
				'default' => 10
			),
			'type' => array(
				'type' => 'string',
				'default' => 'default'
			)
		),
		'example' => array(
			'attributes' => array(
				'subText' => 'Use this tool to search our database of polling questions.',
				'perPage' => 10
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false
		),
		'textdomain' => 'roper-db-search',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css',
			'roper-db-search'
		),
		'viewScript' => array(
			'file:./view.js',
			'roper-db-search'
		)
	),
	'show-more' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/show-more',
		'version' => '0.1.0',
		'title' => 'Show More',
		'category' => 'widgets',
		'description' => 'A block that hides content until a user clicks a button to reveal it. Useful for long content that you want to hide by default. You can select the previewable surface area and height based on device.',
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'heights' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 200,
					'tablet' => 150,
					'mobile' => 100
				)
			),
			'buttonBackground' => array(
				'type' => 'string'
			),
			'customButtonBackground' => array(
				'type' => 'string'
			),
			'buttonColor' => array(
				'type' => 'string'
			),
			'customButtonColor' => array(
				'type' => 'string'
			),
			'showLabel' => array(
				'type' => 'string',
				'default' => 'Show More'
			),
			'hideLabel' => array(
				'type' => 'string',
				'default' => 'Hide'
			),
			'splitAtViewportWidth' => array(
				'type' => 'string'
			)
		),
		'example' => array(
			'attributes' => array(
				'showLabel' => 'Show More',
				'hideLabel' => 'Hide',
				'heights' => array(
					'desktop' => 200,
					'tablet' => 150,
					'mobile' => 100
				)
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'This content is initially hidden and revealed when the user clicks Show More.'
					)
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default',
				'isDefault' => true
			),
			array(
				'name' => 'card',
				'label' => 'Card'
			)
		),
		'textdomain' => 'hide-in-view',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'social-share-sheet' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/social-share-sheet',
		'version' => '0.1.0',
		'title' => 'Social Share Sheet',
		'category' => 'widgets',
		'description' => 'Invokes a browser\'s native navigator.share share sheet. If the browser does not support the Web Share API, a fallback share sheet is displayed.',
		'attributes' => array(
			'label' => array(
				'type' => 'string',
				'default' => ''
			),
			'textAlign' => array(
				'type' => 'string'
			),
			'iconLibrary' => array(
				'type' => 'string',
				'default' => 'solid'
			),
			'iconName' => array(
				'type' => 'string',
				'default' => 'share'
			),
			'iconPosition' => array(
				'type' => 'string',
				'default' => 'right'
			)
		),
		'example' => array(
			'attributes' => array(
				'label' => ''
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'interactivity' => true,
			'color' => array(
				'background' => true,
				'text' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'blockGap' => true,
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'shadow' => true,
			'__experimentalBorder' => array(
				'color' => true,
				'style' => true,
				'width' => true,
				'radius' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'style' => true,
					'width' => true,
					'radius' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'selectors' => array(
				'border' => '.wp-block-prc-block-social-share-sheet > a, .wp-block-prc-block-social-share-sheet > button',
				'shadow' => '.wp-block-prc-block-social-share-sheet > a, .wp-block-prc-block-social-share-sheet > button',
				'color' => array(
					'background' => '.wp-block-prc-block-social-share-sheet > a, .wp-block-prc-block-social-share-sheet > button',
					'text' => '.wp-block-prc-block-social-share-sheet > a, .wp-block-prc-block-social-share-sheet > button'
				),
				'spacing' => array(
					'padding' => '.wp-block-prc-block-social-share-sheet > a, .wp-block-prc-block-social-share-sheet > button'
				),
				'typography' => '.wp-block-prc-block-social-share-sheet > a, .wp-block-prc-block-social-share-sheet > button'
			)
		),
		'usesContext' => array(
			'postId',
			'queryId',
			'openInNewTab',
			'showLabels',
			'iconColor',
			'iconColorValue',
			'iconBackgroundColor',
			'iconBackgroundColorValue',
			'core/socialLinksTitle',
			'core/socialLinksUrl',
			'core/socialLinksDescription',
			'core/socialLinksImageId',
			'core/socialLinksHashtags'
		),
		'parent' => array(
			'core/social-links'
		),
		'textdomain' => 'social-share-sheet',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'social-share-text-link' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/social-share-text-link',
		'version' => '1.0.0',
		'title' => 'Social Share Text Link',
		'description' => 'Add a text link to a social share group.',
		'category' => 'widgets',
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'opensInNewTab' => array(
				'type' => 'boolean',
				'default' => false
			),
			'url' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'align' => false
		),
		'example' => array(
			'attributes' => array(
				'label' => 'Read more...'
			),
			'viewPortWidth' => 100
		),
		'usesContext' => array(
			'openInNewTab',
			'showLabels',
			'iconColor',
			'iconColorValue',
			'iconBackgroundColor',
			'iconBackgroundColorValue'
		),
		'parent' => array(
			'core/social-links'
		),
		'textdomain' => 'social-share-text-link',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'social-share-url-field' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/social-share-url-field',
		'version' => '0.1.0',
		'title' => 'Social Share Url Field',
		'keywords' => array(
			'social'
		),
		'category' => 'marketing',
		'allowedBlocks' => array(
			'prc-block/form-input-text'
		),
		'attributes' => array(
			
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/form-input-text',
					'attributes' => array(
						'label' => 'URL',
						'placeholder' => 'https://...'
					)
				)
			)
		),
		'supports' => array(
			'anchor' => false,
			'html' => false,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'align' => false,
			'interactivity' => true
		),
		'parent' => array(
			'core/social-links'
		),
		'usesContext' => array(
			'postId',
			'core/socialLinksTitle',
			'core/socialLinksDescription',
			'core/socialLinksUrl'
		),
		'textdomain' => 'social-share-url-field',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'story-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/story-item',
		'title' => 'Story Item',
		'version' => '5.0.0',
		'category' => 'content-curation',
		'description' => 'A story item is a visual display of a post, with a title, excerpt, and image. Pre-compiled variations such as pub-listing and list-item are available for each post.',
		'keywords' => array(
			'prc',
			'story',
			'item',
			'story item',
			'stub'
		),
		'usesContext' => array(
			'postId',
			'postType',
			'query',
			'queryId',
			'enhancedPagination',
			'displayLayout',
			'previewPostType',
			'grid/column/desktop/span',
			'grid/column/tablet/span',
			'grid/column/mobile/span'
		),
		'example' => array(
			'attributes' => array(
				'title' => 'Ultricies Ipsum Nibh Egestas Purus',
				'excerpt' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
				'label' => 'Report',
				'date' => 'Jan 1, 2023',
				'image' => 'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
				'imageSlot' => 'top',
				'imageSize' => 'A2',
				'isPreview' => true,
				'postId' => 0
			)
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'role' => 'content'
			),
			'excerpt' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.description',
				'role' => 'content'
			),
			'url' => array(
				'type' => 'string',
				'default' => '',
				'role' => 'content'
			),
			'label' => array(
				'type' => 'string',
				'role' => 'content'
			),
			'date' => array(
				'type' => 'string',
				'role' => 'content'
			),
			'image' => array(
				'type' => 'string'
			),
			'imageSlot' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'imageSize' => array(
				'type' => 'string',
				'default' => 'A1'
			),
			'isChartArt' => array(
				'type' => 'boolean',
				'default' => false
			),
			'postId' => array(
				'type' => 'integer'
			),
			'postType' => array(
				'type' => 'string'
			),
			'headerSize' => array(
				'type' => 'integer',
				'default' => 2
			),
			'enableAltHeaderWeight' => array(
				'type' => 'boolean',
				'default' => false
			),
			'enableHeader' => array(
				'type' => 'boolean',
				'default' => true
			),
			'enableExcerpt' => array(
				'type' => 'boolean',
				'default' => true
			),
			'enableExtra' => array(
				'type' => 'boolean',
				'default' => false
			),
			'enableMeta' => array(
				'type' => 'boolean',
				'default' => true
			),
			'metaTaxonomy' => array(
				'type' => 'string',
				'default' => 'formats'
			),
			'isPreview' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'html' => false,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'style' => false,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true
			),
			'interactivity' => array(
				'clientNavigation' => true
			)
		),
		'textdomain' => 'story-item',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'table-of-contents' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/table-of-contents',
		'version' => '0.1.0',
		'title' => 'Table of Contents',
		'category' => 'theme',
		'description' => 'Displays a list of all heading blocks set to chapter headings.',
		'attributes' => array(
			'showCurrentChapter' => array(
				'type' => 'boolean',
				'default' => false
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'textColor' => array(
				'type' => 'string'
			),
			'linkColor' => array(
				'type' => 'string'
			),
			'activeBackgroundColor' => array(
				'type' => 'string'
			),
			'activeTextColor' => array(
				'type' => 'string'
			),
			'customActiveBackgroundColor' => array(
				'type' => 'string'
			),
			'customActiveTextColor' => array(
				'type' => 'string'
			),
			'hoverBackgroundColor' => array(
				'type' => 'string'
			),
			'hoverTextColor' => array(
				'type' => 'string'
			),
			'customHoverBackgroundColor' => array(
				'type' => 'string'
			),
			'customHoverTextColor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'align' => array(
				'left',
				'right'
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true
			),
			'interactivity' => true,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			),
			'typography' => array(
				'__experimentalFontFamily' => true,
				'fontSizes' => true,
				'lineHeight' => true,
				'__experimentalDefaultControls' => array(
					'__experimentalFontFamily' => true,
					'fontSizes' => true
				)
			)
		),
		'example' => array(
			'viewportWidth' => 320
		),
		'usesContext' => array(
			'postId',
			'postType'
		),
		'textdomain' => 'table-of-contents',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'taxonomy-index-az-controller' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/taxonomy-index-az-controller',
		'version' => '0.1.0',
		'title' => 'Taxonomy Index A-Z Controller',
		'description' => 'Provides a grid of A-Z Index blocks that transform to an accordion on mobile.',
		'category' => 'theme',
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'orientation' => array(
				'type' => 'string',
				'default' => 'vertical'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/grid-controller',
					'innerBlocks' => array(
						array(
							'name' => 'prc-block/grid-column',
							'attributes' => array(
								'gridLayout' => array(
									'index' => 1,
									'desktopSpan' => 4,
									'tabletSpan' => 2
								),
								'allowedBlocks' => array(
									'prc-block/taxonomy-index-az-list'
								)
							)
						),
						array(
							'name' => 'prc-block/grid-column',
							'attributes' => array(
								'gridLayout' => array(
									'index' => 2,
									'desktopSpan' => 4,
									'tabletSpan' => 4
								),
								'allowedBlocks' => array(
									'prc-block/taxonomy-index-az-list'
								)
							)
						),
						array(
							'name' => 'prc-block/grid-column',
							'attributes' => array(
								'gridLayout' => array(
									'index' => 3,
									'desktopSpan' => 4,
									'tabletSpan' => 2
								),
								'allowedBlocks' => array(
									'prc-block/taxonomy-index-az-list'
								)
							)
						)
					)
				)
			)
		),
		'textdomain' => 'taxonomy-index-az-controller',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'taxonomy-index-az-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/taxonomy-index-az-list',
		'version' => '0.1.0',
		'title' => 'Taxonomy Index A-Z Listing',
		'category' => 'theme',
		'description' => 'A list of taxonomy terms sorted alphabeticaly. Select terms you want to exclude by checking the box.',
		'keywords' => array(
			'taxonomy',
			'alphabetical'
		),
		'attributes' => array(
			'letter' => array(
				'type' => 'string'
			),
			'exclude' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'taxonomy' => array(
				'type' => 'array',
				'default' => array(
					'category'
				)
			),
			'disableHeading' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'attributes' => array(
				'letter' => 'A',
				'taxonomy' => array(
					'category'
				),
				'disableHeading' => false
			)
		),
		'supports' => array(
			'anchor' => true,
			'align' => false,
			'html' => false,
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'textdomain' => 'taxonomy-index-az-list',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'taxonomy-index-list-controller' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/taxonomy-index-list-controller',
		'version' => '1.0.0',
		'title' => 'Taxonomy Index List Controller',
		'category' => 'theme',
		'description' => 'Display a grid of taxonomy list blocks that converts to a WordPress core accordion on mobile',
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'orientation' => array(
				'type' => 'string',
				'default' => 'vertical'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'__experimentalFontFamily' => true
				)
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/grid-controller',
					'innerBlocks' => array(
						array(
							'name' => 'prc-block/grid-column',
							'attributes' => array(
								'gridLayout' => array(
									'index' => 1,
									'desktopSpan' => 4,
									'tabletSpan' => 2,
									'mobileSpan' => 4
								),
								'allowedBlocks' => array(
									'prc-block/taxonomy-list',
									'core/block'
								)
							)
						),
						array(
							'name' => 'prc-block/grid-column',
							'attributes' => array(
								'gridLayout' => array(
									'index' => 2,
									'desktopSpan' => 4,
									'tabletSpan' => 4,
									'mobileSpan' => 4
								),
								'allowedBlocks' => array(
									'prc-block/taxonomy-list',
									'core/block'
								)
							)
						),
						array(
							'name' => 'prc-block/grid-column',
							'attributes' => array(
								'gridLayout' => array(
									'index' => 3,
									'desktopSpan' => 4,
									'tabletSpan' => 2,
									'mobileSpan' => 4
								),
								'allowedBlocks' => array(
									'prc-block/taxonomy-list',
									'core/block'
								)
							)
						)
					)
				)
			)
		),
		'textdomain' => 'taxonomy-index-list-controller',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'taxonomy-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/taxonomy-list',
		'version' => '0.1.0',
		'title' => 'Taxonomy List',
		'category' => 'theme',
		'description' => 'Display a list of taxonomy terms.',
		'allowedBlocks' => array(
			'prc-block/taxonomy-list-link',
			'prc-block/taxonomy-search'
		),
		'attributes' => array(
			'templateLock' => array(
				'type' => array(
					'string',
					'boolean'
				),
				'enum' => array(
					'all',
					'insert',
					'contentOnly',
					false
				)
			),
			'taxonomy' => array(
				'type' => 'string',
				'default' => 'category'
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'spacing' => array(
						'blockGap' => 'var:preset|spacing|20'
					)
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'taxonomy' => 'category'
			),
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/taxonomy-list-link',
					'attributes' => array(
						'label' => 'Category A',
						'url' => '#'
					)
				),
				array(
					'name' => 'prc-block/taxonomy-list-link',
					'attributes' => array(
						'label' => 'Category B',
						'url' => '#'
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'inserter' => true,
			'reusable' => true,
			'layout' => array(
				'allowEditing' => true,
				'allowJustification' => true,
				'allowInheriting' => false,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true,
				'allowSwitching' => false,
				'allowVerticalAlignment' => true,
				'default' => array(
					'type' => 'flex',
					'justifyContent' => 'left',
					'orientation' => 'vertical'
				)
			),
			'color' => array(
				'text' => true,
				'link' => true,
				'background' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalFontWeight' => true,
				'__experimentalTextTransform' => true,
				'__experimentalFontFamily' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalSkipSerialization' => array(
					'textDecoration'
				),
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'spacing' => array(
				'blockGap' => true,
				'units' => array(
					'px',
					'em',
					'rem',
					'vh',
					'vw'
				),
				'__experimentalDefaultControls' => array(
					'blockGap' => true
				)
			),
			'__experimentalStyle' => array(
				'elements' => array(
					'link' => array(
						'color' => array(
							'text' => 'inherit'
						)
					)
				)
			)
		),
		'providesContext' => array(
			'taxonomy' => 'taxonomy'
		),
		'textdomain' => 'menu',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'taxonomy-list-link' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/taxonomy-list-link',
		'version' => '1.0.0',
		'title' => 'Taxonomy List Link',
		'category' => 'theme',
		'description' => 'Display a link to a taxonomy term or custom URL with optional settings.',
		'allowedBlocks' => array(
			'prc-block/taxonomy-list-link',
			'core/paragraph',
			'core/heading'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'url' => array(
				'type' => 'string'
			),
			'id' => array(
				'type' => 'number'
			),
			'description' => array(
				'type' => 'string'
			),
			'rel' => array(
				'type' => 'string'
			),
			'opensInNewTab' => array(
				'type' => 'boolean',
				'default' => false
			),
			'title' => array(
				'type' => 'string'
			),
			'taxonomy' => array(
				'type' => 'string'
			),
			'enableSubMenu' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'attributes' => array(
				'label' => 'Category Name',
				'url' => '#'
			)
		),
		'parent' => array(
			'prc-block/taxonomy-list'
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => true,
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'color' => array(
				'text' => true,
				'link' => true,
				'background' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'interactivity' => true
		),
		'providesContext' => array(
			'style' => 'style'
		),
		'usesContext' => array(
			'taxonomy',
			'style'
		),
		'textdomain' => 'taxonomy-list-link',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'taxonomy-search' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/taxonomy-search',
		'version' => '1.0.0',
		'title' => 'Taxonomy Search',
		'category' => 'theme',
		'description' => 'Search for terms of a specified taxonomy.',
		'icon' => 'search',
		'allowedBlocks' => array(
			'prc-block/form-input-text'
		),
		'attributes' => array(
			'taxonomy' => array(
				'type' => 'string',
				'default' => 'category'
			),
			'restrictToTerm' => array(
				'type' => 'object'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true
			),
			'interactivity' => true
		),
		'usesContext' => array(
			'taxonomy'
		),
		'example' => array(
			'attributes' => array(
				'taxonomy' => 'category'
			),
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/form-input-text',
					'attributes' => array(
						'isInteractive' => true,
						'interactiveNamespace' => 'prc-block/taxonomy-search',
						'placeholder' => 'Search category'
					)
				)
			)
		),
		'textdomain' => 'taxonomy-search',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'timeline' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/timeline',
		'version' => '0.1.0',
		'title' => 'Timeline',
		'category' => 'design',
		'description' => 'Display a series of blocks in a timeline',
		'allowedBlocks' => array(
			'prc-block/timeline-slide'
		),
		'attributes' => array(
			'defaultLabel' => array(
				'type' => 'string',
				'default' => 'Timeline'
			),
			'currentActiveIndex' => array(
				'type' => 'number',
				'default' => 0
			),
			'enableAutoPlay' => array(
				'type' => 'boolean',
				'default' => false
			),
			'autoPlayInterval' => array(
				'type' => 'number',
				'default' => 3000
			),
			'tickMarkInterval' => array(
				'type' => 'number',
				'default' => 2
			),
			'tickMarkHeight' => array(
				'type' => 'number',
				'default' => 8
			),
			'showAllTickMarks' => array(
				'type' => 'boolean',
				'default' => false
			),
			'hideLastTick' => array(
				'type' => 'boolean',
				'default' => false
			),
			'tickLabelAngle' => array(
				'type' => 'number',
				'default' => 0
			),
			'visibleTicks' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'tickMarkColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'tickMarkWidth' => array(
				'type' => 'number',
				'default' => 2
			)
		),
		'example' => array(
			'attributes' => array(
				'defaultLabel' => 'Timeline'
			),
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/timeline-slide',
					'attributes' => array(
						'metadata' => array(
							'name' => '2020'
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Events from 2020.'
							)
						)
					)
				),
				array(
					'name' => 'prc-block/timeline-slide',
					'attributes' => array(
						'metadata' => array(
							'name' => '2021'
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Events from 2021.'
							)
						)
					)
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'interactivity' => true,
			'listView' => true,
			'alignWide' => true,
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'providesContext' => array(
			'timeline/currentActiveIndex' => 'currentActiveIndex'
		),
		'textdomain' => 'timeline',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'timeline-slide' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/timeline-slide',
		'title' => 'Timeline Slide',
		'version' => '1.0.0',
		'category' => 'design',
		'attributes' => array(
			'metadata' => array(
				'type' => 'object',
				'default' => array(
					'name' => ''
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => false,
			'interactivity' => true,
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'parent' => array(
			'prc-block/timeline'
		),
		'usesContext' => array(
			'timeline/currentActiveIndex'
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Timeline slide content.'
					)
				)
			)
		),
		'textdomain' => 'timeline-slide',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'tokens-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/tokens-list',
		'title' => 'Tokens List',
		'version' => '1.0.0',
		'category' => 'theme',
		'allowedBlocks' => array(
			'core/button'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'label',
				'role' => 'content'
			),
			'tokens' => array(
				'type' => 'array',
				'default' => array(
					
				),
				'items' => array(
					'type' => 'object',
					'properties' => array(
						'label' => array(
							'type' => 'string'
						),
						'value' => array(
							'type' => 'string'
						),
						'slug' => array(
							'type' => 'string'
						),
						'isSelected' => array(
							'type' => 'boolean',
							'default' => false
						)
					)
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'interactivity' => true,
			'layout' => array(
				'type' => 'flex',
				'default' => array(
					'type' => 'flex',
					'orientation' => 'horizontal',
					'verticalAlignment' => 'center',
					'allowOrientation' => true
				),
				'allowInheriting' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true,
				'__experimentalSkipSerialization' => true
			),
			'spacing' => array(
				'blockGap' => true,
				'padding' => true,
				'margin' => true
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'button' => true,
				'enableContrastChecker' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'usesContext' => array(
			'tokens/list'
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'core/button',
					'attributes' => array(
						'text' => 'Token'
					)
				)
			)
		),
		'textdomain' => 'tokens-list',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'version' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/version',
		'version' => '1.0.0',
		'title' => 'Version',
		'category' => 'theme',
		'description' => 'Get the latest version for various PRC_ constants.',
		'textdomain' => 'version',
		'editorScript' => 'file:./index.js'
	)
);

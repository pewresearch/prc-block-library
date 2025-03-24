<?php
// This file is generated. Do not modify it manually.
return array(
	'accordion' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/accordion',
		'version' => '0.1.0',
		'title' => 'Accordion',
		'category' => 'design',
		'attributes' => array(
			'title' => array(
				'type' => 'string'
			),
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'titleBackgroundColor' => array(
				'type' => 'string'
			),
			'titleTextColor' => array(
				'type' => 'string'
			),
			'contentBackgroundColor' => array(
				'type' => 'string'
			),
			'contentTextColor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'color' => array(
				'link' => true,
				'text' => false,
				'background' => false
			),
			'anchor' => true,
			'html' => false,
			'typography' => array(
				'fontSize' => false,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => false,
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
			),
			'interactivity' => true
		),
		'parent' => array(
			'prc-block/accordion-controller'
		),
		'usesContext' => array(
			'prc-block/accordion-controller/content-background',
			'prc-block/accordion-controller/content-text',
			'prc-block/accordion-controller/title-background',
			'prc-block/accordion-controller/title-text'
		),
		'textdomain' => 'accordion',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'accordion-controller' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/accordion-controller',
		'version' => '0.1.0',
		'title' => 'Accordion Controller',
		'category' => 'design',
		'description' => 'Controls a group of accordion blocks.',
		'attributes' => array(
			'titleBackgroundColor' => array(
				'type' => 'string'
			),
			'titleTextColor' => array(
				'type' => 'string'
			),
			'contentBackgroundColor' => array(
				'type' => 'string'
			),
			'contentTextColor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'color' => array(
				'link' => true,
				'text' => false,
				'background' => false
			),
			'spacing' => array(
				'blockGap' => array(
					'sides' => array(
						'vertical'
					)
				),
				'margin' => array(
					'top',
					'bottom'
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
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'layout' => array(
				'allowEditing' => false,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical'
				)
			),
			'interactivity' => true
		),
		'example' => array(
			'attributes' => array(
				
			),
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/accordion',
					'attributes' => array(
						'title' => 'Accordion 1'
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Content 1'
							)
						)
					)
				),
				array(
					'name' => 'prc-block/accordion',
					'attributes' => array(
						'title' => 'Accordion 2'
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Content 2'
							)
						)
					)
				)
			),
			'viewportWidth' => 640
		),
		'providesContext' => array(
			'prc-block/accordion-controller/content-background' => 'contentBackgroundColor',
			'prc-block/accordion-controller/content-text' => 'contentTextColor',
			'prc-block/accordion-controller/title-background' => 'titleBackgroundColor',
			'prc-block/accordion-controller/title-text' => 'titleTextColor'
		),
		'textdomain' => 'accordion-controller',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js'
	),
	'attachment-info' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/attachment-info',
		'version' => '0.1.0',
		'title' => 'Attachment Info',
		'category' => 'text',
		'description' => 'Displays either a list of attachments or a pagination of attachments. This block is intended to be used on attachment pages only. It will display a list of attachments for the parent post of the current attachment.',
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
			'heading' => array(
				'type' => 'string',
				'default' => 'Attachment Info'
			),
			'hideHeading' => array(
				'type' => 'boolean',
				'default' => false
			),
			'variant' => array(
				'type' => 'string',
				'default' => 'list'
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
		'textdomain' => 'attachment-info',
		'editorScript' => array(
			'file:./index.js',
			'prc-block-library--pagination'
		),
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css',
			'prc-block-library--baseball-card',
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
				'default' => '/'
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
				'default' => false
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
	'bylines-display' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/bylines-display',
		'version' => '1.0.0',
		'title' => 'Bylines Display',
		'category' => 'theme',
		'description' => 'Display a post\'s bylines in the format: {prefix \'By\'} 1, 2, and 3.',
		'attributes' => array(
			'prefix' => array(
				'type' => 'string',
				'default' => 'By'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'color' => array(
				'text' => true,
				'background' => true,
				'link' => true
			),
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true
			),
			'layout' => array(
				'allowEditing' => true,
				'allowJustification' => true,
				'allowInheriting' => false,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true,
				'allowSwitching' => false,
				'allowVerticalAlignment' => false,
				'default' => array(
					'type' => 'flex',
					'justifyContent' => 'left',
					'orientation' => 'horizontal'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'fontAppearance' => true,
				'lineHeight' => true,
				'__experimentalFontStyle' => false,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextTransform' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalLetterSpacing' => true,
					'__experimentalTextTransform' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'textAlign' => 'left',
				'prefix' => 'By'
			),
			'viewportWidth' => 400
		),
		'usesContext' => array(
			'postId'
		),
		'textdomain' => 'bylines-display',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'bylines-query' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/bylines-query',
		'version' => '1.0.0',
		'title' => 'Bylines Query',
		'category' => 'theme',
		'description' => 'Query the current post for bylines.',
		'usesContext' => array(
			'queryId',
			'postId',
			'postType'
		),
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
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
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'blockGap' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true
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
				'fontAppearance' => true,
				'__experimentalFontStyle' => false,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextTransform' => true
			)
		),
		'textdomain' => 'bylines-query',
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
		'description' => 'Organize content in a vertical or horizontal carousel.',
		'keywords' => array(
			'scroll',
			'carousel',
			'slider'
		),
		'allowedBlocks' => array(
			'prc-block/carousel-slide'
		),
		'attributes' => array(
			'orientation' => array(
				'type' => 'string',
				'default' => 'horizontal'
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
		'styles' => array(
			array(
				'name' => 'arrows-navigation',
				'label' => 'Arrows Navigation',
				'isDefault' => true
			),
			array(
				'name' => 'dots-navigation',
				'label' => 'Dots Navigation'
			)
		),
		'textdomain' => 'carousel-controller',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
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
			'orientation' => array(
				'type' => 'string',
				'default' => 'vertical'
			),
			'layout' => array(
				'type' => 'object',
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical',
					'justifyContent' => 'center',
					'verticalAlignment' => 'center'
				)
			)
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
					'verticalAlignment' => 'stretch'
				),
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
			'interactivity' => true,
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true
			)
		),
		'parent' => array(
			'prc-block/carousel-controller'
		),
		'textdomain' => 'carousel-slide',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
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
				'selector' => 'code'
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
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	),
	'collapsible' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/collapsible',
		'version' => '0.1.0',
		'title' => 'Collapsible',
		'category' => 'design',
		'keywords' => array(
			'collapsible',
			'accordion',
			'how we did this'
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string'
			),
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-beige-very-light'
			),
			'borderColor' => array(
				'type' => 'string',
				'default' => 'ui-beige-dark'
			),
			'isCoBranded' => array(
				'type' => 'boolean',
				'default' => false
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'border' => array(
						'width' => '1px'
					),
					'spacing' => array(
						'blockGap' => array(
							'top' => 'var:preset|spacing|30'
						),
						'padding' => array(
							'bottom' => 'var:preset|spacing|20',
							'left' => 'var:preset|spacing|30',
							'right' => 'var:preset|spacing|30',
							'top' => 'var:preset|spacing|20'
						)
					)
				)
			)
		),
		'supports' => array(
			'anchor' => false,
			'html' => false,
			'inserter' => false,
			'spacing' => array(
				'blockGap' => array(
					'sides' => array(
						'vertical'
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
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true
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
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'interactivity' => true
		),
		'example' => array(
			'attributes' => array(
				'title' => 'How we did this'
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, quam sapien aliquet nunc, nec aliquam nisl nunc'
					)
				)
			),
			'viewportWidth' => 640
		),
		'textdomain' => 'collapsible',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js'
	),
	'collection-kicker' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/collection-kicker',
		'version' => '1.0.0',
		'title' => 'Collection Kicker',
		'category' => 'theme',
		'description' => 'Display the \'kicker\' for a collection term. You can select a specific term or default behavior is to display the term for the current post.',
		'attributes' => array(
			'termId' => array(
				'type' => 'integer'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false
		),
		'usesContext' => array(
			'postType',
			'postId',
			'templateSlug',
			'previewPostType'
		),
		'textdomain' => 'collection-kicker',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'color-palette' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/color-palette',
		'version' => '0.1.0',
		'title' => 'Color Palette',
		'category' => 'design',
		'description' => 'Display a color from the palette defined in the currently active theme.',
		'attributes' => array(
			
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => false
			)
		),
		'textdomain' => 'color-palette',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css',
			'wp-components'
		),
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
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
		'editorStyle' => 'file:./index.css'
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
	'core-group' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-group',
		'version' => '2.0.0',
		'category' => 'widgets',
		'textdomain' => 'core-group',
		'editorScript' => 'file:./index.js',
		'viewScriptModule' => 'file:./view.js',
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
	'core-post-featured-image' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/core-post-featured-image',
		'version' => '0.1.0',
		'title' => 'Post Feature Image',
		'category' => 'widgets',
		'textdomain' => 'core-post-featured-image',
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
		'title' => 'Core Query',
		'category' => 'theme',
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
		'viewScript' => 'file:./view.js'
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
	'dialog' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/dialog',
		'version' => '1.0.0',
		'title' => 'Dialog',
		'description' => 'Render content in a <dialog/> element modal. Includes a trigger to open the dialog and dialog element to render content.',
		'category' => 'media',
		'keywords' => array(
			'dialog',
			'modal',
			'popup'
		),
		'attributes' => array(
			'dialogId' => array(
				'type' => 'string',
				'default' => ''
			),
			'dialogType' => array(
				'type' => 'string',
				'enum' => array(
					'dialog',
					'modal'
				),
				'default' => 'modal'
			),
			'autoActivateOnRender' => array(
				'type' => 'boolean',
				'default' => false
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
			'widths' => array(
				'type' => 'object',
				'default' => array(
					'desktop' => 640,
					'tablet' => 480
				)
			)
		),
		'supports' => array(
			'anchor' => false,
			'html' => false,
			'align' => array(
				'full',
				'wide',
				'left',
				'right',
				'center'
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
		'providesContext' => array(
			'dialog/id' => 'dialogId',
			'dialog/className' => 'className',
			'dialog/widths' => 'widths',
			'dialog/animationDuration' => 'animationDuration',
			'dialog/type' => 'dialogType',
			'dialog/autoActivationTimer' => 'autoActivationTimer',
			'dialog/enableDeepLink' => 'enableDeepLink'
		),
		'textdomain' => 'dialog',
		'editorScript' => 'file:./index.js',
		'viewScriptModule' => 'file:./view.js',
		'render' => 'file:./render.php'
	),
	'dialog-element' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/dialog-element',
		'version' => '1.0.0',
		'title' => 'Dialog Element',
		'category' => 'media',
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'backdropColor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'inserter' => false,
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true,
				'enableContrastChecker' => true,
				'gradients' => true
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
			'dialog/widths',
			'dialog/animationDuration',
			'dialog/type',
			'dialog/autoActivationTimer'
		),
		'parent' => array(
			'prc-block/dialog'
		),
		'textdomain' => 'dialog-element',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css'
	),
	'dialog-trigger' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/dialog-trigger',
		'version' => '1.0.0',
		'title' => 'Dialog Trigger',
		'description' => 'The content inside this block will act as the clickable \'trigger\' to display the dialog element.',
		'category' => 'media',
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'disengageClickHandler' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'html' => false,
			'align' => false,
			'inserter' => false,
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
			'interactivity' => true
		),
		'usesContext' => array(
			'dialog/id',
			'dialog/className',
			'dialog/widths',
			'dialog/animationDuration',
			'dialog/type',
			'dialog/autoActivationTimer'
		),
		'parent' => array(
			'prc-block/dialog'
		),
		'textdomain' => 'dialog-trigger',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
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
		'render' => 'file:./render.php',
		'viewModule' => 'file:./view.js'
	),
	'fact-sheet-collection' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/fact-sheet-collection',
		'version' => '1.0.0',
		'title' => 'Fact Sheet Collection',
		'category' => 'design',
		'description' => 'Display the hierarchy of this fact sheet\'s collection term and a link to download an associated PDF if provided. If this collection has multiple language posts the main link will link to the English language post and then a listing of other languages will be provided automatically. These alternate language links will appear above the main collection.',
		'attributes' => array(
			'pdf' => array(
				'type' => 'object'
			),
			'disableHeading' => array(
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
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => false,
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
		'usesContext' => array(
			'postId',
			'postType'
		),
		'example' => array(
			'attributes' => array(
				
			)
		),
		'styles' => array(
			array(
				'name' => 'list',
				'label' => 'List',
				'isDefault' => true
			)
		),
		'textdomain' => 'collection',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'flip-card-controller' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/flip-card-controller',
		'version' => '0.1.0',
		'title' => 'Flip Card Controller',
		'description' => 'A card that has two sides; one for the front and one for the back.',
		'category' => 'media',
		'attributes' => array(
			'height' => array(
				'type' => 'number',
				'default' => 300
			),
			'width' => array(
				'type' => 'number',
				'default' => 300
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'align' => array(
				'left',
				'right'
			),
			'spacing' => array(
				'margin' => true
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
		'textdomain' => 'flip-card-controller',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'flip-card-side' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/flip-card-side',
		'version' => '0.1.0',
		'title' => 'Flip Card Side',
		'category' => 'media',
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			)
		),
		'supports' => array(
			'color' => array(
				'background' => true,
				'link' => true,
				'text' => true
			),
			'html' => false,
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'width' => true
			),
			'interactivity' => true
		),
		'parent' => array(
			'prc-block/flip-card-controller'
		),
		'textdomain' => 'flip-card-side',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
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
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'form-captcha' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-captcha',
		'version' => '1.0.0',
		'title' => 'Form Captcha',
		'category' => 'forms',
		'description' => 'Display a captcha form element. Powered by Cloudflare Turnstile. This Captcha is mostly invisible and does not require user interaction.',
		'attributes' => array(
			
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
			'interactivity' => true
		),
		'textdomain' => 'form-captcha',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js'
	),
	'form-field' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-field',
		'version' => '0.1.0',
		'title' => 'Form Field',
		'description' => 'A simple form field wrapper for input text blocks. Provides a label and required indicator.',
		'category' => 'forms',
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false
			),
			'label' => array(
				'type' => 'string',
				'default' => ''
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'spacing' => array(
						'blockGap' => 'var:preset|spacing|10'
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
			'interactivity' => true
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default',
				'isDefault' => true
			),
			array(
				'name' => 'only-label',
				'label' => 'Only Label'
			)
		),
		'providesContext' => array(
			'prc-block/form-field/required' => 'required',
			'prc-block/form-field/label' => 'label'
		),
		'usesContext' => array(
			'prc-facets/template/facetType',
			'prc-facets/template/facetName',
			'prc-facets/template/facetLabel'
		),
		'textdomain' => 'form-field',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewModule' => 'file:./view.js'
	),
	'form-input-checkbox' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-input-checkbox',
		'version' => '1.0.0',
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
				'type' => 'string'
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
			),
			'checkboxColor' => array(
				'type' => 'string'
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
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => false,
			'color' => array(
				'text' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockSpacing' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true
			),
			'interactivity' => true
		),
		'usesContext' => array(
			'prc-block/form-field-label',
			'prc-block/form-field-required'
		),
		'textdomain' => 'form-input-checkbox',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'form-input-message' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-input-message',
		'version' => '0.1.0',
		'title' => 'Form Input Message',
		'category' => 'forms',
		'description' => 'Display a sucess, error, or warning message/alert in interactive applications.',
		'attributes' => array(
			'successMessage' => array(
				'type' => 'string'
			),
			'errorMessage' => array(
				'type' => 'string'
			),
			'warningMessage' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'anchor' => false,
			'html' => false,
			'interactivity' => true,
			'reusable' => false,
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
				'link' => true,
				'button' => true
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
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default (Inline)',
				'isDefault' => true
			),
			array(
				'name' => 'overlay',
				'label' => 'Overlay'
			)
		),
		'textdomain' => 'form-input-message',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
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
		'description' => 'A block for password input in a form with optional confirmation field and analyzer.',
		'allowedBlocks' => array(
			'prc-block/form-input-text',
			'prc-block/form-field'
		),
		'attributes' => array(
			'includesConfirmation' => array(
				'type' => 'boolean',
				'default' => false
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'spacing' => array(
						'blockGap' => 'var:preset|spacing|10'
					),
					'typography' => array(
						'lineHeight' => '1'
					)
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => false,
			'__experimentalBorder' => array(
				'color' => true,
				'width' => true
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
				'__experimentalFontWeight' => true
			),
			'interactivity' => true
		),
		'textdomain' => 'form-input-password',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js'
	),
	'form-input-select' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-input-select',
		'version' => '1.5.0',
		'title' => 'Form Input Select',
		'category' => 'forms',
		'description' => 'Create a dropdown component with a list of options.',
		'attributes' => array(
			'defaultOptions' => array(
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
			'options' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'sortedOptions' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'placeholder' => array(
				'type' => 'string',
				'default' => 'Select an option'
			),
			'disabled' => array(
				'type' => 'boolean',
				'default' => false
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-white'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => 'ui-black'
			),
			'value' => array(
				'type' => 'string'
			),
			'hasClearIcon' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => true,
			'inserter' => false,
			'__experimentalBorder' => array(
				'color' => true,
				'width' => true,
				'radius' => true
			),
			'color' => array(
				'gradients' => false
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true
			),
			'interactivity' => true
		),
		'usesContext' => array(
			'prc-block/form-input-select/options',
			'prc-block/form-field-required',
			'prc-block/form-field-label',
			'prc-facets/template/facetType',
			'prc-facets/template/facetName',
			'prc-facets/template/facetLabel',
			'prc-block/sortable-options'
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default',
				'isDefault' => true
			)
		),
		'parent' => array(
			'prc-block/form-field'
		),
		'textdomain' => 'form-input-select',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js'
	),
	'form-input-text' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/form-input-text',
		'version' => '0.1.0',
		'title' => 'Input Text Field',
		'description' => 'A primtive block for a text input field in a form.',
		'category' => 'forms',
		'attributes' => array(
			'placeholder' => array(
				'type' => 'string',
				'default' => 'Enter text...'
			),
			'type' => array(
				'type' => 'string',
				'enum' => array(
					'email',
					'password',
					'text',
					'textarea',
					'number'
				),
				'default' => 'text'
			),
			'value' => array(
				'type' => 'string'
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'typography' => array(
						'lineHeight' => '1'
					)
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => false,
			'__experimentalBorder' => array(
				'color' => true,
				'width' => true
			),
			'spacing' => array(
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
			),
			'interactivity' => true
		),
		'usesContext' => array(
			'prc-block/form-field/required',
			'prc-block/form-field/label',
			'prc-block/form-input-target-namespace'
		),
		'textdomain' => 'form-input-text',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'grid-column' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/grid-column',
		'version' => '0.1.0',
		'title' => 'Column',
		'category' => 'design',
		'parent' => array(
			'prc-block/grid-controller'
		),
		'description' => 'A single column within a columns grid block.',
		'attributes' => array(
			'gridLayout' => array(
				'type' => 'object',
				'default' => array(
					'index' => 0,
					'desktopSpan' => 4,
					'tabletSpan' => 4,
					'mobileSpan' => 4,
					'tabletStart' => 1,
					'mobileStart' => 1
				)
			),
			'verticalAlignment' => array(
				'type' => 'string'
			),
			'allowedBlocks' => array(
				'type' => 'array'
			),
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
				),
				'default' => false
			)
		),
		'supports' => array(
			'anchor' => true,
			'reusable' => false,
			'inserter' => false,
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true
			),
			'spacing' => array(
				'blockGap' => array(
					'__experimentalDefault' => '24px',
					'sides' => array(
						'vertical'
					)
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
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			),
			'__experimentalLayout' => true
		),
		'providesContext' => array(
			'grid/column/desktop/span' => 'gridSpan',
			'grid/column/desktop/start' => 'gridStart',
			'grid/column/desktop/row' => 'gridRow',
			'grid/column/tablet/span' => 'tabletGridSpan',
			'grid/column/tablet/start' => 'tabletGridStart',
			'grid/column/tablet/row' => 'tabletGridRow',
			'grid/column/mobile/span' => 'mobileGridSpan',
			'grid/column/mobile/start' => 'mobileGridStart',
			'grid/column/mobile/row' => 'mobileGridRow'
		),
		'textdomain' => 'grid-column',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'grid-controller' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/grid-controller',
		'version' => '0.1.0',
		'title' => 'Grid Columns',
		'category' => 'design',
		'description' => 'Display content in multiple columns using a customizable responsive css-grid layout. The grid consists of 12 columns on desktop and tablet, and 4 columns on mobile.',
		'keywords' => array(
			'grid',
			'columns',
			'css grid',
			'layout'
		),
		'attributes' => array(
			'verticalAlignment' => array(
				'type' => 'string'
			),
			'dividerColor' => array(
				'type' => 'string',
				'default' => 'ui-gray-light'
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
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'color' => array(
				'background' => true,
				'link' => true,
				'text' => true
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
					'blockGap' => true,
					'margin' => false,
					'padding' => false
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
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'dividerColor' => 'ui-gray-light'
			),
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/grid-column',
					'attributes' => array(
						'gridLayout' => array(
							'index' => 1,
							'desktopSpan' => 4,
							'tabletSpan' => 4,
							'mobileSpan' => 4
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/heading',
							'attributes' => array(
								'content' => 'Column 1'
							)
						),
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet urn'
							)
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
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/heading',
							'attributes' => array(
								'content' => 'Column 2'
							)
						),
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet urn'
							)
						)
					)
				),
				array(
					'name' => 'prc-block/grid-column',
					'attributes' => array(
						'gridLayout' => array(
							'index' => 3,
							'desktopSpan' => 4,
							'tabletSpan' => 4,
							'mobileSpan' => 4
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/heading',
							'attributes' => array(
								'content' => 'Column 3'
							)
						),
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet urn'
							)
						)
					)
				)
			),
			'viewportWidth' => 1350
		),
		'textdomain' => 'grid-controller',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
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
				'default' => '1'
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
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'logo' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/logo',
		'version' => '1.0.0',
		'title' => 'Pew Research Center Logo',
		'description' => 'Contextually aware logo block for Pew Research Center. Can display either the standard PRC logo set or Decoded logo.',
		'category' => 'theme',
		'keywords' => array(
			'logo',
			'masthead',
			'dark-mode',
			'css-container-queries'
		),
		'attributes' => array(
			'darkModeEnabled' => array(
				'type' => 'boolean',
				'default' => true
			),
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
			'color' => array(
				'background' => true,
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
				'name' => 'alt-only',
				'label' => 'Alternate'
			),
			array(
				'name' => 'container-aware',
				'label' => 'Container Aware'
			),
			array(
				'name' => 'decoded-only',
				'label' => 'Decoded'
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
		'script' => array(
			'prc-icons'
		),
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
		'supports' => array(
			'inserter' => false,
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
		'textdomain' => 'lorem-ipsum',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'mailchimp-form' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/mailchimp-form',
		'title' => 'MailChimp Form',
		'description' => 'A block that allows you to add a MailChimp form to your page.',
		'version' => '0.1.0',
		'category' => 'marketing',
		'keywords' => array(
			'mailchimp',
			'form',
			'newsletter',
			'subscribe'
		),
		'attributes' => array(
			'interest' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true
			),
			'interactivity' => true
		),
		'example' => array(
			'attributes' => array(
				
			),
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/form-input-text',
					'attributes' => array(
						'type' => 'email'
					)
				),
				array(
					'name' => 'core/button',
					'attributes' => array(
						'text' => 'SIGN UP'
					)
				)
			),
			'viewportWidth' => 640
		),
		'providesContext' => array(
			'interactiveNamespace' => 'interactiveNamespace'
		),
		'textdomain' => 'mailchimp-form',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewModule' => 'file:./view.js'
	),
	'mailchimp-select' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/mailchimp-select',
		'version' => '0.1.0',
		'title' => 'MailChimp Select',
		'description' => 'Select from multiple MailChimp segment interests to subscribe to.',
		'category' => 'marketing',
		'keywords' => array(
			'mailchimp',
			'newsletters',
			'select'
		),
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'interests' => array(
				'type' => 'array',
				'default' => array(
					
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
				'margin' => true,
				'padding' => true,
				'blockGap' => array(
					'sides' => array(
						'vertical'
					)
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true
			),
			'interactivity' => true
		),
		'textdomain' => 'mailchimp-select',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewModule' => 'file:./view.js'
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
			'menuItemTextColor' => array(
				'type' => 'string'
			),
			'menuItemActiveBackgroundColor' => array(
				'type' => 'string'
			),
			'menuItemActiveTextColor' => array(
				'type' => 'string'
			),
			'menuOverlayBackgroundColor' => array(
				'type' => 'string'
			),
			'menuOverlayTextColor' => array(
				'type' => 'string'
			),
			'menuActiveBorderColor' => array(
				'type' => 'string'
			),
			'hasBoxShadow' => array(
				'type' => 'boolean',
				'default' => false
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
		'render' => 'file:./render.php',
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
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
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
				'type' => 'string',
				'default' => 'ui-gray-very-light'
			),
			'activeTextColor' => array(
				'type' => 'string',
				'default' => 'ui-text-color'
			),
			'hoverBackgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-beige-very-light'
			),
			'hoverTextColor' => array(
				'type' => 'string',
				'default' => 'ui-text-color'
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
		'style' => array(
			'file:./style-index.css',
			'prc-block-library--baseball-card',
			'prc-block-library--additional-color-supports'
		)
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
			'maxWidth' => array(
				'type' => 'number',
				'default' => '640'
			),
			'barColor' => array(
				'type' => 'string',
				'default' => 'social-trends-teal'
			),
			'barPadding' => array(
				'type' => 'number',
				'default' => 15
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-beige-very-light'
			),
			'categoryLabelColor' => array(
				'type' => 'string',
				'default' => 'text-color'
			),
			'maxValue' => array(
				'type' => 'number',
				'default' => 100
			),
			'currentValue' => array(
				'type' => 'number',
				'default' => 50
			),
			'showAxisLabel' => array(
				'type' => 'boolean',
				'default' => true
			),
			'axisLabel' => array(
				'type' => 'string',
				'default' => 'Total'
			),
			'axisPadding' => array(
				'type' => 'number',
				'default' => 60
			),
			'axisLabelMaxWidth' => array(
				'type' => 'number',
				'default' => 60
			),
			'labelFormat' => array(
				'enum' => array(
					'fractional',
					'percentage'
				),
				'default' => 'fractional'
			),
			'labelPositionDX' => array(
				'type' => 'integer',
				'default' => -5
			),
			'labelPositionDY' => array(
				'type' => 'integer',
				'default' => 4
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
				'fontSize' => true
			)
		),
		'example' => array(
			'attributes' => array(
				
			)
		),
		'textdomain' => 'progress-bar',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
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
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
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
	'related-posts-query' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/related-posts-query',
		'version' => '2.0.0',
		'title' => 'Related Posts Query',
		'category' => 'design',
		'description' => 'Display custom related posts defaulting to posts with the same primary taxonomy term.',
		'keywords' => array(
			'related posts'
		),
		'attributes' => array(
			'perPage' => array(
				'type' => 'number',
				'default' => 5
			),
			'queryId' => array(
				'type' => 'string',
				'default' => 'related-posts-0'
			),
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'orientation' => array(
				'type' => 'string',
				'default' => 'vertical'
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
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'align' => array(
				'wide',
				'full',
				'left',
				'right',
				'center'
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
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				)
			)
		),
		'textdomain' => 'related-posts-query',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'report-materials' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/report-materials',
		'version' => '0.1.0',
		'title' => 'Report Materials',
		'category' => 'theme',
		'description' => 'Displays a list of all materials from a post report package.',
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
			'heading' => array(
				'type' => 'string',
				'default' => 'Report Materials'
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
				'margin' => array(
					'top',
					'bottom',
					'left',
					'right'
				),
				'blockGap' => true,
				'__experimentalDefaultControls' => array(
					'margin' => true,
					'blockGap' => true
				)
			),
			'typography' => array(
				'__experimentalFontFamily' => true,
				'fontSize' => true,
				'__experimentalDefaultControls' => array(
					'__experimentalFontFamily' => true
				)
			)
		),
		'usesContext' => array(
			'postId',
			'postType'
		),
		'textdomain' => 'report-materials',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css',
			'prc-block-library--baseball-card',
			'prc-block-library--additional-color-supports'
		)
	),
	'report-pagination' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/report-pagination',
		'version' => '0.1.0',
		'title' => 'Report Pagination',
		'category' => 'theme',
		'description' => 'Provides a stylized pagination for use with reports',
		'attributes' => array(
			'backgroundColor' => array(
				'type' => 'string',
				'default' => 'white'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => 'white'
			),
			'itemBackgroundColor' => array(
				'type' => 'string',
				'default' => 'white'
			),
			'itemTextColor' => array(
				'type' => 'string',
				'default' => 'ui-black'
			),
			'itemBorderColor' => array(
				'type' => 'string',
				'default' => 'gray'
			),
			'itemHoverBackgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-beige-very-light'
			),
			'itemActiveBackgroundColor' => array(
				'type' => 'string',
				'default' => 'white'
			),
			'nextButtonBackgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-beige-very-light'
			),
			'nextButtonTextColor' => array(
				'type' => 'string',
				'default' => 'ui-black'
			),
			'nextButtonBoxShadowColor' => array(
				'type' => 'string',
				'default' => 'gray-alt'
			)
		),
		'supports' => array(
			'color' => array(
				'background' => true,
				'text' => true,
				'link' => true
			),
			'anchor' => true,
			'html' => false,
			'spacing' => array(
				'blockGap' => array(
					'horizontal',
					'vertical'
				),
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true
			),
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowEditing' => false,
				'default' => array(
					'type' => 'flex',
					'flexWrap' => 'wrap'
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
		'usesContext' => array(
			'postId',
			'postType'
		),
		'textdomain' => 'report-pagination',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css',
			'prc-block-library--pagination'
		)
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
				'type' => 'integer',
				'default' => 0
			),
			'max' => array(
				'type' => 'integer'
			),
			'allowedBlocks' => array(
				'type' => 'array'
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
				),
				'default' => 'desktop'
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
		'parent' => array(
			'prc-block/responsive-container-controller'
		),
		'textdomain' => 'responsive-container-view',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'render' => 'file:./render.php'
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
		'render' => 'file:./render.php',
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
		'render' => 'file:./render.php',
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
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'interactivity' => true
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string',
				'default' => 'Share'
			),
			'url' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'usesContext' => array(
			'postId',
			'queryId',
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
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js'
	),
	'social-share-text-link' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/social-share-text-link',
		'version' => '0.1.0',
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
		'parent' => array(
			'core/social-links'
		),
		'textdomain' => 'social-share-text-link',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
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
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js'
	),
	'staff-context-provider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/staff-context-provider',
		'version' => '0.1.0',
		'title' => 'Staff Context Provider',
		'category' => 'widgets',
		'description' => 'Provides information about a Staff member via termId and passes that information via block context to its innerblocks.',
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'orientation' => array(
				'type' => 'string',
				'default' => 'vertical'
			),
			'staffSlug' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'interactivity' => true
		),
		'usesContext' => array(
			'postId',
			'postType'
		),
		'textdomain' => 'staff-context-provider',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'staff-info' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/staff-info',
		'version' => '0.1.0',
		'title' => 'Staff Info',
		'editorScript' => 'file:./index.js'
	),
	'staff-query' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/staff-query',
		'version' => '1.0.0',
		'title' => 'Staff Query',
		'category' => 'theme',
		'description' => 'Query the Staff by Staff Type and Research Area.',
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			),
			'staffType' => array(
				'type' => 'object'
			),
			'researchArea' => array(
				'type' => 'object'
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
		'supports' => array(
			'anchor' => true,
			'html' => false,
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
		'textdomain' => 'staff-query',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'story-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/story-item',
		'title' => 'Story Item',
		'version' => '5.0.0',
		'category' => 'content-curation',
		'description' => 'A story item is a visual display of a post, with a title, excerpt, and image. Pre-compiled variations such as pub-listing, list-item, and newsletter-glue are available for each post.',
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
				'excerpt' => '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>',
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
				'type' => 'string'
			),
			'excerpt' => array(
				'type' => 'string',
				'source' => 'html',
				'multiline' => 'p',
				'selector' => '.description'
			),
			'url' => array(
				'type' => 'string',
				'default' => ''
			),
			'label' => array(
				'type' => 'string'
			),
			'date' => array(
				'type' => 'string'
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
			),
			'isNewsletterGlue' => array(
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
	'sub-title' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/subtitle',
		'version' => '0.1.0',
		'title' => 'Sub-title',
		'description' => 'Displays the sub-title of a post.',
		'category' => 'layout',
		'attributes' => array(
			'textAlign' => array(
				'type' => 'string'
			),
			'fontSize' => array(
				'type' => 'string',
				'default' => 'h2'
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'typography' => array(
						'fontWeight' => '400',
						'fontStyle' => 'italic'
					)
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'textAlign' => 'left'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'multiple' => false,
			'color' => array(
				'text' => true,
				'background' => true
			),
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
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
					'textTransform' => true,
					'lineHeight' => true
				)
			)
		),
		'usesContext' => array(
			'postType',
			'postId'
		),
		'textdomain' => 'post-sub-title',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'tab' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/tab',
		'title' => 'Tab',
		'version' => '1.0.0',
		'category' => 'design',
		'attributes' => array(
			'label' => array(
				'type' => 'string',
				'default' => ''
			),
			'slug' => array(
				'type' => 'string',
				'default' => ''
			),
			'tabIndex' => array(
				'type' => 'number'
			)
		),
		'parent' => array(
			'prc-block/tabs'
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => false,
			'color' => array(
				'background' => true,
				'heading' => true,
				'text' => true
			),
			'spacing' => array(
				'padding' => true,
				'blockGap' => true,
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
			'tab/label' => 'label',
			'tab/slug' => 'slug',
			'tab/index' => 'tabIndex'
		),
		'textdomain' => 'tab',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
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
			'displayType' => array(
				'type' => 'string',
				'default' => 'list',
				'enum' => array(
					'list',
					'accordion',
					'dropdown'
				)
			),
			'showCurrentChapter' => array(
				'type' => 'boolean',
				'default' => false
			),
			'dropdownBackgroundColor' => array(
				'type' => 'string',
				'default' => 'white'
			),
			'dropdownTextColor' => array(
				'type' => 'string',
				'default' => 'ui-black'
			),
			'autoDropdownEnabled' => array(
				'type' => 'boolean',
				'default' => true
			),
			'autoDropdownWidth' => array(
				'type' => 'number',
				'default' => 480
			),
			'headingBackgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-black'
			),
			'headingTextColor' => array(
				'type' => 'string',
				'default' => 'white'
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => 'white'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => 'ui-black'
			),
			'linkColor' => array(
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
			'hoverBackgroundColor' => array(
				'type' => 'string',
				'default' => 'ui-beige-very-light'
			),
			'hoverTextColor' => array(
				'type' => 'string',
				'default' => 'ui-black'
			),
			'heading' => array(
				'type' => 'string',
				'default' => 'Table of Contents'
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
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom',
					'left',
					'right'
				),
				'blockGap' => true,
				'__experimentalDefaultControls' => array(
					'margin' => true,
					'blockGap' => true
				)
			),
			'position' => array(
				'sticky' => true
			),
			'typography' => array(
				'__experimentalFontFamily' => true,
				'fontSizes' => true,
				'lineHeight' => true,
				'__experimentalDefaultControls' => array(
					'__experimentalFontFamily' => true,
					'fontSizes' => true
				)
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => false,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => false,
					'style' => true,
					'width' => true
				)
			)
		),
		'selectors' => array(
			'root' => '.wp-block-prc-block-table-of-contents',
			'spacing' => array(
				'blockGap' => '.wp-block-prc-block-table-of-contents__list'
			)
		),
		'example' => array(
			'attributes' => array(
				'className' => 'is-style-default'
			),
			'viewportWidth' => 320
		),
		'usesContext' => array(
			'postId',
			'postType'
		),
		'textdomain' => 'table-of-contents',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css',
			'prc-block-library--baseball-card',
			'prc-block-library--additional-color-supports'
		),
		'viewScriptModule' => 'file:./view.js'
	),
	'tabs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/tabs',
		'title' => 'Tabs',
		'version' => '1.0.0',
		'category' => 'design',
		'allowedBlocks' => array(
			'prc-block/tab'
		),
		'attributes' => array(
			'defaultActiveTabIndex' => array(
				'type' => 'number',
				'default' => 0
			),
			'orientation' => array(
				'type' => 'string',
				'default' => 'horizontal',
				'enum' => array(
					'horizontal',
					'vertical'
				)
			),
			'tabBackgroundColor' => array(
				'type' => 'string'
			),
			'customTabBackgroundColor' => array(
				'type' => 'string'
			),
			'tabHoverColor' => array(
				'type' => 'string'
			),
			'customTabHoverColor' => array(
				'type' => 'string'
			),
			'tabActiveColor' => array(
				'type' => 'string'
			),
			'customTabActiveColor' => array(
				'type' => 'string'
			),
			'tabTextColor' => array(
				'type' => 'string'
			),
			'customTabTextColor' => array(
				'type' => 'string'
			),
			'tabActiveTextColor' => array(
				'type' => 'string'
			),
			'customTabActiveTextColor' => array(
				'type' => 'string'
			),
			'tabHoverTextColor' => array(
				'type' => 'string'
			),
			'customTabHoverTextColor' => array(
				'type' => 'string'
			)
		),
		'example' => array(
			'attributes' => array(
				'className' => 'is-example'
			),
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/tab',
					'attributes' => array(
						'label' => 'Tab 1',
						'slug' => 'tab-1',
						'tabIndex' => 0
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Tab 1 content'
							)
						)
					)
				),
				array(
					'name' => 'prc-block/tab',
					'attributes' => array(
						'label' => 'Tab 2',
						'slug' => 'tab-2',
						'tabIndex' => 1
					)
				),
				array(
					'name' => 'prc-block/tab',
					'attributes' => array(
						'label' => 'Tab 3',
						'slug' => 'tab-3',
						'tabIndex' => 2
					)
				)
			)
		),
		'styles' => array(
			array(
				'name' => 'tabbed',
				'label' => 'Tabbed',
				'isDefault' => true
			),
			array(
				'name' => 'tabbed-outline',
				'label' => 'Tabbed Outline'
			),
			array(
				'name' => 'underlined',
				'label' => 'Underlined'
			),
			array(
				'name' => 'pills',
				'label' => 'Pills'
			),
			array(
				'name' => 'underlined-pills',
				'label' => 'Underlined Pills'
			)
		),
		'supports' => array(
			'align' => true,
			'color' => array(
				'text' => false,
				'background' => false
			),
			'html' => false,
			'interactivity' => true,
			'spacing' => array(
				'blockGap' => true,
				'margin' => true,
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'fontFamily' => true
			)
		),
		'textdomain' => 'tabs',
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
		'description' => 'Display a grid of taxonomy list blocks that converts to an accordion on mobile',
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
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			),
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
			'style' => array(
				'type' => 'object',
				'default' => array(
					'spacing' => array(
						'blockGap' => 'var:preset|spacing|20'
					)
				)
			)
		),
		'providesContext' => array(
			'textColor' => 'textColor'
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
		'textdomain' => 'menu',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'taxonomy-list-link' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/taxonomy-list-link',
		'version' => '1.0.0',
		'title' => 'Taxonomy List Link',
		'category' => 'theme',
		'description' => 'Display a link to a taxonomy term or custom URL with optional settings.',
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array'
			),
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
				'type' => 'string',
				'default' => 'category'
			),
			'enableSubMenu' => array(
				'type' => 'boolean',
				'default' => false
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
		'render' => 'file:./render.php',
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
		'textdomain' => 'taxonomy-search',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
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
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
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
		'providesContext' => array(
			'timeline/currentActiveIndex' => 'currentActiveIndex'
		),
		'textdomain' => 'timeline',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
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
					'name' => '2020'
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
		'textdomain' => 'timeline-slide',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
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
	),
	'yoast-seo-breadcrumbs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'yoast-seo/breadcrumbs',
		'version' => '0.1.0',
		'category' => 'widgets',
		'textdomain' => 'prc-block-library',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	)
);

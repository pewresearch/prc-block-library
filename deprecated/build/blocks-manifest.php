<?php
// This file is generated. Do not modify it manually.
return array(
	'accordion' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/accordion',
		'version' => '1.0.0',
		'title' => 'Accordion Item',
		'category' => 'design',
		'description' => 'An item inside an accordion that can be expanded or collapsed to show or hide content. Useful for any content you want to keep organized and compact. Click the title to expand or collapse the section.',
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.wp-block-prc-block-accordion__title-text',
				'__experimentalRole' => 'content'
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'interactivity' => true,
			'color' => array(
				'text' => true,
				'background' => true,
				'__experimentalSkipSerialization' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => false,
					'__experimentalFontFamily' => true
				),
				'__experimentalSkipSerialization' => true
			),
			'spacing' => array(
				'padding' => true,
				'blockGap' => true,
				'__experimentalSkipSerialization' => true
			),
			'layout' => true,
			'__experimentalBorder' => array(
				'color' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'style' => true,
					'width' => true
				),
				'__experimentalSkipSerialization' => true
			),
			'__experimentalSelector' => array(
				'root' => '.wp-block-prc-block-accordion',
				'color' => '.wp-block-prc-block-accordion > .wp-block-prc-block-accordion__title',
				'typography' => '.wp-block-prc-block-accordion > .wp-block-prc-block-accordion__title',
				'spacing' => array(
					'root' => '.wp-block-prc-block-accordion',
					'padding' => '.wp-block-prc-block-accordion > .wp-block-prc-block-accordion__title'
				)
			)
		),
		'parent' => array(
			'prc-block/accordion-controller'
		),
		'textdomain' => 'accordion',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'accordion-controller' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/accordion-controller',
		'version' => '1.0.0',
		'title' => 'Accordion',
		'category' => 'design',
		'description' => 'A collection of collapsible sections that can be expanded or collapsed to show or hide content. Useful for FAQs, lists, or any content you want to keep organized and compact. Click the title to expand or collapse the section.',
		'allowedBlocks' => array(
			'prc-block/accordion'
		),
		'attributes' => array(
			'structuredData' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'interactivity' => true,
			'align' => true,
			'inserter' => false,
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
				'margin' => true,
				'padding' => true
			),
			'layout' => array(
				'allowEditing' => false,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical'
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
		'textdomain' => 'accordion-controller',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
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
	'tab' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/tab',
		'title' => 'Tab',
		'description' => 'Content for a tab in a tabbed interface.',
		'version' => '1.0.0',
		'category' => 'design',
		'attributes' => array(
			'label' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'parent' => array(
			'prc-block/tabs'
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => false,
			'layout' => array(
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
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'__experimentalFontFamily' => true
				),
				'__experimentalSkipSerialization' => true
			)
		),
		'providesContext' => array(
			'tab/label' => 'label'
		),
		'textdomain' => 'prc-block-library',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'tabs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/tabs',
		'title' => 'Tabs',
		'description' => 'Display content in a tabbed interface to help users navigate detailed content with ease.',
		'version' => '1.0.0',
		'category' => 'design',
		'allowedBlocks' => array(
			'prc-block/tab'
		),
		'attributes' => array(
			'tabsId' => array(
				'type' => 'string',
				'default' => ''
			),
			'orientation' => array(
				'type' => 'string',
				'default' => 'horizontal',
				'enum' => array(
					'horizontal',
					'vertical'
				)
			),
			'activeTabIndex' => array(
				'type' => 'number',
				'default' => 0
			),
			'tabInactiveColor' => array(
				'type' => 'string'
			),
			'customTabInactiveColor' => array(
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
		'styles' => array(
			array(
				'name' => 'tab',
				'label' => 'Tabs',
				'isDefault' => true
			),
			array(
				'name' => 'links',
				'label' => 'Links'
			),
			array(
				'name' => 'button',
				'label' => 'Button'
			)
		),
		'supports' => array(
			'align' => true,
			'inserter' => false,
			'color' => array(
				'text' => false,
				'background' => false
			),
			'html' => false,
			'interactivity' => true,
			'spacing' => array(
				'blockGap' => array(
					'horizontal',
					'vertical'
				),
				'margin' => true,
				'padding' => false
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true
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
						'label' => 'Tab 1'
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Pariatur commodo sint mollit. Veniam Lorem labore voluptate fugiat. Ad nulla est labore cillum cillum qui nostrud do incididunt eiusmod. Aliqua aliqua sunt consequat consequat in duis deserunt.'
							)
						),
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Adipisicing ullamco nisi in eu laborum adipisicing aliquip aliqua. Fugiat labore officia consequat nisi veniam velit commodo cillum enim duis quis ad.'
							)
						)
					)
				),
				array(
					'name' => 'prc-block/tab',
					'attributes' => array(
						'label' => 'Tab 2'
					)
				),
				array(
					'name' => 'prc-block/tab',
					'attributes' => array(
						'label' => 'Tab 3'
					)
				)
			)
		),
		'providesContext' => array(
			'tabs/id' => 'tabsId'
		),
		'textdomain' => 'prc-block-library',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	)
);

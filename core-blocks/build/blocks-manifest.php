<?php
// This file is generated. Do not modify it manually.
return array(
	'tab' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'core/tab',
		'title' => 'Tab',
		'description' => 'Content for a tab in a tabbed interface.',
		'version' => '1.0.0',
		'category' => 'design',
		'textdomain' => 'default',
		'attributes' => array(
			'label' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'parent' => array(
			'core/tab-panels'
		),
		'usesContext' => array(
			'core/tabs-activeTabIndex',
			'core/tabs-editorActiveTabIndex'
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'reusable' => false,
			'color' => array(
				'background' => true,
				'text' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
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
				)
			),
			'renaming' => true
		),
		'providesContext' => array(
			'core/tab-label' => 'label'
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'tab-panels' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'core/tab-panels',
		'title' => 'Tab Panels',
		'description' => 'Container for tab panel content in a tabbed interface.',
		'version' => '1.0.0',
		'category' => 'design',
		'textdomain' => 'default',
		'parent' => array(
			'core/tabs'
		),
		'allowedBlocks' => array(
			'core/tab'
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'anchor' => false,
			'html' => false,
			'reusable' => false,
			'lock' => false,
			'dimensions' => array(
				'aspectRatio' => false,
				'height' => false,
				'minHeight' => false,
				'width' => false
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'heading' => true,
				'link' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'blockGap' => false,
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true
			),
			'layout' => array(
				'default' => array(
					'type' => 'flex',
					'flexWrap' => 'nowrap',
					'justifyContent' => 'stretch',
					'orientation' => 'vertical'
				),
				'allowSwitching' => false,
				'allowVerticalAlignment' => false,
				'allowJustification' => true,
				'allowSizingOnChildren' => false
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true
			)
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'tabs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'core/tabs',
		'title' => 'Tabs',
		'description' => 'Display content in a tabbed interface to help users navigate detailed content with ease.',
		'version' => '1.0.0',
		'category' => 'design',
		'textdomain' => 'default',
		'allowedBlocks' => array(
			'core/tabs-menu',
			'core/tab-panels'
		),
		'attributes' => array(
			'activeTabIndex' => array(
				'type' => 'number',
				'default' => 0
			),
			'editorActiveTabIndex' => array(
				'type' => 'number',
				'role' => 'local'
			)
		),
		'supports' => array(
			'align' => true,
			'anchor' => true,
			'color' => array(
				'text' => false,
				'background' => false
			),
			'layout' => array(
				'default' => array(
					'type' => 'flex',
					'flexWrap' => 'nowrap',
					'justifyContent' => 'stretch',
					'verticalAlignment' => 'stretch',
					'orientation' => 'vertical'
				),
				'allowSwitching' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowOrientation' => true,
				'allowSizingOnChildren' => true
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
				'__experimentalFontFamily' => true
			),
			'renaming' => true
		),
		'example' => array(
			'attributes' => array(
				'className' => 'is-example'
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/tabs-menu',
					'attributes' => array(
						
					)
				),
				array(
					'name' => 'core/tab-panels',
					'attributes' => array(
						
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/tab',
							'attributes' => array(
								'label' => 'Tab 1'
							),
							'innerBlocks' => array(
								array(
									'name' => 'core/paragraph',
									'attributes' => array(
										'content' => 'Pariatur commodo sint mollit. Veniam Lorem labore voluptate fugiat. Ad nulla est labore cillum cillum qui nostrud do incididunt eiusmod.'
									)
								)
							)
						),
						array(
							'name' => 'core/tab',
							'attributes' => array(
								'label' => 'Tab 2'
							)
						),
						array(
							'name' => 'core/tab',
							'attributes' => array(
								'label' => 'Tab 3'
							)
						)
					)
				)
			)
		),
		'providesContext' => array(
			'core/tabs-activeTabIndex' => 'activeTabIndex',
			'core/tabs-editorActiveTabIndex' => 'editorActiveTabIndex'
		),
		'usesContext' => array(
			'core/tabs-list',
			'core/tabs-id'
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'tabs-menu' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'core/tabs-menu',
		'title' => 'Tabs Menu',
		'description' => 'Display the tab buttons for a tabbed interface.',
		'version' => '1.0.0',
		'category' => 'design',
		'textdomain' => 'default',
		'parent' => array(
			'core/tabs'
		),
		'allowedBlocks' => array(
			'core/tabs-menu-item'
		),
		'usesContext' => array(
			'core/tabs-list',
			'core/tabs-id',
			'core/tabs-activeTabIndex',
			'core/tabs-editorActiveTabIndex'
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'html' => false,
			'reusable' => false,
			'lock' => false,
			'dimensions' => array(
				'aspectRatio' => false,
				'height' => false,
				'minHeight' => false,
				'width' => false
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'layout' => array(
				'default' => array(
					'type' => 'flex',
					'flexWrap' => 'nowrap',
					'orientation' => 'horizontal'
				),
				'allowSwitching' => false,
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowOrientation' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true,
					'blockGap' => true
				)
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./editor.css',
		'style' => 'file:./style-index.css'
	),
	'tabs-menu-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'core/tabs-menu-item',
		'title' => 'Tab Menu Item',
		'description' => 'A single tab button in the tabs menu. Used as a template for styling all tab buttons.',
		'version' => '1.0.0',
		'category' => 'design',
		'textdomain' => 'default',
		'parent' => array(
			'core/tabs-menu'
		),
		'usesContext' => array(
			'core/tabs-menu-item-index',
			'core/tabs-menu-item-id',
			'core/tabs-menu-item-label',
			'core/tabs-menu-item-clientId',
			'core/tabs-list',
			'core/tabs-activeTabIndex',
			'core/tabs-editorActiveTabIndex'
		),
		'attributes' => array(
			'activeBackgroundColor' => array(
				'type' => 'string'
			),
			'customActiveBackgroundColor' => array(
				'type' => 'string'
			),
			'activeTextColor' => array(
				'type' => 'string'
			),
			'customActiveTextColor' => array(
				'type' => 'string'
			),
			'hoverBackgroundColor' => array(
				'type' => 'string'
			),
			'customHoverBackgroundColor' => array(
				'type' => 'string'
			),
			'hoverTextColor' => array(
				'type' => 'string'
			),
			'customHoverTextColor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'html' => false,
			'reusable' => false,
			'lock' => false,
			'color' => array(
				'background' => true,
				'text' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'shadow' => true,
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'textAlign' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'layout' => array(
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical',
					'flexWrap' => 'nowrap'
				),
				'allowVerticalAlignment' => true,
				'allowJustification' => true,
				'allowSwitching' => false,
				'allowOrientation' => false,
				'allowWrap' => false
			),
			'spacing' => array(
				'padding' => true,
				'blockGap' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./editor.css',
		'style' => 'file:./style-index.css'
	)
);

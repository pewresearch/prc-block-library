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
	'grid-column' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/grid-column',
		'version' => '1.0.0',
		'title' => 'Responsive Column (Deprecated)',
		'category' => 'design',
		'parent' => array(
			'prc-block/grid-controller'
		),
		'description' => 'A responsive grid column. Set the column’s span and start position at different breakpoints to create complex responsive grid layouts.',
		'attributes' => array(
			'gridLayout' => array(
				'type' => 'object',
				'default' => array(
					'index' => 0,
					'desktopSpan' => 4,
					'tabletSpan' => 4,
					'mobileSpan' => 4,
					'tabletStart' => null,
					'mobileStart' => null,
					'tabletPosition' => null,
					'mobilePosition' => null,
					'desktopDivider' => null,
					'tabletDivider' => null,
					'mobileDivider' => null
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
		'example' => array(
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
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Column content.'
					)
				)
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
				'blockGap' => true,
				'margin' => true,
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
		'style' => 'file:./style-index.css'
	),
	'grid-controller' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/grid-controller',
		'version' => '1.0.0',
		'title' => 'Responsive Grid (Deprecated)',
		'category' => 'design',
		'description' => 'Deprecated: use a core Group block with the Grid layout instead, which now supports responsive column counts, spans, ordering, and dividers. Existing Responsive Grid blocks continue to render; convert them via the block transform.',
		'keywords' => array(
			'grid',
			'columns',
			'responsive',
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
			'dividerStyle' => array(
				'type' => 'string',
				'default' => 'solid'
			),
			'dividerInset' => array(
				'type' => 'number',
				'default' => 0
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
			'inserter' => false,
			'align' => array(
				'wide',
				'full'
			),
			'listView' => true,
			'color' => array(
				'background' => true,
				'link' => true,
				'text' => true
			),
			'spacing' => array(
				'blockGap' => array(
					'sides' => array(
						'horizontal',
						'vertical'
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
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'mailchimp-form' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/mailchimp-form',
		'title' => 'MailChimp Form',
		'description' => 'A block that allows you to add a MailChimp form to your page.',
		'version' => '1.0.0',
		'category' => 'marketing',
		'keywords' => array(
			'mailchimp',
			'form',
			'newsletter',
			'subscribe'
		),
		'allowedBlocks' => array(
			'prc-block/form',
			'prc-block/form-input-text',
			'prc-block/form-submit',
			'prc-block/form-captcha',
			'prc-block/form-message',
			'core/button',
			'core/group'
		),
		'attributes' => array(
			'interest' => array(
				'type' => 'string',
				'default' => ''
			),
			'mailchimpFormId' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'inserter' => false,
			'spacing' => array(
				'margin' => true
			),
			'interactivity' => true
		),
		'example' => array(
			'attributes' => array(
				
			),
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/form',
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
							'name' => 'prc-block/form-submit',
							'attributes' => array(
								
							),
							'innerBlocks' => array(
								array(
									'name' => 'core/button',
									'attributes' => array(
										'text' => 'SIGN UP'
									)
								)
							)
						)
					)
				)
			),
			'viewportWidth' => 480
		),
		'providesContext' => array(
			'interactiveNamespace' => 'interactiveNamespace'
		),
		'textdomain' => 'mailchimp-form',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view/index.js'
	),
	'mailchimp-select' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/mailchimp-select',
		'version' => '1.0.0',
		'title' => 'MailChimp Select',
		'description' => 'Select from multiple MailChimp segment interests to subscribe to.',
		'category' => 'marketing',
		'keywords' => array(
			'mailchimp',
			'newsletters',
			'select'
		),
		'allowedBlocks' => array(
			'core/group',
			'prc-block/form'
		),
		'attributes' => array(
			'interests' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'inserter' => false,
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
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'prc-block/form',
					'attributes' => array(
						'namespace' => 'prc-block/mailchimp-select',
						'action' => 'subscribe',
						'interactiveNamespace' => 'prc-block/mailchimp-form'
					),
					'innerBlocks' => array(
						array(
							'name' => 'prc-block/form-input-text',
							'attributes' => array(
								'label' => 'Email Address',
								'required' => true,
								'placeholder' => 'Email Address',
								'type' => 'email',
								'metadata' => array(
									'name' => 'emailAddress'
								)
							)
						),
						array(
							'name' => 'prc-block/form-submit',
							'innerBlocks' => array(
								array(
									'name' => 'core/button',
									'attributes' => array(
										'text' => 'Submit',
										'tagName' => 'button',
										'type' => 'submit'
									)
								),
								array(
									'name' => 'prc-block/form-captcha',
									'attributes' => array(
										
									)
								)
							)
						),
						array(
							'name' => 'prc-block/form-message',
							'innerBlocks' => array(
								array(
									'name' => 'core/paragraph',
									'attributes' => array(
										'content' => 'Thank you for subscribing!'
									)
								)
							)
						)
					)
				)
			)
		),
		'textdomain' => 'mailchimp-select',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view/index.js'
	),
	'sub-title' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prc-block/subtitle',
		'version' => '0.1.0',
		'title' => 'Sub-title',
		'description' => 'Displays the sub-title of a post.',
		'keywords' => array(
			'subtitle',
			'sub-title',
			'subtitle'
		),
		'category' => 'layout',
		'attributes' => array(
			'textAlign' => array(
				'type' => 'string'
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
			'inserter' => false,
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
		'editorScript' => 'file:./index.js'
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

/**
 * External Dependencies
 */
import { Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl, PanelBody, Modal, Button, ToolbarButton, TextControl } from '@wordpress/components';
import { BlockControls, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { useMemo, useCallback, useState, useEffect } from '@wordpress/element';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch, useSelect, select } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import DEFAULT_FORM_TEMPLATE from './constants';

function useFormInputBlockDetector(clientId) {
	const foundBlocks = useSelect((select) => {
		const { getBlock } = select('core/block-editor');
		const block = getBlock(clientId);
		const innerBlocks = block?.innerBlocks;
		const formFields = [];

		// Search function.
		const findFormFields = (blocks) => {
			blocks.forEach((block) => {
				if (block.name.startsWith('prc-block/form-')) {
					// Check if the name is form-field, if so, ignore.
					if (!['prc-block/form-field', 'prc-block/form-message', 'prc-block/form-submit', 'prc-block/form-captcha'].includes(block.name)) {
						// Check if the block has a attribute.metadata.name, if so, include that in the return array.
						formFields.push({
							blockId: block.clientId,
							label: block.attributes?.metadata?.name || block.name,
						});
					}
				}
				if (block.innerBlocks) {
					findFormFields(block.innerBlocks);
				}
			});
		};

		// Initialize the search.
		findFormFields(innerBlocks);

		return formFields;
	}, [clientId]);
	return foundBlocks;
}

function useFormMessageBlockDetector(clientId) {
	const hasMessageBlock = useSelect((select) => {
		const { getBlock } = select('core/block-editor');
		const block = getBlock(clientId);
		const innerBlocks = block?.innerBlocks;
		let found = false;

		// Search function.
		const findMessageBlock = (blocks) => {
			blocks.forEach((block) => {
				if (block.name === 'prc-block/form-message') {
					found = true;
					return;
				}
				if (block.innerBlocks) {
					findMessageBlock(block.innerBlocks);
				}
			});
		};

		// Initialize the search.
		findMessageBlock(innerBlocks);

		return found;
	}, [clientId]);
	return hasMessageBlock;
}

function FormFieldPanel({clientId}) {
	const foundFormInputBlocks = useFormInputBlockDetector(clientId);
	const { selectBlock } = useDispatch(blockEditorStore);
	return(
		<PanelBody title={__('Form Fields')}>
			<ul>
				{foundFormInputBlocks.map((block, index) => {
					return (
						<li key={`${block.blockId}-${index}`}>
							<Button
								variant="tertiary"
								onClick={() => selectBlock(block.blockId)}
							>
								{block.label}
							</Button>
						</li>
					);
				})}
			</ul>
		</PanelBody>
	);
}

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	displayMessageEditing,
	setDisplayMessageEditing
}) {
	const { rootBlockNamespace } = useSelect((select) => {
		const { interactiveNamespace } = attributes;
		const { getBlockRootClientId, getBlock } = select('core/block-editor');
		const rootClientId = getBlockRootClientId(clientId);
		const rootBlock = getBlock(rootClientId);
		if ( interactiveNamespace && interactiveNamespace.length > 0 ) {
			return {
				rootBlockNamespace: interactiveNamespace
			};
		}
		return {
			rootBlockNamespace: !rootBlock || rootBlock?.name === 'core/post-content'
				? 'prc-block/form'
				: rootBlock?.name
		};
	}, [clientId, attributes]);

	const registeredForms = useSelect(
		(select) => select('prc-block-library/forms').getForms(),
		[]
	);

	const { method, action, namespace, redirectUrl, formName } = attributes;

	const [ _formName, setFormName ] = useState(formName);
	const [ _method, setMethod ] = useState(method);
	const [ _action, setAction ] = useState(action);
	const [ _namespace, setNamespace ] = useState(namespace);
	const [ _redirectUrl, setRedirectUrl ] = useState(redirectUrl);
	const actionName = useMemo(() => {
		const x = `${_namespace}::${_action}`;
		console.log('actionName', x);
		return x;
	}, [_namespace, _action]);

	const { replaceInnerBlocks, replaceBlock } = useDispatch(blockEditorStore);

	const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

	const apiMethods = useMemo(() => {
		return registeredForms.filter((form) => form.method === 'api' && form.namespace === rootBlockNamespace).map((form) => ({
			label: form.label,
			value: `${form.namespace}::${form.action}`,
		}));
	}, [rootBlockNamespace, registeredForms]);

	const restMethods = useMemo(() => {
		return registeredForms.filter((form) => form.method === 'rest' && form.namespace === rootBlockNamespace).map((form) => ({
			label: form.label,
			value: `${form.namespace}::${form.action}`,
		}));
	}, [rootBlockNamespace, registeredForms]);

	const serverMethods = useMemo(() => {
		console.log('serverMethods...', rootBlockNamespace, registeredForms);
		return registeredForms.filter((form) => form.method === 'server' && form.namespace === rootBlockNamespace).map((form) => ({
			label: form.label,
			value: `${form.namespace}::${form.action}`,
		}));
	}, [rootBlockNamespace, registeredForms]);

	const methods = useMemo(() => {
		const defaults = [
			{
				label: 'Select an action',
				value: '',
			},
		];

		if (method === 'api' && apiMethods.length > 0) {
			return [...defaults, ...apiMethods];
		}
		if (method === 'rest' && restMethods.length > 0) {
			return [...defaults, ...restMethods];
		}
		if (method === 'server' && serverMethods.length > 0) {
			return [...defaults, ...serverMethods];
		}
		return [
			{
				label: 'No method selected',
				value: '',
			},
		];
	}, [method, apiMethods, restMethods]);

	const getSelectedAction = useCallback((namespace, action) => {
		return registeredForms.filter((form) => {
			console.log('form', form);
			if( form.namespace === namespace && form.action === action ) {
				// Check if there is a template for this action, if not, revert to the default template
				if( form.template && form.template.length > 0 ) {
					return form;
				} else {
					form.template = DEFAULT_FORM_TEMPLATE;
					return form;
				}
			}
		}).pop() || {};
	}, [registeredForms]);

	const selectedAction = useMemo(() => {
		return getSelectedAction(namespace, action);
	}, [namespace, action]);

	useEffect(() => {
		console.log('updating attributes', _formName, _method, _action, _namespace, methods);
		setAttributes({
			formName: _formName,
			method: _method,
			action: _action,
			namespace: _namespace,
			redirectUrl: _redirectUrl,
		});
	}, [_formName, _method, _action, _namespace, _redirectUrl]);

	useEffect(() => {
		console.log('getting updates from attributes', formName, method, action, namespace);
		setMethod(method);
		setAction(action);
		setNamespace(namespace);
		setRedirectUrl(redirectUrl);
	}, [formName, method, action, namespace, redirectUrl]);

	const hasMessageBlock = useFormMessageBlockDetector(clientId);

	return (
		<>
		{hasMessageBlock && (
			<BlockControls>
				<ToolbarButton
					icon={() => <Icon icon="message-smile" library="solid" size='14px' />}
					label={displayMessageEditing ? __('Editing Form Message') : __('Editing Form Fields')}
					isActive={displayMessageEditing}
					onClick={() => setDisplayMessageEditing(!displayMessageEditing)}
				/>
			</BlockControls>
		)}
		<InspectorControls>
			<PanelBody title={__('Form Settings')}>
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Form Name')}
					value={_formName}
					onChange={(value) => setFormName(value)}
				/>
				<SelectControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Method')}
					options={[
						{ label: 'API', value: 'api' },
						{ label: 'REST', value: 'rest' },
					]}
					value={_method}
					onChange={(value) => setMethod(value)}
				/>
				<SelectControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Action')}
					options={methods}
					value={actionName}
					onChange={(value) => {
						const [_namespace, _action] = value.split('::');
						setAction(_action);
						setNamespace(_namespace);
						// Check if the selected action has a predefined template, if so, open the modal and offer the user the option to use the template.
						const hasTemplate = getSelectedAction(
							_namespace,
							_action
						)?.template;
						if (hasTemplate && hasTemplate.length > 0) {
							setIsTemplateDialogOpen(true);
						}
					}}
				/>
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Redirect Target')}
					value={_redirectUrl}
					onChange={(value) => setRedirectUrl(value)}
					help={__('This can be a URL, an email address, or any other value you want to pass to the end of form submission action. More often than not, this is a URL to redirect to after the form has been submitted. You can pass values in the form of %field_name% to insert the value of a form field into the URL. For example, if you want to redirect to a page that displays the value of the "name" field, you can use %name% in the URL.')}
				/>
				{hasMessageBlock && (
					<Button
						variant="secondary"
						onClick={() => setDisplayMessageEditing(!displayMessageEditing)}
					>
						{displayMessageEditing ? 'Edit Form Fields' : 'Edit Form Message'}
					</Button>
				)}
				{isTemplateDialogOpen && (
					<Modal
						isOpen={isTemplateDialogOpen}
						onRequestClose={() => setIsTemplateDialogOpen(false)}
						title="Use Form Template?"
						size="medium"
					>
						<p>This form includes a default template. To use a different set of blocks, click "Start from scratch." If you prefer to use the template, click "Use template."</p>
						<div style={{ display: 'flex', gap: '10px' }}>
							<Button
								variant="primary"
								onClick={() => {
									console.log('selectedAction', selectedAction);
									setIsTemplateDialogOpen(false);
									// Find the form in the
									const blocks = createBlocksFromInnerBlocksTemplate(selectedAction.template);
									console.log('blocks...', blocks);
									replaceBlock(clientId, blocks);
								}}
							>
								Use template
							</Button>
							<Button
								variant="secondary"
								onClick={() => {
									setIsTemplateDialogOpen(false);
								}}
							>
								Use existing blocks
							</Button>
							<Button
								variant="tertiary"
								onClick={() => {
									setIsTemplateDialogOpen(false);
									replaceInnerBlocks(clientId, []);
								}}
							>
								Start blank
							</Button>
						</div>
					</Modal>
				)}
			</PanelBody>
			<FormFieldPanel clientId={clientId} />
		</InspectorControls>
		</>
	)
}

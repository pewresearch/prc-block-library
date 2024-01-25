/* eslint-disable max-lines-per-function */
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	Button,
	TextControl,
	SelectControl,
	Spinner,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { store as noticeStore } from '@wordpress/notices';
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	serialize,
	store as blocksStore,
} from '@wordpress/blocks';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal Dependencies
 */

import { DEFAULT_BLOCK, POST_TYPE, POST_TYPE_LABEL, POST_TYPE_REST_BASE } from './constants';

export default function PlaceholderCreate({ setAttributes }) {
	const { createSuccessNotice, createErrorNotice } = useDispatch(noticeStore);
	const [processing, setProcessing] = useState(false);
	const [title, setTitle] = useState('');
	const [selectedVariation, selectVariation] = useState(null);
	const [variationOptions, setVariationOptions] = useState([]);
	const [entityRef, setEntityRef] = useState(null);
	const [entityContent, setEntityContent] = useState(null);

	const { variations } = useSelect((select) => {
		const { getBlockVariations } = select(blocksStore);
		return {
			variations: getBlockVariations(DEFAULT_BLOCK),
		};
	});

	const processNewContent = (variationName) => {
		const matchedVariation = variations.find(
			(variation) => variation.name === variationName
		);
		const { attributes, innerBlocks } = matchedVariation;
		const newBlock = createBlock(
			DEFAULT_BLOCK,
			attributes,
			createBlocksFromInnerBlocksTemplate(innerBlocks)
		);
		const newContent = serialize(newBlock);
		setEntityContent(newContent);
	};

	const createNewEntity = async () => {
		setProcessing(true);
		const newTitle = title || `Untitled ${POST_TYPE_LABEL}`;
		apiFetch({
			path: `/wp/v2/${POST_TYPE_REST_BASE}`,
			method: 'POST',
			data: {
				title: newTitle,
				status: 'publish',
			},
		})
			.then((entity) => {
				if (entity.id) {
					setEntityRef(parseInt(entity.id));
				}
			})
			.catch((error) => {
				if (error) {
					createErrorNotice(`${POST_TYPE_LABEL}: ${title} could not be created!`, {
						type: 'snackbar',
					});
				}
			})
			.finally(() => {
				setProcessing(false);
			});
	};

	useEffect(() => {
		const newOptions = variations.map((variation) => {
			return {
				label: variation.title,
				value: variation.name,
			};
		});
		// Add a blank option to the top of the list.
		newOptions.unshift({
			label: 'Select a variation',
			value: null,
		});
		setVariationOptions(newOptions);
	}, [variations]);

	useEffect(() => {
		if (!processing && null !== entityRef && null !== selectedVariation) {
			processNewContent(selectedVariation);
		}
	}, [processing, entityRef, selectedVariation]);

	useEffect(() => {
		if (!processing && null !== entityRef && null !== entityContent) {
			setProcessing(true);
			apiFetch({
				path: `/wp/v2/${POST_TYPE_REST_BASE}/${entityRef}`,
				method: 'POST',
				data: {
					content: entityContent,
				},
			})
				.then((entity) => {
					if (entity.id) {
						setAttributes({
							ref: entityRef,
						});
						createSuccessNotice(
							`${POST_TYPE_LABEL} ${entity.title.rendered} created successfully!`,
							{
								type: 'snackbar',
							}
						);
					}
				})
				.finally(() => {
					setProcessing(false);
				});
		}
	}, [processing, entityRef, entityContent]);

	const textControlDisabled = processing;
	const selectControlDisabled =
		processing || null === variationOptions || title.length < 3;
	const buttonDisabled = processing || selectControlDisabled || selectedVariation === null;

	return (
		<BaseControl id="create-new-entity" label={__(`Create a new ${POST_TYPE_LABEL}`)}>
			<TextControl
				label="Title"
				value={title}
				onChange={(newTitle) => setTitle(newTitle)}
				disabled={textControlDisabled}
			/>
			<SelectControl
				label="Variation"
				value={selectedVariation}
				options={variationOptions}
				onChange={(newVariation) => selectVariation(newVariation)}
				disabled={selectControlDisabled}
			/>
			<Button
				variant="primary"
				onClick={() => {
					createNewEntity();
				}}
				disabled={buttonDisabled}
			>
				{processing ? (
					<div>
						<Spinner /> Creating {POST_TYPE_LABEL}...
					</div>
				) : (
					`Create ${POST_TYPE_LABEL}`
				)}
			</Button>
		</BaseControl>
	);
}

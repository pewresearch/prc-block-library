/* eslint-disable jsx-a11y/alt-text */
/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect, RawHTML } from 'react';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import { fetchByline } from './utils';

function getPlaceholderValue(valueToFetch) {
	// console.log('getPlaceholderValue', valueToFetch);
	const randomJobTitle =
		0.5 > Math.random() ? 'Editor...' : 'Associate Director...';
	/* eslint-disable indent */
	switch (valueToFetch) {
		case 'staffName':
			// return randomly either John or Jane Doe
			return 0.5 > Math.random() ? 'John Doe' : 'Jane Doe';
		case 'staffJobTitle':
			// return randomly either Editor or Associate Director
			return randomJobTitle;
		case 'staffTwitter':
			// return randomly either @jane_doe or @john_doe
			return 0.5 > Math.random() ? '@john_doe' : '@jane_doe';
		case 'staffMiniBio':
			return `an ${randomJobTitle} at Pew Research Center `;
		case 'staffBio':
			return `Laboris eiusmod culpa sit culpa qui aliqua esse excepteur aliquip. Quis reprehenderit eiusmod ipsum irure officia anim veniam fugiat labore officia reprehenderit velit in commodo. Tempor eu veniam sit culpa officia ullamco. Sit est commodo duis laborum. Dolor sint est exercitation enim ut in ea proident dolore officia. Ullamco est sit veniam aliquip tempor proident deserunt velit eiusmod pariatur velit. Irure nostrud mollit esse reprehenderit consectetur aliqua dolore fugiat ut enim. Magna cillum non deserunt laboris esse aliquip dolore esse voluptate reprehenderit nulla qui commodo commodo et. Deserunt fugiat minim aute excepteur irure voluptate pariatur reprehenderit cupidatat enim nisi in occaecat. Est incididunt esse aute do. Laboris ad eu et irure. Do quis laborum veniam minim in elit non ea dolore fugiat irure.`;
		default:
			return false;
	}
}

function StaffInfo({ attributes, setAttributes, value }) {
	const { prefix } = attributes;
	return (
		<Fragment>
			<RichText
				tagName="span"
				value={prefix}
				onChange={(newPrefix) => setAttributes({ prefix: newPrefix })}
				allowedFormats={['']}
				multiline={false}
			/>
			<RawHTML>{value}</RawHTML>
		</Fragment>
	);
}

function StaffImage({ value }) {
	const src = value[0];
	const width = value[1];
	const height = value[2];
	return <img src={src} width={width} height={height} />;
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	toggleSelection,
}) {
	const { valueToFetch, prefix } = attributes;

	const [staffValue, setStaffValue] = useState(
		getPlaceholderValue(valueToFetch),
	);
	const [isImage, setIsImage] = useState(false);

	useEffect(() => {
		if (undefined !== context.bylineTermId) {
			fetchByline(context.bylineTermId, valueToFetch).then((v) => {
				setStaffValue(v);
				if ('staffImage' === valueToFetch) {
					setIsImage(true);
				}
			});
		} else if (undefined !== context[valueToFetch]) {
			setStaffValue(context[valueToFetch]);
			if ('staffImage' === valueToFetch) {
				console.log("Is Image context...", valueToFetch, context);
				setIsImage(true);
			}
		}
	}, [context, valueToFetch]);

	const blockProps = useBlockProps();

	if (isImage && !staffValue) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment />;
	}

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes }} />
			<div {...blockProps}>
				{!isImage && (
					<StaffInfo
						attributes={attributes}
						setAttributes={setAttributes}
						value={staffValue}
					/>
				)}
				{isImage && <StaffImage value={staffValue} />}
			</div>
		</Fragment>
	);
}

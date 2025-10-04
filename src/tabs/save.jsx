/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	// eslint-disable-next-line react-compiler/react-compiler
	const blockProps = useBlockProps.save();

	// eslint-disable-next-line react-compiler/react-compiler
	const innerBlocksProps = useInnerBlocksProps.save( {} );

	const title = attributes?.metadata?.name || 'Tab Contents';

	return (
		<div { ...blockProps }>
			<h3 className="tabs__title">{ title }</h3>
			<div className="tabs__list" role="tablist"></div>
			<select className="tabs__select" role="listbox" aria-label={ title }>
				<option value="">{ title }</option>
			</select>
			{ innerBlocksProps.children }
		</div>
	);
}

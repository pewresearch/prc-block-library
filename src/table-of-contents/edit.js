/**
 * External Dependencies
 */


/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect, useMemo } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

const edit = ({ attributes, className, setAttributes, clientId }) => {
    const blockProps = useBlockProps();

	const {chapters = []} = useSelect((select) => {
		const blocks = select('core/block-editor').getBlocks();
		const chptrs = [
			{
				attributes: {
					content: 'Chapter 1...',
				}
			},
			{
				attributes: {
					content: 'Chapter 2...',
				}
			},
			{
				attributes: {
					content: 'Chapter 3...',
				}
			}
		];
		const found = blocks.filter(block => block.name === 'core/heading' && block.attributes.isChapter);
		return {
			chapters: 0 === found.length ? chptrs : found,
		}
	}, [clientId]);

    return (
		<div {...blockProps}>
			<ul>
				{0 !== chapters.length && chapters.map((chapter, index) => {
					return(<li>{chapter.attributes.content}</li>);
				})}
			</ul>
		</div>
	);
};

export default edit;

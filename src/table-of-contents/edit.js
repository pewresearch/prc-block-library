/**
 * External Dependencies
 */


/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect, useMemo } from '@wordpress/element';
import { useBlockProps, InspectorAdvancedControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { ToggleControl } from '@wordpress/components';

const edit = ({ attributes, className, setAttributes, clientId }) => {
	const { showCurrentChapter } = attributes;
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
		<Fragment>
			<InspectorAdvancedControls>
				<ToggleControl
					label={__('Highlight Current Chapter')}
					checked={showCurrentChapter}
					onChange={(value) => {
						setAttributes({showCurrentChapter: !showCurrentChapter});
					}}
					help={__('Highlight the current chapter in the table of contents when scrolling.', 'prc-block-library')}
				/>
			</InspectorAdvancedControls>
			<div {...blockProps}>
				<ul>
					{0 !== chapters.length && chapters.map((chapter, index) => {
						return(<li>{chapter.attributes.content}</li>);
					})}
				</ul>
			</div>
		</Fragment>
	);
};

export default edit;

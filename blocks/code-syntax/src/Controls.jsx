/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useCallback } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarGroup } from '@wordpress/components';

function Toolbar({ attributes, setAttributes }) {
	const { forceLanguage, detectedLanguage } = attributes;

	const MemoizedLanguageValue = useCallback(() => {
		if (forceLanguage) {
			return forceLanguage;
		}
		return `Auto-detect (${detectedLanguage}) `;
	}, [forceLanguage, detectedLanguage]);

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon={MemoizedLanguageValue}
					label="Select language"
					controls={[
						{
							title: 'Auto-detect',
							isActive: 'undefined' === typeof forceLanguage,
							onClick: () => {
								setAttributes({ forceLanguage: undefined });
							},
						},
						{
							title: 'R',
							isActive: 'R' === forceLanguage,
							onClick: () => {
								setAttributes({ forceLanguage: 'R' });
							},
						},
						{
							title: 'Python',
							isActive: 'Python' === forceLanguage,
							onClick: () => {
								setAttributes({ forceLanguage: 'Python' });
							},
						},
						{
							title: 'PHP',
							isActive: 'PHP' === forceLanguage,
							onClick: () => {
								setAttributes({ forceLanguage: 'PHP' });
							},
						},
						{
							title: 'HTML',
							isActive: 'HTML' === forceLanguage,
							onClick: () => {
								setAttributes({ forceLanguage: 'HTML' });
							},
						},
						{
							title: 'JavaScript',
							isActive: 'JavaScript' === forceLanguage,
							onClick: () => {
								setAttributes({ forceLanguage: 'JavaScript' });
							},
						},
						{
							title: 'JSON',
							isActive: 'JSON' === forceLanguage,
							onClick: () => {
								setAttributes({ forceLanguage: 'JSON' });
							},
						},
						{
							title: 'Bash',
							isActive: 'Bash' === forceLanguage,
							onClick: () => {
								setAttributes({ forceLanguage: 'Bash' });
							},
						},
						{
							title: 'SQL',
							isActive: 'SQL' === forceLanguage,
							onClick: () => {
								setAttributes({ forceLanguage: 'SQL' });
							},
						},
					]}
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return <Toolbar {...{ attributes, setAttributes, context }} />;
}

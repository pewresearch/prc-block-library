/**
 * External Dependencies
 */
import type { Dispatch, SetStateAction } from 'react';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import {
	Modal,
	ExternalLink,
	__experimentalVStack as VStack,
	__experimentalText as Text,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import { isAppleOS } from '@wordpress/keycodes';

type Props = {
	setIsHelpModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function HelpModal({ setIsHelpModalOpen }: Props) {
	return (
		<Modal
			title={__('Flexible Table Block help', 'flexible-table-block')}
			className="ftb-global-help-modal"
			onRequestClose={() => setIsHelpModalOpen(false)}
		>
			<VStack spacing={4}>
				<VStack>
					<Heading level={5}>
						{__(
							'About default table style',
							'flexible-table-block'
						)}
					</Heading>
					<Text as="p">
						{__(
							'Flexible Table Block is a block that allows you to create tables in various styles. First of all, it is recommended to set the default style of the table from "Global Setting".',
							'flexible-table-block'
						)}
					</Text>
				</VStack>
				<VStack>
					<Heading level={5}>
						{__('Select multiple cells', 'flexible-table-block')}
					</Heading>
					<Text as="p">
						{createInterpolateElement(
							isAppleOS()
								? __(
										'Hold <code>Command</code> key to select multiple cells. Hold <code>Shift</code> key to select the range. Selecting multiple cells is used to merge cells or to change styles of multiple cells.',
										'flexible-table-block'
									)
								: __(
										'Hold <code>Ctrl</code> key to select multiple cells. Hold <code>Shift</code> key to select the range. Selecting multiple cells is used to merge cells or to change styles of multiple cells.',
										'flexible-table-block'
									),
							{ code: <code /> }
						)}
					</Text>
				</VStack>
				<VStack>
					<Heading level={5}>
						{__('About scroll table', 'flexible-table-block')}
					</Heading>
					<Text as="p">
						{__(
							'If table scrolling is enabled, set "Table Width" or "Table Min Width" larger than the content width.',
							'flexible-table-block'
						)}
					</Text>
				</VStack>
				<VStack>
					<Heading level={5}>
						{__('About accessibility', 'flexible-table-block')}
					</Heading>
					<Text as="p">
						{createInterpolateElement(
							__(
								'You can tell screenreaders exactly by properly defining <code>id</code>, <code>headers</code>, and <code>scope</code> attributes for each cell.',
								'flexible-table-block'
							),
							{ code: <code /> }
						)}
					</Text>
					<Text as="p">
						{createInterpolateElement(
							__(
								'Refer to <Link>this page</Link> for the specifications of each attribute.',
								'flexible-table-block'
							),
							{
								Link: (
									// @ts-ignore
									<ExternalLink
										href={__(
											'https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced',
											'flexible-table-block'
										)}
									/>
								),
							}
						)}
					</Text>
				</VStack>
			</VStack>
		</Modal>
	);
}

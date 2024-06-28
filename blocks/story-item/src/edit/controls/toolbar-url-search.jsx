/**
 * External Dependencies
 */
import { WPEntitySearch } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { useState } from '@wordpress/element';
import { Modal, ToolbarButton, ToolbarGroup } from '@wordpress/components';

export default function ToolbarURLSearch({
	postId,
	postType = 'post',
	url,
	onSelect = () => {},
	onUpdateURL = () => {},
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<ToolbarGroup>
			<ToolbarButton
				aria-expanded={isModalOpen}
				aria-haspopup="true"
				label={`Search for a ${postType} or paste url here`}
				icon="admin-links"
				onClick={() => setIsModalOpen(true)}
				showTooltip
			/>
			{true === isModalOpen && (
				<Modal
					title={`Search for a ${postType} or paste url here`}
					onRequestClose={() => setIsModalOpen(false)}
					shouldCloseOnClickOutside={false}
					shouldCloseOnEsc={false}
				>
					<div
						style={{
							width: '100%',
							minWidth: '340px',
							maxWidth: '640px',
							margin: '0 auto',
						}}
					>
						<WPEntitySearch
							{...{
								placeholder: 'Climate Change', // placeholder for the search input
								searchValue: url, // pre-populate the search input
								onSelect: (post) => {
									onSelect(post).then(() => {
										setIsModalOpen(false);
									});
								},
								onKeyEnter: () => {
									setIsModalOpen(false);
								},
								onKeyESC: () => {
									setIsModalOpen(false);
								},
								entityId: postId,
								entityType: 'postType',
								entitySubType: postType,
								perPage: 10,
								hideChildren: true,
								clearOnSelect: true,
								createNew: false,
								showExcerpt: true,
								showType: true,
							}}
						/>
					</div>
				</Modal>
			)}
		</ToolbarGroup>
	);
}

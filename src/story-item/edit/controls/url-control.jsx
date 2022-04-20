/**
 * External Dependencies
 */
import { useDebounce } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Fragment, useState, useEffect } from '@wordpress/element';
import {
	ButtonGroup,
	Button,
	Modal,
	Popover,
	Spinner,
	TextControl,
	ToolbarButton,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { setPostAttributes } from '../../helpers';

function URLControl({ url, imageSize = 'A1', setAttributes }) {
	const [isLoading, setIsLoading] = useState(false);
	const [isLinkOpen, setIsLinkOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inputValue, setInputValue] = useState(url);
	const [post, setPost] = useState(null);

	const value = useDebounce(inputValue, 500);
	// When the input value changes, search for the post.
	useEffect(() => {
		if (value !== url) {
			setIsLoading(true);
			apiFetch({
				path: '/prc-api/v2/utils/get-post-by-url',
				method: 'POST',
				data: { url: value },
			})
				.then((p) => {
					console.log('get-post-by-url', p);
					if (undefined !== p.ID) {
						setPost(p);
						setIsLoading(false);
					}
				})
				.catch((err) => {
					console.log('Error: ', err);
					// In this state no url has been found so we should just assume the user wants the url passed in.
					setPost(false);
					setIsLoading(false);
				});
		}
	}, [value]);

	const onModalClose = () => setIsModalOpen(false);
	const onModalOpen = () => {
		setIsLinkOpen(false);
		setIsModalOpen(true);
	};

	const onReplace = (newPostId) => {
		setPostAttributes({
			postId: newPostId,
			imageSize,
			isRefresh: false,
			setAttributes,
		});
	};

	return (
		<Fragment>
			<ToolbarButton
				aria-expanded={isLinkOpen}
				aria-haspopup="true"
				label={__('Set URL')}
				icon="admin-links"
				onClick={() => setIsLinkOpen(!isLinkOpen)}
				showTooltip
			/>
			{true === isModalOpen && (
				<Modal
					title={__('Replace story item content', 'prc-blocks-story-item')}
					onRequestClose={onModalClose}
				>
					<p>
						Replace this story item with <strong>{post.post_title}</strong>?
					</p>
					<ButtonGroup>
						<Button
							isDestructive
							onClick={() => {
								onReplace(post.ID);
								onModalClose();
							}}
						>
							Replace
						</Button>
						<Button
							variant="secondary"
							onClick={() => {
								setAttributes({
									url: value,
								});
								onModalClose();
							}}
						>
							Replace URL Only
						</Button>
						<Button variant="secondary" onClick={onModalClose}>
							Cancel
						</Button>
					</ButtonGroup>
				</Modal>
			)}
			{true === isLinkOpen && (
				<Popover position="bottom center" onClose={() => setIsLinkOpen(false)}>
					<div
						style={{
							minWidth: '300px',
							padding: '8px',
							display: 'flex',
							alignItems: 'flex-end',
						}}
					>
						<div
							style={{
								flexGrow: '1',
							}}
						>
							<TextControl
								label="URL"
								value={inputValue}
								onChange={(value) => setInputValue(value)}
								autoComplete="off"
							/>
						</div>
						<div
							style={{
								paddingBottom: '7px',
								paddingLeft: '8px',
								width: '44px',
							}}
						>
							{isLoading && (
								<div style={{ paddingBottom: '3px' }}>
									<Spinner />
								</div>
							)}
							{!isLoading && false === post && (
								<Button
									icon="yes-alt"
									variant="tertiary"
									onClick={() => {
										setAttributes({ url: value });
										setIsLinkOpen(false);
									}}
								/>
							)}
							{!isLoading && false !== post && null !== post && (
								<Button
									icon="warning"
									variant="tertiary"
									onClick={onModalOpen}
								/>
							)}
						</div>
					</div>
				</Popover>
			)}
		</Fragment>
	);
}

export default URLControl;

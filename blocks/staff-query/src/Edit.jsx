/**
 * External Dependencies
 */
import md5 from 'md5';

/**
 * WordPress Dependencies
 */
import {
	memo,
	useMemo,
	useState,
	useEffect,
	Fragment,
} from '@wordpress/element';
import {
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Controls from './Controls';
import query from './query';

const ALLOWED_BLOCKS = ['prc-block/staff-info', 'core/group'];

function StaffInnerBlocks({ isVisible }) {
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: ALLOWED_BLOCKS,
		}
	);

	if (!isVisible) {
		return null;
	}

	return <div {...innerBlocksProps} />;
}

function StaffBlockPreview({ blocks, blockContextId, isHidden, setContextId }) {
	const blockPreviewProps = useBlockPreview({ blocks });

	const handleOnClick = () => {
		setContextId(blockContextId);
	};

	const style = {
		display: isHidden ? 'none' : undefined,
	};

	return (
		<div
			{...blockPreviewProps}
			tabIndex={0}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
			role="button"
			onClick={handleOnClick}
			onKeyPress={handleOnClick}
			style={style}
		/>
	);
}

// Keep the preview component memoized to avoid unnecessary re-renders.
// This only changes when InnerBlocks changes.
const MemoizedStaffBlockPreview = memo(StaffBlockPreview);

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.clientId
 * @param            props.context
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ clientId, context, attributes, setAttributes }) {
	const [activeBlockContextId, setActiveBlockContextId] = useState(null);
	const setContextId = (b) => {
		let newContextId = null;
		if (Array.isArray(b)) {
			const firstBlockContext = b[0];
			newContextId = md5(JSON.stringify(firstBlockContext));
		}
		if ('string' === typeof b) {
			newContextId = b;
		}
		setActiveBlockContextId(newContextId);
	};
	const [staffPosts, setStaffPosts] = useState(false);

	const { blocks } = useSelect(
		(select) => {
			const { getBlocks } = select(blockEditorStore);
			// if postId is not undefined and has an integer then use apiFetch to
			return {
				blocks: getBlocks(clientId),
			};
		},
		[clientId]
	);

	const blockContexts = useMemo(() => {
		console.log('staffPosts', staffPosts);
		if (!staffPosts || 0 === staffPosts.length) {
			return [];
		}

		const newContext = staffPosts?.map((staffPost) => {
			return staffPost;
		});

		console.log('newContext: ', newContext);
		return newContext;
	}, [staffPosts]);

	useEffect(() => {
		query(attributes).then((newStaffPosts) => {
			setStaffPosts(newStaffPosts);
		});
	}, [clientId, attributes]);

	useEffect(() => {
		if (0 < blockContexts.length) {
			setContextId(blockContexts);
		}
	}, [blockContexts]);

	const blockProps = useBlockProps();

	if (!staffPosts) {
		return (
			<div {...blockProps}>
				<Spinner style={{ align: 'center' }} />
				<p>Loading staff members...</p>
			</div>
		);
	}

	// To avoid flicker when switching active block contexts, a preview is rendered
	// for each block context, but the preview for the active block context is hidden.
	// This ensures that when it is displayed again, the cached rendering of the
	// block preview is used, instead of having to re-render the preview from scratch.
	// @TODO: Make this into a reusable component...
	return (
		<Fragment>
			<Controls
				{...{
					attributes,
					setAttributes,
					clientId,
				}}
			/>
			<div {...blockProps}>
				{blockContexts &&
					blockContexts.map((blockContext, index) => {
						const contextId = md5(JSON.stringify(blockContext));
						const isVisible =
							contextId === activeBlockContextId ||
							contextId === md5(JSON.stringify(blockContexts[0]));
						return (
							<BlockContextProvider
								key={`context-key--${index}`}
								value={blockContext}
							>
								<StaffInnerBlocks
									isVisible={
										null === activeBlockContextId ||
										isVisible
									}
								/>
								<MemoizedStaffBlockPreview
									blocks={blocks}
									blockContextId={contextId}
									setContextId={setContextId}
									isHidden={isVisible}
								/>
							</BlockContextProvider>
						);
					})}
			</div>
		</Fragment>
	);
}

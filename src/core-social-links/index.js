/**
 * External Dependencies
 */
import { Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import './style.scss';

const BLOCKNAME = 'core/social-links';
const BLOCKIDENTIFIER = 'prc-block-library/core-social-links';

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function CoreSocialLinks(props) {
				const { name, attributes, setAttributes } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}

				return (
					<>
						<BlockEdit {...props} />
						<Controls
							{...{ attributes, setAttributes, context: false }}
						/>
					</>
				);
			},
		'withCoreSocialLinksControls'
	),
	21
);

registerBlockVariation('core/social-link', {
	name: 'print',
	title: 'Print',
	icon: () => <Icon icon="print" library="solid" size={1} />,
	attributes: {
		service: 'print',
	},
	isActive: ['service'],
});

registerBlockVariation('core/social-link', {
	name: 'bookmark',
	title: 'Bookmark',
	icon: () => <Icon icon="bookmark" library="solid" size={1} />,
	attributes: {
		service: 'bookmark',
	},
	isActive: ['service'],
});

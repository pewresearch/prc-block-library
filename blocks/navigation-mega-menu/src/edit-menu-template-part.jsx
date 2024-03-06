/**
 * External Dependencies
 */
import { InnerBlocksAsSyncedContent } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { createRef, useEffect, Fragment, useState, useRef } from 'react';

/**
 * Internal Dependencies
 */
import useMenuTemplatePart from './use-menu-template-part';

export default function EditMenuTemplatePart({ menuSlug, clientId }) {
	const ref = createRef();
	const [topPosition, setTopPosition] = useState(0);
	const [leftPosition, setLeftPosition] = useState(0);
	const { menuId } = useMenuTemplatePart({ menuSlug });
	// Lets set the top based on the ref...

	useEffect(() => {
		const updateRefPositions = () => {
			console.log('ref', ref);
			if (ref.current) {
				// THis is very specific and needs to be more abstract.
				const navBlock =
					ref.current.parentElement.parentElement.parentElement;
				const navBlockRect = navBlock.getBoundingClientRect();
				const { left } = navBlockRect;
				const top = navBlock.offsetHeight;
				setTopPosition(top);
				setLeftPosition(left);
			}
		};

		// Run once, to initially set the positions.
		updateRefPositions();

		// Add a listener for the window resize event
		window.addEventListener('resize', updateRefPositions);

		return () => {
			// Remove the listener when the component unmounts
			window.removeEventListener('resize', updateRefPositions);
		};
	}, [ref?.current]);

	return (
		<Fragment>
			<div ref={ref}></div>
			<InnerBlocksAsSyncedContent
				{...{
					postId: menuId,
					postType: 'wp_template_part',
					postTypeLabel: 'Mega Menu',
					blockProps: {
						className:
							'wp-block-prc-block-navigation-mega-menu__container',
						style: {
							top: `${topPosition}px`,
							left: `-${leftPosition}px`,
						},
					},
					clientId,
				}}
			/>
		</Fragment>
	);
}

/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { getColorClassName } from '@wordpress/block-editor';

export default function PaginationItems({
	paginationItems,
	backgroundColor,
	textColor,
	borderColor,
	hoverBackgroundColor,
	activeBackgroundColor,
}) {
	if (!paginationItems) {
		return null;
	}

	return (
		<div className="common-block-style__pagination__pagination-numbers">
			{paginationItems.map((item, index) => {
				const { title, link, isActive } = item;
				const className = classNames(
					'common-block-style__pagination__page-numbers',
					{
						'has-text-color':
							!!textColor.color || !!textColor?.class,
						[getColorClassName('color', textColor?.slug)]:
							!!textColor?.slug,
						'has-background':
							!!backgroundColor.color || backgroundColor.class,
						[getColorClassName(
							'background-color',
							backgroundColor?.slug
						)]: !!backgroundColor?.slug,
						'has-border-color':
							!!borderColor.color || borderColor.class,
						[getColorClassName('border-color', borderColor?.slug)]:
							!!borderColor?.slug,
						'has-hover-background':
							!!hoverBackgroundColor.color ||
							hoverBackgroundColor.class,
						[getColorClassName(
							'hover-background-color',
							hoverBackgroundColor?.slug
						)]: !!hoverBackgroundColor?.slug,
						'has-active-background':
							!!activeBackgroundColor.color ||
							activeBackgroundColor.class,
						[getColorClassName(
							'active-background-color',
							activeBackgroundColor?.slug
						)]: !!activeBackgroundColor?.slug,
						'is-active': isActive,
					}
				);
				return (
					<a
						key={index}
						href={link}
						className={className}
						alt={`Go to page ${index + 1} in report package`}
					>
						{index + 1}
					</a>
				);
			})}
		</div>
	);
}

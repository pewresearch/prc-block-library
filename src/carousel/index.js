/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';

const { name } = metadata;

registerBlockVariation('core/group', {
	name: 'carousel-slide',
	title: __('Carousel Slide'),
	description: __('A group block acting as carousel slide.'),
});

const settings = {
	icon: () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path d="M512 448C512 483.3 483.3 512 448 512H64C28.65 512 0 483.3 0 448V224C0 188.7 28.65 160 64 160H448C483.3 160 512 188.7 512 224V448zM440 80C453.3 80 464 90.75 464 104C464 117.3 453.3 128 440 128H72C58.75 128 48 117.3 48 104C48 90.75 58.75 80 72 80H440zM392 0C405.3 0 416 10.75 416 24C416 37.25 405.3 48 392 48H120C106.7 48 96 37.25 96 24C96 10.75 106.7 0 120 0H392z" />
		</svg>
	),
	edit,
	save,
	variations: [
		{
			name: 'carousel-vertical',
			title: __('Carousel Vertical'),
			description: __('A vertical carousel.'),
			icon: () => (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path d="M512 448C512 483.3 483.3 512 448 512H64C28.65 512 0 483.3 0 448V224C0 188.7 28.65 160 64 160H448C483.3 160 512 188.7 512 224V448zM440 80C453.3 80 464 90.75 464 104C464 117.3 453.3 128 440 128H72C58.75 128 48 117.3 48 104C48 90.75 58.75 80 72 80H440zM392 0C405.3 0 416 10.75 416 24C416 37.25 405.3 48 392 48H120C106.7 48 96 37.25 96 24C96 10.75 106.7 0 120 0H392z" />
				</svg>
			),
			attributes: {
				direction: 'vertical',
			},
			isDefault: true,
		},
		{
			name: 'carousel-horizontal',
			title: __('Carousel Horizontal'),
			description: __('A horizontal carousel.'),
			icon: () => (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path d="M512 0C547.3 0 576 28.65 576 64V448C576 483.3 547.3 512 512 512H256C220.7 512 192 483.3 192 448V64C192 28.65 220.7 0 256 0H512zM96 72C96 58.75 106.7 48 120 48C133.3 48 144 58.75 144 72V440C144 453.3 133.3 464 120 464C106.7 464 96 453.3 96 440V72zM0 120C0 106.7 10.75 96 24 96C37.25 96 48 106.7 48 120V392C48 405.3 37.25 416 24 416C10.75 416 0 405.3 0 392V120z" />
				</svg>
			),
			attributes: {
				direction: 'horizontal',
			},
		},
	],
};

registerBlockType(name, { ...metadata, ...settings });

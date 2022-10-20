import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	Button,
	Placeholder as WPComPlaceholder,
	Spinner,
	DropZoneProvider,
	DropZone,
	Icon,
	Flex,
	FlexItem,
} from '@wordpress/components';

import apiFetch from '@wordpress/api-fetch';

import { arrayToJson } from '../controller/data/dataFormatter.ts';

export default function Dropzone({ attributes, setAttributes }) {
	const { uploadStatus, sorterId } = attributes;
	const csvToArray = (str) => {
		console.log({ str });
		const arr = [];
		const rows = str.split('\n');
		for (let i = 0; i < rows.length; i++) {
			const row = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
			for (let j = 0; j < row.length; j++) {
				row[j] = row[j]
					.replace(/"/g, '')
					.replace('\r', '')
					.replace(/^\s+|\s+$/gm, '');
			}
			arr.push(row);
		}
		console.log({ arr });
		return arr;
	};

	const submitQuotes = async (str) => {
		// add hash to data
		setTimeout(() => {
			apiFetch({
				path: `/prc-api/v2/block/quote-sorter/submit/`,
				method: 'POST',
				data: { quoteData: str, hash: sorterId || '' },
			})
				.then((res) => {
					console.log({ res });
					const { typologies } = res.data;
					setAttributes({
						uploadStatus: 'processed',
						sorterId: res.hash,
						typologies: JSON.stringify(typologies),
					});
				})
				.catch((e) => {
					console.log('Error!');
					console.log({ e });
				});
		}, 2000);
	};
	const onDropCSV = (filesList) => {
		setAttributes({
			uploadStatus: 'processing',
		});
		const reader = new FileReader();
		// Define how data is parsed and handled.
		reader.onload = () => {
			const dataArr = csvToArray(reader.result);
			const dataJson = arrayToJson(dataArr);
			const dataJsonString = JSON.stringify(dataJson);
			submitQuotes(dataJsonString);
		};

		filesList.forEach((file) => reader.readAsText(file));
	};
	return (
		<WPComPlaceholder
			label={__(
				'Drop a CSV of quotes in the space below. This may take a while if your file is very large. Make sure your CSV has Quote and Attribtution columns.',
			)}
			isColumnLayout
		>
			<DropZoneProvider>
				<Flex align="center" justify="center">
					{'processed' === uploadStatus && (
						<FlexItem
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<FlexItem>
								<Icon icon="database-view" />
							</FlexItem>
							<FlexItem>
								Data has been uploaded to database. Reference ID:{' '}
								<strong>{sorterId}</strong>
							</FlexItem>
						</FlexItem>
					)}
					{'unprocessed' === uploadStatus && <Icon icon="database-add" />}
					{'processing' === uploadStatus && <Spinner />}
				</Flex>
				<DropZone
					disabled={'processed' !== uploadStatus}
					onFilesDrop={(c) => {
						console.log('onFilesDrop', c);
						onDropCSV(c);
					}}
					onDrop={(c) => {
						console.log('onDrop', c);
					}}
				/>
			</DropZoneProvider>
		</WPComPlaceholder>
	);
}

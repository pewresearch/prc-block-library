/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { getPath } from '@wordpress/url';

/**
 * Internal Dependencies
 */

export default function useReportMaterials( { postId, postType } ) {
	const isSiteEditor = getPath( window.location.href )?.includes(
		'site-editor.php'
	);
	const { record, isResolving } = useEntityRecord( 'postType', postType, postId );

	const {parentTitle, parentId, reportMaterials} = useMemo(() => {
		if (!record || isResolving) {
			return {
				parentTitle: null,
				parentId: null,
				reportMaterials: [
					{
						key: '1',
						type: 'detailTable',
						label: 'Material 1...',
					},
					{
						key: '2',
						type: 'report',
						label: 'Material 2...',
					},
					{
						key: '3',
						type: 'topline',
						label: 'Material 3...',
					},
					{
						key: '4',
						type: 'dataset',
						label: 'Material 4...',
					}
				],
			};
		}
		return {
			parentTitle: record?.parent_info?.parent_title,
			parentId: record?.parent_info?.parent_id,
			reportMaterials: record?.report_materials,
		}
	}, [record, isResolving]);

	console.log('useReportMaterials', postId, postType, reportMaterials);
	return {
		parentId,
		parentTitle,
		reportMaterials,
	};
}

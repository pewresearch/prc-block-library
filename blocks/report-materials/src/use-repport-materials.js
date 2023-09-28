/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */

export default function useReportMaterials( { postId, postType } ) {
	const { record, isResolving } = useEntityRecord( 'postType', postType, postId );

	const {reportPackage, parentTitle, parentId, reportMaterials} = useMemo(() => {
		if (!record || isResolving) {
			return {};
		}
		return {
			reportPackage: record?.report_package,
			parentTitle: record?.report_package?.parent_title,
			parentId: record?.report_package?.parent_id,
			reportMaterials: record?.report_package?.report_materials,
		}
	}, [record, isResolving]);

	console.log('useReportMaterials', postId, postType, reportPackage, reportMaterials);
	return {
		parentId,
		parentTitle,
		reportMaterials
	};
}

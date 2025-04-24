import { getPostMeta } from '@prc/platform/utils';

const getAllRegionsFromPostId = (postId) => {
	// Using getEntityREcord we'll get the dited post meta and get that value.
};

const getTemplateIdForPost = (postId) => {
	// Using getEntityREcord we'll get the dited post meta and get that value.
};

const getAllRegionsForPost = (postId) => {
	// This will get the given post's rs.egions and then check it's templates for regions.
	// It will then return an array of all the combined regions.
	const regions = getAllRegionsFromPostId(postId);
	const templateId = getTemplateIdForPost(postId);
	const templateRegions = getAllRegionsFromPostId(templateId);
	return [...regions, ...templateRegions];
};

export default getAllRegionsForPost;

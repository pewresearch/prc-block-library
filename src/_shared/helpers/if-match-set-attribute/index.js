const ifMatchSetAttribute = (
    needle,
    haystack,
    attrKey,
    attrValue,
    setAttributes,
) => {
    if (needle === haystack) {
        setAttributes({ [attrKey]: attrValue });
    }
};

export default ifMatchSetAttribute;

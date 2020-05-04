const getColorName = (color, colors) => {
    if (
        '' === color ||
        undefined === color ||
        undefined === colors ||
        '' === colors
    ) {
        return null;
    }

    const colorOption = colors.findIndex((c, index) => {
        if (color == c.color) {
            return true;
        }
    });

    return colors[colorOption].name;
};

export default getColorName;

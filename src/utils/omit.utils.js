export const omit = (obj, key) => {
    const { [key]: keyValue, ...otherValues } = obj.dataValues;
    return otherValues;
};

export const omitMulti = (obj, keys) => {
    const otherValues = keys.reduce(
        (toBuild, key) => {
            const o = omit(toBuild, key);
            return { ...o };
        },
        { ...obj }
    );

    return otherValues;
};

export const omitMulti_bg = (o, keys) =>
    keys.reduce((tb, k) => ({ ...omit(tb, k) }), { ...o });

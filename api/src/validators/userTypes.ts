type updateSchema = {
    whereQuery: {
        [key: string]: string | number,
    },
    modifyQuery: {
        [key: string]: string | number;
    },
}

export {
    updateSchema
}
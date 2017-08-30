let nextId = 10;

export const addNode = (name, type, valueType, value, parentId) => {
    return {
        type: 'ADD_NODE',
        node: {
            id: String(nextId++),
            name,
            type,
            valueType,
            value,
            parentId
        }
    };
};

export const removeNode = (id) => {
    return {
        type: 'REMOVE_NODE',
        id
    };
}
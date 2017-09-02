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

export const editNode = (id, name, type, valueType, value) => {
    return {
        type: 'EDIT_NODE',
        id,
        node: {
            name,
            type,
            valueType,
            value
        }
    };
}
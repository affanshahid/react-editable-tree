export const addNode = (name, type, valueType, value, parentId) => {
    return {
        type: 'ADD_NODE',
        node: {
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

export const moveNode = (nodeId, newParentId) => {
    return {
        type: 'MOVE_NODE',
        id: nodeId,
        newParentId
    }
}

export const copyNode = (nodeId, toParentId) => {
    return {
        type: 'COPY_NODE',
        id: nodeId,
        toParentId
    }
}
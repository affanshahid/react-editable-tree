let nextId = 10;

const reducer = (state = {}, action) => {
    let newState;
    let index;
    let parentId;
    switch (action.type) {
        case 'ADD_NODE':
            const id = String(nextId++);
            newState = {
                ...state,
                [id]: { ...action.node, id, children: [] },
            };
            if (action.node.parentId) {
                newState[action.node.parentId] = {
                    ...state[action.node.parentId],
                    children: [
                        id,
                        ...state[action.node.parentId].children
                    ]
                }
            }
            return newState;

        case 'REMOVE_NODE':
            parentId = state[action.id].parentId;
            if (parentId) {
                const siblings = state[parentId].children;
                index = siblings.indexOf(action.id);
                newState = {
                    ...state,
                    [parentId]: {
                        ...state[parentId],
                        children: [
                            ...siblings.slice(0, index),
                            ...siblings.slice(index + 1)
                        ]
                    }
                };
            } else {
                newState = { ...state };
            }

            const removeKeys = (state, node) => {
                let newState = { ...state };
                for (let childId of node.children) {
                    newState = removeKeys(newState, state[childId]);
                }
                return Object.removeKey(newState, node.id);
            }

            newState = removeKeys(newState, state[action.id]);
            return newState;

        case 'EDIT_NODE':
            newState = {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    ...action.node
                }
            };
            return newState;
        case 'MOVE_NODE':
            newState = {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    parentId: action.toParentId
                }
            };
            const oldParentId = state[action.id].parentId;
            if (oldParentId) {
                const oldSiblings = state[oldParentId].children;
                const index = oldSiblings.indexOf(action.id);
                newState[oldParentId] = {
                    ...state[oldParentId],
                    children: [
                        ...oldSiblings.slice(0, index),
                        ...oldSiblings.slice(index + 1)
                    ]
                };
            }
            newState[action.toParentId] = {
                ...state[action.toParentId],
                children: [
                    action.id,
                    ...state[action.toParentId].children
                ]
            }

            return newState;

        case 'COPY_NODE':
            const copyNode = (state, node, parentId) => {
                const id = String(nextId++);
                let newState = {
                    ...state,
                    [id]: {
                        ...node,
                        id,
                        parentId,
                        children: []
                    }
                };
                
                for (let childId of node.children) {
                    newState = copyNode(newState, state[childId], id);
                }

                newState[parentId] = {
                    ...state[parentId],
                    children: [
                        id,
                        ...state[parentId].children
                    ]
                }

                return newState;
            }
            newState = copyNode(state, state[action.id], action.toParentId);
            return newState;

        default:
            return state;
    }
}

export default reducer;
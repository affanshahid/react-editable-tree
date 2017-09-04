const { random, floor } = Math;

let nextId = 10;

function removeNode(arr, node) {
    const children = arr.filter(n => n.parentId === node.id);
    children.forEach(child => {
        removeNode(arr, child);
    });
    arr.remove(node);
}

function copyNode(arr, nodeToCopy, to) {
    const newNode = { ...nodeToCopy };
    newNode.id = String(nextId++);
    newNode.parentId = to;
    arr.unshift(newNode);
    const children = arr.filter(n => n.parentId === nodeToCopy.id);
    children.forEach(child => {
        copyNode(arr, child, newNode.id);
    });
}

const nodeList = (state = createMockData(5), action) => {
    let newState;
    switch (action.type) {
        case 'ADD_NODE':
            action.node.id = String(nextId++);
            return [
                action.node,
                ...state
            ];
        case 'REMOVE_NODE':
            newState = state.clone();
            const nodeToRemove = newState.filter(n => n.id === action.id)[0];
            removeNode(newState, nodeToRemove);
            return newState;
        case 'EDIT_NODE':
            newState = state.clone();
            const nodeToEdit = newState.filter(n => n.id === action.id)[0];
            nodeToEdit.name = action.node.name;
            nodeToEdit.value = action.node.value;
            nodeToEdit.valueType = action.node.valueType;
            nodeToEdit.type = action.node.type;
            return newState;
        case 'MOVE_NODE':
            newState = state.clone();
            const nodeToMove = newState.filter(n => n.id === action.id)[0];
            newState.remove(nodeToMove);
            nodeToMove.parentId = action.newParentId;
            newState = [
                nodeToMove,
                ...newState
            ];
            return newState;
        case 'COPY_NODE':
            newState = state.clone();
            const nodeToCopy = newState.filter(n => n.id === action.id)[0];
            copyNode(newState, nodeToCopy, action.toParentId)
            return newState;
        default:
            return state;
    }
}

function createMockData(count) {
    const types = ['Sensor', 'SensorGroup', 'Query', 'Parameter'];
    const names = [
        'Avaya',
        'Cisco',
        'CPU Performance Counter',
        'Hard Disk Free Space',
        'ETC',
        'ECL',
        'AI Sensor'
    ]
    const values = [
        "401",
        "SELECT name, email, username, password from users where id = 4;",
        "% Free Disk Space",
        ""
    ]
    const data = [];
    data.push({
        id: '0',
        name: 'Jungle',
        type: 'Jungle',
        value: '',
        valueType: 'string',
        parentId: null
    });

    for (let i = 1; i <= count; i++) {
        data.push({
            id: String(i),
            name: names.random(),
            type: types.random(),
            value: values.random(),
            valueType: 'double',
            parentId: '0'
        });
        const childCount = floor(random() * 5);
        for (let j = 0; j < childCount; j++) {
            data.push({
                id: `${i}-${j}`,
                name: names.random(),
                type: types.random(),
                value: values.random(),
                valueType: 'double',
                parentId: String(i)
            });
            const childCount = floor(random() * 5);
            for (let k = 0; k < childCount; k++) {
                data.push({
                    id: `${i}-${j}-${k}`,
                    name: names.random(),
                    type: types.random(),
                    value: values.random(),
                    valueType: 'double',
                    parentId: `${i}-${j}`
                });
            }
        }
    }

    return data;
}

export default nodeList;
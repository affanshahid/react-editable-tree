const { random, floor } = Math;

function removeNode(arr, node) {
    const children = arr.filter(n => n.parentId === node.id);
    children.forEach(child => {
        removeNode(arr, child);
    });
    arr.remove(node);
}

const nodeList = (state = createMockData(5), action) => {
    let newState;
    switch (action.type) {
        case 'ADD_NODE': 
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
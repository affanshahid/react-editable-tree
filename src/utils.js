const { random, floor } = Math;

export function convertToState(nodeList) {
    const state = {};
    for(let node of nodeList) {
        if(node.nodeguid)
            convertProperties(node);
        node.children = [];
        state[node.id] = node;
    }

    for(let node of nodeList) {
        if (node.parentId)
            state[node.parentId].children.push(node.id);
    }
    return state;
}

const convertProperties = (node) => {
    const rename = (oldKey, newKey) => {
        node[newKey] = node[oldKey] || '';
        delete node[oldKey];
    }

    rename('nodeguid', 'id');
    rename('nodetype', 'type');
    rename('valuetype', 'valueType');
    rename('nodename', 'name');
    rename('nodeparentguid', 'parentId');
    rename('valuetext', 'value')
}

export function createMockData(count) {
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
    return convertToState(data);
}
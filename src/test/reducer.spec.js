import '../extensions';
import reducer from '../reducer';

describe('nodes reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({});
    });

    it('should handle ADD_NODE', () => {
        let action = { type: 'ADD_NODE', node: { name: 'foo', type: 'bar', valueType: 'baz', value: 'buzz', parentId: null } };
        let newState = reducer({}, action);
        expect(Object.values(newState)[0]).toMatchObject({ ...action.node, children: [] });

        action = { type: 'ADD_NODE', node: { name: 'foo', type: 'bar', valueType: 'baz', value: 'buzz', parentId: 'someguid' } };
        const oldState = {
            'someguid': {
                id: 'someguid',
                name: 'somename',
                type: 'sometype',
                valueType: 'someValueType',
                value: 'value',
                children: []
            }
        }
        newState = reducer(oldState, action);
        expect(Object.keys(newState).length).toEqual(2);
        expect(Object.values(newState)).toContainEqual(expect.objectContaining(action.node));
        expect(newState['someguid'].children.length).toEqual(1);
        expect(newState[newState.someguid.children[0]]).toEqual(expect.objectContaining(action.node));
    });

    it('should handle REMOVE_NODE', () => {
        let action = { type: 'REMOVE_NODE', id: 'someotherguid' };
        let oldState = {
            'someotherguid': {
                id: 'someotherguid',
                name: 'somename',
                type: 'sometype',
                valueType: 'someValueType',
                value: 'value',
                parentId: null,
                children: []
            }
        };

        let newState = reducer(oldState, action);
        expect(Object.keys(newState).length).toEqual(0);

        oldState = {
            'someguid': {
                id: 'someguid',
                name: 'somename',
                type: 'sometype',
                valueType: 'someValueType',
                value: 'value',
                parentId: null,
                children: ['someotherguid']
            },
            'someotherguid': {
                id: 'someotherguid',
                name: 'someothername',
                type: 'someothertype',
                valueType: 'someotherValueType',
                value: 'value',
                parentId: 'someguid',
                children: ['onemoreguid']
            },
            'anotherguid': {
                id: 'anotherguid',
                name: 'anothername',
                type: 'anothertype',
                valueType: 'anotherValueType',
                value: 'value',
                parentId: null,
                children: []
            },
            'onemoreguid': {
                id: 'onemoreguid',
                name: 'onemorename',
                type: 'onemoretype',
                valueType: 'onemoreValueType',
                value: 'value',
                parentId: 'someotherguid',
                children: []
            }
        };

        newState = reducer(oldState, action);
        expect(Object.keys(newState).length).toEqual(2);
        expect(Object.keys(newState)).toEqual(['someguid', 'anotherguid']);
        expect(newState['someguid'].children.length).toEqual(0);
    });

    it('should handle EDIT_NODE', () => {
        const action = {
            type: 'EDIT_NODE', id: 'someguid', node: {
                name: 'changedname',
                type: 'changedtype',
                valueType: 'changedValueType',
                value: 'value'
            }
        };

        const oldState = {
            'someguid': {
                id: 'someguid',
                name: 'somename',
                type: 'sometype',
                valueType: 'someValueType',
                value: 'value',
                parentId: 'someotherguid',
                children: []
            },
            'someotherguid': {
                id: 'someotherguid',
                name: 'someothername',
                type: 'someothertype',
                valueType: 'someotherValueType',
                value: 'value',
                parentId: null,
                children: ['someguid']
            }
        };

        let newState = reducer(oldState, action);
        expect(newState).toHaveProperty('someguid', expect.objectContaining(
            {
                id: 'someguid',
                name: 'changedname',
                type: 'changedtype',
                valueType: 'changedValueType',
                value: 'value'
            }
        ));
        expect(newState['someotherguid'].children.length).toEqual(1);
        expect(newState['someotherguid'].children[0]).toEqual('someguid');
    });

    it('should handle MOVE_NODE', () => {
        let action = { type: 'MOVE_NODE', id: 'someotherguid', toParentId: 'anotherguid' };
        let oldState = {
            'someguid': {
                id: 'someguid',
                name: 'somename',
                type: 'sometype',
                valueType: 'someValueType',
                value: 'value',
                parentId: null,
                children: ['someotherguid']
            },
            'someotherguid': {
                id: 'someotherguid',
                name: 'someothername',
                type: 'someothertype',
                valueType: 'someotherValueType',
                value: 'value',
                parentId: 'someguid',
                children: ['onemoreguid']
            },
            'anotherguid': {
                id: 'anotherguid',
                name: 'anothername',
                type: 'anothertype',
                valueType: 'anotherValueType',
                value: 'value',
                parentId: null,
                children: []
            },
            'onemoreguid': {
                id: 'onemoreguid',
                name: 'onemorename',
                type: 'onemoretype',
                valueType: 'onemoreValueType',
                value: 'value',
                parentId: 'someotherguid',
                children: []
            }
        };

        let newState = reducer(oldState, action);
        expect(Object.values(newState).length).toEqual(4);
        expect(newState['anotherguid'].children.length).toEqual(1);
        expect(newState['someguid'].children.length).toEqual(0);
        expect(newState['anotherguid'].children[0]).toBe('someotherguid');
        expect(newState['someotherguid'].children[0]).toEqual('onemoreguid');
    });

    it('should handle COPY_NODE', () => {
        let action = { type: 'COPY_NODE', id: 'someguid', toParentId: 'anotherguid' };
        let oldState = {
            'someguid': {
                id: 'someguid',
                name: 'somename',
                type: 'sometype',
                valueType: 'someValueType',
                value: 'value',
                parentId: null,
                children: ['someotherguid']
            },
            'someotherguid': {
                id: 'someotherguid',
                name: 'someothername',
                type: 'someothertype',
                valueType: 'someotherValueType',
                value: 'value',
                parentId: 'someguid',
                children: ['onemoreguid']
            },
            'anotherguid': {
                id: 'anotherguid',
                name: 'anothername',
                type: 'anothertype',
                valueType: 'anotherValueType',
                value: 'value',
                parentId: null,
                children: []
            },
            'onemoreguid': {
                id: 'onemoreguid',
                name: 'onemorename',
                type: 'onemoretype',
                valueType: 'onemoreValueType',
                value: 'value',
                parentId: 'someotherguid',
                children: []
            }
        };

        let newState = reducer(oldState, action);
        expect(Object.values(newState).length).toEqual(7);
        const someGuidCopy = newState[newState['anotherguid'].children[0]];
        expect(someGuidCopy).toEqual(expect.objectContaining({
            name: 'somename',
            type: 'sometype',
            valueType: 'someValueType',
            value: 'value',
            parentId: 'anotherguid'
        }));

        const someOtherGuidCopy = newState[someGuidCopy.children[0]];
        expect(someOtherGuidCopy).toEqual(expect.objectContaining({
            name: 'someothername',
            type: 'someothertype',
            valueType: 'someotherValueType',
            value: 'value',
            parentId: someGuidCopy.id
        }));

        expect(newState[someOtherGuidCopy.children[0]]).toEqual(expect.objectContaining({
            name: 'onemorename',
            type: 'onemoretype',
            valueType: 'onemoreValueType',
            value: 'value',
            children: [],
            parentId: someOtherGuidCopy.id
        }));
    });
});
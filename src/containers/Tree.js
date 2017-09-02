import React, { Component } from 'react';
import { NodeContainer } from './';
import { connect } from 'react-redux';
import './Tree.css';

class Tree extends Component {
    getRoot() {
        const toMatch = this.props.data.clone();
        for (let item of toMatch)
            item.children = [];
        const matched = {};
        const root = toMatch.filter(n => n.id === '0')[0];
        matched[root.id] = root;
        toMatch.remove(root);
        while (toMatch.length !== 0) {
            const matchedKeys = Object.keys(matched);
            const matchedChildren = toMatch.filter(n => matchedKeys.includes(n.parentId));
            for (let child of matchedChildren) {
                matched[child.parentId].children.push(child);
                matched[child.id] = child;
                toMatch.remove(child);
            }
        }
        return root;
    }

    render() {
        const root = this.getRoot();
        return (
            <div className="tree">
                <NodeContainer key={root.id} {...root} />
            </div>
        );
    }
}

Tree = connect(state => {
    return {
        data: state
    }
})(Tree);

export default Tree;
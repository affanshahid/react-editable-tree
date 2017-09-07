import React, { Component } from 'react';
import { NodeContainer } from './';
import { connect } from 'react-redux';
import './Tree.css';

class Tree extends Component {
    render() {
        const root = this.props.root;
        return (
            <div className="tree">
                <NodeContainer key={root.id} {...root} />
            </div>
        );
    }
}

Tree = connect(state => {
    return {
        root: Object.values(state).filter(n => n.type === 'Jungle')[0]
    }
})(Tree);


export default Tree;
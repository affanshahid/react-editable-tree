import React, { Component } from 'react';
import { array, func } from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { DropTarget } from 'react-dnd';
import { NodeContainer } from './';
import { connect } from 'react-redux';
import { moveNode, copyNode } from '../actions';
import './NodeList.css';

class NodeList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.connectDropTarget(
            <div className="node-list">
                {
                    this.props.isOver && <div className="placeholder" />
                }
                <TransitionGroup>
                    {
                        this.props.children.map(child => <CSSTransition
                            key={child.id}
                            classNames="fade"
                            timeout={{ enter: 400, exit: 400 }} ><NodeContainer key={child.id} {...child} indent={true} /></CSSTransition>)
                    }
                </TransitionGroup>
            </div>
        );
    }
}

NodeList.propTypes = {
    children: array.isRequired,
    handleMoveNode: func.isRequired
}

const NodeListTarget = {
    drop: function ({ handleMoveNode }, monitor) {
        if (monitor.didDrop()) return;
        const { id } = monitor.getItem();
        handleMoveNode(id);
    }
}

function collect(connect, monitor) {
    return {
        isOver: monitor.isOver({ shallow: true }),
        connectDropTarget: connect.dropTarget()
    }
}

NodeList = DropTarget(['NODE'], NodeListTarget, collect)(NodeList);

function mapDispatchToProps(dispatch, { parentId }) {
    return {
        handleMoveNode: id => {
            if (window.controlPressed)
                dispatch(copyNode(id, parentId))
            else
                dispatch(moveNode(id, parentId))
        }
    }
}

NodeList = connect(null, mapDispatchToProps)(NodeList);

export default NodeList;
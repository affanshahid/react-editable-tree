import React, { Component } from 'react';
import { array, func, object, string } from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { DropTarget } from 'react-dnd';
import { NodeContainer } from './';
import { connect } from 'react-redux';
import { moveNode, copyNode } from '../actions';
import './NodeList.css';

class NodeList extends Component {
    render() {
        return this.props.connectDropTarget(
            <div className="node-list">
                {
                    this.props.isOver && this.props.parentId !== this.props.dropItem.id  &&this.props.parentId !== this.props.dropItem.fromParent && <div className="placeholder" />
                }
                <div style={{width: 400, height: 1 }} />
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
    handleMoveNode: func.isRequired,
    parentId: string.isRequired,
    dropItem: object
}

NodeList.defaultProps = {
    dropItem: { fromParent: '-1', id: '-1' }
}

const NodeListTarget = {
    drop: function ({ handleMoveNode, parentId }, monitor) {
        if (monitor.didDrop()) return;
        const { id, fromParent } = monitor.getItem();
        if (id !== parentId && fromParent !== parentId)
            handleMoveNode(id);
    }
}

function collect(connect, monitor) {
    return {
        isOver: monitor.isOver({ shallow: true }),
        connectDropTarget: connect.dropTarget(),
        dropItem: monitor.getItem()
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
        },
        parentId
    }
}

NodeList = connect(null, mapDispatchToProps)(NodeList);

export default NodeList;